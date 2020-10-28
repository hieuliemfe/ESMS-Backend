'use strict'

/**
 * Category Routes
 * path: /categories
 */

import express from 'express';
import Controller from '../controllers/CategoryController';
let router = express.Router();
//auth imports
import passport from 'passport';
import { isBankTeller } from '../middlewares/authorization';

/**
* @swagger
* /categories:
*   get:
*     tags:
*       - Categories
*     name: Get categories.
*     summary: Get categories.
*     consumes:
*       - application/json
*     responses:
*       200:
*         description: A list of task types is displayed.
*       400:
*         description: Error.
*       401:
*         description: Forbidden.
*/
router.get('/', Controller.view_all.get);

/**
* @swagger
* /categories/counters/{counterId}:
*   get:
*     tags:
*       - Categories
*     name: Get task types details by categoryId.
*     summary: Get task types details by categoryId.
*     consumes:
*       - application/json
*     parameters:
*       - in: path
*         name: counterId
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
router.get('/counters/:counterId', passport.authenticate('jwt', { session: false }), isBankTeller, Controller.view_by_counter_id.get);


/**
* @swagger
* /categories/{categoryId}/tasks:
*   get:
*     tags:
*       - Categories
*     name: Get tasks with the corresponding category.
*     summary: Get tasks with the corresponding category.
*     consumes:
*       - application/json
*     parameters:
*       - in: path
*         name: categoryId
*         schema:
*          type: integer
*         description: categoryId to filter
*     responses:
*       200:
*         description: A list of tasks is displayed.
*       400:
*         description: Error.
*       401:
*         description: Forbidden.
*/
router.get('/:categoryId/tasks', passport.authenticate('jwt', { session: false }), isBankTeller, Controller.view_tasks_by_category_id.get);

export default router;
