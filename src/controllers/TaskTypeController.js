'use strict';

import models from '../db/models/index';
import status from 'http-status';
import url from 'url';
import { DefaultError } from '../utils/errorHandler';
export default {

    view: {
        async get(req, res, next) {
            try {
                const { categoryId } = req.params
                let whereCondition;
                if (categoryId == '') {
                    whereCondition = null
                } else {
                    whereCondition = {
                        id: categoryId
                    }
                }
                await models.TaskType.findAll({
                    include: [{
                        model: models.Category,
                        as: 'Category',
                    }],
                    where: whereCondition,

                }).then(taskTypes => {
                    res.status(status.OK)
                        .send({
                            status: true,
                            message: taskTypes,
                        });
                })
            } catch
            (error) {
                next(error);
            }
        }
    },

};
