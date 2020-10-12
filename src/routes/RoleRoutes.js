'use strict'

/**
 * Task Route
 * path: /tasks
 */

import express from 'express';
import Controller from '../controllers/RoleController';
let router = express.Router();
//auth imports
import passport from 'passport';
import { isAuthorized } from '../middlewares/authorization';

/**
* @swagger
* /roles:
*   get:
*     tags:
*       - Roles
*     name: Get roles.
*     summary: get a list of roles
*     consumes:
*       - application/json
*     responses:
*       200:
*         description: A list of sessions is displayed.
*       400:
*         description: Error.
*       401:
*         description: Forbidden.
*/
router.get('/', passport.authenticate('jwt', { session: false }), isAuthorized, Controller.view.get);
export default router;
