"use strict";

import models from "../db/models/index";
import status from "http-status";

export default {
  view_all: {
    async get(req, res, next) {
      try {
        const result = await models.Category.findAll();
        res.status(status.OK).send({
          success: true,
          message: result,
        });
      } catch (error) {
        next(error);
      }
    },
  },
  bulk_create: {
    async post(req, res, next) {
      try {
        const { categories } = req.body
        let result = await models.Category.bulkCreate(categories)
        if(result.length > 0){
          result.forEach(element => {
            element.setDataValue("createdAt", undefined)
            element.setDataValue("updatedAt", undefined)
          });
        }
        res.status(status.CREATED).send({
          success: true,
          message: result,
        });
      } catch (error) {
        next(error);
      }
    },
  },
  bulk_update: {
    async put(req, res, next) {
      try {
        const { categories } = req.body
        let result = await models.Category.bulkCreate(categories, { updateOnDuplicate: ["categoryName", "subtitle", "updatedAt"] })
        if(result.length > 0){
          result.forEach(element => {
            element.setDataValue("createdAt", undefined)
            element.setDataValue("updatedAt", undefined)
          });
        }
        res.status(status.CREATED).send({
          success: true,
          message: result,
        });
      } catch (error) {
        next(error);
      }
    },
  },
  view_by_counter_id: {
    async get(req, res, next) {
      try {
        const { counterId } = req.params;
        let whereCondition;
        if (counterId == "" || counterId == ",") {
          whereCondition = null;
        } else {
          whereCondition = {
            id: counterId,
          };
        }
        await models.CounterCategory.findAll({
          attributes: ["id", "counterId", "createdAt", "updatedAt"],
          include: [
            {
              model: models.Counter,
              attributes: [],
              as: "Counter",
              where: whereCondition,
            },
            {
              model: models.Category,
              as: "Category",
            },
          ],
          raw: false,
        }).then((CounterCategories) => {
          res.status(status.OK).send({
            success: true,
            message: CounterCategories,
          });
        });
      } catch (error) {
        next(error);
      }
    },
  },

  view_tasks_by_category_id: {
    async get(req, res, next) {
      try {
        const { categoryId } = req.params;
        const result = await models.Task.findAll({
          where: {
            categoryId: categoryId,
          },
        });
        res.status(status.OK).send({
          success: true,
          message: result,
        });
      } catch (error) {
        next(error);
      }
    },
  },
};
