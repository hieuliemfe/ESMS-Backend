'use strict';
import models from '../db/models/index';
import status from 'http-status';
import jwt from 'jsonwebtoken';

export default {
    view_by_employee: {
        async get(req, res, next) {
            try {
                const token = req.headers.authorization.replace('Bearer ', '')
                const tokenDecoded = jwt.decode(token)

                const counter = await models.Counter.findAll({
                    include: [{
                        model: models.Employee,
                        
                        as: 'Employee',
                        where: { id: tokenDecoded.employeeId }
                    },
                    ],
                },
                );
                res.status(status.OK)
                    .send({
                        status: true,
                        message: counter,
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
                const counters = await models.Counter.findOne({
                    include: [{
                        //get all categories that counter is assigned.
                        model: models.Category,
                        attributes: {
                            include: ["categoryName"],
                            exclude: ["counter_category"]
                        },
                        as: "Category",
                        include: {
                            //get all queues that have the selected category.
                            model: models.Queue,
                            attributes: {
                                include: ["id", "number", "statusId", "categoryId", "createdAt", "updatedAt"],
                            },
                        }
                    }],
                    where: {
                        counterNumber: req.params.counterNumber
                    }
                });
                res.status(status.OK)
                    .send({
                        status: true,
                        message: counters,
                    });
            } catch (error) {
                next(error);
            }
        }
    },
};
