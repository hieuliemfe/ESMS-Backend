'use strict'

/**
 * Category Routes
 * path: /categories
 */

import express from 'express';
import Controller from '../controllers/TaskController';
let router = express.Router();
//auth imports
import passport from 'passport';

/**
* @swagger
* /Tasks:
*   get:
*     tags:
*       - Tasks
*     name: Get Tasks.
*     summary: Get Tasks.
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

export default router;