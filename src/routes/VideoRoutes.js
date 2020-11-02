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
import { isBankTeller } from '../middlewares/authorization';
import fileUpload from "../middlewares/fileUpload.js";

/**
* @swagger
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
router.post('/evidences', passport.authenticate('jwt', { session: false }), isBankTeller, fileUpload.single("file"), Controller.upload_evidence.post);

export default router;
