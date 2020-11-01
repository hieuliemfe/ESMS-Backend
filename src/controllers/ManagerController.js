'use strict';

import models from '../db/models/index';
import status from 'http-status';
import fs from 'fs';
import path from 'path';

import stressLevelsConfig from '../configurations/stressLevels.json';
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
          fs.writeFile(path.resolve('./src/configurations/stressLevels.json'), JSON.stringify(result), (err) => {
            res.status(status.OK)
              .send({
                success: true,
                message: JSON.stringify(stressLevelsConfig)
              })
          });

        }
      } catch (error) {
        next(error)
      }
    }
  },
};
