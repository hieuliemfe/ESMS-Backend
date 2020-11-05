'use strict'

/**
 * Manager Route
 * path: /managers
 */

import express from 'express';
import Controller from '../controllers/ManagerController';
import passport from 'passport';
import { isManager } from '../middlewares/authorization';

let router = express.Router();

/**
* @swagger
* /managers/stress-criterias:
*   get:
*     tags:
*       - Managers - Stress levels
*     name: Get stress sensitivity level for .env
*     summary: Get stress sensitivity level for .env
*     parameters:
*       - name: periodicityId
*         in: query
*         required: false
*         description: Time period for the action (1 - daily | 2 - weekly | 3- monthly | 4 - yearly)
*         schema:
*           type : integer
*           format: string
*     consumes:
*       - application/json
*     responses:
*       200:
*         description: Levels updated.
*/
router.get('/stress-criterias', passport.authenticate('jwt', { session: false }), isManager, Controller.get_stress_criterias.get);

/**
* @swagger
* /managers/stress-criterias:
*   post:
*     tags:
*       - Managers - Stress levels - Criteria
*     name: Add stress sensitivity level for .env
*     summary: Add stress sensitivity level for .env
*     requestBody:
*       required: true
*       content:
*         application/json:
*           schema:
*             type: object
*             properties:
*               condition:
*                 type: string
*               operator:
*                 type: string
*                 limit: 2
*               comparingNumber:
*                 type: integer
*     responses:
*       200:
*         description: level updated.
*/
router.post('/stress-criterias', passport.authenticate('jwt', { session: false }), isManager, Controller.create_stress_criteria.post);

/**
* @swagger
* /managers/stress-criterias/suggestions:
*   post:
*     tags:
*       - Managers - Stress levels - Suggestion
*     name: Add stress sensitivity level for .env
*     summary: Add stress sensitivity level for .env
*     requestBody:
*       required: true
*       content:
*         application/json:
*           schema:
*             type: object
*             properties:
*               criteriaId:
*                 type: integer
*               percentageLimit:
*                 type: integer
*               periodicityId:
*                 type: integer
*               link:
*                 type: string
*               suggestion:
*                 type: string
*     responses:
*       200:
*         description: suggestion added.
*/
router.post('/stress-criterias/suggestions', passport.authenticate('jwt', { session: false }), isManager, Controller.create_stress_suggestion.post);

/**
* @swagger
* /managers/stress-criterias/{criteriaId}:
*   put:
*     tags:
*       - Managers - Stress levels - Criteria
*     name: set stress sensitivity level for .env
*     summary: set stress sensitivity level for .env
*     parameters:
*       - name: criteriaId
*         in: path
*         required: true
*         description: Select a stress level with matching id.
*         schema:
*           type : integer
*           format: string
*           minimum: 1
*     requestBody:
*       required: true
*       content:
*         application/json:
*           schema:
*             type: object
*             properties:
*               condition:
*                 type: string
*               operator:
*                 type: string
*               comparingNumber:
*                 type: integer
*     responses:
*       200:
*         description: level updated.
*/
router.put('/stress-criterias/:criteriaId', passport.authenticate('jwt', { session: false }), isManager, Controller.update_stress_criteria.put);

/**
* @swagger
* /managers/stress-criterias/suggestions/{suggestionId}:
*   put:
*     tags:
*       - Managers - Stress levels - Suggestion
*     name: set stress sensitivity level for .env
*     summary: set stress sensitivity level for .env
*     parameters:
*       - name: suggestionId
*         in: path
*         required: true
*         description: Select a stress level with matching id.
*         schema:
*           type : integer
*           format: string
*           minimum: 1
*     requestBody:
*       required: true
*       content:
*         application/json:
*           schema:
*             type: object
*             properties:
*               criteriaId:
*                 type: integer
*               percentageLimit:
*                 type: integer
*               periodicityId:
*                 type: integer
*               link:
*                 type: string
*               suggestion:
*                 type: string
*     responses:
*       200:
*         description: level updated.
*/
router.put('/stress-criterias/suggestions/:suggestionId', passport.authenticate('jwt', { session: false }), isManager, Controller.update_stress_suggestion.put);

/**
* @swagger
* /managers/stress-criterias/{criteriaId}:
*   delete:
*     tags:
*       - Managers - Stress levels - Criteria
*     name: delete a stress sensitivity level for .env
*     summary: delete a  stress sensitivity level for .env
*     parameters:
*       - name: criteriaId
*         in: path
*         required: true
*         description: Select a stress level with matching id.
*         schema:
*           type : integer
*           format: string
*           minimum: 1
*     responses:
*       200:
*         description: level updated.
*/
router.delete('/stress-criterias/:criteriaId', passport.authenticate('jwt', { session: false }), isManager, Controller.delete_stress_level.delete);

/**
* @swagger
* /managers/stress-criterias/suggestions/{suggestionId}:
*   delete:
*     tags:
*       - Managers - Stress levels - Suggestion
*     name: delete a stress suggestion level for .env
*     summary: delete a  stress sensitivity level for .env
*     parameters:
*       - name: suggestionId
*         in: path
*         required: true
*         description: Select a stress level with matching id.
*         schema:
*           type : integer
*           format: string
*           minimum: 1
*     responses:
*       200:
*         description: level updated.
*/
router.delete('/stress-criterias/suggestions/:suggestionId', passport.authenticate('jwt', { session: false }), isManager, Controller.delete_stress_suggestion.delete);

