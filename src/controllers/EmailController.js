'use strict';

const models = require('../db/models/index');
const status = require('http-status');
const emailService = require('../services/email-service/service.js');
module.exports = {

    send_email: {
        async post(req, res, next) {
            try {
                const user = await models.User.findOne({
                    where: {
                        email: req.body.email,
                    },
                });
                if (!user) throw new DefaultError(status.BAD_REQUEST, 'Invalid user');
                else {
                    const isSent = Promise.resolve(emailService.send(user.email));
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