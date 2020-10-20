'use strict';
import { Op } from 'sequelize'
import models from '../db/models/index';
import status from 'http-status';
import url from 'url';
import jwt from 'jsonwebtoken';
import { DefaultError } from '../utils/errorHandler';
import { sessionTaskStatus } from '../db/config/statusConfig'
import sessionTask from '../db/models/sessionTask';
export default {

  create: {
    async post(req, res, next) {
      try {
        const token = req.headers.authorization.replace('Bearer ', '')
        const tokenDecoded = jwt.decode(token)
        models.Employee.findOne({
          attributes: { exclude: ['password', 'role_id', 'roleId'] },
          include: {
            model: models.Role,
            as: 'Role'
          },
          where: { id: tokenDecoded.employeeId }
        }).then(employee => {
          if (employee) {
            //create null session
            models.Session.create({
              employeeId: tokenDecoded.employeeId,
            }).then(session => {
              res.send({
                status: true,
                message: { id: session.id },
              });
            })
          }
        })
      } catch (error) {
        next(error);
      }
    }
  },
  view: {
    async get(req, res, next) {
      try {
        //Data from request
        const queryData = url.parse(req.url, true).query;
        var query = queryData.query;
        var whereCondition;
        //Validate data from request
        if (query == undefined) {
          query = '';
          whereCondition = null;
        } else {
          const employee = await models.Employee.findOne({
            where: { employeeCode: query },
            attributes: ['id', 'employeeCode']
          });
          if (employee) {
            whereCondition = {
              employeeId: employee.id
            }
          }
          else {
            whereCondition = {
              employeeId: query
            }
          }
        }
        if (queryData.order == undefined) {
          queryData.order = 'created_at,asc'
        }
        const orderOptions = queryData.order.split(",");

        const sessions = await models.Session.findAll({
          include: [{
            model: models.Period
          }],
          attributes: [
            'id',
            'employeeId',
            'sessionStart',
            'sessionEnd',
            'createdAt',
            'updatedAt',
          ],
          where: whereCondition,
          order: [
            [orderOptions[0], orderOptions[1]],
          ],
          raw: false,
          distinct: true,
        });
        res.status(status.OK)
          .send({
            status: true,
            message: sessions,
          });
      } catch
      (error) {
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
        //check whether all tasks has been completed.r
        await models.SessionTask.findOne({
          where:
          {
            [Op.and]: [
              { sessionId: sessionId },
              { statusId: { [Op.ne]: sessionTaskStatus.COMPLETED } },
            ]
          },
        }).then(result => {
          //if there's a task that is found not completed
          if (result) {
            res.status(500).send({
              status: false,
              message: "Incomplete task(s) found!"
            });
          } else {
            const emotions = req.body.emotions;
            //if there's no emotion in request body
            if (!emotions) {
              res.status(status.INTERNAL_SERVER_ERROR).send({
                status: false,
                message: "No emotion in session!",
              });
            } else {
              let periodList = [];
              emotions.forEach((emotion) => {
                const periods = emotion.periods;
                periods.forEach((period) => {
                  let addResult = {
                    sessionId: sessionId,
                    emotionId: emotion.emotion,
                    periodStart: period.periodStart,
                    periodEnd: period.periodEnd,
                    duration: period.duration
                  };
                  periodList.push(addResult);
                });
              });
              const addPeriodResult = models.Period.bulkCreate(periodList)
              if (addPeriodResult) {
                const result = models.Session.update(
                  { sessionEnd: new Date() },
                  {
                    where: {
                      id: sessionId
                    }
                  })
                res.status(status.CREATED).send({
                  status: true,
                  message: 1,
                });
              }
            }
          }
        })
      } catch (error) {
        next(error)
      }
    }
  },

}
