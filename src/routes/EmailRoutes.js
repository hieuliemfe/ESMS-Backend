'use strict'

/**
 * Face Route
 * path: /emails
 */

import express from 'express';
import Controller from '../controllers/EmailController';
let router = express.Router();

/**
* @swagger
* /emails/action:
*   post:
*     tags:
*       - Email Service
*     name: Send an email
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
router.post('/action', Controller.send_action_email.post);

export default router;