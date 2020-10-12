'use strict';

/**
* Public Route
* path: /
*/

import express from 'express';
import Controller from '../controllers/EmployeeController';
import { check, body } from 'express-validator';
//auth imports
import passport from 'passport';
import { isBankTeller, isManager, isAuthorized } from '../middlewares/authorization';
let router = express.Router();

/**
* @swagger
* /login:
*   post:
*     tags:
*       - Root
*     name: Login
*     summary: Log an employee into the system.
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
*               password:
*                 type: string
*     responses:
*       200:
*         description: Login Successful and return a JWT.
*       401:
*         description: Bad employeeCode, not found in db
*       403:
*         description: employeeCode and password don't match
*/

router.post('/login', [
  body('employeeCode')
    .not().isEmpty()
    .trim()
    .escape(),
  body('password')
    .not().isEmpty()
], Controller.login.post);

/**
* @swagger
* /register:
*    post:
*     tags:
*       - Root
*     name: Register an employee
*     summary: Creates an employee.
*     requestBody:
*       required: true
*       content:
*         application/json:
*           schema:
*             type: object
*             properties:
*               fullname:
*                 type: string
*               phoneNumber:
*                 type: string
*               avatarUrl:
*                 type: string
*               roleId:
*                 type: integer
*     responses:
*       201:
*         description: Register successful.
*       400:
*         description: Bad employee name, or found in db
*       403:
*         description: Password and confirm password doesn't match
*/
router.post('/register', passport.authenticate('jwt', {session: false}), isAuthorized, Controller.register.post);

/**
* @swagger
* /profile:
*   get:
*     tags:
*       - Root
*     name: Get details of employee in session.
*     summary: Get details of employee in session.
*     consumes:
*       - application/json
*     responses:
*       200:
*         description: Employee in session is displayed.
*       400:
*         description: Error.
*       401:
*         description: Forbidden.
*/
router.get('/profile', passport.authenticate('jwt', { session: false }), isAuthorized, Controller.view_profile.get);
export default router;
