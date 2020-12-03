'use strict';

import models from '../db/models/index';
import status from 'http-status';
// import { uploadEvidence } from '../services/evidence-stream/service';
import { getSignedURL } from '../services/evidence-stream/service';

export default {
  // upload_evidence: {
  //   async post(req, res, next) {
  //     try {
  //       if (req.file == undefined) {
  //         res.status(status.EXPECTATION_FAILED).send({
  //           success: false,
  //           message: "No file uploaded."
  //         })
  //       } else if (req.body.sessionId == undefined) {
  //         res.status(status.EXPECTATION_FAILED)
  //           .send({
  //             success: false,
  //             message: "Please provide session id."
  //           })
  //       } else {
  //         const sessionId = req.body.sessionId
  //         const result = await uploadEvidence(req.file);
  //         if (result != undefined) {
  //           const session = await models.Session.update(
  //             { evidenceUrl: result[0] },
  //             {
  //               where: { id: sessionId, }
  //             }
  //           )
  //           res.send({
  //             success: true,
  //             message: session
  //           })
  //         }
  //       }
  //     } catch (error) {
  //       next(error);
  //     }
  //   }
  // },
  get_evidence: {
    async get(req, res, next) {
      try {  
        const { gcpath } = req.query
        const url = await getSignedURL(gcpath)
        res.send({
          success: true,
          message: url
        })
      } catch (error) {
        next(error);
      }
    }
  },
};
