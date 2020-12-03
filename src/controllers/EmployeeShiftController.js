"use strict";
import models from "../db/models/index";
import status from "http-status";
import jwt from "jsonwebtoken";
import { Op } from "sequelize";
import sequelize from "sequelize";
import { shiftStatus } from "../db/config/statusConfig";
import { calculateStressLevel } from "../utils/emotionUtil";
import periodicityConfig from "../db/config/periodicityConfig";
import { el } from "date-fns/locale";
export default {
  // view_active_shift: {
  //   async get(req, res, next) {
  //     try {
  //       let result = [];
  //       const token = req.headers.authorization.replace("Bearer ", "");
  //       const tokenDecoded = jwt.decode(token);
  //       const currentDate = new Date();
  //       //find an active shift
  //       await models.EmployeeShift.findAll({
  //         attributes: {
  //           exclude: ["counter_id", "employee_id"],
  //         },
  //         where: {
  //           [Op.and]: [
  //             { employee_id: tokenDecoded.employeeId },
  //             { statusId: shiftStatus.ACTIVE },
  //           ],
  //         },
  //       }).then((activeShifts) => {
  //         //there are active shifts that are a day late
  //         //from the upcoming shift
  //         activeShifts.forEach((activeShift) => {
  //           let seDate = new Date(
  //             new Date(activeShift.shiftEnd).getTime() + 30 * 60 * 1000
  //           );
  //           if (seDate < currentDate) {
  //             models.EmployeeShift.update(
  //               {
  //                 statusId: shiftStatus.INACTIVE,
  //               },
  //               {
  //                 where: {
  //                   id: activeShift.id,
  //                 },
  //               }
  //             );
  //           } else {
  //             if (activeShift.shiftEnd.getDate() == currentDate.getDate()) {
  //               result.push(activeShift);
  //             }
  //           }
  //         });
  //         res.status(status.OK).send({
  //           success: true,
  //           message: result,
  //         });
  //       });
  //     } catch (error) {
  //       next(error);
  //     }
  //   },
  // },

  view_shift_list: {
    async get(req, res, next) {
      try {
        const token = req.headers.authorization.replace("Bearer ", "");
        const tokenDecoded = jwt.decode(token);
        const currentDate = new Date();
        const currentDateString = currentDate.toLocaleString("en-US", {
          timeZone: "ASIA/Ho_Chi_Minh",
        });
        const dateStrings = currentDateString.substring(0, 10).split("/");
        const sCurrentDateString =
          dateStrings[2] +
          "-" +
          dateStrings[0] +
          "-" +
          dateStrings[1] +
          "T00:00:00.000+07:00";
        const sCurrentDate = new Date(sCurrentDateString);
        const eCurrentDate = new Date(
          sCurrentDate.getTime() + 24 * 60 * 60 * 1000
        );
        let activeShiftResults = await models.EmployeeShift.findAll({
          attributes: {
            exclude: [
              "counter_id",
              "employee_id",
              "shift_type_id",
              "shiftId",
              "createdAt",
              "updatedAt",
            ],
          },
          include: [
            {
              model: models.Shift,
              attributes: {
                exclude: ["createdAt", "updatedAt"],
              },
              as: "Shift",
            },
          ],
          where: {
            [Op.and]: [
              { employee_id: tokenDecoded.employeeId },
              { statusId: shiftStatus.ACTIVE },
            ],
          },
        }).then((activeShifts) => {
          //if there's still active shift(s) of the last day.
          let asr = [];
          activeShifts.forEach((activeShift) => {
            let seDate = new Date(
              activeShift.shiftDate +
                "T" +
                activeShift.Shift.shiftEnd +
                ".000Z"
            );
            if(activeShift.Shift.shiftEnd < activeShift.Shift.shiftStart){
              seDate = new Date(seDate.getTime() + 24 * 60 * 60 * 1000)
            }
            let sePassedTime = currentDate.getTime() - seDate.getTime();
            if (sePassedTime <= 30 * 60 * 1000) {
              asr.push(activeShift);
            } else {
              models.EmployeeShift.update(
                { statusId: shiftStatus.INACTIVE },
                {
                  where: {
                    [Op.and]: [
                      { id: activeShift.id },
                      { employeeId: tokenDecoded.employeeId },
                    ],
                  },
                }
              );
            }
          });
          return Promise.resolve(asr);
        });
        res.status(status.OK).send({
          success: true,
          message: {
            activeShifts: [...activeShiftResults],
          },
        });
      } catch (error) {
        next(error);
      }
    },
  },

  checkout: {
    async put(req, res, next) {
      try {
        const token = req.headers.authorization.replace("Bearer ", "");
        const tokenDecoded = jwt.decode(token);
        const { id } = req.params;
        if (!id) {
          res.status(status.INTERNAL_SERVER_ERROR).send({
            success: false,
            message: "Please input id",
          });
        } else {
          const result = await models.EmployeeShift.update(
            { statusId: shiftStatus.INACTIVE },
            {
              where: {
                [Op.and]: [
                  { id: id },
                  { employeeId: tokenDecoded.employeeId },
                ],
              },
            }
          );
          res.status(status.OK).send({
            success: true,
            message: result,
          });
        }
      } catch (error) {
        next(error);
      }
    },
  },
  create: {
    async post(req, res, next) {
      const { employeeCode, counterId, shiftId } = req.body;
      try {
        const token = req.headers.authorization.replace("Bearer ", "");
        const tokenDecoded = jwt.decode(token);
        const employee = await models.Employee.findOne({
          where: {
            id: tokenDecoded.employeeId,
          },
        });
        const activeShift = await models.EmployeeShift.findOne({
          where: {
            employeeId: employee.id,
            shiftDate: new Date(),
            shiftId: shiftId,
            counterId: employee.counterId,
          }
        })
        if (activeShift) {
          await models.EmployeeShift.update(
            { statusId: shiftStatus.ACTIVE },
            {
              where: {
                id: activeShift.id
              },
            }
          );
          res.status(status.OK).send({
            success: true,
            message: { id: activeShift.id },
          });
        } else
        {
          const shift = await models.EmployeeShift.create({
            employeeId: employee.id,
            shiftDate: new Date(),
            statusId: shiftStatus.ACTIVE,
            shiftId: shiftId,
            counterId: employee.counterId,
          });
          res.status(status.OK).send({
            success: true,
            message: { id: shift.id },
          });
        }
        
      } catch (error) {
        next(error);
      }
    },
  },
};
