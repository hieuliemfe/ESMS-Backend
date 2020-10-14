'use strict';

import models from '../db/models/index';
import status from 'http-status';
import url from 'url';
import jwt from 'jsonwebtoken';
import { DefaultError } from '../utils/errorHandler';
export default {

    view: {
        async get(req, res, next) {
            try {
                //get sessionId from request
                const queryData = url.parse(req.url, true).query;
                var query = queryData.query;
                var whereCondition
                //Validate data from request
                if (query == undefined) {
                    query = '';
                    whereCondition = null
                } else {
                    whereCondition = {
                        session_id: query
                    }
                }
                if (queryData.order == undefined) {
                    queryData.order = 'created_at,asc'
                }
                const orderOptions = queryData.order.split(",");
                const tasks = await models.Task.findOne({
                    include: [{
                        model: models.Session,
                        as: 'Session',
                    }],
                    where: whereCondition,
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

    assign_task: {
        async post(req, res, next) {
            try {
                const token = req.headers.authorization.replace('Bearer ', '')
                const tokenDecoded = jwt.decode(token);
                models.Employee.findOne({
                    attributes: { exclude: ['password', 'role_id', 'roleId'] },
                    include: {
                        model: models.Role,
                        as: 'Role'
                    },
                    where: { id: tokenDecoded.employeeId }
                }).then(employee => {
                    if (employee) {
                        models.Queue.findOne({
                            where: {
                                id: req.body.queueId
                            }
                        }).then(queue => {
                            if (queue.statusId == 1) {
                                res.send({
                                    status: false,
                                    message: 'Queue is not assigned to any employee.',
                                });
                            } else {
                                models.Task.create({
                                    statusId: 2,
                                    session_id: req.body.sessionId,
                                    task_type_id: req.body.taskTypeId
                                }).then((task, err) => {
                                    if (!err) {
                                        models.Queue.update({
                                            statusId: 2
                                        },
                                            { where: { id: req.body.queueId } })
                                    }
                                    res.send({
                                        status: true,
                                        message: task.id,
                                    })
                                });
                            }
                        })
                    } else {
                        throw new DefaultError(status.NOT_FOUND, 'Employee not found.');
                    };
                })
            } catch (error) {
                next(error);
            }
        }
    },
    update_status: {
        async put(req, res, next) {
            try {
                models.Task.update({
                    statusId: req.body.statusId,

                },
                    {
                        where: {
                            id: req.body.taskId
                        }
                    }).then((result, err) => {
                        if (!err) {
                            res.send({
                                status: true,
                                message: 1,
                            });
                        }
                    })
            } catch (error) {
                next(error);
            }
        }
    },
};
