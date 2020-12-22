'use strict'

/**
 * Category Routes
 * path: /services
 */

import express from 'express';
import Controller from '../controllers/ServiceController';
let router = express.Router();
//auth imports
import passport from 'passport';
import { isAdmin } from '../middlewares/authorization';
import fileUpload from "../middlewares/fileUpload.js";

/**
* @swagger
* /services:
*   get:
*     tags:
*       - Services
*     name: Get Services.
*     summary: Get Services.
*     consumes:
*       - application/json
*     responses:
*       200:
*         description: A list of task types is displayed.
*       400:
*         description: Error.
*       401:
*         description: Forbidden.
*/
router.get('/', Controller.view_all.get);

/**
* @swagger
* /services:
*   post:
*     tags:
*       - Services
*     name: Create service(s).
*     summary: Create new service(s)
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
router.post('/', passport.authenticate('jwt', { session: false }), isAdmin, fileUpload.single("file"), Controller.bulk_create.post);

/**
* @swagger
* /services:
*   put:
*     tags:
*       - Services
*     name: Update service(s).
*     summary: Update new service(s)
*     consumes:
*       - application/json
*     requestBody:
*       required: true
*       content:
*         application/json:
*           schema:
*             type: object
*             properties:
*               services:
*                 type: array
*                 items:
*                   type: object
*                   properties:
*                     id:
*                       type: integer
*                     name:
*                       type: string
*                     code:
*                       type: integer
*                     categoryId:
*                       type: integer
*     responses:
*       201:
*         description: A list of services added is displayed.
*       400:
*         description: Error.
*       401:
*         description: Forbidden.
*/
router.put('/', passport.authenticate('jwt', { session: false }), isAdmin, Controller.update_bulk.put);

/**
* @swagger
* /services:
*   delete:
*     tags:
*       - Services
*     name: Delete service(s).
*     summary: Delete service(s)
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
*         description: A list of services added is displayed.
*       400:
*         description: Error.
*       401:
*         description: Forbidden.
*/
router.delete('/', passport.authenticate('jwt', { session: false }), isAdmin, Controller.bulk_delete.delete);
export default router;