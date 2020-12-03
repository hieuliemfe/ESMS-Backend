'use strict'

/**
 * Task Route
 * path: /tasks
 */

import express from 'express';
import Controller from '../controllers/VideoController';
let router = express.Router();
//auth imports
import passport from 'passport';
import { isAuthorized, isBankTeller } from '../middlewares/authorization';
import fileUpload from "../middlewares/fileUpload.js";

/**
* /videos/evidences:
*   post:
*     tags:
*       - Videos
*     name: Upload a video.
*     summary: Upload a video.
*     consumes:
*       - application/json
*     requestBody:
*       content:
*         multipart/form-data:
*           schema:
*             type: object
*             properties:
*               sessionId:
*                 type: integer
*                 required: true
*               file:
*                 type: string
*                 format: binary
*     responses:
*       200:
*         description: The evidence will be uploaded.
*       400:
*         description: Error.
*       401:
*         description: Forbidden.
*/
// router.post('/evidences', passport.authenticate('jwt', { session: false }), isBankTeller, fileUpload.single("file"), Controller.upload_evidence.post);

/**
* @swagger
* /videos:
*   get:
*     tags:
*       - Videos
*     name: Get evidence video by gcpath.
*     summary: Get evidence video by gcpath.
*     consumes:
*       - application/json
*     parameters:
*       - in: query
*         name: gcpath
*         schema:
*          type: string
*         description: Gcpath to get evidence video
*     responses:
*       200:
*         description: A list of task types is displayed.
*       400:
*         description: Error.
*       401:
*         description: Forbidden.
*/
router.get('/', passport.authenticate('jwt', { session: false }), isAuthorized, Controller.get_evidence.get);

export default router;
