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
import { isBankTeller,isAuthorized } from '../middlewares/authorization';

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
*         description: sessionID to filter tasks
*     responses:
*       200:
*         description: A list of tasks is displayed.
*       400:
*         description: Error.
*       401:
*         description: Forbidden.
*/
router.get('/', passport.authenticate('jwt', { session: false }), isBankTeller, Controller.view.get);

/**
* @swagger
* /tasks/assign:
*   post:
*     tags:
*       - Tasks
*     name: Assign a task to an employee
*     summary: Assign a task to an employee
*     consumes:
*       - application/json
*     requestBody:
*       required: true
*       content:
*         application/json:
*           schema:
*             type: object
*             properties:
*               queueId:
*                 type: integer
*               sessionId:
*                 type: integer
*               taskTypeId:
*                 type: integer
*     responses:
*       200:
*         description: Email sent to employee.
*/
router.post('/assign', passport.authenticate('jwt', { session: false }), isBankTeller, Controller.assign_task.post);

/**
* @swagger
* /tasks/status:
*   put:
*     tags:
*       - Tasks
*     name: Update task status
*     summary: Update task status
*     consumes:
*       - application/json
*     requestBody:
*       required: true
*       content:
*         application/json:
*           schema:
*             type: object
*             properties:
*               taskId:
*                 type: integer
*               statusId:
*                 type: integer
*     responses:
*       200:
*         description: Status is updated.
*/
router.put('/status', passport.authenticate('jwt', { session: false }), isBankTeller, Controller.update_status.put);
export default router;
