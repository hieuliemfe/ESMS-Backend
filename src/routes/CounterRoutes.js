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
* /counters/current:
*   get:
*     tags:
*       - Counters
*     name: Get counter.
*     summary: get a current counter of emoloyee by jwt
*     consumes:
*       - application/json
*     responses:
*       200:
*         description: A counter is displayed.
*       400:
*         description: Error.
*/

router.get('/current', passport.authenticate('jwt', { session: false }), isBankTeller, Controller.view_by_employee.get);


/**
* @swagger
* /counters/{id}:
*   get:
*     tags:
*       - Counters
*     name: Get counters.
*     summary: get a list of counters
*     consumes:
*       - application/json
*     parameters:
*       - in: path
*         name: id
*         schema:
*           type: string
*         description: counter id to filter counters.
*     responses:
*       200:
*         description: A list of sessions is displayed.
*       400:
*         description: Error.
*/

router.get('/:id', passport.authenticate('jwt', { session: false }), isAuthorized, Controller.view.get);


export default router;
