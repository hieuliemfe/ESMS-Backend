"use strict";

import models from "../db/models/index";
import status from "http-status";
import { Op } from "sequelize";
import sequelize from "sequelize";
import { setEpochMillisTime } from "../utils/timeUtil";
import { SuspensionStatus } from "../db/config/statusConfig";
import path from 'path'
import { da } from "date-fns/locale";
const fs = require('fs');
const moment = require('moment-timezone');
function generateHr(doc, y) {
    doc
      .strokeColor("#aaaaaa")
      .lineWidth(1)
      .moveTo(50-10, y)
      .lineTo(760, y)
      .stroke();
  }
function generateTableRow( doc, y, c1, c2, c3, c4, c5, c6) {
    doc
        .fontSize(10)
        .text(c1, 50, y)
        .text(c2, 150, y)
        .text(c3, 280, y)
        .text(c4, 370, y)
        .text(c5, 480, y)
        .text(c6, 660, y)
    doc
        .strokeColor("#aaaaaa")
        .lineWidth(1)
        .moveTo(50-10, y-10)
        .lineTo(50-10, y+20)
        .stroke();
    doc
        .strokeColor("#aaaaaa")
        .lineWidth(1)
        .moveTo(150-10, y-10)
        .lineTo(150-10, y+20)
        .stroke();
    doc
        .strokeColor("#aaaaaa")
        .lineWidth(1)
        .moveTo(280-10, y-10)
        .lineTo(280-10, y+20)
        .stroke();
    doc
        .strokeColor("#aaaaaa")
        .lineWidth(1)
        .moveTo(370-10, y-10)
        .lineTo(370-10, y+20)
        .stroke();
    doc
        .strokeColor("#aaaaaa")
        .lineWidth(1)
        .moveTo(480-10, y-10)
        .lineTo(480-10, y+20)
        .stroke();
    doc
        .strokeColor("#aaaaaa")
        .lineWidth(1)
        .moveTo(660-10, y-10)
        .lineTo(660-10, y+20)
        .stroke();
    doc
        .strokeColor("#aaaaaa")
        .lineWidth(1)
        .moveTo(760, y-10)
        .lineTo(760, y+20)
        .stroke();
}
function generateInvoiceTable(doc, data, startDate, endDate) {
    let config = JSON.parse(fs.readFileSync(path.join(__dirname + '/../' + process.env.ACTION_CONFIG_PATH)))
    let i,
        invoiceTableTop = 180;
    doc
        .fontSize(11)
        .font("Helvetica-Bold")
        .text(`Time created: `, 50, invoiceTableTop - 60)
        .font("Helvetica")
        .text(moment().tz("Asia/Ho_Chi_Minh").format("DD/MM/YYYY at HH:mm:ss"), 130, invoiceTableTop - 60)
        .font("Helvetica-Bold")
        .text(`From date: `, 50, invoiceTableTop - 40)
        .font("Helvetica")
        .text(startDate, 130, invoiceTableTop - 40)
        .font("Helvetica-Bold")
        .text(`To date: `, 250, invoiceTableTop - 40)
        .font("Helvetica")
        .text(endDate, 330, invoiceTableTop - 40)
        .font("Helvetica-Bold")
        .text(`Acceptable Percentage of Warning session: `, 50, invoiceTableTop - 5)
        .font("Helvetica")
        .text(parseFloat(config.angry_percent_max)*100+'%', 300, invoiceTableTop - 5)

    doc.font("Helvetica-Bold")
    generateHr(doc, invoiceTableTop + 20);
    generateTableRow(
        doc,
        invoiceTableTop + 30,
        "Employee code",
        "Full name",
        "Total session",
        "Warning session",
        "Percentage of Warning session",
        "Note"
    );
    doc.font("Helvetica");
    generateHr(doc, invoiceTableTop + 50);
    for (i = 0; i < data.length; i++) {
        const position = invoiceTableTop + (i + 2) * 30;
        generateTableRow(
            doc,
            position,
            data[i].employeeCode,
            data[i].fullname,
            data[i].getDataValue("totalSession"),
            data[i].getDataValue("totalWarningSessions"),
            !isNaN(data[i].getDataValue("angrySessionPercent")) ? parseFloat(data[i].getDataValue("angrySessionPercent"))*100 +'%' : "-",
            data[i].getDataValue("angrySessionPercent") > config.angry_percent_max ? "Need for action" : "-"
        );
        generateHr(doc, position + 20);
    }
}
export default {
    view: {
        async get(req, res, next) {
            try {
                const type = req.query.type
                const startDate = req.query.startDate
                    ? req.query.startDate
                    // : setEpochMillisTime(0, 0, 0, 0, 0);
                    : new Date((new Date()).getTime() - (13*24*60*60*1000))
                const endDate = req.query.endDate ? req.query.endDate : new Date();
                const employees = await models.Employee.findAll({
                    attributes: { exclude: ["password", "role_id", "createdAt", "updatedAt", "counter_id", "counterId", "isSubscribed", "isDeleted"] },
                    // include: {
                    //     model: models.Suspension,
                    //     attributes: {
                    //         exclude: ["createdAt", "updatedAt", "employeeId", "employee_id"]
                    //     },
                    //     where: {
                    //         [Op.and]: [
                    //             { expiredOn: { [Op.gt]: new Date() } },
                    //             { isDeleted: SuspensionStatus.NOT_DELETED }
                    //         ]
                    //     },
                    //     as: "Suspensions",
                    //     required: false
                    // },
                    where: {
                        roleId: 3
                    },
                });
                var empResults = [];
                for (let i = 0; i < employees.length; i++) {
                    var employee = employees[i];
                    var angryCount = 0;
                    var totalWarningSessions = 0
                    var totalSession = 0
                    await models.Session.findAndCountAll({
                        where: {
                            [Op.and]: [
                                { sessionStart: { [Op.gte]: startDate } },
                                { sessionStart: { [Op.lt]: endDate } },
                                { employeeId: employee.id }
                            ]
                        }
                    }).then(result => {
                        totalSession = result.count
                    })
                    await models.Session.findAndCountAll({
                        where: {
                            [Op.and]: [
                                { sessionStart: { [Op.gte]: startDate } },
                                { sessionStart: { [Op.lt]: endDate } },
                                { employeeId: employee.id },
                                { angryWarningCount: { [Op.gt]: 0 } }
                            ]
                        }
                    }).then(result => {
                        totalWarningSessions = result.count
                    })
                    employee.setDataValue("totalWarningSessions", parseInt(totalWarningSessions));
                    employee.setDataValue("totalSession", parseInt(totalSession));
                    employee.setDataValue("angrySessionPercent", parseFloat(totalWarningSessions / totalSession))
                    await models.Session.findAll({
                        attributes: [
                            "employee_id",
                            [
                                sequelize.fn(
                                    "COALESCE",
                                    sequelize.fn("sum", sequelize.col("angry_warning_count")),
                                    0
                                ),
                                "totalAmount",
                            ],
                        ],
                        group: ["employee_id"],
                        where: {
                            [Op.and]: [
                                { sessionStart: { [Op.gte]: startDate } },
                                { sessionStart: { [Op.lt]: endDate } },
                                { employeeId: employee.id },
                            ],
                        },
                        plain: true,
                    }).then((result) => {
                        angryCount =
                            result != null ? result.getDataValue("totalAmount") : 0;
                    });
                    employee.setDataValue("angryWarningCount", parseInt(angryCount));
                    empResults.push(employee);

                }
                empResults.sort(function (a, b) {
                    if((a.getDataValue("angrySessionPercent")- b.getDataValue("angrySessionPercent"))===0) {
                        if ((a.getDataValue("totalWarningSessions") - b.getDataValue("totalWarningSessions")) === 0) {
                            return (
                                b.getDataValue("angryWarningCount") -
                                a.getDataValue("angryWarningCount")
                            );
                        }
                        return (b.getDataValue("totalWarningSessions") - a.getDataValue("totalWarningSessions"))
                    }
                    return (b.getDataValue("angrySessionPercent") - a.getDataValue("angrySessionPercent"))
                });
                if (type === 'json') {
                    res.status(status.OK).send({
                        success: true,
                        message: empResults,
                    });
                }
                if (type === 'pdf') {
                    const PDFDocument = require('pdfkit');
                    var myDoc = new PDFDocument({ bufferPages: true, size: [800, 842] });
                    let buffers = [];
                    myDoc.on('data', buffers.push.bind(buffers));
                    myDoc.on('end', () => {

                        let pdfData = Buffer.concat(buffers);
                        res.writeHead(200, {
                            'Content-Length': Buffer.byteLength(pdfData),
                            'Content-Type': 'application/pdf',
                            'Content-disposition': 'attachment;filename=report.pdf',
                        })
                            .end(pdfData);

                    });

                    myDoc.font('Times-Roman')
                        .fontSize(24)
                        .text(`Employee Status Report`, { align: 'center' });
                    generateInvoiceTable(myDoc, empResults, moment(startDate).tz("Asia/Ho_Chi_Minh").format("DD/MM/YYYY"), moment(endDate).tz("Asia/Ho_Chi_Minh").format("DD/MM/YYYY"));
                    myDoc.end();
                }

            } catch (error) {
                next(error);
            }
        },
    }
};