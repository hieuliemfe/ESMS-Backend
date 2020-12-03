'use strict'

/**
 * Queue Route
 * path: /waiting-list
 */

import express from 'express';
import Controller from '../controllers/WaitingListController';
let router = express.Router();
//auth imports
import passport from 'passport';
import { isBankTeller } from '../middlewares/authorization';

/**
* @swagger
* /waiting-list:
*   get:
*     tags:
*       - Waiting List
*     name: Get waiting customers.
*     summary: get a list of waiting customers
*     consumes:
*       - application/json
*     responses:
*       200:
*         description: A list of waiting customers is displayed.
*       400:
*         description: Error.
*       401:
*         description: Forbidden.
*/
router.get('/', passport.authenticate('jwt', { session: false }), isBankTeller, Controller.view.get);

/**
* @swagger
* /waiting-list:
*   post:
*     tags:
*       - Waiting List
*     name: Add a customer to waiting list
*     summary: Add a customer to waiting list
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
*               customerName:
*                 type: string
*     responses:
*       200:
*         description: Queue is created.
*/
// router.post('/', passport.authenticate('jwt', { session: false }), isBankTeller, Controller.create.post);
router.post('/', Controller.create.post);

/**
* @swagger
* /waiting-list/assign:
*   post:
*     tags:
*       - Waiting List
*     name: Assign a customer to a counter
*     summary: Assign a customer to an counter
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
*               id:
*                 type: integer
*     responses:
*       200:
*         description: Email sent to employee.
*/
router.post('/assign', passport.authenticate('jwt', { session: false }), isBankTeller, Controller.assign_queue.post);

/**
* @swagger
* /waiting-list/{id}:
*   delete:
*     tags:
*       - Waiting List
*     name: Delete a customer out of waiting list
*     summary: Delete a customer out of waiting list based on id
*     consumes:
*       - application/json
*     parameters:
*       - in: path
*         name: id
*         schema:
*          type: integer
*         description: ID to delete
*     responses:
*       200:
*         description: All waiting customers deleted.
*/
router.delete('/:id', passport.authenticate('jwt', { session: false }), isBankTeller, Controller.delete.delete);

/**
* @swagger
* /waiting-list/{id}:
*   put:
*     tags:
*       - Waiting List
*     name: send back a customer to the end of the waiting list
*     summary: send back a customer to the end of the waiting list
*     consumes:
*       - application/json
*     parameters:
*       - in: path
*         name: id
*         schema:
*          type: integer
*         description: Queue ID to send to the back
*     responses:
*       200:
*         description: A customer sent to the end of the wating list.
*/
router.put('/:id', passport.authenticate('jwt', { session: false }), isBankTeller, Controller.sendBack.put);


/**
* @swagger
* /waiting-list/delete-all:
*   delete:
*     tags:
*       - Waiting List
*     name: Delete all waiting customers
*     summary: Delete all waiting customers
*     consumes:
*       - application/json
*     responses:
*       200:
*         description: All waiting customers deleted.
*/
router.delete('/delete-all', passport.authenticate('jwt', { session: false }), isBankTeller, Controller.delete_all.delete);

export default router;
