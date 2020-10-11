'use strict';

/**
* Public Route
* path: /
*/

import express from 'express';
import EmployeeController from '../controllers/EmployeeController';
import { check, body } from 'express-validator';
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
], EmployeeController.login.post);

/**
* @swagger
* /register:
*    post:
*     tags:
*       - Root
*     name: Regiser employee
*     summary: Creates a employee.
*     requestBody:
*       required: true
*       content:
*         application/json:
*           schema:
*             type: object
*             properties:
*               employeeCode:
*                 type: string
*               email:
*                 type: string
*               password:
*                 type: string
*               confirmPassword:
*                 type: string
*     responses:
*       201:
*         description: Register successful.
*       400:
*         description: Bad employee name, or found in db
*       403:
*         description: Password and confirm password doesn't match
*/
router.post('/register', [
  check('email', 'Invalid Email').isEmail().normalizeEmail(),
  check('employeeCode', 'employeeCode must be at least 5 characters').isLength({ min: 5 }),
  check('password', 'Password must be at least 5 characters').isLength({ min: 5 }),
  check('confirmPassword', 'Password have to match Confirm Password').custom((value, { req, loc, path }) => {
    if (value !== req.body.confirmPassword) {
      throw new Error("Passwords don't match");
    } else {
      return value;
    }
  }),
], EmployeeController.register.post);
export default router;
