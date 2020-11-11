'use strict'

/**
 * Task Route
 * path: /tasks
 */

import express from 'express';
import Controller from '../controllers/ShiftTypeController';
let router = express.Router();
//auth imports
import passport from 'passport';
import { isAuthorized } from '../middlewares/authorization';

/**
* @swagger
* /shifttypes:
*   get:
*     tags:
*       - Shift types
*     name: Get shift types.
*     summary: get a list of shift types
*     consumes:
*       - application/json
*     responses:
*       200:
*         description: A list of shift types is displayed.
*       400:
*         description: Error.
*       401:
*         description: Forbidden.
*/
router.get('/', passport.authenticate('jwt', { session: false }), isAuthorized, Controller.view.get);
export default router;
