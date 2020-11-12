'use strict';
import { query } from "express-validator";
import models from '../db/models/index';
import status from 'http-status';
import url from 'url';

export default {

    view: {
        async get(req, res, next) {

            try {
                const shiftTypes = await models.ShiftType.findAll({
                });
                res.status(status.OK)
                    .send({
                        status: true,
                        message: shiftTypes,
                    });
            } catch (error) {
                next(error);
            }
        }
    },
};
