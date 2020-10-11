'use strict'

/**
 * Task Route
 * path: /tasks
 */

import express from 'express';
import Controller from '../controllers/TaskController';
let router = express.Router();
//auth imports
import passport from 'passport';
import { isEmployee, isManager, isAuthorized } from '../middlewares/authorization';

/**
* @swagger
* /tasks:
*   get:
*     tags:
*       - Tasks
*     name: Get task(s)'s details.
*     summary: get a employee's task details based on an [employee code] or a [fullname].
*     consumes:
*       - application/json
*     parameters:
*       - in: query
*         name: query
*         schema:
*           type: string
*         description: employeeCode || fullname to filter sessions by employee.
*     responses:
*       200:
*         description: A list of sessions is displayed.
*       400:
*         description: Error.
*       401:
*         description: Forbidden.
*/
router.get('/', passport.authenticate('jwt', { session: false }), isAuthorized, Controller.view.get);
//router.get('/', passport.authenticate('jwt', {session: false}), isManager, Controller.view.get);
export default router;
