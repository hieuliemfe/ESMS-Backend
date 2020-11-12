'use strict';
import { Op } from 'sequelize'
import models from '../db/models/index';
import status from 'http-status';
import url from 'url';
import jwt from 'jsonwebtoken';
import { DefaultError } from '../utils/errorHandler';
import { shiftStatus } from '../db/config/statusConfig'
import { shiftTypes } from '../db/config/shiftTypeConfig';
import { setEpochMillisTime } from '../utils/timeUtil';
export default {

  view: {
    async get(req, res, next) {
      try {
        //Data from request
        const { order, employeeCode, fullname, status, shiftType } = req.query
        const limit = req.query.limit ? parseInt(req.query.limit) : 10;
        const page = req.query.page ? parseInt(req.query.page) : 1
        const offset = limit * (page - 1);
        const startDate = req.query.startDate ? req.query.startDate : setEpochMillisTime(0, 0, 0, 0, 0)
        const endDate = req.query.endDate ? req.query.endDate : new Date()
        console.log(`=========================start date:${startDate}`)
        //generate condition
        let whereEmployeeCondition = null;
        let whereShiftTypeCondition = '';
        if (shiftType) {
          switch (shiftType.toString().toLowerCase()) {
            case 'morning': {
              whereShiftTypeCondition = {
                shiftTypeId: shiftTypes.MORNING
              }
              break;
            };
            case 'afternoon': {
              whereShiftTypeCondition = {
                shiftTypeId: shiftTypes.AFTERNOON
              }
              break;
            }
            case 'night': {
              whereShiftTypeCondition = {
                shiftTypeId: shiftTypes.NIGHT
              }
              break;
            }
          };
        }
        let employee;
        if (fullname || employeeCode != undefined) {
          employee = await models.Employee.findOne({
            where: {
              [Op.or]: [
                { employeeCode: { [Op.like]: '%' + employeeCode + '%' } },
                { fullname: { [Op.like]: '%' + fullname + '%' } }
              ],
            }
          })
          whereEmployeeCondition = {
            employee_id: employee.id
          }
        }
        var whereCondition = {
          [Op.and]: [{
            sessionStart: { [Op.gte]: startDate },
          },
          {
            sessionEnd: { [Op.lt]: endDate },
          },
            whereEmployeeCondition,
          ]
        };
        //order the result
        var orderQuery = order ? order : 'id,desc';
        const orderOptions = orderQuery.split(",");
        //query starts here.
        const sessions = await models.Session.findAll({
          attributes: [
            'id',
            'employeeId',
            'sessionStart',
            'sessionEnd',
            'sessionDuration',
            'info',
            'angryWarningCount',
            'createdAt',
            'updatedAt',
          ],
          where: whereCondition,
          include: [{
            model: models.Shift,
            attributes: [],
            where: whereShiftTypeCondition,
            as: 'Shift'
          }],
          order: [
            [orderOptions[0], orderOptions[1]],
          ],
          raw: false,
          limit: limit,
          offset: offset,
          distinct: true,
        });
        //get result by positive/negative
        let sessionResults = [];
        let angryWarningCount = 0
        let angryInDayOfWeeks = {
          'Monday': 0,
          'Tuesday': 0,
          'Wednesday': 0,
          'Thursday': 0,
          'Friday': 0,
          'Saturday': 0,
          'Sunday': 0
        }
        for (const session of sessions) {
          const employee = await models.Employee.findByPk(session.employeeId);
          session.setDataValue('avatarUrl', employee.avatarUrl)
          session.setDataValue('employeeFullname', employee.fullname)
          if (session.info != undefined) {
            const parsedInfo = JSON.parse(session.info);
            if (status != undefined) {
              switch (status.toLowerCase()) {
                case 'negative': {
                  if (parsedInfo.emotion_level < 0) {
                    session.setDataValue('status', 'Negative')
                    sessionResults.push(session);
                  }
                  break;
                }
                case 'positive': {
                  if (parsedInfo.emotion_level > 0) {
                    session.setDataValue('status', 'Positive')
                    sessionResults.push(session);
                  }
                  break;
                }
                case 'neutral': {
                  if (parsedInfo.emotion_level == 0 && !parsedInfo.emotionless_warning) {
                    session.setDataValue('status', 'Neutral')
                    sessionResults.push(session);
                  }
                  break;
                }
                case 'emotionless': {
                  if (parsedInfo.emotion_level == 0 && parsedInfo.emotionless_warning) {
                    session.setDataValue('status', 'Emotionless')
                    sessionResults.push(session);
                  }
                  break;
                }
              }
            } else {
              if (parsedInfo.emotion_level < 0) {
                session.setDataValue('status', 'Negative')
              } else if (parsedInfo.emotion_level == 0) {
                session.setDataValue('status', 'Neutral')
                if (parsedInfo.emotionless_warning) {
                  session.setDataValue('status', 'Emotionless')
                }
              } else if (parsedInfo.emotion_level > 0) {
                session.setDataValue('status', 'Positive')
              }
              sessionResults.push(session);
            }
          }
          angryWarningCount += session.angryWarningCount
          var sStartDate = session.sessionStart
          var dayOfWeek = new Date(sStartDate).toLocaleString("en-US", {
            timeZone: "Asia/Ho_Chi_Minh",
            // timeZone: "Pacific/Fiji",
            weekday: 'long',
            // year: 'numeric',
            // month: 'long',
            // day: 'numeric',
            // hour12: false,
            // hour: 'numeric',
            // minute: 'numeric',
            // second: 'numeric'
          })
          angryInDayOfWeeks[dayOfWeek] += session.angryWarningCount
        }
        let result = {
          "sumary": {
            "angryWarningCount": angryWarningCount,
            "totalSessions": sessions.length,
            "angryInDayOfWeeks": angryInDayOfWeeks
          },
          "sessions": sessionResults
        }
        res.status(200)
          .send({
            status: true,
            message: result,
          });
      } catch
      (error) {
        next(error);
      }
    }
  },

  view_one: {
    async get(req, res, next) {
      try {
        const { sessionId } = req.params;
        if (!sessionId) {
          res.send({
            success: false,
            message: "Please input session id."
          })
        }
        const session = await models.Session.findOne({
          where: {
            id: sessionId
          },
        })
        if (session != undefined && session.info != undefined) {
          const parsedInfo = JSON.parse(session.info);
          session.setDataValue('info', parsedInfo)
        }
        // const emotionDurations = getEmotionDurations(session);
        // session.setDataValue('emotionDurations', emotionDurations)
        res.status(status.OK)
          .send({
            success: true,
            message: session
          })
      } catch (error) {
        next(error);
      }
    }
  },
  create: {
    async post(req, res, next) {
      try {
        const token = req.headers.authorization.replace('Bearer ', '')
        const tokenDecoded = jwt.decode(token)
        //create null session
        const currentShift = await models.Shift.findOne({
          where: {
            employee_id: tokenDecoded.employeeId,
            status_id: shiftStatus.ACTIVE
          }
        })
        const createdSession = await models.Session.create({
          employeeId: tokenDecoded.employeeId,
          shift_id: currentShift.id
        })
        res.status(status.CREATED).send({
          status: true,
          message: { id: createdSession.id },
        })
      } catch (error) {
        next(error);
      }
    }
  },
  start_session: {
    async put(req, res, next) {
      try {
        const { sessionId } = req.params
        const result = await models.Session.update({
          sessionStart: new Date(),
        },
          {
            where: {
              id: sessionId
            }
          }
        )
        res.status(status.OK).send({
          status: true,
          message: result,
        });
      } catch (error) {
        next(error)
      }
    }
  },

  end_session: {
    async put(req, res, next) {
      try {
        const { sessionId } = req.params;
        const { info } = req.body;
        // //check whether all tasks has been completed.r
        // const isRemainingTask = await models.SessionTask.findOne({
        //   where:
        //   {
        //     [Op.and]: [
        //       { sessionId: sessionId },
        //       { statusId: { [Op.ne]: sessionTaskStatus.COMPLETED } },
        //     ]
        //   },
        // })
        // //if there's a task that is found not completed
        // if (isRemainingTask) {
        //   res.status(500).send({
        //     status: false,
        //     message: "Incomplete task(s) found!"
        //   });
        // } else {
        const emotions = req.body.emotions;
        //if there's no emotion in request body
        if (!emotions) {
          res.status(status.INTERNAL_SERVER_ERROR).send({
            status: false,
            message: "No emotion in session!",
          });
        } else {
          let periodList = [];
          for (const emotion of emotions) {
            const periods = emotion.periods;
            for (const period of periods) {
              let addResult = {
                sessionId: sessionId,
                emotionId: emotion.emotion,
                periodStart: period.periodStart,
                periodEnd: period.periodEnd,
                duration: period.duration
              };
              periodList.push(addResult);
            };
          };
          const addPeriodResult = await models.Period.bulkCreate(periodList)
          if (addPeriodResult) {
            const result = await models.Session.update(
              {
                sessionEnd: new Date(),
                // info: info
                info: info,
                angryWarningCount: JSON.parse(info).angry_warning,
                sessionDuration: JSON.parse(info).total_session_duration,
              },
              {
                where: {
                  id: sessionId
                }
              })
            res.status(status.CREATED).send({
              status: true,
              message: result,
            });
          }
        }
        // }
      } catch (error) {
        next(error)
      }
    }
  },
  get_guideline: {
    async get(req, res, next) {
      try {
        const guideline = await models.Guideline.findOne({
          where: {
            title: req.params.title
          }
        })
        res.status(status.OK).send({
          status: true,
          message: guideline,
        })
      } catch (error) {
        next(error);
      }
    }
  },
  // view_old: {
  //   async get(req, res, next) {
  //     try {
  //       //Data from request
  //       const queryData = url.parse(req.url, true).query;
  //       var query = queryData.query;
  //       var whereCondition;
  //       //Validate data from request
  //       if (query == undefined) {
  //         query = '';
  //         whereCondition = null;
  //       } else {
  //         const employee = await models.Employee.findOne({
  //           where: { employeeCode: query },
  //           attributes: ['id', 'employeeCode']
  //         });
  //         if (employee) {
  //           whereCondition = {
  //             employeeId: employee.id
  //           }
  //         }
  //         else {
  //           whereCondition = {
  //             employeeId: query
  //           }
  //         }
  //       }
  //       if (queryData.order == undefined) {
  //         queryData.order = 'created_at,asc'
  //       }
  //       const orderOptions = queryData.order.split(",");

  //       const sessions = await models.Session.findAll({
  //         include: [{
  //           model: models.Period
  //         }],
  //         attributes: [
  //           'id',
  //           'employeeId',
  //           'sessionStart',
  //           'sessionEnd',
  //           'createdAt',
  //           'updatedAt',
  //         ],
  //         where: whereCondition,
  //         order: [
  //           [orderOptions[0], orderOptions[1]],
  //         ],
  //         raw: false,
  //         distinct: true,
  //       });
  //       res.status(status.OK)
  //         .send({
  //           status: true,
  //           message: sessions,
  //         });
  //     } catch
  //     (error) {
  //       next(error);
  //     }
  //   }
  // },

}
