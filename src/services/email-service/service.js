'use strict'

import nodemailer from 'nodemailer';
import path from 'path';
import ejs from 'ejs';
import { mailContentsConfig, mailClosingsConfig, setAppointmentDate, setVideoFrame } from './contentConfig';
const emailTemplate = path.join(__dirname + "/../src/services/email-service/templates/template.ejs");

export const createEmail = async (employee, type, appoinmentDate, videoUrl, startDate) => {
  let email;
  switch (type.toLowerCase()) {
    case 'cheering': {
      email = await ejs.renderFile(emailTemplate, {
        fullname: employee.fullname,
        content: mailContentsConfig.CHEERING,
        closing: mailClosingsConfig.CHERRING,
        regard: mailContentsConfig.REGARD,
      });
      break;
    }
    case 'appointment': {
      email = await ejs.renderFile(emailTemplate, {
        fullname: employee.fullname,
        content: mailContentsConfig.MAKE_APPOINTMENT + setAppointmentDate(startDate) + "until: <br />" + setAppointmentDate(appoinmentDate),
        closing: mailClosingsConfig.MAKE_APPOINTMENT,
        regard: mailContentsConfig.REGARD,
      });
      break;
    }
    case 'suspension': {
      email = await ejs.renderFile(emailTemplate, {
        fullname: employee.fullname,
        content: mailContentsConfig.SUSPENSION + setAppointmentDate(appoinmentDate),
        closing: mailClosingsConfig.SUSPENSION,
        regard: mailContentsConfig.REGARD,
      });
      break;
    }
    case 'day_off': {
      email = await ejs.renderFile(emailTemplate, {
        fullname: employee.fullname,
        content: mailContentsConfig.DAY_OFF,
        closing: mailClosingsConfig.DAY_OFF,
        regard: mailContentsConfig.REGARD,
      });
      break;
    }
    case 'stress_relieving': {
      email = await ejs.renderFile(emailTemplate, {
        fullname: employee.fullname,
        content: mailContentsConfig.STRESS_RELIEVING + setVideoFrame(videoUrl),
        closing: mailClosingsConfig.STRESS_RELIEVING,
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
    },
    dkim: {
      domainName: 'esms-team.site',
      keySelector: 'default',
      privateKey: process.env.EMAIL_SERVICE_DKIM_KEY
    }
  });
  const message = {
    from: process.env.EMAIL_SERVICE_USERNAME, // Sender address
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


