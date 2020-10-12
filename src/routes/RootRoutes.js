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
export default router;
