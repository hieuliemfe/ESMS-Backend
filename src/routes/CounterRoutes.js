'use strict'

/**
 * Counter Route
 * path: /counters
 */

import express from 'express';
import Controller from '../controllers/CounterController';
let router = express.Router();
//auth imports
import passport from 'passport';
import { isAuthorized } from '../middlewares/authorization';

/**
* @swagger
* /counters/{counterNumber}:
*   get:
*     tags:
*       - Counters
*     name: Get counters.
*     summary: get a list of counters
*     consumes:
*       - application/json
*     parameters:
*       - in: path
*         name: counterNumber
*         schema:
*           type: string
*         description: counter number to filter counters.
*     responses:
*       200:
*         description: A list of sessions is displayed.
*       400:
*         description: Error.
*/

router.get('/:counterNumber', passport.authenticate('jwt', { session: false }), isAuthorized, Controller.view.get);
export default router;
