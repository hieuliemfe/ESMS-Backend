'use strict';

import models from '../db/models/index';
import status from 'http-status';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { Op } from "sequelize";
import url from 'url';
import { endOfWeek, endOfMonth, endOfYear, parseISO } from 'date-fns';
import readXlsxFile from "read-excel-file/node";
import { generateEmployeeInfo } from '../utils/employeeUtil';
import { DefaultError } from '../utils/errorHandler';
import publicRuntimeConfig from '../configurations';
import PeriodicityIds from '../db/config/periodicityConfig';
import { calculateShiftEmotionLevel, calculateStressLevel, getTypeWarning } from '../utils/emotionUtil'
import { setEpochMillisTime } from '../utils/timeUtil';
import { Readable } from 'stream';

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
          include: [{
            model: models.Role, as: "Role"
          }],
          attributes: ['id', 'employeeCode', 'password', 'roleId'],
        });
        if (!employee) throw new DefaultError(status.BAD_REQUEST, 'Invalid employeeCode or password');
        const isValidPassword = bcrypt.compareSync(req.body.password, employee.password);
        if (!isValidPassword) throw new DefaultError(status.BAD_REQUEST, 'Invalid employeeCode or password');
        const { id: employeeId, employeeCode, roleName = employee.Role.roleName } = employee;
        const token = jwt.sign({ employeeId, employeeCode, roleName }, JWT_SECRET);
        return res.status(status.OK).send({
          status: true,
          message: {
            "employeeCode": employee.employeeCode,
            "roleName": employee.Role.roleName,
          },
          token
        });
      } catch (error) {
        next(error);
      }
    }
  },
  bulk_register: {
    async post(req, res, next) {
      try {
        if (req.file == undefined) {
          return res.status(400).send("Please upload an excel file!");
        }
        const stream = Readable.from(req.file.buffer);
        await readXlsxFile(stream).then((rows) => {
          // skip header
          rows.shift();
          rows.forEach(async (row) => {
            //create employee
            let employee = await generateEmployeeInfo(row[1], row[3], row[2]);
            await models.Employee.create(employee);
          });
        });
        res.status(status.CREATED)
          .send({
            status: true,
            message: 1,
          });
      } catch (error) {
        next(error);
      }
    }
  },

  register: {
    async post(req, res, next) {
      try {
        const { fullname, roleId, phoneNumber, avatarUrl } = req.body;
        const employee = await generateEmployeeInfo(fullname, roleId, phoneNumber, avatarUrl);
        await models.Employee.create(employee);
        res.status(status.CREATED)
          .send({
            status: true,
            message: {
              "employeeCode": employee.employeeCode,
              "password": employee.password
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
        if (!employee) throw new DefaultError(status.BAD_REQUEST, 'Invalid employee');
        return res.status(status.OK).send({
          status: true,
          employee
        });
      } catch (error) {
        next(error);
      }
    }
  },

  view: {
    async get(req, res, next) {
      try {
        //Data from request
        const { employeeCode, fullname, duration } = req.query
        let startDate = req.query.startDate ? req.query.startDate : new Date().toISOString();
        let endDate;
        let result = [];
        let periodicityId = 0;
        //if query doesn't specify the time period
        if (duration != undefined) {
          switch (duration) {
            case 'daily': {
              endDate = new Date().setHours(23, 59, 0)
              periodicityId = PeriodicityIds.DAILY;
              break;
            }
            case 'weekly': {
              endDate = endOfWeek(parseISO(startDate));
              periodicityId = PeriodicityIds.WEEKLY;
              break;
            }
            case 'monthly': {
              endDate = endOfMonth(parseISO(startDate))
              periodicityId = PeriodicityIds.MONTHLY;
              break;
            }
            case 'yearly': {
              endDate = endOfYear(parseISO(startDate))
              periodicityId = PeriodicityIds.YEARLY;
              break;
            }
          }
        } else {
          endDate = req.query.endDate ? req.query.endDate : endOfWeek(parseISO(startDate))
          periodicityId = PeriodicityIds.WEEKLY
        }
        console.log(`===== STARTDATE:${startDate}`)
        console.log(`======ENDDATE:${endDate}`);
        const order = req.query.order ? req.query.order : 'created_at,asc'

        let whereEmployeeCondition = '';

        if (fullname || employeeCode != undefined) {
          whereEmployeeCondition = {
            [Op.or]: [
              { employeeCode: { [Op.like]: '%' + employeeCode + '%' } },
              { fullname: { [Op.like]: '%' + fullname + '%' } }
            ],
          }
        }
        const orderOptions = order.split(",");
        //employeeCode & fullname only
        const employees = await models.Employee.findAll({
          attributes: { exclude: ['password', 'role_id'] },
          where: whereEmployeeCondition,
          order: [
            [orderOptions[0], orderOptions[1]],
          ],
        });
        const shifts = await models.Shift.findAll({
          attributes: ['id', 'employee_id'],
          where: {
            [Op.and]: [
              {
                shiftStart: { [Op.gte]: startDate }
              },
              {
                shiftEnd: { [Op.lte]: endDate }
              },
            ],
          },
          include: [{
            model: models.Session,
            attributes: ['info', 'employee_id'],
            as: 'Session',
          }]
        })
        for (const employee of employees) {
          let employeeInactiveShifts = [];
          for (const shift of shifts) {
            if (shift.employee_id == employee.id) {
              employeeInactiveShifts.push(shift);
            }
          }
          if (employeeInactiveShifts.length > 0) {
            try {
              const suggestion = await calculateStressLevel(employeeInactiveShifts, periodicityId);
              const result = await calculateShiftEmotionLevel(employee, employeeInactiveShifts, periodicityId);
              employee.setDataValue('action', result.action);
              employee.setDataValue('report', result.report);
              employee.setDataValue('stressSuggestion', suggestion)
            } catch (error) {
              next(error);
            }
          }
          result.push(employee);
        }
        res.status(status.OK)
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
        const employee = await models.Employee.findOne({
          attributes: [
            'id',
            'employeeCode',
            'email',
            'fullname',
            'phoneNumber',
            'roleId',
            'isDeleted',
            'createdAt',
            'updatedAt',
            'avatarUrl'
          ],
          where: {
            employeeCode: req.params.employeeCode
          }
        },
        );
        if (employee == null) {
          res.status(status.BAD_REQUEST)
            .send({
              status: false,
              message: "Employee not found!",
            });
        }
        res.status(status.OK)
          .send({
            status: true,
            message: employee,
          });
      } catch
      (error) {
        next(error);
      }
    }
  },

  set_subscription_status: {
    async put(req, res, next) {
      try {
        const employee = await models.Employee.findOne({
          attributes: [
            'is_subscribed',
          ],
          where: {
            employeeCode: req.params.employeeCode
          }
        },
        );
        const newStatus = !employee.dataValues.is_subscribed;
        const result = await models.Employee.update(
          { isSubscribed: newStatus },
          {
            where: {
              employeeCode: req.params.employeeCode
            }
          }
        );
        res.status(status.OK)
          .send({
            success: true,
            message: result
          });
      } catch (error) {
        next(error)
      }
    }
  },

  set_avail_status: {
    async delete(req, res, next) {
      try {
        const result = await models.Employee.update(
          { isDeleted: true },
          {
            where: {
              employeeCode: req.params.employeeCode
            }
          }
        );
        res.status(status.OK)
          .send({
            success: true,
            message: result
          });
      } catch (error) {
        next(error)
      }
    }
  },

  update_avatar_url: {
    async put(req, res, next) {
      try {
        const newAvatarURL = req.body.avatarUrl;
        if (!newAvatarURL.includes('https://') && !newAvatarURL.includes('http://')) {
          res.status(status.OK)
            .send({
              success: false,
              message: "Please input valid URL!"
            });
        } else {
          const result = await models.Employee.update(
            { avatarUrl: newAvatarURL },
            {
              where: {
                employeeCode: req.params.id
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
  view_profile: {
    async get(req, res, next) {
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
            res.status(status.OK)
              .send({
                status: true,
                message: employee,
              });
          } else {
            throw new DefaultError(status.NOT_FOUND, 'Employee not found.');
          }
        })
      } catch (error) {
        next(error);
      }
    }
  },
};
