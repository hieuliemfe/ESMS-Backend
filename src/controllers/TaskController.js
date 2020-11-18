"use strict";

import models from "../db/models/index";
import status from "http-status";
import db from "../db/models/index";
import { Op } from "sequelize";
export default {
    view_all:{
        async get(req, res, next) {
            try {
                let result = await models.Task.findAll({
                    attributes: {
                        exclude: ["createdAt", "updatedAt", "category_id"]
                    }
                })
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
                const categoryId = req.params.categoryId
                const category = await models.Category.findByPk(categoryId)
                if(!category){
                    res.status(status.BAD_REQUEST).send({
                        success: false,
                        message: "Category Id is not found",
                    });
                    return
                }
                const tasks = req.body.tasks
                let result = await models.Task.bulkCreate(tasks)
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
                const { tasks } = req.body
                let result = await models.Task.bulkCreate(tasks, { updateOnDuplicate: ["categoryName", "subtitle", "updatedAt"] })
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
                let result = await queryInterface.bulkDelete('task', {id: {[Op.in]: ids}})
                res.status(status.OK).send({
                success: true,
                message: result[0].affectedRows,
                });
            } catch (error) {
            console.log(`----------------${error}`)
            next(error);
            }
        },
    }
};