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
        const user = await models.User.findOne({
          where: {
            employeeCode: req.body.employeeCode,
          },
          include: [{
            model: models.Role, as: "Role"
          }],
          attributes: ['id','employeeCode', 'password', 'roleId'],
        });
        if (!user) throw new DefaultError(status.BAD_REQUEST, 'Invalid employeeCode or password');
        const isValidPassword = bcrypt.compareSync(req.body.password, user.password);
        if (!isValidPassword) throw new DefaultError(status.BAD_REQUEST, 'Invalid employeeCode or password');
        const { id: userId, employeeCode, roleName = user.Role.roleName } = user;
        const token = jwt.sign({ userId, employeeCode, roleName }, JWT_SECRET);
        return res.status(status.OK).send({
          status: true,
          message: {
            "employeeCode": user.employeeCode,
            "roleName": user.Role.roleName,
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
        let path =
          __basedir + "/" + req.file.filename;
        await readXlsxFile(path).then((rows) => {
          // skip header
          rows.shift();
          let users = [];
          rows.forEach((row) => {
            let user = {
              employeeCode: row[1],
              password: "password",
              email: row[2],
              fullname: row[3],
              phoneNumber: row[4],
              roleId: 2,
            };
            users.push(user);
          });
          models.User.bulkCreate(users)
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
        const { email, employeeCode, password, confirmPassword } = req.body;
        const duplicateUser = await models.User.findOne({
          where: { employeeCode },
          attributes: ['employeeCode']
        });
        if (duplicateUser) {
          throw new DefaultError(status.BAD_REQUEST, 'This employeeCode is taken!');
        }

        if (!duplicateUser) {
          await models.User.create({
            email,
            employeeCode,
            password,
            roleId: 2,
          });
          res.status(status.CREATED).send({
            status: true,
            message: 'Register successful.',
          });
        }
      } catch (error) {
        next(error);
      }
    },
  },
  // Private Routes
  profile: {
    async get(req, res, next) {
      try {
        const user = await models.User.findOne({
          where: {
            employeeCode: req.params.employeeCode,
          },
        });
        if (!user) throw new DefaultError(status.BAD_REQUEST, 'Invalid user');
        return res.status(status.OK).send({
          status: true,
          user
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

        const users = await models.User.findAll({
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
            message: users,
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
        const user = await models.User.findOne({
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
        if (user == null) {
          res.status(status.BAD_REQUEST)
            .send({
              status: false,
              message: "User not found!",
            });
        }
        res.status(status.OK)
          .send({
            status: true,
            message: user,
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
        const user = await models.User.findOne({
          attributes: [
            'is_subscribed',
          ],
          where: {
            employeeCode: req.params.employeeCode
          }
        },
        );
        const newStatus = !user.dataValues.is_subscribed;
        const result = await models.User.update(
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
        const result = await models.User.update(
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
          const result = await models.User.update(
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
};