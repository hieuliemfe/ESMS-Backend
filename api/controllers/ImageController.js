'use strict';
const models = require('../db/models/index');
const status = require('http-status');

module.exports = {
  upload: {
    async post(req, res, next) {
      try {
        console.log(req.body);
        return models.Image
          .create(req.body)
          .then(function (result, err) {
            res.status(status.OK)
              .send({
                success: true,
                message: "OK",
                error: err,
              })
          })
      } catch (error) {
        next(error);
      }
    }
  },

  update: {
    async post(req, res, next) {
      try {
        const image = await models.Image.findOne(
          {where: [{id: req.params.imageId}]}
        );
        if (image == null) {
          res.status(status.OK)
            .send({
              success: true,
              message: "Image not found!",
            });
        } else {
          return models.Image
            .update(
              {
                image_url: req.body.imageUrl,
                post_id: req.body.postId,
                step_id: req.body.stepId,
                updatedAt: new Date()
              },
              {where: {id: req.params.imageId}})
            .then(function (result, err) {
              res.status(status.OK)
                .send({
                  success: true,
                  message: result,
                  error: err
                })
            })
        }
      } catch (error) {
        next(error);
      }
    }
  },
  delete: {
    async put(req, res, next) {
      try {
        const result = await models.Image.update(
          {isDeleted: true, updated_at: new Date()},
          {where: [{id: req.params.imageId}, {is_deleted: false}]}
        );
        res.status(status.OK)
          .send({
            success: true,
            message: result
          });
      } catch (error) {
        next(error)
      }
    }
  },
};