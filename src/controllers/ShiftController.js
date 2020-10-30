'use strict';
import models from '../db/models/index';
import status from 'http-status';
import jwt from 'jsonwebtoken';
import { Op } from "sequelize";
import sequelize from 'sequelize'
import { shiftStatus } from '../db/config/statusConfig';
import { calculateStressLevel } from '../utils/emotionUtil'
export default {

  view_active_shift: {
    async get(req, res, next) {
      try {
        let result = []
        const token = req.headers.authorization.replace('Bearer ', '')
        const tokenDecoded = jwt.decode(token)
        const currentDate = new Date();
        //find an active shift
        await models.Shift.findAll({
          attributes: {
            exclude: ["counter_id", "employee_id"]
          },
          where: {
            [Op.and]: [
              { employee_id: tokenDecoded.employeeId },
              { statusId: shiftStatus.ACTIVE }
            ]
          }
        }).then(activeShifts => {
          //there are active shifts that are a day late
          //from the upcoming shift
          activeShifts.forEach(activeShift => {
            let seDate = new Date(activeShift.shiftEnd);
            seDate.setDate(seDate.getDate() + 1)
            if (seDate < currentDate) {
              models.Shift.update(
                {
                  statusId: shiftStatus.INACTIVE
                }, {
                where: {
                  id: activeShift.id
                }
              })
            } else {
              if (activeShift.shiftEnd.getDate() == currentDate.getDate()) {
                result.push(activeShift)
              }
            }
          })
          res.status(status.OK)
            .send({
              status: true,
              message: result
            })
        });
      } catch (error) {
        next(error);
      }
    }
  },


  view_shift_list: {
    async get(req, res, next) {
      try {
        const token = req.headers.authorization.replace('Bearer ', '')
        const tokenDecoded = jwt.decode(token)
        const currentDate = new Date();
        let activeShiftResults = [];
        await models.Shift.findAll({
          attributes: {
            exclude: ["counter_id", "employee_id", "created_at", "updated_at"]
          },
          where: {
            [Op.and]: [
              { employee_id: tokenDecoded.employeeId },
              { statusId: shiftStatus.ACTIVE }
            ]
          }
        }).then(activeShifts => {
          //if there's still active shift(s) of the last day.
          activeShifts.forEach(activeShift => {
            let seDate = new Date(activeShift.shiftEnd);
            seDate.setDate(seDate.getDate() + 1)
            if (seDate > currentDate) {
              activeShiftResults.push(activeShift)
            }
          })
        })
        //find the nearest upcoming task
        await models.Shift.findAll({
          attributes: {
            exclude: ["counter_id", "employee_id", "created_at", "updated_at"]
          },
          where: {
            [Op.and]: [
              { employee_id: tokenDecoded.employeeId },
              {
                statusId: {
                  [Op.ne]: shiftStatus.ACTIVE
                }
              },
              //check whether the shifts are still available to check-in
              {
                shiftEnd: {
                  [Op.gte]: currentDate
                }
              },
              //check whether the shifts are in the same date.
              sequelize.where(sequelize.fn('date', sequelize.col('shift_end')), '<=', currentDate)
            ]
          },
          order: [
            ['shiftStart', 'asc'],
          ],
        }).then(upcomingShifts => {
          res.status(status.OK)
            .send({
              status: true,
              message: [...activeShiftResults, ...upcomingShifts]
            });
          //if there's no active shift, find inactive task that is still in the shift period
        })
      } catch
      (error) {
        next(error);
      }
    }
  },

  checkout: {
    async put(req, res, next) {
      try {
        const token = req.headers.authorization.replace('Bearer ', '')
        const tokenDecoded = jwt.decode(token)
        const { shiftId } = req.params
        if (!shiftId) {
          res.status(status.INTERNAL_SERVER_ERROR)
            .send({
              success: false,
              message: "Please input shiftId"
            });
        } else {
          const result = await models.Shift.update(
            { statusId: shiftStatus.INACTIVE },
            {
              where: {
                [Op.and]: [
                  { id: shiftId },
                  { employeeId: tokenDecoded.employeeId },
                ]
              }
            }
          );
          res.status(status.OK)
            .send({
              success: true,
              message: result
            });
        }
      } catch (error) {
        next(error)
      }
    }
  },

  checkin: {
    async put(req, res, next) {
      try {
        const token = req.headers.authorization.replace('Bearer ', '')
        const tokenDecoded = jwt.decode(token)
        const { shiftId } = req.params
        if (!shiftId) {
          res.status(status.INTERNAL_SERVER_ERROR)
            .send({
              success: false,
              message: "Please input shiftId"
            });
        } else {
          const result = await models.Shift.update(
            { statusId: shiftStatus.ACTIVE },
            {
              where: {
                [Op.and]: [
                  { id: shiftId },
                  { employeeId: tokenDecoded.employeeId },
                ]
              }
            }
          );
          res.status(status.OK)
            .send({
              success: true,
              message: result
            });
        }
      } catch (error) {
        next(error)
      }
    }
  },
  sum_up: {
    async get(req, res, next) {
      try {
        const { shiftId } = req.params
        const token = req.headers.authorization.replace('Bearer ', '')
        const tokenDecoded = jwt.decode(token)
        const currentShift = await models.Shift.findOne({
          where: {
            id: shiftId
          }
        })
        if (!currentShift) {
          return res.status(status.INTERNAL_SERVER_ERROR)
            .send({
              success: false,
              message: "There's no active shift for this bank teller."
            });
        }
        const shiftSessions = await models.Session.findAll({
          attributes: [
            'id',
            'info'
          ],
          where: {
            shift_id: currentShift.id
          }
        });

        if (shiftSessions) {
          //response data
          const sessionCount = shiftSessions.length
          let emotionlessSessionCount = 0;
          let neutralSessionCount = 0;
          let positiveSessionCount = 0;
          let negativeSessionCount = 0;
          let angryWarningCount = 0;
          let noFaceWarningCount = 0;
          let stressLevel;
          //start analyze data
          shiftSessions.forEach(shiftSession => {
            if (shiftSession.info != undefined) {
              const parsedInfo = JSON.parse(shiftSession.info);
              //if it's a neutral session
              if (parsedInfo.emotion_level == 0) {
                //if there's a emotionless warning found
                if (parsedInfo.emotionless_warning) {
                  emotionlessSessionCount++;
                } else {
                  neutralSessionCount++;
                }
              } else {
                //if it's a positive session
                if (parsedInfo.emotion_level > 0) {
                  positiveSessionCount++;
                  //if it's a negative session
                } else if (parsedInfo.emotion_level < 0) {
                  negativeSessionCount++;
                }
              }
              angryWarningCount += parsedInfo.angry_warning;
              noFaceWarningCount += parsedInfo.no_face_detected_warning;
            }
          });
          stressLevel = calculateStressLevel(shiftSessions);
          let stressWarning = false
          if (stressLevel > 0) {
            stressWarning = true
          }
          res.status(status.OK)
            .send({
              success: true,
              message: {
                totalSessions: sessionCount,
                neutralSessions: neutralSessionCount,
                positiveSessions: positiveSessionCount,
                negativeSessions: negativeSessionCount,
                emotionlessSessions: emotionlessSessionCount,
                angryWarnings: angryWarningCount,
                noFaceWarnings: noFaceWarningCount,
                stressLevel: stressLevel,
                stressWarning: stressWarning
              }
            });
        }
      } catch (error) {
        next(error)
      }
    }
  }
};
