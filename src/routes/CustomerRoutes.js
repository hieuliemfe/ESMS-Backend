'use strict'

/**
 * Customers Route
 * path: /sessions
 */

import express from 'express';
import Controller from '../controllers/CustomerController';
let router = express.Router();
//auth imports
import passport from 'passport';
import { isEmployee, isManager, isAuthorized } from '../middlewares/authorization';

/**
* @swagger
* /customers:
*   get:
*     tags:
*       - Customers
*     name: Get customer's details.
*     summary: get a customer's details based on an [account number] or a [fullname].
*     consumes:
*       - application/json
*     parameters:
*       - in: query
*         name: query
*         schema:
*           type: string
*         description: accountNumber || fullname to filter customers.
*     responses:
*       200:
*         description: A list of customer(s) is displayed.
*       400:
*         description: Error.
*/
router.get('/', passport.authenticate('jwt', { session: false }), isManager, Controller.view.get);
//router.get('/', passport.authenticate('jwt', {session: false}), isManager, Controller.view.get);
export default router;
