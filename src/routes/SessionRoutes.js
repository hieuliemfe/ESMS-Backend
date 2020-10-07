'user strict'

/**
 * Sessions Route
 * path: /sessions
 */

import express from 'express';
import Controller from '../controllers/SessionController';
let router = express.Router();
import passport from 'passport';
/**
* @swagger
* /sessions/:
*   post:
*     tags:
*       - Session Service
*     name: Add a session
*     summary: Add an employee's session with a customer.
*     consumes:
*       - application/json
*     parameters:
*       - name: body
*         in: body
*         schema:
*           type: object
*           properties:
*             sessionBegin:
*               type: string
*             sessionEnd:
*               type: string
*             emotions:
*               type: array
*               items:
*                 type: object
*                 properties:
*                   emotion:
*                     type:integer
*         required:
*           - email
*     responses:
*       200:
*         description: Email sent to user.
*/
router.post('/', Controller.create.post);
router.get('/',Controller.view.get);
export default router;