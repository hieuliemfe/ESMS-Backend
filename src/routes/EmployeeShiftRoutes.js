'use strict'

/**
 * Shifts Route
 * path: /employee-shifts
 */

import express from 'express';
import Controller from '../controllers/EmployeeShiftController';
let router = express.Router();
import { isAuthorized, isBankTeller } from '../middlewares/authorization';
import passport from 'passport';

/**
* @swagger
* /employee-shifts:
*   get:
*     tags:
*       - Employee Shifts
*     name: Get employee shifts by employee.
*     summary: Get employee shifts by employee using current session's jwt token.
*     consumes:
*       - application/json
*     responses:
*       200:
*         description: A list of employee shifts is displayed.
*       400:
*         description: Error.
*/
router.get('/', passport.authenticate('jwt', { session: false }), isBankTeller, Controller.view_shift_list.get);

/**
* @swagger
* /employee-shifts:
*    post:
*     tags:
*       - Employee Shifts
*     name: Create new employee shift
*     summary: Creates an employee shift.
*     requestBody:
*       required: true
*       content:
*         application/json:
*           schema:
*             type: object
*             properties:
*               shiftId:
*                 type: integer
*     responses:
*       201:
*         description: Create successful.
*/
router.post('/', passport.authenticate('jwt', {session: false}), isBankTeller, Controller.create.post);

/**
* @swagger
* /employee-shifts/{id}/checkout:
*   put:
*     tags:
*       - Employee Shifts
*     name: Checkout for an employee shift.
*     summary: Checkout for an employee shift with id.
*     consumes:
*       - application/json
*     parameters:
*       - name: id
*         in: path
*         required: true
*         description: Select an employee shift with matching id.
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
router.put('/:id/checkout', passport.authenticate('jwt', { session: false }), isBankTeller, Controller.checkout.put);

export default router;
