'use strict'

/**
 * Sessions Route
 * path: /sessions
 */

import express from 'express';
import Controller from '../controllers/SessionController';
let router = express.Router();
//auth imports
import passport from 'passport';
import { isBankTeller, isManager } from '../middlewares/authorization';

/**
* @swagger
* /sessions:
*   post:
*     tags:
*       - Sessions
*     name: Add a session
*     summary: Add an employee's session with a customer.
*     consumes:
*       - application/json
*     requestBody:
*       required: true
*       content:
*         application/json:
*           schema:
*             type: object
*             properties:
*               employeeCode:
*                 type: string
*               sessionBegin:
*                 type: string
*               sessionEnd:
*                 type: string
*               emotions:
*                 type: array
*                 items:
*                   type: object
*                   properties:
*                     emotion:
*                       type:integer
*     responses:
*       201:
*         description: Session's added.
*/
router.post('/', passport.authenticate('jwt', {session: false}), isBankTeller, Controller.create.post);

//router.post('/', Controller.create.post);
/**
* @swagger
* /sessions:
*   get:
*     tags:
*       - Sessions
*     name: Get session(s)'s details.
*     summary: get a employee's details based on an [employee code] or a [fullname].
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
*/
router.get('/', passport.authenticate('jwt', {session: false}), isManager, Controller.view.get);
export default router;
