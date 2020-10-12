'use strict';

import models from '../db/models/index';
import status from 'http-status';
import { send as emailService } from '../services/email-service/service.js';
export default {

    send_email: {
        async post(req, res, next) {
            try {
                const employee = await models.Employee.findOne({
                    where: {
                        email: req.body.email,
                    },
                });
                if (!employee) throw new DefaultError(status.BAD_REQUEST, 'Invalid employee');
                else {
                    const isSent = Promise.resolve(emailService.send(employee.email));
                    if (isSent) {
                        res.status(status.OK)
                            .send({
                                status: true,
                                message: "OK",
                            });
                    } else {
                        res.status(status.OK)
                            .send({
                                status: false,
                                message: "Send failed",
                            });
                    }
                };
            } catch (error) {
                next(error);
            }
        }
    },

};