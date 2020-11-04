'use strict';

import status from 'http-status';
import fs from 'fs';
import models from '../db/models/index';
import path from 'path';
export default {

  get_stress_levels: {
    async get(req, res, next) {
      try {
        res.status(status.OK)
          .send({
            success: true,
            message: stressLevelsConfig.stress_levels
          })
      } catch (error) {
        next(error)
      }
    }
  },

  create_stress_level: {
    async post(req, res, next) {
      try {
        let result;
        let newLevel;
        const { value, description, link } = req.body
        if (value == undefined || description == undefined) {
          res.status(status.EXPECTATION_FAILED)
            .send({
              success: false,
              message: "Missing field(s) found."
            })
        } else {
          result = stressLevelsConfig;
          newLevel = {
            id: result.stress_levels.length + 1,
            value: value,
            description: description,
            link: link,
          }
          result.stress_levels.push(newLevel);
          result.stress_levels.sort((a, b) => parseFloat(a.value) - parseFloat(b.value));
          res.status(status.OK)
            .send({
              success: true,
              message: stressLevelsConfig
            })
        }
      } catch (error) {
        next(error)
      }
    }
  },

  update_stress_level: {
    async put(req, res, next) {
      try {
        let result;
        const { stressLevelId } = req.params;
        const { value, description, link } = req.body
        if (stressLevelId == undefined) {
          res.status(status.EXPECTATION_FAILED)
            .send({
              success: false,
              message: "Must input at least one stress level."
            })
        } else {
          result = stressLevelsConfig;
          result.stress_levels.forEach(config => {
            if (config.id == stressLevelId) {
              config.description = description,
                config.link = link,
                config.value = value
            }
          })
          result.stress_levels.sort((a, b) => parseFloat(a.value) - parseFloat(b.value));
          fs.writeFile(path.resolve('./src/configurations/stressLevels.json'), JSON.stringify(result), (err) => {
            res.status(status.OK)
              .send({
                success: true,
                message: stressLevelsConfig
              })
          });
        }
      } catch (error) {
        next(error)
      }
    }
  },

  delete_stress_level: {
    async delete(req, res, next) {
      try {
        let result;
        const { stressLevelId } = req.params;
        if (stressLevelId == undefined) {
          res.status(status.EXPECTATION_FAILED)
            .send({
              success: false,
              message: "Must input at least one stress level."
            })
        } else {
          result = stressLevelsConfig;
          for (var i = 0; i < result.stress_levels.length; i++) {
            if (result.stress_levels[i].id == stressLevelId) {
              result.stress_levels.splice(i, 1);
            }
          }
          result.stress_levels.sort((a, b) => parseFloat(a.value) - parseFloat(b.value));
          fs.writeFile(path.resolve('./src/configurations/stressLevels.json'), JSON.stringify(result), (err) => {
            res.status(status.OK)
              .send({
                success: true,
                message: stressLevelsConfig
              })
          });
        }
      } catch (error) {
        next(error)
      }
    }
  },

  get_negative_emotion_criterias: {
    async get(req, res, next) {
      try {
        const negativeEmotionCriterias = await models.NegativeEmotionCriteria.findAll()
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