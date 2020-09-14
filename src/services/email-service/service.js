'use strict'
const fs = require('fs');
const nodemailer = require('nodemailer');
const emailServiceTemplate = __dirname + '/templates/template.html';

module.exports.send = function (receiverEmail) {
    fs.readFile(emailServiceTemplate, { encoding: 'utf-8' }, function (err, html) {
        if (err) {
            return err;
        } else {
            let transport = nodemailer.createTransport({
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
                subject: "Test nodemailer", // Subject line
                //text: "heelo world",
                html: html // Plain text body
            };
            transport.sendMail(message, function (err, info) {
                if (err) {
                    console.log(err);
                    return false;
                } else {
                    return true;
                }
            });
        }
    }
    )
};