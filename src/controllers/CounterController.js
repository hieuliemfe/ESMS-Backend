'use strict';
import { query } from "express-validator";
import models from '../db/models/index';
import status from 'http-status';
import url from 'url';

export default {

    view: {
        async get(req, res, next) {

            try {
                const counters = await models.Counter.findAll({
                    include: [{
                        model: models.Category,
                        as: "Category"
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
