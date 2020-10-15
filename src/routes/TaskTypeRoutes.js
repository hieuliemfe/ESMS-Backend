'use strict'

/**
 * TaskType Routes
 * path: /task-type
 */

import express from 'express';
import Controller from '../controllers/TaskTypeController';
let router = express.Router();
//auth imports
import passport from 'passport';
import { isBankTeller } from '../middlewares/authorization';

/**
* @swagger
* /task-type/{categoryId}:
*   get:
*     tags:
*       - Task Types
*     name: Get task types details by categoryId.
*     summary: Get task types details by categoryId.
*     consumes:
*       - application/json
*     parameters:
*       - in: path
*         name: categoryId
*         schema:
*          type: integer
*         description: Numeric ID of the user to get
*     responses:
*       200:
*         description: A list of task types is displayed.
*       400:
*         description: Error.
*       401:
*         description: Forbidden.
*/
router.get('/:categoryId', passport.authenticate('jwt', { session: false }), isBankTeller, Controller.view.get);

export default router;
