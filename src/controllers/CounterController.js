'use strict';

import models from '../db/models/index';
import status from 'http-status';
import jwt from 'jsonwebtoken';
import { Op } from "sequelize";

export default {

  view_by_employee: {
    async get(req, res, next) {
      try {
        const token = req.headers.authorization.replace('Bearer ', '')
        const tokenDecoded = jwt.decode(token)
        const currentDate = Date.now();
        let day = new Date(currentDate);
        const employee = await models.Employee.findOne({
          where:
          {
            id: tokenDecoded.employeeId 
          }
        })
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
  view: {
    async get(req, res, next) {
      try {
        //get all counters
        const counter = await models.Counter.findOne({
          attributes: {exclude: ["createdAt", "updatedAt"]},
          where: {id: req.params.id}
        })
        const categoriesResult = await models.CounterCategory.findAll({
          include: [
            { model: models.Category, attributes: {exclude: ["createdAt", "updatedAt"]}, include: [ {model: models.Task, attributes: {exclude: ["createdAt", "updatedAt", "categoryId", "category_id"]}} ], as: "Category"}
          ],
          where: {
            counterId: req.params.id
          }
        }).then(results => {
          let categories = []
          results.forEach(element => {
            categories.push(element.Category)
          });
          return categories
        });
        counter.setDataValue('Category', categoriesResult)
        res.status(status.OK)
          .send({
            status: true,
            message: {"counter": counter},
          });
      } catch (error) {
        next(error);
      }
    }
  },
};
