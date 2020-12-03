'use strict';

/**
 * Report Routes
 * path: /reports
 */

import express from 'express';
import Controller from '../controllers/ReportController';
let router = express.Router();
import passport from 'passport';
import { isManager } from '../middlewares/authorization';

/**
* @swagger
* /reports:
*   get:
*     tags:
*       - Reports
*     name: Get report details.
*     summary: Get report details.
*     consumes:
*       - application/json
*     parameters:
*       - name: employeeCode
*         in: query
*         required: false
*         description: employee code
*         schema:
*           type : string
*           nullable: true
*           allowEmptyValue: true
*       - name: type
*         in: query
*         required: true
*         description: json/pdf/xlsx.
*         schema:
*           type : string
*           
*       - name: startDate
*         in: query
*         required: false
*         description: (yyyy-mm-ddThh:mm:ss) Selected date that is used as a starting point for the period.
*         schema:
*           type : string
*           format: date-time
*       - name: endDate
*         in: query
*         required: false
*         description: (yyyy-mm-ddThh:mm:ss) Selected date that is used as a ending point for the period.
*         schema:
*           type : string
*           format: date-time
*     responses:
*       200:
*         description: Displays employee details
*       401:
*         description: Employee not found.
*/
router.get('/', passport.authenticate('jwt', { session: false }), isManager, Controller.view.get);

export default router;