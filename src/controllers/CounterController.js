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
                const shift = await models.Shift.findOne({
                    where:
                    {
                        [Op.and]: [
                            { shiftStart: { [Op.lte]: currentDate } },
                            { shiftEnd: { [Op.gte]: currentDate } },
                            { employee_id: tokenDecoded.employeeId }
                        ]
                    }
                })
                res.status(status.OK)
                    .send({
                        status: true,
                        message: shift,
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
