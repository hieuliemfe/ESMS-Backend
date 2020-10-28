'use strict'

/**
 * SessionTask Route
 * path: /session-tasks
 */

import express from 'express';
import Controller from '../controllers/SessionTaskController';
let router = express.Router();
//auth imports
import passport from 'passport';
import { isBankTeller, isAuthorized } from '../middlewares/authorization';

/**
* @swagger
* /session-tasks:
*   get:
*     tags:
*       - Session Tasks
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
* /session-tasks/assign:
*   post:
*     tags:
*       - Session Tasks
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
*               sessionId:
*                 type: integer
*               taskId:
*                 type: integer
*     responses:
*       200:
*         description: Email sent to employee.
*/
router.post('/assign', passport.authenticate('jwt', { session: false }), isBankTeller, Controller.assign_task.post);

/**
* @swagger
* /session-tasks/{sessionTaskId}/status:
*   put:
*     tags:
*       - Session Tasks
*     name: Update task status
*     summary: Update task status
*     consumes:
*       - application/json
*     parameters:
*       - name: sessionTaskId
*         in: path
*         required: true
*         description: Select a task with matching taskId.
*         schema:
*           type : integer
*           format: string
*           minimum: 1
*     requestBody:
*       required: true
*       content:
*         application/json:
*           schema:
*             type: object
*             properties:
*               statusId:
*                 type: integer
*     responses:
*       200:
*         description: Status is updated.
*/
router.put('/:sessionTaskId/status', passport.authenticate('jwt', { session: false }), isBankTeller, Controller.update_status.put);

/**
* @swagger
* /session-tasks/{sessionTaskId}:
*   delete:
*     tags:
*       - Session Tasks
*     name: Delete a task.
*     summary: Delete a employee based on a [taskId].
*     consumes:
*       - application/json
*     parameters:
*       - name: sessionTaskId
*         in: path
*         required: true
*         description: Select a task with matching taskId.
*         schema:
*           type : integer
*           format: string
*           minimum: 1
*     responses:
*       200:
*         description: Employee's details is deleted
*       404:
*         description: Employee not found.
*/
router.delete('/:sessionTaskId', passport.authenticate('jwt', { session: false }), isBankTeller, Controller.delete.delete);

export default router;
