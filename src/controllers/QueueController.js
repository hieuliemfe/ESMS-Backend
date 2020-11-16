"use strict";

import { query } from "express-validator";
import models from "../db/models/index";
import status from "http-status";
import { Op } from "sequelize";
import jwt from "jsonwebtoken";
import Sequelize from "sequelize";
import counterCategory from "../db/models/counterCategory";

export default {
  view: {
    async get(req, res, next) {
      const token = req.headers.authorization.replace("Bearer ", "");
      const tokenDecoded = jwt.decode(token);
      await models.Employee.findOne({
        where: {
          id: tokenDecoded.employeeId,
        },
      }).then((employee) => {
        console.log(`COUNTERID : ${employee.counterId}`);
        models.CounterCategory.findAll({
          where: {
            counter_id: employee.counterId,
          },
        }).then((counterCategories) => {
          let categoryIds = [];
          counterCategories.forEach((counterCategory) => {
            categoryIds.push(counterCategory.categoryId);
          });
          console.log(`=====CounterCategory:${counterCategory.categoryId}`);
          models.Queue.findAll({
            include: [
              {
                model: models.Category,
                as: "Category",
                attributes: { exclude: ["createdAt", "updatedAt"] },
              },
              {
                model: models.Counter,
                as: "Counter",
              },
            ],
            where: {
              [Op.and]: [{ categoryId: categoryIds }, { counter_id: null }],
            },
            order: [["updatedAt", "asc"]],
            attributes: [
              "id",
              "number",
              "customerName",
              "createdAt",
              "updatedAt",
            ],
          }).then((queues) => {
            res.status(status.OK).send({
              success: true,
              message: queues,
            });
          });
        });
      });
    },
  },

  create: {
    async post(req, res, next) {
      try {
        models.Queue.count().then((count) => {
          models.Queue.create({
            categoryId: req.body.categoryId,
            customerName: req.body.customerName,
            number: count + 1,
          }).then((queue) => {
            res.status(status.OK).send({
              success: true,
              message: { id: queue.id },
            });
          });
        });
      } catch (error) {
        next(error);
      }
    },
  },

  assign_queue: {
    async post(req, res, next) {
      try {
        const { counterId, queueId } = req.body;
        models.Queue.update(
          {
            counter_id: counterId,
            updatedAt: new Date(),
          },
          {
            where: { id: queueId },
          }
        ).then((result) => {
          res.status(status.OK).send({
            success: true,
            message: result,
          });
        });
      } catch (error) {
        next(error);
      }
    },
  },
  delete: {
    async delete(req, res, next) {
      try {
        models.Queue.destroy({
          where: {
            id: req.params.queueId,
          },
        }).then((result) => {
          res.status(status.OK).send({
            success: true,
            message: result,
          });
        });
      } catch (error) {
        next(error);
      }
    },
  },
  sendBack: {
    async put(req, res, next) {
      try {
        models.Queue.findByPk(req.params.queueId).then(instance => {
          if(instance == null){
            res.status(status.OK).send({
              success: false,
              message: 'Id not found!',
            });
            return
          }
          instance.set('updatedAt', new Date())
          instance.changed('updatedAt', true)
          instance.save().then((result) => {
            console.log(result)
            res.status(status.OK).send({
              success: true,
              message: 1,
            });
          });
        });      
      } catch (error) {
        next(error);
      }
    },
  },
  delete_all: {
    async delete(req, res, next) {
      try {
        models.Queue.destroy({
          truncate: true,
        }).then((result) => {
          res.status(status.OK).send({
            success: true,
            message: result,
          });
        });
      } catch (error) {
        next(error);
      }
    },
  },
};
