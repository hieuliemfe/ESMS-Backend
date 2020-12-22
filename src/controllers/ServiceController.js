"use strict";

import models from "../db/models/index";
import status from "http-status";
import db from "../db/models/index";
import { Op } from "sequelize";
import stream from 'stream';
import readXlsxFile from "read-excel-file/node";
const { Duplex } = stream;

function bufferToStream(buffer) {
    const duplexStream = new Duplex();
    duplexStream.push(buffer);
    duplexStream.push(null);
    return duplexStream;
}
export default {
    view_all: {
        async get(req, res, next) {
            try {
                let result = await models.Service.findAll({
                    attributes: {
                        exclude: ["createdAt", "updatedAt", "category_id"]
                    }
                })
                res.status(status.OK).send({
                    success: true,
                    message: result,
                });
            } catch (error) {
                next(error);
            }
        },
    },
    bulk_create: {
        async post(req, res, next) {
            let services = []
            try {
                if (req.file == undefined) {
                    return res.status(400).send("Please upload an excel file!");
                }
                const stream = bufferToStream(req.file.buffer);
                await readXlsxFile(stream).then(async (rows) => {
                    // skip header
                    rows.shift();

                    for (let index = 0; index < rows.length; index++) {
                        let row = rows[index]
                        services.push({ name: row[1], code: row[2] })
                    }
                })
                if (services.length > 0) {
                    const result = await models.Service.bulkCreate(services)
                    if (result) {
                        result.forEach(element => {
                            element.setDataValue("createdAt", undefined)
                            element.setDataValue("updatedAt", undefined)
                        });
                        res.status(status.CREATED).send({
                            success: true,
                            message: { services: result },
                        });
                    }
                }
            } catch (error) {
                next(error);
            }
        },
    },
    update_bulk: {
        async put(req, res, next) {
            const services = req.body.services
            try {
                if (services.length > 0) {
                    for (let index = 0; index < services.length; index++) {
                        if(services[index].categoryId != null && services[index].categoryId != undefined){
                            let categoryId = services[index].categoryId
                            let category = await models.Category.findByPk(categoryId)
                            if (!category) {
                                res.status(status.BAD_REQUEST).send({
                                    success: false,
                                    message: "Category Id is not found",
                                });
                                return
                            }
                        }
                    }
                    const result = await models.Service.bulkCreate(services, { updateOnDuplicate: ["name", "code", "categoryId", "updatedAt"] })
                    if (result) {
                        result.forEach(element => {
                            element.setDataValue("createdAt", undefined)
                            element.setDataValue("updatedAt", undefined)
                        });
                        res.status(status.CREATED).send({
                            success: true,
                            message: { services: result.length },
                        });
                    }
                }
            } catch (error) {
                next(error);
            }
        },
    },
    bulk_delete: {
        async delete(req, res, next) {
            const queryInterface = db.sequelize.getQueryInterface();
            const ids = req.body.ids
            try {
                let result = await queryInterface.bulkDelete('service', { id: { [Op.in]: ids } })
                res.status(status.OK).send({
                    success: true,
                    message: result[0].affectedRows,
                });
            } catch (error) {
                console.log(`----------------${error}`)
                next(error);
            }
        },
    }
};