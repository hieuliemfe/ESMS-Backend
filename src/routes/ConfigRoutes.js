'use strict'

/**
 * Config Route
 * path: /configs
 */

import express from 'express';
import Controller from '../controllers/ConfigController';
let router = express.Router();
//auth imports
import passport from 'passport';
import { isAuthorized, isBankTeller, isAdmin } from '../middlewares/authorization';

/**
* @swagger
* /configs:
*   get:
*     tags:
*       - Configurations
*     name: Get action configuration.
*     summary: Get action configuration.
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
router.get('/', passport.authenticate('jwt', { session: false }), isAdmin, Controller.get_config.get);

/**
* @swagger
* /configs:
*   post:
*     tags:
*       - Configurations
*     name: Edit configuration
*     summary: Edit configuration
*     requestBody:
*       required: true
*       content:
*         application/json:
*           schema:
*             type: object
*             properties:
*               config:
*                 type: 
*           example:
*               config: "{\"angry_percent_max\":0.3}"
*     responses:
*       200:
*         description: level updated.
*/
router.post('/', passport.authenticate('jwt', { session: false }), isAdmin, Controller.update_config.post);

export default router;