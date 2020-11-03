'use strict';

import status from 'http-status';
import fs from 'fs';
import path from 'path';

import stressLevelsConfig from '../configurations/stressLevels.json';
import negativeLevelsConfig from '../configurations/negativeLevels.json';

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

  get_negative_levels: {
    async get(req, res, next) {
      try {
        res.status(status.OK)
          .send({
            success: true,
            message: negativeLevelsConfig.negative_emotion_levels
          })
      } catch (error) {
        next(error)
      }
    }
  },

  create_negative_level: {
    async post(req, res, next) {
      try {
        let result;
        let newLevel;
        const { value, limit, action } = req.body
        if (value == undefined || limit == undefined || action == undefined) {
          res.status(status.EXPECTATION_FAILED)
            .send({
              success: false,
              message: "Must input at least one negative level."
            })
        } else {
          result = negativeLevelsConfig;
          newLevel = {
            type: result.negative_emotion_levels.length + 1,
            value: value,
            limit: limit,
            action: action,
          }
          result.negative_emotion_levels.push(newLevel);
          result.negative_emotion_levels.sort((a, b) => parseFloat(b.value) - parseFloat(a.value));
          fs.writeFile(path.resolve('./src/configurations/negativeLevels.json'), JSON.stringify(result), (err) => {
            res.status(status.OK)
              .send({
                success: true,
                message: negativeLevelsConfig
              })
          });
        }
      } catch (error) {
        next(error)
      }
    }
  },

  update_negative_level: {
    async put(req, res, next) {
      try {
        let result;
        const { negativeLevelType } = req.params;
        const { value, limit, action } = req.body
        if (negativeLevelType == undefined) {
          res.status(status.EXPECTATION_FAILED)
            .send({
              success: false,
              message: "Must input at least one negative level."
            })
        } else {
          result = negativeLevelsConfig;
          result.negative_emotion_levels.forEach(config => {
            if (config.type == negativeLevelType) {
              config.value = value,
                config.limit = limit,
                config.action = action
            }
          })
          result.negative_emotion_levels.sort((a, b) => parseFloat(b.value) - parseFloat(a.value));
          fs.writeFile(path.resolve('./src/configurations/negativeLevels.json'), JSON.stringify(result), (err) => {
            res.status(status.OK)
              .send({
                success: true,
                message: negativeLevelsConfig
              })
          });
        }
      } catch (error) {
        next(error)
      }
    }
  },

  delete_negative_level: {
    async delete(req, res, next) {
      try {
        let result;
        const { negativeLevelType } = req.params;
        if (negativeLevelType == undefined) {
          res.status(status.EXPECTATION_FAILED)
            .send({
              success: false,
              message: "Must input at least one neagtive level."
            })
        } else {
          result = negativeLevelsConfig;
          for (var i = 0; i < result.negative_emotion_levels.length; i++) {
            if (result.negative_emotion_levels[i].type == negativeLevelType) {
              result.negative_emotion_levels.splice(i, 1);
            }
          }
          result.negative_emotion_levels.sort((a, b) => parseFloat(b.value) - parseFloat(a.value));
          fs.writeFile(path.resolve('./src/configurations/negativeLevels.json'), JSON.stringify(result), (err) => {
            res.status(status.OK)
              .send({
                success: true,
                message: negativeLevelsConfig
              })
          });
        }
      } catch (error) {
        next(error)
      }
    }
  },

};

