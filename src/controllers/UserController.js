'use strict';
import { query } from "express-validator";

const models = require('../db/models/index');
const status = require('http-status');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { Op } = require("sequelize");
const { validationResult } = require('express-validator');
const url = require('url');
const readXlsxFile = require("read-excel-file/node");
const emailService = require('../services/email-service/service.js');
const fs = require('fs');
import { DefaultError } from '../utils/errorHandler';
import { JWT_SECRET } from '../configurations';


module.exports = {
  // Public Routes
  login: {
    async post(req, res, next) {

      try {
        const user = await models.User.findOne({
          where: {
            username: req.body.username,
          },
          attributes: ['username', 'password', 'id'],
        });
        if (!user) throw new DefaultError(status.BAD_REQUEST, 'Invalid Username or password');
        const isValidPassword = bcrypt.compareSync(req.body.password, user.password);
        if (!isValidPassword) throw new DefaultError(status.BAD_REQUEST, 'Invalid Username or password');
        const { id: userId, username, roleName = 'admin' } = user;
        const token = jwt.sign({ userId, username, roleName }, JWT_SECRET);
        return res.status(status.OK).send({
          status: true,
          message: "Login successfully.",
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

          let employees = [];

          rows.forEach((row) => {
            let employee = {
              username: row[1],
              password: "password",
              email: row[2],
              fullname: row[3],
              phoneNumber: row[4],
              roleId: 2,
            };
            console.log("==================== USERNAME: " + employee.id);
            employees.push(employee);
          });

          models.User.bulkCreate(employees)
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
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          throw new DefaultError(status.BAD_REQUEST, 'Please enter valid values!', errors.array());
        }
        const { email, username, password, confirmPassword } = req.body;
        const duplicateUser = await models.User.findOne({
          where: { username },
          attributes: ['username']
        });
        if (duplicateUser) {
          throw new DefaultError(status.BAD_REQUEST, 'This username is taken!');
        }

        if (!duplicateUser) {
          await models.User.create({
            email,
            username,
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
            username: req.body.username,
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

  send_email: {
    async post(req, res, next) {
      try {
        const user = await models.User.findOne({
          where: {
            username: req.body.username,
          },
        });
        if (!user) throw new DefaultError(status.BAD_REQUEST, 'Invalid user');
        else {
          const isSent = Promise.resolve(emailService.send(user.email));
          if (isSent) {
            res.status(status.OK)
              .send({
                status: true,
                message: "OK",
              });
          } else {
            res.status(status.OK)
              .send({
                status: false,
                message: "Send failed",
              });
          }
        };

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
                { username: { [Op.iLike]: '%' + query + '%' } },
                { fullname: { [Op.iLike]: '%' + query + '%' } }
              ],
              role_id: roleID,
              is_deleted: isDeleted,
            }
          } else {
            //RoleID only
            whereCondition = {
              [Op.or]: [
                { username: { [Op.iLike]: '%' + query + '%' } },
                { fullname: { [Op.iLike]: '%' + query + '%' } }
              ],
              role_id: roleID,
            }
          }
        } else if (isDeleted == 'true' || isDeleted == 'false') {
          //isDeleted only
          whereCondition = {
            [Op.or]: [
              { username: { [Op.iLike]: '%' + query + '%' } },
              { fullname: { [Op.iLike]: '%' + query + '%' } }
            ],
            is_deleted: isDeleted,
          }
        } else {
          //username & fullname only
          whereCondition = {
            [Op.or]: [
              { username: { [Op.iLike]: '%' + query + '%' } },
              { fullname: { [Op.iLike]: '%' + query + '%' } }
            ],
          }
        }

        const users = await models.User.findAll({
          attributes: [
            'id',
            'username',
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
            'username',
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
            username: req.params.username
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

  set_avail_status: {
    async put(req, res, next) {
      try {
        const user = await models.User.findOne({
          attributes: [
            'is_deleted',
          ],
          where: {
            username: req.params.username
          }
        },
        );
        const newStatus = !user.dataValues.is_deleted;
        const result = await models.User.update(
          { isDeleted: newStatus },
          {
            where: {
              username: req.params.username
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

  set_subscription_status: {
    async put(req, res, next) {
      try {
        const user = await models.User.findOne({
          attributes: [
            'is_subscribed',
          ],
          where: {
            username: req.params.username
          }
        },
        );
        const newStatus = !user.dataValues.is_subscribed;
        const result = await models.User.update(
          { isSubscribed: newStatus },
          {
            where: {
              username: req.params.username
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
        const queryData = url.parse(req.url, false).query;
        const newAvatarURL = queryData;
        if (!newAvatarURL.includes('https://')) {
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
                username: req.params.username
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
  update_fullname: {
    async put(req, res, next) {
      try {
        const queryData = url.parse(req.url, true).query;
        const newFullname = queryData.value;
        if (newFullname == undefined || newFullname.trim() == '') {
          res.status(status.OK)
            .send({
              success: false,
              message: "Please input fullname!"
            });
        } else {
          const result = await models.User.update(
            { fullname: newFullname },
            {
              where: {
                username: req.params.username
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
        res.status(status.OK)
          .send({
            success: false,
            message: error
          });
      }
    }
  },
};