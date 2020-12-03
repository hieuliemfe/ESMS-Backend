'use strict'

/**
 * Category Routes
 * path: /services
 */

import express from 'express';
import Controller from '../controllers/ServiceController';
let router = express.Router();
//auth imports
import passport from 'passport';

/**
* @swagger
* /services:
*   get:
*     tags:
*       - Services
*     name: Get Services.
*     summary: Get Services.
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