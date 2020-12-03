'use strict'

/**
 * Task Route
 * path: /shifts
 */

import express from 'express';
import Controller from '../controllers/ShiftController';
let router = express.Router();
//auth imports
import passport from 'passport';
import { isAuthorized } from '../middlewares/authorization';

/**
* @swagger
* /shifts:
*   get:
*     tags:
*       - Shifts
*     name: Get shift types.
*     summary: get a list of shifts
*     consumes:
*       - application/json
*     responses:
*       200:
*         description: A list of shifts is displayed.
*       400:
*         description: Error.
*       401:
*         description: Forbidden.
*/
router.get('/', passport.authenticate('jwt', { session: false }), isAuthorized, Controller.view.get);
export default router;