/**
* @swagger
* /managers/negative-criterias:
*   get:
*     tags:
*       - Managers - Negative levels
*     name: Get negative sensitivity level for .env
*     summary: Get stress sensitivity level for .env
*     parameters:
*       - name: periodicityId
*         in: query
*         required: false
*         description: Time period for the action (1 - daily | 2 - weekly | 3- monthly | 4 - yearly)
*         schema:
*           type : integer
*           format: string
*     consumes:
*       - application/json
*     responses:
*       200:
*         description: Result found
*       401:
*         description: Unauthorized
*/
router.get('/negative-criterias', passport.authenticate('jwt', { session: false }), isManager, Controller.get_negative_emotion_criterias.get);

/**
* @swagger
* /managers/negative-criterias:
*   post:
*     tags:
*       - Managers - Negative levels - Criteria
*     name: create negative sensitivity level for .env
*     summary: create negative sensitivity level for .env
*     requestBody:
*       required: true
*       content:
*         application/json:
*           schema:
*             type: object
*             properties:
*               condition:
*                 type: string
*     responses:
*       200:
*         description: level updated.
*/
router.post('/negative-criterias', passport.authenticate('jwt', { session: false }), isManager, Controller.create_negative_emotion_criteria.post);


/**
* @swagger
* /managers/negative-criterias/actions:
*   post:
*     tags:
*       - Managers - Negative levels - Action
*     name: Add Negative sensitivity level for .env
*     summary: Add stress sensitivity level for .env
*     requestBody:
*       required: true
*       content:
*         application/json:
*           schema:
*             type: object
*             properties:
*               limit:
*                 type: integer
*               criteriaId:
*                 type: integer
*               percentageLimit:
*                 type: integer
*               periodicityId:
*                 type: integer
*               action:
*                 type: string
*     responses:
*       200:
*         description: action added.
*/
router.post('/negative-criterias/actions', passport.authenticate('jwt', { session: false }), isManager, Controller.create_negative_emotion_action.post);

/**
* @swagger
* /managers/negative-criterias/{criteriaId}:
*   put:
*     tags:
*       - Managers - Negative levels - Criteria
*     name: set negative sensitivity level for the system
*     summary: set negative sensitivity level for the system
*     parameters:
*       - name: criteriaId
*         in: path
*         required: true
*         description: Select a negative level
*         schema:
*           type : integer
*           format: string
*           minimum: 1
*     requestBody:
*       required: true
*       content:
*         application/json:
*           schema:
*             type: object
*             properties:
*               condition:
*                 type: string
*     responses:
*       200:
*         description: level updated
*       401:
*         description: Unauthorized
*/
router.put('/negative-criterias/:criteriaId', passport.authenticate('jwt', { session: false }), isManager, Controller.update_negative_emotion_criteria.put);

/**
* @swagger
* /managers/negative-criterias/actions/{actionId}:
*   put:
*     tags:
*       - Managers - Negative levels - Action
*     name: Update Negative sensitivity level for .env
*     summary: Update stress sensitivity level for .env
*     parameters:
*       - name: actionId
*         in: path
*         required: true
*         description: Select a stress level with matching id.
*     requestBody:
*       required: true
*       content:
*         application/json:
*           schema:
*             type: object
*             properties:
*               limit:
*                 type: integer
*               criteriaId:
*                 type: integer
*               percentageLimit:
*                 type: integer
*               periodicityId:
*                 type: integer
*               action:
*                 type: string
*     responses:
*       200:
*         description: action added.
*/
router.put('/negative-criterias/actions/:actionId', passport.authenticate('jwt', { session: false }), isManager, Controller.update_negative_emotion_action.put);
/**
* @swagger
* /managers/negative-criterias/{criteriaId}:
*   delete:
*     tags:
*       - Managers - Negative levels - Criteria
*     name: set negative sensitivity level for the system
*     summary: set negative sensitivity level for the system
*     parameters:
*       - name: criteriaId
*         in: path
*         required: true
*         description: Select a stress level with matching id.
*         schema:
*           type : integer
*           format: string
*           minimum: 1
*     responses:
*       200:
*         description: level updated.
*/
router.delete('/negative-criterias/:criteriaId', passport.authenticate('jwt', { session: false }), isManager, Controller.delete_negative_emotion_criteria.delete);

/**
* @swagger
* /managers/negative-criterias/actions/{actionId}:
*   delete:
*     tags:
*       - Managers - Negative levels - Action
*     name: delete negative action level for the system
*     summary: delete negative action level for the system
*     parameters:
*       - name: actionId
*         in: path
*         required: true
*         description: Select a stress level with matching id.
*         schema:
*           type : integer
*           format: string
*           minimum: 1
*     responses:
*       200:
*         description: level updated.
*/
router.delete('/negative-criterias/actions/:actionId', passport.authenticate('jwt', { session: false }), isManager, Controller.delete_negative_emotion_action.delete);



export default router;
