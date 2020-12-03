"use strict";

import models from "../db/models/index";
import status from "http-status";
import db from "../db/models/index";
import { Op } from "sequelize";

export default {
  view_all: {
    async get(req, res, next) {
      try {
        const result = await models.Category.findAll({
          attributes: {
            exclude: ["createdAt", "updatedAt"]
          }
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
  bulk_delete: {
    async delete(req, res, next) {
      const queryInterface = db.sequelize.getQueryInterface();
      const ids = req.body.ids
      try {
          let result = await queryInterface.bulkDelete('category', {id: {[Op.in]: ids}})
          res.status(status.OK).send({
            success: true,
            message: result[0].affectedRows,
          });
      } catch (error) {
        console.log(`----------------${error}`)
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
          attributes: ["id", "counterId"],
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

  view_services_by_category_id: {
    async get(req, res, next) {
      try {
        const { categoryId } = req.params;
        const result = await models.Service.findAll({
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
