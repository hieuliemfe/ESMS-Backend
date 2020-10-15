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
import { isAuthorized,isBankTeller } from '../middlewares/authorization';

/**
* @swagger
* /counters:
*   get:
*     tags:
*       - Counters
*     name: Get counters.
*     summary: get a list of counters filtered by jwt token
*     consumes:
*       - application/json
*     responses:
*       200:
*         description: A list of counters is displayed.
*       400:
*         description: Error.
*/

router.get('/', passport.authenticate('jwt', { session: false }), isBankTeller, Controller.view_by_employee.get);


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
