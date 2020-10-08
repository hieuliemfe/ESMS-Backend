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
            username: req.body.username,
          },
          include: [{
            model: models.Role, as: "Role"
          }],
          attributes: ['username', 'password', 'roleId'],
        });
        if (!user) throw new DefaultError(status.BAD_REQUEST, 'Invalid Username or password');
        const isValidPassword = bcrypt.compareSync(req.body.password, user.password);
        if (!isValidPassword) throw new DefaultError(status.BAD_REQUEST, 'Invalid Username or password');
        const { id: userId, username, roleName = user.Role.roleName} = user;
        const token = jwt.sign({ userId, username,roleName }, JWT_SECRET);
        return res.status(status.OK).send({
          status: true,
          message: {
            "username": user.username,
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
              username: row[1],
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
  seed: {
    async post(req, res, next) {
      try {
        await models.Role.bulkCreate([
          {
            roleName: 'Admin',
            createdAt: new Date(),
            updatedAt: new Date()
          },
          {
            roleName: 'Manager',
            createdAt: new Date(),
            updatedAt: new Date()
          },
          {
            roleName: 'Employee',
            createdAt: new Date(),
            updatedAt: new Date()
          }

        ])
          .then((err) => {
            if (err) {
              console.error(err)
              return
            };
          });
          await models.Emotion.bulkCreate([
            {
              emotionName: 'Angry',
              createdAt: new Date(),
              updatedAt: new Date()
            },
            {
              emotionName: 'Disgusted',
              createdAt: new Date(),
              updatedAt: new Date()
            },
            {
              emotionName: 'Fearful',
              createdAt: new Date(),
              updatedAt: new Date()
            },
            {
              emotionName: 'Happy',
              createdAt: new Date(),
              updatedAt: new Date()
            },
            {
              emotionName: 'Neutral',
              createdAt: new Date(),
              updatedAt: new Date()
            },
            {
              emotionName: 'Sad',
              createdAt: new Date(),
              updatedAt: new Date()
            },
            {
              emotionName: 'Suprised',
              createdAt: new Date(),
              updatedAt: new Date()
            },
          ])
            .then((err) => {
              if (err) {
                console.error(err)
                return
              };
            });
        await models.User.bulkCreate(
          [
            {
              id: '468ab892-7518-4520-8243-db1c1b9607dd',
              username: 'AnhBui',
              fullname: 'Bui Nguyen Phuong Anh',
              password: 'password',
              email: 'space@potato.com',
              phoneNumber: '0123456789',
              isSubscribed: true,
              avatarUrl: 'https://firebasestorage.googleapis.com/v0/b/facefood-41e90.appspot.com/o/avatars%2Favatar_mitsuki.jpg?alt=media&token=136252c1-b7fb-45ea-bf88-fc08923ede81',
              createdAt: new Date(),
              updatedAt: new Date(),
              roleId: 1
            },
            {
              id: 'bfad3537-875c-4bf2-bb97-41c00b912d76',
              username: 'Potato',
              fullname: 'Nguyen Van Anh',
              password: 'password',
              email: 'potato@potato.com',
              phoneNumber: '0987654321',
              isSubscribed: true,
              avatarUrl: 'https://firebasestorage.googleapis.com/v0/b/facefood-41e90.appspot.com/o/avatars%2Favatar_none.png?alt=media&token=99b44006-6136-4c11-8f8c-3f82d65483e6',
              createdAt: new Date(),
              updatedAt: new Date(),
              roleId: 2
            },
            {
              id: '9903c282-06ed-48fe-9607-76e7903f6b72',
              username: 'BinhPham',
              fullname: 'Pham Duc Binh',
              password: 'password',
              email: 'binh@pham.com',
              phoneNumber: '0321456789',
              isSubscribed: true,
              avatarUrl: 'https://firebasestorage.googleapis.com/v0/b/facefood-41e90.appspot.com/o/avatars%2Favatar_binh.jpg?alt=media&token=57fb0d7f-4692-4560-b29c-5275e33d6ad6',
              createdAt: new Date(),
              updatedAt: new Date(),
              roleId: 1
            },
            {
              id: 'ef71e125-37b5-4a5f-87e1-fdda43a4ccb2',
              username: 'DucPhi',
              fullname: 'Phi Do Hong Duc',
              password: 'password',
              email: 'duc@phi.com',
              phoneNumber: '0456123789',
              isSubscribed: true,
              avatarUrl: 'https://firebasestorage.googleapis.com/v0/b/facefood-41e90.appspot.com/o/avatars%2Favatar_duc.jpg?alt=media&token=389bf32e-1e1d-4662-9875-914b424d74cf',
              createdAt: new Date(),
              updatedAt: new Date(),
              roleId: 1
            },
          ]
        )
          .then((err) => {
            if (err) {
              console.error(err)
              return
            };
          });
        res.status(200).send({
          status: true,
          message: 1
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
            username: req.params.username,
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
                { username: { [Op.like]: '%' + query + '%' } },
                { fullname: { [Op.like]: '%' + query + '%' } }
              ],
              role_id: roleID,
              is_deleted: isDeleted,
            }
          } else {
            //RoleID only
            whereCondition = {
              [Op.or]: [
                { username: { [Op.like]: '%' + query + '%' } },
                { fullname: { [Op.like]: '%' + query + '%' } }
              ],
              role_id: roleID,
            }
          }
        } else if (isDeleted == 'true' || isDeleted == 'false') {
          //isDeleted only
          whereCondition = {
            [Op.or]: [
              { username: { [Op.like]: '%' + query + '%' } },
              { fullname: { [Op.like]: '%' + query + '%' } }
            ],
            is_deleted: isDeleted,
          }
        } else {
          //username & fullname only
          whereCondition = {
            [Op.or]: [
              { username: { [Op.like]: '%' + query + '%' } },
              { fullname: { [Op.like]: '%' + query + '%' } }
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

  set_subscription_status: {
    async put(req, res, next) {
      try {
        const user = await models.User.findOne({
          attributes: [
            'is_subscribed',
          ],
          where: {
            id: req.params.id
          }
        },
        );
        const newStatus = !user.dataValues.is_subscribed;
        const result = await models.User.update(
          { isSubscribed: newStatus },
          {
            where: {
              id: req.params.id
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
              id: req.params.id
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
  update: {
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
                username: req.params.id
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
                username: req.params.id
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