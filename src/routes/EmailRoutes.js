'user strict'

/**
 * Face Route
 * path: /emails
 */

let express = require('express');
let Controller = require('../controllers/EmailController');
let router = express.Router();
let passport = require('passport');
/**
* @swagger
* /emails/{id}:
*   post:
*     tags:
*       - Email Service
*     name: Send an email
*     summary: Send an email template to a user
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
*         description: Email sent to user.
*/
router.post('/email', Controller.send_email.post);

module.exports = router;