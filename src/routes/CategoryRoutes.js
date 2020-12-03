'use strict'

/**
 * Category Routes
 * path: /categories
 */

import express from 'express';
import Controller from '../controllers/CategoryController';
let router = express.Router();
//auth imports
import passport from 'passport';
import { isAdmin, isBankTeller, isManagerOrAdmin } from '../middlewares/authorization';

/**
* @swagger
* /categories:
*   get:
*     tags:
*       - Categories
*     name: Get categories.
*     summary: Get categories.
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
* /categories/counters/{counterId}:
*   get:
*     tags:
*       - Categories
*     name: Get services details by categoryId.
*     summary: Get services details by categoryId.
*     consumes:
*       - application/json
*     parameters:
*       - in: path
*         name: counterId
*         schema:
*          type: integer
*         description: Numeric ID of the user to get
*     responses:
*       200:
*         description: A list of services is displayed.
*       400:
*         description: Error.
*       401:
*         description: Forbidden.
*/
router.get('/counters/:counterId', passport.authenticate('jwt', { session: false }), isBankTeller, Controller.view_by_counter_id.get);


/**
* @swagger
* /categories/{categoryId}/services:
*   get:
*     tags:
*       - Categories
*     name: Get services with the corresponding category.
*     summary: Get services with the corresponding category.
*     consumes:
*       - application/json
*     parameters:
*       - in: path
*         name: categoryId
*         schema:
*          type: integer
*         description: categoryId to filter
*     responses:
*       200:
*         description: A list of services is displayed.
*       400:
*         description: Error.
*       401:
*         description: Forbidden.
*/
router.get('/:categoryId/services', passport.authenticate('jwt', { session: false }), isBankTeller, Controller.view_services_by_category_id.get);

/**
* @swagger
* /categories:
*   post:
*     tags:
*       - Categories
*     name: create categories.
*     summary: create new categories
*     consumes:
*       - application/json
*     requestBody:
*       required: true
*       content:
*         application/json:
*           schema:
*             type: object
*             properties:
*               categories:
*                 type: array
*                 items:
*                   type: object
*                   properties:
*                     categoryName:
*                       type: string
*                     subtitle:
*                       type: string
*     responses:
*       201:
*         description: A list of categories added is displayed.
*       400:
*         description: Error.
*       401:
*         description: Forbidden.
*/
router.post('/', passport.authenticate('jwt', { session: false }), isAdmin, Controller.bulk_create.post);

/**
* @swagger
* /categories:
*   put:
*     tags:
*       - Categories
*     name: Update categories.
*     summary: Update categories
*     consumes:
*       - application/json
*     requestBody:
*       required: true
*       content:
*         application/json:
*           schema:
*             type: object
*             properties:
*               categories:
*                 type: array
*                 items:
*                   type: object
*                   properties:
*                     id:
*                       type: integer
*                     categoryName:
*                       type: string
*                     subtitle:
*                       type: string
*     responses:
*       201:
*         description: A list of categories updated is displayed.
*       400:
*         description: Error.
*       401:
*         description: Forbidden.
*/
router.put('/', passport.authenticate('jwt', { session: false }), isAdmin, Controller.bulk_update.put);

/**
* @swagger
* /categories:
*   delete:
*     tags:
*       - Categories
*     name: Delete Category(s).
*     summary: Delete Category(s)
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
*         description: Number of categories deleted is displayed.
*       400:
*         description: Error.
*       401:
*         description: Forbidden.
*/
router.delete('/', passport.authenticate('jwt', { session: false }), isManagerOrAdmin, Controller.bulk_delete.delete);

export default router;
