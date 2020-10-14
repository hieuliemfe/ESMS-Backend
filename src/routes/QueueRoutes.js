'use strict'

/**
 * Queue Route
 * path: /queues
 */

import express from 'express';
import Controller from '../controllers/QueueController';
let router = express.Router();
//auth imports
import passport from 'passport';
import { isAuthorized } from '../middlewares/authorization';

/**
* @swagger
* /queues:
*   get:
*     tags:
*       - Queues
*     name: Get queues.
*     summary: get a list of queues
*     consumes:
*       - application/json
*     responses:
*       200:
*         description: A list of queues is displayed.
*       400:
*         description: Error.
*       401:
*         description: Forbidden.
*/
router.get('/', passport.authenticate('jwt', { session: false }), isAuthorized, Controller.view.get);
export default router;
