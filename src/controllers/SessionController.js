'use strict';
import { query } from "express-validator";
import models from '../db/models/index';
import status from 'http-status';
import url from 'url';
import { DefaultError } from '../utils/errorHandler';
import publicRuntimeConfig from '../configurations';

export default {

  create: {
    async post(req, res, next) {
      try {

        const { sessionStart, sessionEnd, employeeCode } = req.body;
        const valideEmployeeCode = await models.Employee.findOne({
          where: { employeeCode: employeeCode },
          attributes: ['id', 'employeeCode']
        });
        if (!valideEmployeeCode) {
          throw new DefaultError(status.BAD_REQUEST, 'Invalid employeeCode!');
        }
        else {
          const employeeId = valideEmployeeCode.id
          await models.Session.create({
            employeeId,
            sessionStart,
            sessionEnd,
          })
            .then((result) => {
              if (!result) throw new DefaultError(status.BAD_REQUEST, "ERROR!");
              else {
                const emotions = req.body.emotions;
                let addResults = [];
                emotions.forEach((emotion) => {
                  const periods = emotion.periods;
                  periods.forEach((period) => {
                    let addResult = {
                      sessionId: result.id,
                      emotionId: emotion.emotion,
                      periodStart: period.periodStart,
                      periodEnd: period.periodEnd,
                      duration: period.duration
                    };
                    addResults.push(addResult);
                  });
                });
                models.Period.bulkCreate(addResults)
                  .then(() => {
                    res.status(status.CREATED).send({
                      status: true,
                      message: 1,
                    });
                  })
                  .catch((error) => {
                    res.status(500).send({
                      status: false,
                      message: "Fail to import data!",
                      error: error.message,
                    });
                  });
              }
            })
        }
      } catch (error) {
        next(error);
      }
    },
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
          else{
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
};
