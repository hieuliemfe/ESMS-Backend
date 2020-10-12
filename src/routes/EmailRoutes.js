'use strict'

/**
 * Face Route
 * path: /emails
 */

import express from 'express';
import Controller from '../controllers/EmailController';
let router = express.Router();
import passport from 'passport';
/**
* @swagger
* /emails/{id}:
*   post:
*     tags:
*       - Email Service
*     name: Send an email
*     summary: Send an email template to an employee
*     consumes:
*       - application/json
*     parameters:
*       - name: body
*         in: body
*         schema:
*           type: object
*           properties:
*             email:
*               type: string
*         required:
*           - email
*     responses:
*       200:
*         description: Email sent to employee.
*/
router.post('/email', Controller.send_email.post);

export default router;