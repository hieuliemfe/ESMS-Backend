'use strict';
import { query } from "express-validator";
import models from '../db/models/index';
import status from 'http-status';
import url from 'url';

export default {

    view: {
        async get(req, res, next) {
            try {
                //Data from request
                const queryData = url.parse(req.url, true).query;
                var query = queryData.query;
                var whereCondition
                //Validate data from request
                if (query == undefined) {
                    query = '';
                    whereCondition = null
                } else {
                    whereCondition = {
                        employeeCode: query
                    }
                }
                if (queryData.order == undefined) {
                    queryData.order = 'created_at,asc'
                }
                const orderOptions = queryData.order.split(",");
                const tasks = await models.Task.findAll({
                    include: [{
                        model: models.Employee,
                        attributes: [],
                        where: whereCondition,
                        as: 'Employee'
                    }],
                    order: [
                        [orderOptions[0], orderOptions[1]],
                    ],
                    raw: false,
                    distinct: true,
                });
                res.status(status.OK)
                    .send({
                        status: true,
                        message: tasks,
                    });
            } catch
            (error) {
                next(error);
            }
        }
    },
};
