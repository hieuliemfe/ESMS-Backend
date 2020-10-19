'use strict';
import models from '../db/models/index';
import status from 'http-status';
import jwt from 'jsonwebtoken';
import { Op } from "sequelize";
import sequelize from 'sequelize'
import { shiftStatus } from '../db/config/statusConfig';
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

};
