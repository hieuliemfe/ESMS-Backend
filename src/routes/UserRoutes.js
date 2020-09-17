'use strict';

/**
 * User Route
 * path: /users
 */

let express = require('express');
let Controller = require('../controllers/UserController');
let router = express.Router();
let passport = require('passport');
let { isAdmin } = require('../middlewares/authorization');
//router.get('/', passport.authenticate('jwt', {session: false}), isAdmin, Controller.view.get);
/**
* @swagger
* /users/:
*   get:
*     tags:
*       - Users
*     name: Get all users
*     summary: Get all users details.
*     consumes:
*       - application/json
*     responses:
*       200:
*         description: Displays user details
*       401:
*         description: User not found.
*/
router.get('/', Controller.view.get);
/**
* @swagger
* /users/email:
*   post:
*     tags:
*       - Users
*     name: Send
*     summary: Send an email to a user based on a template
*     consumes:
*       - application/json
*     parameters:
*       - name: body
*         in: body
*         schema:
*           type: object
*           properties:
*             username:
*               type: string
*         required:
*           - username
*     responses:
*       200:
*         description: Email sent to user.
*/
router.post('/email', Controller.send_email.post);
/**
* @swagger
* /users/subscription/{username}:
*   put:
*     tags:
*       - Users
*     name: Update subscription status
*     summary: Update a user's subscription based on username.
*     consumes:
*       - application/json
*     parameters:
*       - in: path
*         name: username
*         schema:
*           type: string
*         required: true
*         description: Username to update subscription status.
*     responses:
*       200:
*         description: Updated user's subscription status.
*       401:
*         description: User not found.
*/
router.put('/subscription/:username', Controller.set_subscription_status.put);
router.get('/:username', Controller.view_one.get);
/**
* @swagger
* /users/avatar/{username}:
*   put:
*     tags:
*       - Users
*     name: Update a user's avatar
*     summary: Update a user's avatar based on username.
*     consumes:
*       - application/json
*     parameters:
*       - in: path
*         name: username
*         schema:
*           type: string
*         required: true
*         description: Username to update avatar.
*       - in: body
*         name: body
*         schema:
*           type: object
*           properties:
*             avatarUrl:
*               type: string
*           required: 
*               - avatarUrl
*     responses:
*       200:
*         description: User's avatar is updated.
*       404:
*         description: User not found.
*/
router.put('/:username/avatar', Controller.update_avatar_url.put);
/**
* @swagger
* /users/fullname/{username}:
*   put:
*     tags:
*       - Users
*     name: Update a user's fullname
*     summary: Update a user's fullname based on username.
*     consumes:
*       - application/json
*     parameters:
*       - in: path
*         name: username
*         schema:
*           type: string
*         required: true
*         description: Username to update fullname.
*       - in: body
*         name: body
*         schema:
*           type: object
*           properties:
*             fullname:
*               type: string
*           required: 
*               - fullname
*     responses:
*       200:
*         description: User's fullname is updated.
*       404:
*         description: User not found.
*/
router.put('/:username/fullname', Controller.update_fullname.put);
/**
* @swagger
* /users/{username}:
*   put:
*     tags:
*       - Users
*     name: Update a user's status
*     summary: Update a user's status based on username.
*     consumes:
*       - application/json
*     responses:
*       200:
*         description: User's status is updated
*       404:
*         description: User not found.
*/
router.put('/:username', Controller.set_avail_status.put);
module.exports = router;