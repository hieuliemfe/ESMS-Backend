'use strict';

import { query } from "express-validator";
import models from '../db/models/index';
import status from 'http-status';

export default {

    view: {
        async get(req, res, next) {

            try {
                const queues = await models.Queue.findAll({
                    include: [
                        {
                            model: models.Category,
                            as: "Category"
                        },
                        {
                            model: models.Counter,
                            as: "Counter"
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
                        categoryId: req.body.categoryId,
                        number: count + 1,
                    },
                    ).then(queue => {
                        res.status(status.OK)
                            .send({
                                status: true,
                                message: { id: queue.id },
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
                const { counterId, queueId } = req.body;
                models.Queue.update({
                    counter_id: counterId,
                    updatedAt: new Date(),
                },
                    {
                        where: { id: queueId }
                    }
                ).then(result => {
                    res.status(status.OK)
                        .send({
                            status: true,
                            message: result,
                        });
                })
            } catch (error) {
                next(error);
            }
        }
    },
    delete: {
        async delete(req, res, next) {
            try {
                models.Queue.destroy({
                    where: {
                        id: req.params.queueId
                    }
                },
                ).then(result => {
                    res.status(status.OK)
                        .send({
                            status: true,
                            message: result,
                        });
                })
            } catch (error) {
                next(error);
            }
        }
    },
    delete_all: {
        async delete(req, res, next) {
            try {
                models.Queue.destroy({
                    truncate: true
                },
                ).then(result => {
                    res.status(status.OK)
                        .send({
                            status: true,
                            message: result,
                        });
                })
            } catch (error) {
                next(error);
            }
        }
    },
};
