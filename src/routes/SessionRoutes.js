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
*   get:
*     tags:
*       - Sessions
*     name: Get session(s)'s details by shiftId .
*     summary: get a employee's details based on an [employee code] or a [fullname].
*     consumes:
*       - application/json
*     parameters:
*       - name: startDate
*         in: query
*         required: false
*         description: (yyyy-mm-ddThh:mm:ss) Selected date that is used as a starting point for the period.
*         schema:
*           type : string
*           format: date-time
*       - name: endDate
*         in: query
*         required: false
*         description: (yyyy-mm-ddThh:mm:ss) Selected date that is used as a ending point for the period.
*         schema:
*           type : string
*           format: date-time
*       - name: fullname
*         in: query
*         required: false
*         description: Employee's fullname to filter
*         schema:
*           type : string
*           format: string
*       - name: employeeCode
*         in: query
*         required: false
*         description: Employee's code to filter
*         schema:
*           type : string
*           format: string
*       - name: status
*         in: query
*         required: false
*         description: sessionStatus to filter (negative || positive || neutral || emotionless)
*         schema:
*           type : string
*           format: string
*       - name: shiftType
*         in: query
*         required: false
*         description: shiftType to filter (morning || afternoon || night)
*         schema:
*           type : string
*           format: string
*       - name: limit
*         in: query
*         required: false
*         description: Default value is 10.
*         schema:
*           type : integer
*       - name: page
*         in: query
*         required: false
*         description: Default value is 1.
*         schema:
*           type : integer
*     responses:
*       200:
*         description: A list of sessions is displayed.
*       400:
*         description: Error.
*/
router.get('/', passport.authenticate('jwt', { session: false }), isManager, Controller.view.get);

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
* /sessions/{sessionId}:
*   get:
*     tags:
*       - Sessions
*     name: Get a session details
*     summary: Get a session details using sessionId
*     consumes:
*       - application/json
*     parameters:
*       - in: path
*         name: sessionId
*         schema:
*           type: string
*         description: Get session based on sessionId.
*     responses:
*       201:
*         description: Session's added.
*/
router.get('/:sessionId', passport.authenticate('jwt', { session: false }), isManager, Controller.view_one.get);

/**
* @swagger
* /sessions/{sessionId}/start:
*   put:
*     tags:
*       - Sessions
*     name: Update a session
*     summary: Update a session with periods & emotions.
*     consumes:
*       - application/json
*     parameters:
*       - in: path
*         name: sessionId
*         schema:
*           type: string
*         description: Get session based on sessionId.
*     responses:
*       201:
*         description: Session's added.
*/
router.put('/:sessionId/start', passport.authenticate('jwt', { session: false }), isBankTeller, Controller.start_session.put);

/**
* @swagger
* /sessions/{sessionId}/end:
*   put:
*     tags:
*       - Sessions
*     name: Update a session
*     summary: Update a session with periods & emotions.
*     consumes:
*       - application/json
*     parameters:
*       - in: path
*         name: sessionId
*         schema:
*           type: string
*         description: Get session based on sessionId.
*     requestBody:
*       required: true
*       content:
*         application/json:
*           schema:
*             type: object
*             properties:
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
router.put('/:sessionId/end', passport.authenticate('jwt', { session: false }), isBankTeller, Controller.end_session.put);

export default router;
