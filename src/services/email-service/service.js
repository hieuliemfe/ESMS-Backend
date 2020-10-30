'use strict'

import nodemailer from 'nodemailer';
import path from 'path';
import ejs from 'ejs';
import { mailContentsConfig, mailClosingsConfig, setAppointmentDate } from './contentConfig';
const emailTemplate = path.join(__dirname + "/../src/services/email-service/templates/template.ejs");

export const createEmail = async (employee, type, appoinmentDate) => {
  let email;
  switch (type.toLowerCase()) {
    case 'cheering': {
      email = await ejs.renderFile(emailTemplate, {
        fullname: employee.fullname,
        content: mailContentsConfig.CHEERING_CONTENT,
        closing: mailClosingsConfig.CHERRING_CLOSING,
        regard: mailContentsConfig.REGARD,
      });
      break;
    }
    case 'appointment': {
      email = await ejs.renderFile(emailTemplate, {
        fullname: employee.fullname,
        content: mailContentsConfig.MAKE_APPOINTMENT_CONTENT + setAppointmentDate(appoinmentDate),
        closing: mailClosingsConfig.MAKE_APPOINTMENT_CLOSING,
        regard: mailContentsConfig.REGARD,
      });
      break;
    }
    case 'day_off': {
      email = await ejs.renderFile(emailTemplate, {
        fullname: employee.fullname,
        content: mailContentsConfig.DAY_OFF_CONTENT,
        closing: mailClosingsConfig.DAY_OFF_CLOSING,
        regard: mailContentsConfig.REGARD,
      });
      break;
    }
  }
  return email;
};

export const sendEmail = (email, receiverEmail) => {
  let transporter = nodemailer.createTransport({
    host: process.env.EMAIL_SERVICE_HOST,
    port: process.env.EMAIL_SERVICE_PORT,
    auth: {
      user: process.env.EMAIL_SERVICE_USERNAME,
      pass: process.env.EMAIL_SERVICE_PASSWORD
    }
  });
  const message = {
    from: process.env.EMAIL_SERVICE_SENDER, // Sender address
    to: receiverEmail,         // List of recipients
    subject: "[ESMS Team] Notice regarding your performance", // Subject line
    //text: "heelo world",
    html: email // Plain text body
  };
  return new Promise((resolve, reject) => {
    transporter.sendMail(message, (error, info) => {
      if (error) {
        console.log("error is " + error);
        resolve(false);
      } else {
        console.log("info is " + info.response);
        resolve(true);
      }
    });
  })


}


