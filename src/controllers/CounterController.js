"use strict";

import models from "../db/models/index";
import status from "http-status";
import jwt from "jsonwebtoken";
import { Op, Sequelize } from "sequelize";
import db from "../db/models/index";

export default {
  view: {
    async get(req, res, next) {
      try {
        //get all counters
        const id = parseInt(req.params.id)
        if(id){
          const counter = await models.Counter.findOne({
            attributes: { exclude: ["createdAt", "updatedAt"] },
            where: { id: id},
          });
          const categoriesResult = await models.CounterCategory.findAll({
            include: [
              {
                model: models.Category,
                attributes: { exclude: ["createdAt", "updatedAt"] },
                include: [
                  {
                    model: models.Service,
                    attributes: {
                      exclude: [
                        "createdAt",
                        "updatedAt",
                        "categoryId",
                        "category_id",
                      ],
                    },
                  },
                ],
                as: "Category",
              },
            ],
            where: {
              counterId: req.params.id,
            },
          }).then((results) => {
            let categories = [];
            results.forEach((element) => {
              categories.push(element.Category);
            });
            return categories;
          });
          counter.setDataValue("Categories", categoriesResult);
          res.status(status.OK).send({
            success: true,
            message: { counters: counter },
          });
        } else {
          const results = await models.Counter.findAll({
            attributes: {
              exclude: ["createdAt", "updatedAt"]
            }
          })
          res.status(status.OK).send({
            success: true,
            message: { counters: results },
          });
        }
      } catch (error) {
        next(error);
      }
    },
  },
  create_bulk: {
    async post(req, res, next) {
      const counters = req.body.counters
      try {
        if(counters.length > 0){
          const result = await models.Counter.bulkCreate(counters)
          if(result){
            result.forEach(element => {
              element.setDataValue("createdAt", undefined)
              element.setDataValue("updatedAt", undefined)
            });
            res.status(status.CREATED).send({
              success: true,
              message: { counters: result },
            });
          }
        }        
      } catch (error) {
        next(error);
      }
    },
  },
  update_bulk: {
    async put(req, res, next) {
      const counters = req.body.counters
      try {
        if(counters.length > 0){
          const result = await models.Counter.bulkCreate(counters, { updateOnDuplicate: ["name", "number", "updatedAt"] })
          if(result){
            result.forEach(element => {
              element.setDataValue("createdAt", undefined)
              element.setDataValue("updatedAt", undefined)
            });
            res.status(status.CREATED).send({
              success: true,
              message: { counters: result },
            });
          }
        }        
      } catch (error) {
        next(error);
      }
    },
  },
  update_counter_categories: {
    async put(req, res, next) {
      const counterId = req.params.id
      const ids = req.body.categoryIds
      try {
        console.log(counterId)
        console.log(ids)
        await models.CounterCategory.destroy({
          where: {
            counterId: counterId
          }
        })
        let count = 0
        for (let index = 0; index < ids.length; index++) {
          let result = await models.CounterCategory.create({counterId: counterId, categoryId: ids[index]})
          if(result){
            count++
          }
        }
        res.status(status.CREATED).send({
          success: true,
          message: count,
        });        
      } catch (error) {
        next(error);
      }
    },
  },
  delete_bulk: {
    async delete(req, res, next) {
      const queryInterface = db.sequelize.getQueryInterface();
      const ids = req.body.ids
      try {
          let result = await queryInterface.bulkDelete('counter', {id: {[Op.in]: ids}})
          console.log(`============${result}`)
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
};
