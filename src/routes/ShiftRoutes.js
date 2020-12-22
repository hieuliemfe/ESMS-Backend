'use strict'

/**
 * Task Route
 * path: /shifts
 */

import express from 'express';
import Controller from '../controllers/ShiftController';
let router = express.Router();
//auth imports
import passport from 'passport';
import { isAdmin, isAuthorized } from '../middlewares/authorization';
import fileUpload from "../middlewares/fileUpload.js";

/**
* @swagger
* /shifts:
*   get:
*     tags:
*       - Shifts
*     name: Get shift types.
*     summary: get a list of shifts
*     consumes:
*       - application/json
*     responses:
*       200:
*         description: A list of shifts is displayed.
*       400:
*         description: Error.
*       401:
*         description: Forbidden.
*/
router.get('/', passport.authenticate('jwt', { session: false }), isAuthorized, Controller.view.get);

/**
* @swagger
* /shifts:
*   post:
*     tags:
*       - Shifts
*     name: Create shift(s).
*     summary: Create new shift(s)
*     consumes:
*       - application/json
*     requestBody:
*           content:
*             multipart/form-data:
*               schema:
*                 type: object
*                 properties:
*                   file:
*                     type: string
*                     format: binary
*     responses:
*       201:
*         description: A list of counters added is displayed.
*       400:
*         description: Error.
*       401:
*         description: Forbidden.
*/
router.post('/', passport.authenticate('jwt', { session: false }), isAdmin, fileUpload.single("file"), Controller.create_bulk.post);

/**
* @swagger
* /shifts:
*   put:
*     tags:
*       - Shifts
*     name: Update shift(s).
*     summary: Update new shift(s)
*     consumes:
*       - application/json
*     requestBody:
*       required: true
*       content:
*         application/json:
*           schema:
*             type: object
*             properties:
*               shifts:
*                 type: array
*                 items:
*                   type: object
*                   properties:
*                     id:
*                       type: integer
*                     name:
*                       type: string
*                     shiftStart:
*                       type: string
*                     shiftEnd:
*                       type: string
*     responses:
*       201:
*         description: A list of counters added is displayed.
*       400:
*         description: Error.
*       401:
*         description: Forbidden.
*/
router.put('/', passport.authenticate('jwt', { session: false }), isAdmin, Controller.update_bulk.put);

/**
* @swagger
* /shifts:
*   delete:
*     tags:
*       - Shifts
*     name: Delete shift(s).
*     summary: Delete shift(s)
*     consumes:
*       - application/json
*     requestBody:
*       required: true
*       content:
*         application/json:
*           schema:
*             type: object
*             properties:
*               ids:
*                 type: array
*                 items:
*                   type: integer
*     responses:
*       201:
*         description: A list of counters added is displayed.
*       400:
*         description: Error.
*       401:
*         description: Forbidden.
*/
router.delete('/', passport.authenticate('jwt', { session: false }), isAdmin, Controller.bulk_delete.delete);
export default router;
