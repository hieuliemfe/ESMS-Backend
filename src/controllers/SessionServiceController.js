"use strict";

import models from "../db/models/index";
import status from "http-status";
import url from "url";
import { DefaultError } from "../utils/errorHandler";
import { sessionServiceStatus } from "../db/config/statusConfig";
export default {
  view: {
    async get(req, res, next) {
      try {
        //get sessionId from request
        const queryData = url.parse(req.url, true).query;
        var query = queryData.query;
        var whereCondition;
        //Validate data from request
        if (query == undefined) {
          query = "";
          whereCondition = null;
        } else {
          whereCondition = {
            session_id: query,
          };
        }
        if (queryData.order == undefined) {
          queryData.order = "created_at,asc";
        }
        const orderOptions = queryData.order.split(",");
        const services = await models.SessionService.findOne({
          include: [
            {
              model: models.Session,
              as: "Session",
            },
            {
              model: models.Service,
              as: "Service",
            },
          ],
          where: whereCondition,
          order: [[orderOptions[0], orderOptions[1]]],
        });
        res.status(status.OK).send({
          success: true,
          message: services,
        });
      } catch (error) {
        next(error);
      }
    },
  },

  assign_service: {
    async post(req, res, next) {
      try {
        models.SessionService.create({
          statusId: sessionServiceStatus.ASSIGNED,
          sessionId: req.body.sessionId,
          serviceId: req.body.serviceId,
        }).then((sessionService, err) => {
          res.send({
            success: true,
            message: { id: sessionService.id },
          });
        });
      } catch (error) {
        next(error);
      }
    },
  },

  update_status: {
    async put(req, res, next) {
      try {
        models.SessionService.update(
          {
            statusId: req.body.statusId,
          },
          {
            where: {
              id: req.params.sessionServiceId,
            },
          }
        ).then((result, err) => {
          if (!err) {
            res.send({
              success: true,
              message: result,
            });
          }
        });
      } catch (error) {
        next(error);
      }
    },
  },

  delete: {
    async delete(req, res, next) {
      try {
        models.SessionService.destroy({
          where: {
            id: req.params.sessionServiceId,
          },
        }).then((result, err) => {
          if (!err) {
            res.send({
              success: true,
              message: result,
            });
          }
        });
      } catch (error) {
        next(error);
      }
    },
  },
};
