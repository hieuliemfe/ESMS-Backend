'use strict';
import models from '../db/models/index';
import status from 'http-status';
import jwt from 'jsonwebtoken';
import { Op } from "sequelize";
import sequelize from 'sequelize'
import { shiftStatus } from '../db/config/statusConfig';
import { calculateStressLevel } from '../utils/emotionUtil'
import periodicityConfig from '../db/config/periodicityConfig';
import { el } from 'date-fns/locale';
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
        const currentDateString = currentDate.toLocaleString("en-US", { timeZone: 'ASIA/Ho_Chi_Minh' })
        const dateStrings = currentDateString.substring(0, 10).split("/")
        const sCurrentDateString = dateStrings[2] + '-' + dateStrings[0] + '-' + dateStrings[1] + 'T00:00:00.000+07:00'
        const sCurrentDate = new Date(sCurrentDateString)
        const eCurrentDate = new Date(sCurrentDate.getTime() + 24 * 60 * 60 * 1000)
        let activeShiftResults = await models.Shift.findAll({
          attributes: {
            exclude: ["counter_id", "employee_id", "shift_type_id", "shiftTypeId", "createdAt", "updatedAt"]
          },
          include: [{
            model: models.ShiftType,
            attributes: {
              exclude: ["createdAt", "updatedAt"]
            },
            as: 'ShiftType'
          }],
          where: {
            [Op.and]: [
              { employee_id: tokenDecoded.employeeId },
              { statusId: shiftStatus.ACTIVE }
            ]
          }
        }).then(activeShifts => {
          //if there's still active shift(s) of the last day.
          let asr = [];
          activeShifts.forEach(activeShift => {
            let seDate = new Date(activeShift.shiftDate + 'T' + activeShift.ShiftType.shiftEnd + '.000Z');
            let sePassedTime = currentDate.getTime() - seDate.getTime()
            seDate.setDate(seDate.getDate() + 1)
            if (sePassedTime <= 24 * 60 * 60 * 1000) {
              asr.push(activeShift)
            } else {
              models.Shift.update(
                { statusId: shiftStatus.INACTIVE },
                {
                  where: {
                    [Op.and]: [
                      { id: activeShift.id },
                      { employeeId: tokenDecoded.employeeId },
                    ]
                  }
                }
              );
            }
          })
          return Promise.resolve(asr);
        })

        //find the nearest upcoming task
        let upcomingShifts = await models.Shift.findAll({
          attributes: {
            exclude: ["counter_id", "employee_id", "created_at", "updated_at"]
          },
          include: [{
            model: models.ShiftType,
            attributes: {
              exclude: ["createdAt", "updatedAt"]
            },
            as: 'ShiftType'
          }],
          where: {
            [Op.and]: [
              { employee_id: tokenDecoded.employeeId },
              {
                statusId: shiftStatus.UPCOMING
              }
            ]
          },
        })
          .then(ups => {
            var tmpUps = []
            ups.forEach(element => {
              var tmpDate = element.shiftDate
              var nextTmpDate = (new Date((new Date(tmpDate)).getTime() + 24 * 60 * 60 * 1000)).toISOString().substring(0, 10)
              var sStartDate = tmpDate + "T" + element.ShiftType.shiftStart + ".000Z"
              sStartDate = new Date(sStartDate)
              var sEndDate = element.ShiftType.shiftStart > element.ShiftType.shiftEnd ? nextTmpDate + "T" + element.ShiftType.shiftEnd + ".000Z" : tmpDate + "T" + element.ShiftType.shiftEnd + ".000Z"
              sEndDate = new Date(sEndDate)
              if (sEndDate > currentDate && sEndDate <= eCurrentDate) {
                tmpUps.push(element)
              }
            });
            return Promise.resolve(tmpUps);
          });
        upcomingShifts.sort(function (a, b) {
          return new Date(a.shiftDate + "T" + a.ShiftType.shiftStart + ".000Z") - new Date(b.shiftDate + "T" + b.ShiftType.shiftStart + ".000Z")
        })
        res.status(status.OK)
          .send({
            status: true,
            message: [...activeShiftResults, ...upcomingShifts]
          });
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
        const currentShift = await models.Shift.findAll({
          attributes: ['id'],
          where: {
            id: shiftId
          },
          include: [{
            model: models.Session,
            attributes: ['info', 'employee_id'],
            as: 'Session',
          }]
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
            shift_id: currentShift[0].id
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
          const stressWarning = await calculateStressLevel(currentShift, periodicityConfig.WEEKLY);
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
                url: stressWarning.url,
                suggestion: stressWarning.suggestion
              }
            });
        }
      } catch (error) {
        next(error)
      }
    }
  }
};
