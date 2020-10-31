'use strict';

import models from '../db/models/index';
import status from 'http-status';
import { createEmail, sendEmail } from '../services/email-service/service'
import { mailTypes } from '../services/email-service/contentConfig'
export default {

  send_action_email: {
    async post(req, res, next) {
      try {
        const { type, employeeCode, date } = req.body;
        if (type == undefined || employeeCode == undefined) {
          res.status(status.EXPECTATION_FAILED).send({
            success: false,
            message: "Must input type type AND employeeCode"
          })
        } else if (type != mailTypes.CHEERING && type != mailTypes.DAY_OFF && type != mailTypes.MAKE_APPOINTMENT) {
          res.status(status.EXPECTATION_FAILED).send({
            success: false,
            message: "Invalid mail type. Only use: " + "(" + mailTypes.CHEERING + "|" + mailTypes.DAY_OFF + "|" + mailTypes.MAKE_APPOINTMENT + ")"
          })
        } else if (type.toLowerCase() == mailTypes.MAKE_APPOINTMENT && date == undefined) {
          res.status(status.EXPECTATION_FAILED).send({
            success: false,
            message: "Must input appointment date for appoiment email type."
          })
        } else {
          const employee = await models.Employee.findOne({
            where: {
              employeeCode: employeeCode
            },
          });
          if (!employee) {
            res.status(status.EXPECTATION_FAILED)
              .send({
                status: false,
                message: "Employee not found."
              })
          } else {
            const email = await createEmail(employee, type, date)
            const result = await sendEmail(email, employee.email);
            res.send({
              status: true,
              message: result
            })
          }
        }
      } catch (error) {
        next(error);
      }
    }
  },
};
