'use strict'

/**
 * Face Route
 * path: /emails
 */

import express from 'express';
import Controller from '../controllers/EmailController';
import passport from 'passport'
import { isManager } from '../middlewares/authorization';


let router = express.Router();

/**
* @swagger
* /emails/action:
*   post:
*     tags:
*       - Email Service
*     name: Send an email
*     summary: Send an stress relieving email to an employee
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
*               type:
*                 type: string
*               date:
*                 type: string
*                 format: date
*     responses:
*       200:
*         description: Email is sent.
*       417:
*         description: Bad employeeCode, type or date
*/
router.post('/action', passport.authenticate('jwt', { session: false }), isManager, Controller.send_action_email.post);

/**
* @swagger
* /emails/stress-solution:
*   post:
*     tags:
*       - Email Service
*     name: Send an email to suggest stress solution
*     summary: Send an action email to an employee
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
*               videoUrl:
*                 type: string
*     responses:
*       200:
*         description: Email is sent.
*       417:
*         description: Bad employeeCode, type or date
*/
router.post('/stress-solution', passport.authenticate('jwt', { session: false }), isManager, Controller.send_stress_solution_email.post);

/**
* @swagger
* /emails/types:
*   get:
*     tags:
*       - Email Service
*     name: Get types of emails
*     summary: Get types of emails to send  
*     consumes:
*       - application/json
*     responses:
*       200:
*         description: Email is sent.
*       417:
*         description: Bad employeeCode, type or date
*/
// router.get('/types', passport.authenticate('jwt', { session: false }), isManager, Controller.send_stress_solution_email.post);

export default router;
