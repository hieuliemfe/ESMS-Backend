'use strict'

/**
 * Shifts Route
 * path: /shifts
 */

import express from 'express';
import Controller from '../controllers/ShiftController';
let router = express.Router();
import { isAuthorized, isBankTeller } from '../middlewares/authorization';
import passport from 'passport';

/**
* @swagger
* /shifts:
*   get:
*     tags:
*       - Shifts
*     name: Get shifts by employee.
*     summary: Get shifts by employee using current session's jwt token.
*     consumes:
*       - application/json
*     responses:
*       200:
*         description: A list of shifts is displayed.
*       400:
*         description: Error.
*/
router.get('/', passport.authenticate('jwt', { session: false }), isBankTeller, Controller.view_shift_list.get);

/**
* @swagger
* /shifts/active-shift:
*   get:
*     tags:
*       - Shifts
*     name: Get an active shift by employee id.
*     summary: Get an active shift by employee using current session's jwt token.
*     consumes:
*       - application/json
*     responses:
*       200:
*         description: An active shift is displayed.
*       400:
*         description: Error.
*/
router.get('/active-shift', passport.authenticate('jwt', { session: false }), isBankTeller, Controller.view_active_shift.get);

/**
* @swagger
* /shifts/{shiftId}/summary:
*   get:
*     tags:
*       - Shifts
*     name: Get summary of current shift.
*     summary: Get summary of current shift by employee using current session's jwt token.
*     consumes:
*       - application/json
*     parameters:
*       - name: shiftId
*         in: path
*         required: true
*         description: Select an shift with matching shiftId.
*         schema:
*           type : integer
*           format: integer
*           minimum: 1
*     responses:
*       200:
*         description: A summary of current shift is displayed.
*       400:
*         description: Error.
*/
router.get('/:shiftId/summary', passport.authenticate('jwt', { session: false }), isBankTeller, Controller.sum_up.get);

/**
* @swagger
* /shifts/{shiftId}/checkout:
*   put:
*     tags:
*       - Shifts
*     name: Checkout for a shift.
*     summary: Checkout for a shift with shiftId.
*     consumes:
*       - application/json
*     parameters:
*       - name: shiftId
*         in: path
*         required: true
*         description: Select an shift with matching shiftId.
*         schema:
*           type : string
*           format: string
*           minimum: 1
*     responses:
*       200:
*         description: Shift is checked out.
*       400:
*         description: Error.
*/
router.put('/:shiftId/checkout', passport.authenticate('jwt', { session: false }), isBankTeller, Controller.checkout.put);

/**
* @swagger
* /shifts/{shiftId}/checkin:
*   put:
*     tags:
*       - Shifts
*     name: Checkin for a shift.
*     summary: Checkin for a shift with shiftId.
*     consumes:
*       - application/json
*     parameters:
*       - name: shiftId
*         in: path
*         required: true
*         description: Select an shift with matching shiftId.
*         schema:
*           type : integer
*           format: integer
*           minimum: 1
*     responses:
*       200:
*         description: Shift is checked out.
*       400:
*         description: Error.
*/
router.put('/:shiftId/checkin', passport.authenticate('jwt', { session: false }), isBankTeller, Controller.checkin.put);

export default router;
