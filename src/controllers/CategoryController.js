'use strict';

import models from '../db/models/index';
import status from 'http-status';

export default {

  view_by_counter_id: {
    async get(req, res, next) {
      try {
        const { counterId } = req.params
        let whereCondition;
        if (counterId == '' || counterId == ',') {
          whereCondition = null
        } else {
          whereCondition = {
            id: counterId
          }
        }
        await models.CounterCategory.findAll({
          include: [{
            model: models.Counter,
            as: 'Counter',
            where: whereCondition,
          },
          ],
          raw: false,
        }).then(CounterCategories => {
          res.status(status.OK)
            .send({
              status: true,
              message: CounterCategories,
            });
        })
      } catch
      (error) {
        next(error);
      }
    }
  },

};
