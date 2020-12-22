"use strict";
import { query } from "express-validator";
import models from "../db/models/index";
import status from "http-status";
import url from "url";
import db from "../db/models/index";
import { Op, Sequelize } from "sequelize";
const moment = require('moment-timezone');
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
  view: {
    async get(req, res, next) {
      try {
        const shiftTypes = await models.Shift.findAll({
          attributes: {
            exclude: ["createdAt", "updatedAt"],
          },
        });
        for (let i = 0; i < shiftTypes.length; i++) {
          var shiftStart = shiftTypes[i].getDataValue("shiftStart");
          var shiftEnd = shiftTypes[i].getDataValue("shiftEnd");
          shiftStart = new Date(
            "2020-02-02T" + shiftStart + ".000Z"
          ).toLocaleTimeString("en-US", {
            hour12: false,
            timeZone: "Asia/Ho_Chi_Minh",
          });
          shiftEnd = new Date(
            "2020-01-01T" + shiftEnd + ".000Z"
          ).toLocaleTimeString("en-US", {
            hour12: false,
            timeZone: "Asia/Ho_Chi_Minh",
          });
          shiftTypes[i].setDataValue("shiftStart", shiftStart);
          shiftTypes[i].setDataValue("shiftEnd", shiftEnd);
        }
        res.status(status.OK).send({
          success: true,
          message: shiftTypes,
        });
      } catch (error) {
        next(error);
      }
    },
  },
  create_bulk: {
    async post(req, res, next) {
      let shifts = []
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
            shifts.push({name: row[1], 
              shiftStart: moment.tz("2020-02-02 " +  String(row[2]).substring(0, 5), "Asia/Ho_Chi_Minh").utc().format("HH:mm:ss"), 
              shiftEnd: moment.tz("2020-02-02 " +  String(row[3]).substring(0, 5), "Asia/Ho_Chi_Minh").utc().format("HH:mm:ss")
            })
          }
        })
        
        
        if(shifts.length > 0){
          const result = await models.Shift.bulkCreate(shifts)
          if(result){
            result.forEach(element => {
              element.setDataValue("createdAt", undefined)
              element.setDataValue("updatedAt", undefined)
            });
            res.status(status.CREATED).send({
              success: true,
              message: { shifts: result.length },
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
      const shifts = req.body.shifts
      try {
        if(shifts.length > 0){
          for (let index = 0; index < shifts.length; index++) {
            shifts[index].shiftStart = moment.tz("2020-02-02 " +  shifts[index].shiftStart.substring(0, 5), "Asia/Ho_Chi_Minh").utc().format("HH:mm:ss")
            shifts[index].shiftEnd = moment.tz("2020-02-02 " +  shifts[index].shiftEnd.substring(0, 5), "Asia/Ho_Chi_Minh").utc().format("HH:mm:ss")      
          }
          const result = await models.Shift.bulkCreate(shifts, { updateOnDuplicate: ["name", "shiftStart", "shiftEnd", "updatedAt"] })
          if(result){
            result.forEach(element => {
              element.setDataValue("createdAt", undefined)
              element.setDataValue("updatedAt", undefined)
            });
            res.status(status.CREATED).send({
              success: true,
              message: { shifts: result.length },
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
          let result = await queryInterface.bulkDelete('shift', {id: {[Op.in]: ids}})
          res.status(status.OK).send({
            success: true,
            message: result[0].affectedRows,
          });
      } catch (error) {
        console.log(`----------------${error}`)
        next(error);
      }
    },
  },
};
