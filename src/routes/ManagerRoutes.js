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
* /managers/stress-levels:
*   get:
*     tags:
*       - Managers - Stress levels
*     name: Get stress sensitivity level for .env
*     summary: Get stress sensitivity level for .env
*     consumes:
*       - application/json
*     responses:
*       200:
*         description: Levels updated.
*/
router.get('/stress-levels', passport.authenticate('jwt', { session: false }), isManager, Controller.get_stress_levels.get);

/**
* @swagger
* /managers/stress-levels:
*   post:
*     tags:
*       - Managers - Stress levels
*     name: Add stress sensitivity level for .env
*     summary: Add stress sensitivity level for .env
*     requestBody:
*       required: true
*       content:
*         application/json:
*           schema:
*             type: object
*             properties:
*               value:
*                 type: integer
*               description:
*                 type: string
*               link:
*                 type: string
*     responses:
*       200:
*         description: level updated.
*/
router.post('/stress-levels', passport.authenticate('jwt', { session: false }), isManager, Controller.create_stress_level.post);

/**
* @swagger
* /managers/stress-levels/{stressLevelId}:
*   put:
*     tags:
*       - Managers - Stress levels
*     name: set stress sensitivity level for .env
*     summary: set stress sensitivity level for .env
*     parameters:
*       - name: stressLevelId
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
*               value:
*                 type: integer
*               description:
*                 type: string
*               link:
*                 type: string
*     responses:
*       200:
*         description: level updated.
*/
router.put('/stress-levels/:stressLevelId', passport.authenticate('jwt', { session: false }), isManager, Controller.update_stress_level.put);

/**
* @swagger
* /managers/stress-levels/{stressLevelId}:
*   delete:
*     tags:
*       - Managers - Stress levels
*     name: delete a stress sensitivity level for .env
*     summary: delete a  stress sensitivity level for .env
*     parameters:
*       - name: stressLevelId
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
router.delete('/stress-levels/:stressLevelId', passport.authenticate('jwt', { session: false }), isManager, Controller.delete_stress_level.delete);

/**
* @swagger
* /managers/negative-levels:
*   get:
*     tags:
*       - Managers - Negative levels
*     name: Get negative sensitivity level for .env
*     summary: Get stress sensitivity level for .env
*     consumes:
*       - application/json
*     responses:
*       200:
*         description: Result found
*       401:
*         description: Unauthorized
*/
router.get('/negative-levels', passport.authenticate('jwt', { session: false }), isManager, Controller.get_negative_emotion_criterias.get);

/**
* @swagger
* /managers/negative-levels:
*   post:
*     tags:
*       - Managers - Negative levels
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
*               operator:
*                 type: string
*                 limit: 2
*               comparingNumber:
*                 type: integer
*     responses:
*       200:
*         description: level updated.
*/
router.post('/negative-levels', passport.authenticate('jwt', { session: false }), isManager, Controller.create_negative_emotion_criteria.post);

/**
* @swagger
* /managers/negative-levels/{criteriaId}:
*   put:
*     tags:
*       - Managers - Negative levels
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
*               operator:
*                 type: string
*                 limit: 2
*               comparingNumber:
*                 type: integer
*     responses:
*       200:
*         description: level updated
*       401:
*         description: Unauthorized
*/
router.put('/negative-levels/:criteriaId', passport.authenticate('jwt', { session: false }), isManager, Controller.update_negative_emotion_criteria.put);

/**
* @swagger
* /managers/negative-levels/{criteriaId}:
*   delete:
*     tags:
*       - Managers - Negative levels
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
router.delete('/negative-levels/:criteriaId', passport.authenticate('jwt', { session: false }), isManager, Controller.delete_negative_emotion_criteria.delete);

export default router;
