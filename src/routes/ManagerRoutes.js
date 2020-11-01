'use strict'

/**
 * Manager Route
 * path: /managers
 */

import express from 'express';
import Controller from '../controllers/ManagerController';
let router = express.Router();

/**
* @swagger
* /managers/stress-levels/:
*   get:
*     tags:
*       - Managers
*     name: Get stress sensitivity level for .env
*     summary: Get stress sensitivity level for .env
*     consumes:
*       - application/json
*     responses:
*       200:
*         description: Email is sent.
*       417:
*         description: Bad employeeCode, type or date
*/
router.get('/stress-levels', Controller.get_stress_levels.get);

/**
* @swagger
* /managers/stress-levels/{stressLevelId}:
*   put:
*     tags:
*       - Managers
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
*         description: Email is sent.
*       417:
*         description: Bad employeeCode, type or date
*/
router.put('/stress-levels/:stressLevelId', Controller.update_stress_level.put);

export default router;

// /**
// * @swagger
// * /managers/stress-levels/:
// *   put:
// *     tags:
// *       - Managers
// *     name: set stress sensitivity level for .env
// *     summary: set stress sensitivity level for .env
// *     requestBody:
// *       required: true
// *       content:
// *         application/json:
// *           schema:
// *             type: object
// *             properties:
// *               stress_levels:
// *                 type: array
// *                 items:
// *                   type: object
// *                   properties:
// *                     value:
// *                       type: integer
// *                     description:
// *                       type: string
// *                     link:
// *                       type: string
// *     responses:
// *       200:
// *         description: Email is sent.
// *       417:
// *         description: Bad employeeCode, type or date
// */