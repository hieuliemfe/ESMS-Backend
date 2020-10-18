'use strict'

/**
 * Shifts Route
 * path: /shifts
 */

import express from 'express';
import Controller from '../controllers/ShiftController';
let router = express.Router();
import { isAuthorized, isBankTeller } from '../middlewares/authorization';
import passport from 'passport';
/**
* @swagger
* /shifts:
*   get:
*     tags:
*       - Shifts
*     name: Get shifts by employee.
*     summary: Get shifts by employee using current session's jwt token.
*     consumes:
*       - application/json
*     responses:
*       200:
*         description: A list of shifts is displayed.
*       400:
*         description: Error.
*/

router.get('/', passport.authenticate('jwt', { session: false }), isBankTeller, Controller.view_by_employee.get);

export default router;