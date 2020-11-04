'use strict';

import status from 'http-status';
import fs from 'fs';
import models from '../db/models/index';
import path from 'path';
import periodicityConfig from '../db/config/periodicityConfig';
export default {

  get_stress_criterias: {
    async get(req, res, next) {
      try {
        const stressCriteria = await models.StressCriteria.findAll()
        res.status(status.OK)
          .send({
            success: true,
            message: stressCriteria
          })
      } catch (error) {
        next(error)
      }
    }
  },

  create_stress_criteria: {
    async post(req, res, next) {
      try {
        const { condition, operator, comparingNumber } = req.body
        if (condition == undefined || condition.match("[a-zA-Z]") || operator == undefined || comparingNumber == undefined) {
          res.status(status.EXPECTATION_FAILED)
            .send({
              success: false,
              message: "Missing or invalid input."
            })
        } else {
          const result = models.StressCriteria.create({
            condition: condition,
            operator: operator,
            comparingNumber: comparingNumber
          })
          res.status(status.CREATED)
            .send({
              success: true,
              message: result
            })
        }
      } catch (error) {
        next(error)
      }
    }
  },

  update_stress_criteria: {
    async put(req, res, next) {
      try {
        const { criteriaId } = req.params;
        if (criteriaId == undefined) {
          res.status(status.EXPECTATION_FAILED)
            .send({
              success: false,
              message: "No criteriaID found."
            })
          return;
        }
        const { condition, operator, comparingNumber } = req.body
        if (condition == undefined || condition.match("[a-zA-Z]") || operator == undefined || comparingNumber == undefined) {
          res.status(status.EXPECTATION_FAILED)
            .send({
              success: false,
              message: "Missing or invalid input."
            })
        } else {
          const result = models.StressCriteria.update({
            condition: condition,
            operator: operator,
            comparingNumber: comparingNumber
          }, {
            where: {
              id: criteriaId
            }
          })
          res.status(status.CREATED)
            .send({
              success: true,
              message: result
            })
        }
      } catch (error) {
        next(error)
      }
    }
  },

  delete_stress_level: {
    async delete(req, res, next) {
      try {
        const { criteriaId } = req.params;
        if (criteriaId == undefined) {
          res.status(status.EXPECTATION_FAILED)
            .send({
              success: false,
              message: "No criteriaID found."
            })
          return;
        }
        const result = models.StressCriteria.destroy({
          where: {
            id: criteriaId
          }
        })
        res.status(status.OK)
          .send({
            success: true,
            message: result
          })
      } catch (error) {
        next(error)
      }
    }
  },

  get_negative_emotion_criterias: {
    async get(req, res, next) {
      let { periodicityId } = req.query;
      if (periodicityId == undefined) {
        periodicityId = periodicityConfig.WEEKLY
      }
      try {
        const negativeEmotionCriterias = await models.NegativeEmotionCriteria.findAll({
          include: [{
            model: models.NegativeEmotionAction,
            where: {
              periodicityId: periodicityId
            }
          }],
        })
        res.status(status.OK)
          .send({
            success: true,
            message: negativeEmotionCriterias
          })
      } catch (error) {
        next(error)
      }
    }
  },

  create_negative_emotion_criteria: {
    async post(req, res, next) {
      try {
        const { condition, operator, comparingNumber } = req.body
        if (condition == undefined || condition.match("[a-zA-Z]") || operator == undefined || comparingNumber == undefined) {
          res.status(status.EXPECTATION_FAILED)
            .send({
              success: false,
              message: "Missing or invalid input."
            })
        } else {
          const result = models.NegativeEmotionCriteria.create({
            condition: condition,
            operator: operator,
            comparingNumber: comparingNumber

          })
          res.status(status.CREATED)
            .send({
              success: true,
              message: result
            })
        }
      } catch (error) {
        next(error)
      }
    }
  },

  update_negative_emotion_criteria: {
    async put(req, res, next) {
      try {
        const { criteriaId } = req.params;
        if (criteriaId == undefined) {
          res.status(status.EXPECTATION_FAILED)
            .send({
              success: false,
              message: "No criteriaID found."
            })
          return;
        }
        const { condition, operator, comparingNumber } = req.body
        if (condition == undefined || condition.match("[a-zA-Z]") || operator == undefined || comparingNumber == undefined) {
          res.status(status.EXPECTATION_FAILED)
            .send({
              success: false,
              message: "Missing or invalid input."
            })
        } else {
          const result = models.NegativeEmotionCriteria.update({
            condition: condition,
            operator: operator,
            comparingNumber: comparingNumber
          }, {
            where: {
              id: criteriaId
            }
          })
          res.status(status.CREATED)
            .send({
              success: true,
              message: result
            })
        }
      } catch (error) {
        next(error)
      }
    }
  },

  delete_negative_emotion_criteria: {
    async delete(req, res, next) {
      try {
        const { criteriaId } = req.params;
        if (criteriaId == undefined) {
          res.status(status.EXPECTATION_FAILED)
            .send({
              success: false,
              message: "No criteriaID found."
            })
          return;
        }
        const result = models.NegativeEmotionCriteria.destroy({
          where: {
            id: criteriaId
          }
        })
        res.status(status.OK)
          .send({
            success: true,
            message: result
          })
      } catch (error) {
        next(error)
      }
    }
  },
};