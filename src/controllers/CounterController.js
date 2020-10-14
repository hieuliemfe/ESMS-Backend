'use strict';
import models from '../db/models/index';
import status from 'http-status';

export default {

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
