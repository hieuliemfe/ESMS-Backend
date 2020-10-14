'use strict';
import { query } from "express-validator";
import models from '../db/models/index';
import status from 'http-status';
import url from 'url';
import jwt from 'jsonwebtoken';
import sequelize from "sequelize";
export default {

    view: {
        async get(req, res, next) {

            try {
                const queues = await models.Queue.findAll({
                    include: [{
                        model: models.Status,
                        as: "Status"
                    },
                    {
                        model: models.Category,
                        as: "Category"
                    }
                    ],
                    attributes: ["id", "number", "createdAt", "updatedAt"]
                });
                res.status(status.OK)
                    .send({
                        status: true,
                        message: queues,
                    });
            } catch (error) {
                next(error);
            }
        }
    },

    create: {
        async post(req, res, next) {
            try {
                models.Queue.count().then(count => {
                    models.Queue.create({
                        statusId: 1,
                        categoryId: req.body.categoryId,
                        number: count + 1,
                    },
                    ).then(queue => {
                        res.status(status.OK)
                            .send({
                                status: true,
                                message: queue.id,
                            });
                    })
                })
            } catch (error) {
                next(error);
            }
        }
    },

    assign_queue: {
        async post(req, res, next) {
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
                        models.Queue.update({
                            employee_id: employee.id,
                            statusId: 2,
                            updatedAt: new Date(),
                        },
                            {
                                where: { id: req.body.queueId }
                            }
                        ).then(result => {
                            res.status(status.OK)
                                .send({
                                    status: true,
                                    message: result,
                                });
                        })
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
