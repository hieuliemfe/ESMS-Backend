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
*     name: Create a session
*     summary: Create an employee's session with a customer.
*     consumes:
*       - application/json
*     responses:
*       201:
*         description: Session's created.
*/
router.post('/', passport.authenticate('jwt', { session: false }), isBankTeller, Controller.create.post);

/**
* @swagger
* /sessions:
*   put:
*     tags:
*       - Sessions
*     name: Update a session
*     summary: Update a session with periods & emotions.
*     consumes:
*       - application/json
*     requestBody:
*       required: true
*       content:
*         application/json:
*           schema:
*             type: object
*             properties:
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
router.put('/', passport.authenticate('jwt', { session: false }), isBankTeller, Controller.update.put);

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
router.get('/', passport.authenticate('jwt', { session: false }), isManager, Controller.view.get);
export default router;
