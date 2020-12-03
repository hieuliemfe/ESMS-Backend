'use strict'

/**
 * SessionService Route
 * path: /session-services
 */

import express from 'express';
import Controller from '../controllers/SessionServiceController';
let router = express.Router();
//auth imports
import passport from 'passport';
import { isBankTeller, isAuthorized } from '../middlewares/authorization';

/**
* @swagger
* /session-services:
*   get:
*     tags:
*       - Session Services
*     name: Get service(s)'s details.
*     summary: get a employee's service details based on an [employee code] or a [fullname].
*     consumes:
*       - application/json
*     parameters:
*       - in: query
*         name: query
*         schema:
*           type: string
*         description: sessionID to filter services
*     responses:
*       200:
*         description: A list of services is displayed.
*       400:
*         description: Error.
*       401:
*         description: Forbidden.
*/
router.get('/', passport.authenticate('jwt', { session: false }), isBankTeller, Controller.view.get);

/**
* @swagger
* /session-services/assign:
*   post:
*     tags:
*       - Session Services
*     name: Assign a service to an employee
*     summary: Assign a service to an employee
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
*               serviceId:
*                 type: integer
*     responses:
*       200:
*         description: Email sent to employee.
*/
router.post('/assign', passport.authenticate('jwt', { session: false }), isBankTeller, Controller.assign_service.post);

/**
* @swagger
* /session-services/{sessionServiceId}/status:
*   put:
*     tags:
*       - Session Services
*     name: Update service status
*     summary: Update service status
*     consumes:
*       - application/json
*     parameters:
*       - name: sessionServiceId
*         in: path
*         required: true
*         description: Select a service with matching serviceId.
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
router.put('/:sessionServiceId/status', passport.authenticate('jwt', { session: false }), isBankTeller, Controller.update_status.put);

/**
* @swagger
* /session-services/{sessionServiceId}:
*   delete:
*     tags:
*       - Session Services
*     name: Delete a service.
*     summary: Delete a employee based on a [serviceId].
*     consumes:
*       - application/json
*     parameters:
*       - name: sessionServiceId
*         in: path
*         required: true
*         description: Select a service with matching serviceId.
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
router.delete('/:sessionServiceId', passport.authenticate('jwt', { session: false }), isBankTeller, Controller.delete.delete);

export default router;
