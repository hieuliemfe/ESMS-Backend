'use strict';
import { query } from "express-validator";
import models from '../db/models/index';
import status from 'http-status';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { Op } from "sequelize";
import validationResult from 'express-validator';
import url from 'url';
import readXlsxFile from "read-excel-file/node";

import fs from 'fs';
import { DefaultError } from '../utils/errorHandler';
import publicRuntimeConfig from '../configurations';
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
        const currentDate = Date.now();
        let day = new Date(currentDate);

        if (req.file == undefined) {
          return res.status(400).send("Please upload an excel file!");
        }
        let path =
          __basedir + "/" + req.file.filename;
        await readXlsxFile(path).then((rows) => {

          // skip header
          rows.shift();
          let employees = [];
          rows.forEach((row) => {
            //Generate data:
            const fullnameArray = row[1].toString().split(" ");
            //employeeCode
            const employeeCode =
              fullnameArray[fullnameArray.length - 1]
              + fullnameArray[0]
              + day.getMinutes() + day.getSeconds()
            //email
            const email =
              fullnameArray[fullnameArray.length - 1].toLowerCase() + '.'
              + fullnameArray[0].toLowerCase()
              + day.getMinutes() + day.getSeconds()
              + "@mail.com";
            //password
            const password = Math.random().toString(36).slice(-8);
            let employee = {
              employeeCode: employeeCode,
              password: password,
              email: email,
              fullname: row[1],
              phoneNumber: row[2],
              roleId: row[3],
            };
            employees.push(employee);
          });
          models.Employee.bulkCreate(employees)
            .then(() => {
              fs.unlink(path, (err) => {
                if (err) {
                  console.error(err)
                  return
                }
              });
              res.status(200).send({
                status: true,
                message: "Uploaded the file successfully: " + req.file.originalname,
              });
            })
            .catch((error) => {
              res.status(500).send({
                status: false,
                message: "Fail to import data into database!",
                error: error.message,
              });
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
        const currentDate = Date.now();
        let day = new Date(currentDate);
        const { fullname, roleId, phoneNumber, avatarUrl } = req.body;
        //Generate data:
        const fullnameArray = fullname.split(" ");
        //employeeCode
        const employeeCode =
          fullnameArray[fullnameArray.length - 1]
          + fullnameArray[0]
          + day.getMinutes() + day.getSeconds()
        //email
        const email =
          fullnameArray[fullnameArray.length - 1].toLowerCase() + '.'
          + fullnameArray[0].toLowerCase()
          + day.getMinutes() + day.getSeconds()
          + "@mail.com";
        //password
        const password = Math.random().toString(36).slice(-8);
        await models.Employee.create({
          email,
          fullname,
          phoneNumber,
          avatarUrl,
          employeeCode,
          password,
          roleId,
        });
        res.status(status.CREATED).send({
          status: true,
          message: {
            "employeeCode": employeeCode,
            "password": password
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
        const queryData = url.parse(req.url, true).query;
        var query = queryData.query;
        const roleID = queryData.roleId;
        const isDeleted = queryData.isDeleted;
        var whereCondition;
        //Validate data from request
        if (query == undefined) {
          query = '';
        }
        if (queryData.order == undefined) {
          queryData.order = 'created_at,asc'
        }
        const orderOptions = queryData.order.split(",");

        if (roleID && roleID != '') {
          if (isDeleted == 'true' || isDeleted == 'false') {
            //RoleID + isDeleted
            whereCondition = {
              [Op.or]: [
                { employeeCode: { [Op.like]: '%' + query + '%' } },
                { fullname: { [Op.like]: '%' + query + '%' } }
              ],
              role_id: roleID,
              is_deleted: isDeleted,
            }
          } else {
            //RoleID only
            whereCondition = {
              [Op.or]: [
                { employeeCode: { [Op.like]: '%' + query + '%' } },
                { fullname: { [Op.like]: '%' + query + '%' } }
              ],
              role_id: roleID,
            }
          }
        } else if (isDeleted == 'true' || isDeleted == 'false') {
          //isDeleted only
          whereCondition = {
            [Op.or]: [
              { employeeCode: { [Op.like]: '%' + query + '%' } },
              { fullname: { [Op.like]: '%' + query + '%' } }
            ],
            is_deleted: isDeleted,
          }
        } else {
          //employeeCode & fullname only
          whereCondition = {
            [Op.or]: [
              { employeeCode: { [Op.like]: '%' + query + '%' } },
              { fullname: { [Op.like]: '%' + query + '%' } }
            ],
          }
        }

        const employees = await models.Employee.findAll({
          attributes: [
            'id',
            'employeeCode',
            'email',
            'fullname',
            'phoneNumber',
            'roleId',
            'isSubscribed',
            'isDeleted',
            'createdAt',
            'updatedAt',
            'avatarUrl'
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
            message: employees,
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
