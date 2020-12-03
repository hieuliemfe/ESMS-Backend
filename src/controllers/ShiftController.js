"use strict";
import { query } from "express-validator";
import models from "../db/models/index";
import status from "http-status";
import url from "url";

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
};
