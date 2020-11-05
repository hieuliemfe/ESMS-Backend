'use strict';

import status from 'http-status';
import models from '../db/models/index';
import periodicityConfig from '../db/config/periodicityConfig';
export default {

  get_stress_criterias: {
    async get(req, res, next) {
      try {
        let { periodicityId } = req.query;
        if (periodicityId == undefined) {
          periodicityId = periodicityConfig.WEEKLY;
        }
        const stressCriteria = await models.StressCriteria.findAll({
          include: [{
            model: models.StressSuggestion,
            where: {
              periodicityId: periodicityId
            }
          }],
        })
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
            condition: condition + operator + comparingNumber,
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

  create_stress_suggestion: {
    async post(req, res, next) {
      try {
        const { percentageLimit, link, periodicityId, suggestion, criteriaId } = req.body
        if (percentageLimit == undefined || periodicityId == undefined || suggestion == undefined || criteriaId == undefined) {
          res.status(status.EXPECTATION_FAILED)
            .send({
              success: false,
              message: "Missing or invalid input."
            })
        } else {
          const result = models.StressSuggestion.create({
            percentageLimit: percentageLimit,
            link: link,
            periodicityId: periodicityId,
            suggestion: suggestion,
            criteriaId: criteriaId
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

  update_stress_suggestion: {
    async put(req, res, next) {
      try {
        const { suggestionId } = req.params;
        if (suggestionId == undefined) {
          res.status(status.EXPECTATION_FAILED)
            .send({
              success: false,
              message: "No suggestionId found."
            })
          return;
        }
        const { percentageLimit, link, periodicityId, suggestion, criteriaId } = req.body
        if (percentageLimit == undefined || periodicityId == undefined || suggestion == undefined || criteriaId == undefined) {
          res.status(status.EXPECTATION_FAILED)
            .send({
              success: false,
              message: "Missing or invalid input."
            })
        } else {
          const result = models.StressSuggestion.update({
            percentageLimit: percentageLimit,
            link: link,
            periodicityId: periodicityId,
            suggestion: suggestion,
            criteriaId: criteriaId
          }, {
            where: {
              id: suggestionId
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
        const result = await models.StressCriteria.destroy({
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

  delete_stress_suggestion: {
    async delete(req, res, next) {
      try {
        const { suggestionId } = req.params;
        if (suggestionId == undefined) {
          res.status(status.EXPECTATION_FAILED)
            .send({
              success: false,
              message: "No suggestionId found."
            })
          return;
        }
        const result = await models.StressSuggestion.destroy({
          where: {
            id: suggestionId
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
        const { condition } = req.body
        if (condition == undefined || condition.match("[a-zA-Z]")) {
          res.status(status.EXPECTATION_FAILED)
            .send({
              success: false,
              message: "Missing or invalid input."
            })
        } else {
          const result = models.NegativeEmotionCriteria.create({
            condition: condition,
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
  create_negative_emotion_action: {
    async post(req, res, next) {
      try {
        const { limit, percentageLimit, periodicityId, action, criteriaId } = req.body
        if (percentageLimit == undefined || periodicityId == undefined || action == undefined || criteriaId == undefined) {
          res.status(status.EXPECTATION_FAILED)
            .send({
              success: false,
              message: "Missing or invalid input."
            })
        } else {
          const result = models.NegativeEmotionAction.create({
            limit: limit,
            percentageLimit: percentageLimit,
            periodicityId: periodicityId,
            action: action,
            criteriaId: criteriaId
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
        const { condition } = req.body
        if (condition == undefined || condition.match("[a-zA-Z]")) {
          res.status(status.EXPECTATION_FAILED)
            .send({
              success: false,
              message: "Missing or invalid input."
            })
        } else {
          const result = models.NegativeEmotionCriteria.update({
            condition: condition
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

  update_negative_emotion_action: {
    async put(req, res, next) {
      try {
        const { actionId } = req.params;
        if (actionId == undefined) {
          res.status(status.EXPECTATION_FAILED)
            .send({
              success: false,
              message: "actionId missing."
            })
        }
        const { limit, percentageLimit, periodicityId, action, criteriaId } = req.body
        if (percentageLimit == undefined || periodicityId == undefined || action == undefined || criteriaId == undefined) {
          res.status(status.EXPECTATION_FAILED)
            .send({
              success: false,
              message: "Missing or invalid input."
            })
        } else {
          const result = models.NegativeEmotionAction.update({
            limit: limit,
            percentageLimit: percentageLimit,
            periodicityId: periodicityId,
            action: action,
            criteriaId: criteriaId
          }, {
            where: {
              id: actionId
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

  delete_negative_emotion_action: {
    async delete(req, res, next) {
      try {
        const { actionId } = req.params;
        if (actionId == undefined) {
          res.status(status.EXPECTATION_FAILED)
            .send({
              success: false,
              message: "No actionId found."
            })
          return;
        }
        const result = models.NegativeEmotionAction.destroy({
          where: {
            id: actionId
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