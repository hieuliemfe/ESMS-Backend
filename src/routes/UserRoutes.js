'use strict';

/**
 * User Route
 * path: /users
 */

import express from 'express';
import Controller from '../controllers/UserController';
let router = express.Router();
import fileUpload from "../middlewares/fileUpload.js";
//auth imports
import passport from 'passport';
import { isAdmin } from '../middlewares/authorization';
import { isManager } from '../middlewares/authorization';

/**
* @swagger
* /users:
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
router.get('/', passport.authenticate('jwt', {session: false}), isManager, Controller.view.get);

/**
* @swagger
* /users/{employeeCode}:
*   get:
*     tags:
*       - Users
*     name: Get user details.
*     summary: Returns a user by an [employee code].
*     parameters:
*       - name: employeeCode
*         in: path
*         required: true
*         description: Select an employee with matching employeeCode.
*         schema:
*           type : string
*           format: string
*           minimum: 1
*     consumes:
*       - application/json
*     responses:
*       200:
*         description: User's details is displayed
*       404:
*         description: User not found.
*/
router.get('/:employeeCode', passport.authenticate('jwt', {session: false}), isManager, Controller.view_one.get);

/**
* @swagger
* /users/{employeeCode}/avatar:
*   put:
*     tags:
*       - Users
*     name: Update a user's avatar
*     summary: Update a user's avatar based on an [employee code].
*     consumes:
*       - application/json
*     parameters:
*       - name: employeeCode
*         in: path
*         required: true
*         description: Select an employee with matching employeeCode.
*         schema:
*           type : string
*           format: string
*           minimum: 1
*     requestBody:
*       required: true
*       content:
*         application/json:
*           schema:
*             type: object
*             properties:
*               avatarUrl:
*                 type: string
*     responses:
*       200:
*         description: User's avatar is updated.
*       404:
*         description: User not found.
*/
router.put('/:id/avatar', passport.authenticate('jwt', {session: false}), isManager, Controller.update_avatar_url.put);

/**
* @swagger
* /users/{employeeCode}/subscription:
*   put:
*     tags:
*       - Users
*     name: Update subscription status
*     summary: Update a user's subscription based on an [employee code].
*     consumes:
*       - application/json
*     parameters:
*       - name: employeeCode
*         in: path
*         required: true
*         description: Select an employee with matching employeeCode.
*         schema:
*           type : string
*           format: string
*           minimum: 1
*     responses:
*       200:
*         description: Updated user's subscription status.
*       401:
*         description: User not found.
*/
router.put('/:employeeCode/subscription', passport.authenticate('jwt', {session: false}), isManager, Controller.set_subscription_status.put);

/**
* @swagger
* /users/{employeeCode}:
*   delete:
*     tags:
*       - Users
*     name: Delete a user.
*     summary: Delete a user based on an [employee code].
*     parameters:
*       - name: employeeCode
*         in: path
*         required: true
*         description: Select an employee with matching employeeCode.
*         schema:
*           type : string
*           format: string
*           minimum: 1
*     consumes:
*       - application/json
*     responses:
*       200:
*         description: User's details is deleted
*       404:
*         description: User not found.
*/
router.delete('/:employeeCode', passport.authenticate('jwt', {session: false}), isManager, Controller.set_avail_status.delete);

/**
* @swagger
* /bulk-register:
*   post:
*     tags:
*       - Users
*     name: Bulk register
*     summary: Register a list of users based on an Excel file.
*     consumes:
*       - multipart/form-data
*     parameters:
*         -in: formData
*         schema:
*           type: object
*           properties:
*             file:
*               type: file
*         required:
*     responses:
*       200:
*         description: List of users is added into the DB.
*       401:
*         description: Bad user(s) in the file
*/

router.post('/bulk-register', fileUpload.single("file"), Controller.bulk_register.post);

export default router;
