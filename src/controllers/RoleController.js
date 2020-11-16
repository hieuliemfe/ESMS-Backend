"use strict";
import { query } from "express-validator";
import models from "../db/models/index";
import status from "http-status";
import url from "url";

export default {
  view: {
    async get(req, res, next) {
      try {
        const roles = await models.Role.findAll({});
        res.status(status.OK).send({
          success: true,
          message: roles,
        });
      } catch (error) {
        next(error);
      }
    },
  },
};
