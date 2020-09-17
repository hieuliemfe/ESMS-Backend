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
* /users/{id}:
*   get:
*     tags:
*       - Users
*     name: Get user details.
*     summary: get a user's details based on id.
*     consumes:
*       - application/json
*     responses:
*       200:
*         description: User's details is displayed
*       404:
*         description: User not found.
*/
router.get('/:id', Controller.view_one.get);

/**
* @swagger
* /users/{id}:
*   put:
*     tags:
*       - Users
*     name: Update a user's info
*     summary: Update a user's info based on id.
*     consumes:
*       - application/json
*     parameters:
*       - in: path
*         name: id
*         schema:
*           type: string
*         required: true
*         description: id to update avatar.
*       - in: body
*         name: body
*         schema:
*           type: object
*           properties:
*             email:
*               type: string
*             avatarUrl:
*               type: string
*             phoneNumber:
*               type: string
*             roleId:
*               type: int
*             isSubscribed:
*               type: boolean
*             isDeleted:
*               type: boolean
*     responses:
*       200:
*         description: User's avatar is updated.
*       404:
*         description: User not found.
*/
router.put('/:id', Controller.update.put);

/**
* @swagger
* /users/{id}/avatar:
*   put:
*     tags:
*       - Users
*     name: Update a user's avatar
*     summary: Update a user's avatar based on id.
*     consumes:
*       - application/json
*     parameters:
*       - in: path
*         name: id
*         schema:
*           type: string
*         required: true
*         description: id to update avatar.
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
router.put('/:id/avatar', Controller.update_avatar_url.put);

/**
* @swagger
* /users/{id}/subscription:
*   put:
*     tags:
*       - Users
*     name: Update subscription status
*     summary: Update a user's subscription based on UserID.
*     consumes:
*       - application/json
*     parameters:
*       - in: path
*         name: id
*         schema:
*           type: string
*         required: true
*         description: id to update subscription status.
*     responses:
*       200:
*         description: Updated user's subscription status.
*       401:
*         description: User not found.
*/
router.put('/subscription/:id', Controller.set_subscription_status.put);

/**
* @swagger
* /users/{id}:
*   delete:
*     tags:
*       - Users
*     name: Delete a user.
*     summary: Delete a user based on UserID.
*     consumes:
*       - application/json
*     responses:
*       200:
*         description: User's details is deleted
*       404:
*         description: User not found.
*/
router.delete('/:id', Controller.set_avail_status.delete);
module.exports = router;