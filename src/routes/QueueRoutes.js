'use strict'

/**
 * Queue Route
 * path: /queues
 */

import express from 'express';
import Controller from '../controllers/QueueController';
let router = express.Router();
//auth imports
import passport from 'passport';
import { isBankTeller } from '../middlewares/authorization';

/**
* @swagger
* /queues:
*   get:
*     tags:
*       - Queues
*     name: Get queues.
*     summary: get a list of queues
*     consumes:
*       - application/json
*     responses:
*       200:
*         description: A list of queues is displayed.
*       400:
*         description: Error.
*       401:
*         description: Forbidden.
*/
router.get('/', passport.authenticate('jwt', { session: false }), isBankTeller, Controller.view.get);

/**
* @swagger
* /queues:
*   post:
*     tags:
*       - Queues
*     name: Create a queue
*     summary: Create a queue
*     consumes:
*       - application/json
*     requestBody:
*       required: true
*       content:
*         application/json:
*           schema:
*             type: object
*             properties:
*               categoryId:
*                 type: integer
*     responses:
*       200:
*         description: Queue is created.
*/
router.post('/', passport.authenticate('jwt', { session: false }), isBankTeller, Controller.create.post);


/**
* @swagger
* /queues/assign:
*   post:
*     tags:
*       - Queues
*     name: Assign a queue to a counter
*     summary: Assign a queue to an counter
*     consumes:
*       - application/json
*     requestBody:
*       required: true
*       content:
*         application/json:
*           schema:
*             type: object
*             properties:
*               counterId:
*                 type: integer
*               queueId:
*                 type: integer
*     responses:
*       200:
*         description: Email sent to employee.
*/
router.post('/assign', passport.authenticate('jwt', { session: false }), isBankTeller, Controller.assign_queue.post);

/**
* @swagger
* /queues/{queueId}:
*   delete:
*     tags:
*       - Queues
*     name: Delete a queue
*     summary: Delete a queue based on queueId
*     consumes:
*       - application/json
*     parameters:
*       - in: path
*         name: queueId
*         schema:
*          type: integer
*         description: Queue ID to delete
*     responses:
*       200:
*         description: All queues deleted.
*/
router.delete('/:queueId', passport.authenticate('jwt', { session: false }), isBankTeller, Controller.delete.delete);


/**
* @swagger
* /queues/delete-all:
*   delete:
*     tags:
*       - Queues
*     name: Delete all queues
*     summary: Delete all queues
*     consumes:
*       - application/json
*     responses:
*       200:
*         description: All queues deleted.
*/
router.delete('/delete-all', passport.authenticate('jwt', { session: false }), isBankTeller, Controller.delete_all.delete);

export default router;
