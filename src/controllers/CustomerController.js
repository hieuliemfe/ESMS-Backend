"use strict";

import models from "../db/models/index";
import status from "http-status";
import url from "url";
import { Op } from "sequelize";

export default {
  view: {
    async get(req, res, next) {
      try {
        //Data from request
        const queryData = url.parse(req.url, true).query;
        var query = queryData.query;

        //Validate data from request
        if (query == undefined) {
          query = "";
        }
        if (queryData.order == undefined) {
          queryData.order = "created_at,asc";
        }
        const orderOptions = queryData.order.split(",");
        const customers = await models.Customer.findAll({
          where: {
            [Op.or]: [
              { accountNumber: { [Op.like]: "%" + query + "%" } },
              { fullname: { [Op.like]: "%" + query + "%" } },
            ],
          },
          order: [[orderOptions[0], orderOptions[1]]],
          raw: false,
          distinct: true,
        });
        res.status(status.OK).send({
          success: true,
          message: customers,
        });
      } catch (error) {
        next(error);
      }
    },
  },
};
