"use strict";

import models from "../db/models/index";
import status from "http-status";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { Op } from "sequelize";
import sequelize from "sequelize";
import url from "url";
import { endOfWeek, endOfMonth, endOfYear, parseISO, set } from "date-fns";
import readXlsxFile from "read-excel-file/node";
import { generateEmployeeInfo } from "../utils/employeeUtil";
import { DefaultError } from "../utils/errorHandler";
import publicRuntimeConfig from "../configurations";
import PeriodicityIds from "../db/config/periodicityConfig";
import {
  calculateShiftEmotionLevel,
  calculateStressLevel,
  getTypeWarning,
} from "../utils/emotionUtil";
import { setEpochMillisTime } from "../utils/timeUtil";
import { Readable } from "stream";
import { id } from "date-fns/locale";
import { SuspensionStatus } from "../db/config/statusConfig";

const JWT_SECRET = publicRuntimeConfig.JWT_SECRET;

export default {
  // Public Routes
  login: {
    async post(req, res, next) {
      try {
        const employee = await models.Employee.findOne({
          where: {
            employeeCode: req.body.employeeCode,
          },
          include: [
            {
              model: models.Role,
              as: "Role",
            },
            {
              model: models.Counter,
              attributes: { exclude: ["createdAt", "updatedAt"] },
              as: "Counter",
            },
            {
              model: models.Suspension,
              attributes: {
                exclude: ["createdAt", "updatedAt", "employeeId", "employee_id"]
              },
              where: {
                [Op.and]:[
                  {expiredOn: { [Op.gt]: new Date() }},
                  {isDeleted: SuspensionStatus.NOT_DELETED}
                ]
              },
              as: "Suspensions",
              required:false
            },
          ],
          attributes: ["id", "employeeCode", "password", "roleId"],
        });
        if (!employee)
          throw new DefaultError(
            status.BAD_REQUEST,
            "Invalid Employee Code or Password"
          );
        const isValidPassword = bcrypt.compareSync(
          req.body.password,
          employee.password
        );
        if (!isValidPassword)
          throw new DefaultError(
            status.BAD_REQUEST,
            "Invalid Employee Code or Password"
          );
        const {
          id: employeeId,
          employeeCode,
          roleName = employee.Role.roleName,
        } = employee;
        const token = jwt.sign(
          { employeeId, employeeCode, roleName },
          JWT_SECRET
        );
        return res.status(status.OK).send({
          success: true,
          message: {
            employeeCode: employee.employeeCode,
            roleName: employee.Role.roleName,
            Counter: employee.Counter,
            Suspensions: employee.Suspensions
          },
          token,
        });
      } catch (error) {
        next(error);
      }
    },
  },
  bulk_register: {
    async post(req, res, next) {
      try {
        if (req.file == undefined) {
          return res.status(400).send("Please upload an excel file!");
        }
        const stream = Readable.from(req.file.buffer);
        await readXlsxFile(stream).then(async (rows) => {
          // skip header
          let employees = []
          rows.shift();
          for (let index = 0; index < rows.length; index++) {
            let row = rows[index]   
            let employee = await generateEmployeeInfo(row[1], row[3], row[2], row[4], row[5]);
            let created = await models.Employee.create(employee);
            created.setDataValue("password", employee.password)
            created.setDataValue("createdAt", undefined)
            created.setDataValue("updatedAt", undefined)
            created.setDataValue("isSubscribed", undefined)
            created.setDataValue("isDeleted", undefined)
            created.setDataValue("createdAt", undefined) 
            employees.push(created)         
          }
          res.status(status.CREATED).send({
            success: true,
            message: employees,
          });
        });
      } catch (error) {
        next(error);
      }
    },
  },

  register: {
    async post(req, res, next) {
      try {
        const { fullname, roleId, phoneNumber, avatarUrl } = req.body;
        const employee = await generateEmployeeInfo(
          fullname,
          roleId,
          phoneNumber,
          avatarUrl
        );
        await models.Employee.create(employee);
        res.status(status.CREATED).send({
          success: true,
          message: {
            employeeCode: employee.employeeCode,
            password: employee.password,
          },
        });
      } catch (error) {
        next(error);
      }
    },
  },
  // Private Routes
  profile: {
    async get(req, res, next) {
      try {
        const employee = await models.Employee.findOne({
          where: {
            employeeCode: req.params.employeeCode,
          },
        });
        if (!employee)
          throw new DefaultError(status.BAD_REQUEST, "Invalid employee");
        return res.status(status.OK).send({
          success: true,
          employee,
        });
      } catch (error) {
        next(error);
      }
    },
  },

  view: {
    async get(req, res, next) {
      try {
        //Data from request
        const { role } = req.query;

        const startDate = req.query.startDate
          ? req.query.startDate
          : setEpochMillisTime(0, 0, 0, 0, 0);
        const endDate = req.query.endDate ? req.query.endDate : new Date();

        let whereEmployeeCondition = "";
        if (role !== undefined) {
          whereEmployeeCondition = {
            roleId: role,
          };
        }
        //employeeCode & fullname only
        const employees = await models.Employee.findAll({
          attributes: { exclude: ["password", "role_id", "createdAt", "updatedAt", "counter_id", "counterId", "isSubscribed", "isDeleted"] },
         include:{
          model: models.Suspension,
          attributes: {
            exclude: ["createdAt", "updatedAt", "employeeId", "employee_id"]
          },
          where: {
            [Op.and]:[
              {expiredOn: { [Op.gt]: new Date() }},
              {isDeleted: SuspensionStatus.NOT_DELETED}
            ]
          },
          as: "Suspensions",
          required:false
          },
          where: whereEmployeeCondition,
        });
        var empResults = [];
        if (role === "3") {
          for (let i = 0; i < employees.length; i++) {
            var employee = employees[i];
            var angryCount = 0;
            var totalWarningSessions = 0
            var totalSession = 0
            await models.Session.findAndCountAll({
              where: {
                [Op.and]: [
                  { sessionStart: { [Op.gte]: startDate } },
                  { sessionStart: { [Op.lt]: endDate } },
                  { employeeId: employee.id }
                ]
              }
            }).then(result => {
              totalSession = result.count
            })
            await models.Session.findAndCountAll({
              where: {
                [Op.and]: [
                  { sessionStart: { [Op.gte]: startDate } },
                  { sessionStart: { [Op.lt]: endDate } },
                  { employeeId: employee.id },
                  { angryWarningCount: { [Op.gt]: 0 } }
                ]
              }
            }).then(result => {
              totalWarningSessions = result.count
            })
            employee.setDataValue("totalWarningSessions", parseInt(totalWarningSessions));
            employee.setDataValue("totalSession", parseInt(totalSession));
            employee.setDataValue("angrySessionPercent", parseFloat(totalWarningSessions/totalSession))
            await models.Session.findAll({
              attributes: [
                "employee_id",
                [
                  sequelize.fn(
                    "COALESCE",
                    sequelize.fn("sum", sequelize.col("angry_warning_count")),
                    0
                  ),
                  "totalAmount",
                ],
              ],
              group: ["employee_id"],
              where: {
                [Op.and]: [
                  { sessionStart: { [Op.gte]: startDate } },
                  { sessionStart: { [Op.lt]: endDate } },
                  { employeeId: employee.id },
                ],
              },
              plain: true,
            }).then((result) => {
              angryCount =
                result != null ? result.getDataValue("totalAmount") : 0;
            });
            employee.setDataValue("angryWarningCount", parseInt(angryCount));
            if(angryCount > 0){              
              empResults.push(employee);
            }
          }
        }
        empResults.sort(function (a, b) {
          if ((a.getDataValue("totalWarningSessions") - b.getDataValue("totalWarningSessions")) === 0){
            return (
              b.getDataValue("angryWarningCount") -
              a.getDataValue("angryWarningCount")
            );
          }
          return (b.getDataValue("totalWarningSessions") - a.getDataValue("totalWarningSessions"))
        });
        res.status(status.OK).send({
          success: true,
          message: parseInt(role) !== 3 ? employees : empResults,
        });
      } catch (error) {
        next(error);
      }
    },
  },

  view_one: {
    async get(req, res, next) {
      try {
        const employee = await models.Employee.findOne({
          attributes: [
            "id",
            "employeeCode",
            "email",
            "fullname",
            "phoneNumber",
            "roleId",
            "isDeleted",
            "createdAt",
            "updatedAt",
            "avatarUrl",
          ],
          where: {
            employeeCode: req.params.employeeCode,
          },
        });
        if (employee == null) {
          res.status(status.BAD_REQUEST).send({
            success: false,
            message: "Employee not found!",
          });
        }
        res.status(status.OK).send({
          success: true,
          message: employee,
        });
      } catch (error) {
        next(error);
      }
    },
  },

  set_subscription_status: {
    async put(req, res, next) {
      try {
        const employee = await models.Employee.findOne({
          attributes: ["is_subscribed"],
          where: {
            employeeCode: req.params.employeeCode,
          },
        });
        const newStatus = !employee.dataValues.is_subscribed;
        const result = await models.Employee.update(
          { isSubscribed: newStatus },
          {
            where: {
              employeeCode: req.params.employeeCode,
            },
          }
        );
        res.status(status.OK).send({
          success: true,
          message: result,
        });
      } catch (error) {
        next(error);
      }
    },
  },

  set_avail_status: {
    async delete(req, res, next) {
      try {
        const result = await models.Employee.update(
          { isDeleted: true },
          {
            where: {
              employeeCode: req.params.employeeCode,
            },
          }
        );
        res.status(status.OK).send({
          success: true,
          message: result,
        });
      } catch (error) {
        next(error);
      }
    },
  },

  update_avatar_url: {
    async put(req, res, next) {
      try {
        const newAvatarURL = req.body.avatarUrl;
        if (
          !newAvatarURL.includes("https://") &&
          !newAvatarURL.includes("http://")
        ) {
          res.status(status.OK).send({
            success: false,
            message: "Please input valid URL!",
          });
        } else {
          const result = await models.Employee.update(
            { avatarUrl: newAvatarURL },
            {
              where: {
                employeeCode: req.params.id,
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
  view_profile: {
    async get(req, res, next) {
      try {
        const token = req.headers.authorization.replace("Bearer ", "");
        const tokenDecoded = jwt.decode(token);
        models.Employee.findOne({
          attributes: { exclude: ["password", "role_id", "roleId"] },
          include: {
            model: models.Role,
            as: "Role",
          },
          where: { id: tokenDecoded.employeeId },
        }).then((employee) => {
          if (employee) {
            res.status(status.OK).send({
              success: true,
              message: employee,
            });
          } else {
            throw new DefaultError(status.NOT_FOUND, "Employee not found.");
          }
        });
      } catch (error) {
        next(error);
      }
    },
  },
  suspend: {
    async post(req, res, next) {
      try {
        const employeeCode = req.params.employeeCode
        const { reason, expiration } = req.body
        const employee = await models.Employee.findOne({
          where: {
            employeeCode: employeeCode
          }
        })
        if(!employee){
          res.status(status.OK).send({
            success: false,
            message: "Employee Code is not found!",
          });
          return
        }
        let result = await models.Suspension.create(
          {
            employeeId: employee.id,
            reason: reason,
            expiredOn: expiration
          })
        res.status(status.CREATED).send({
          success: true,
          message: result ? 1 : 0,
        });
      } catch (error) {
        next(error);
      }
    },
  },
  update_suspension: {
    async put(req, res, next) {
      try {
        const { reason, expiration, id } = req.body
        const employeeCode = req.params.employeeCode
        const employee = await models.Employee.findOne({
          where: {
            employeeCode: employeeCode
          }
        })
        if(!employee){
          res.status(status.OK).send({
            success: false,
            message: "Employee Code is not found!",
          });
          return
        }
        let result = await models.Suspension.bulkCreate([
          {
            id: id,
            employeeId: employee.id,
            reason: reason,
            expiredOn: expiration
          }],
          { updateOnDuplicate: ["reason", "expiration", "employeeId", "updatedAt"] })
        res.status(status.ACCEPTED).send({
          success: true,
          message: result ? 1 : 0,
        });
      } catch (error) {
        next(error);
      }
    },
  },
  delete_suspension: {
    async delete(req, res, next) {
      try {
        const suspensionId = req.params.suspensionId
        const employeeCode = req.params.employeeCode
        const employee = await models.Employee.findOne({
          where: {
            employeeCode: employeeCode
          }
        })
        const suspension = await models.Suspension.findOne({
          where: {
            id: suspensionId
          }
        })
        if(! suspension){
          res.status(status.BAD_REQUEST).send({
            success: false,
            message: "Suspension is not found!",
          });
          return
        }
        if(!employee){
          res.status(status.BAD_REQUEST).send({
            success: false,
            message: "Employee Code is not found!",
          });
          return
        }
        let result = await models.Suspension.bulkCreate([
          {
            id: suspensionId,
            employeeId: employee.id,
            expiredOn: suspension.expiredOn,
            isDeleted: SuspensionStatus.DELETED
          }],
          { updateOnDuplicate: ["isDeleted", "employeeId", "updatedAt"] })
        res.status(status.ACCEPTED).send({
          success: true,
          message: result ? 1 : 0,
        });
      } catch (error) {
        next(error);
      }
    },
  },
};
