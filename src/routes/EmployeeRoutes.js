'use strict';

/**
 * Employee Route
 * path: /employees
 */

import express from 'express';
import Controller from '../controllers/EmployeeController';
let router = express.Router();
import fileUpload from "../middlewares/fileUpload.js";
//auth imports
import passport from 'passport';
import { isAdmin, isAuthorized } from '../middlewares/authorization';
import { isManager } from '../middlewares/authorization';

/**
* @swagger
* /employees:
*   get:
*     tags:
*       - Employees
*     name: Get all employees
*     summary: Get all employees details.
*     consumes:
*       - application/json
*     parameters:
*       - name: role
*         in: query
*         required: false
*         description: "role 1: Admin, 2: Manager, 3: Bank teller"
*         schema:
*           type : integer
*           format: integer
*           minimum: 1
*           maximum: 3
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
router.get('/', passport.authenticate('jwt', { session: false }), isAuthorized, Controller.view.get);

/**
* @swagger
* /employees/add-appointment:
*   put:
*     tags:
*       - Employees
*     name: Add appointment
*     summary: Add new appointment.
*     consumes:
*       - application/json
*     parameters:
*       - name: appointmentTime
*         in: query
*         required: true
*         description: DateTime string of appointment time.
*         schema:
*           type : string
*       - name: bankTellerCode
*         in: query
*         required: true
*         description: employee code of bank teller to make an appointment.
*         schema:
*           type : string
*       - name: managerCode
*         in: query
*         required: true
*         description: employee code of manager to make an appointment.
*         schema:
*           type : string
*     responses:
*       200:
*         description: Displays employee details
*       401:
*         description: Employee not found.
*/
router.put('/add-appointment', passport.authenticate('jwt', { session: false }), isManager, Controller.add_appointment.put);

/**
* @swagger
* /employees/{employeeCode}:
*   get:
*     tags:
*       - Employees
*     name: Get employee details.
*     summary: Returns a employee by an [employee code].
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
*         description: Employee's details is displayed
*       404:
*         description: Employee not found.
*/
router.get('/:employeeCode', passport.authenticate('jwt', { session: false }), isAuthorized, Controller.view_one.get);

/**
* @swagger
* /employees/{employeeCode}/avatar:
*   put:
*     tags:
*       - Employees
*     name: Update a employee's avatar
*     summary: Update a employee's avatar based on an [employee code].
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
*         description: Employee's avatar is updated.
*       404:
*         description: Employee not found.
*/
router.put('/:id/avatar', passport.authenticate('jwt', { session: false }), isManager, Controller.update_avatar_url.put);

/**
* /employees/{employeeCode}/subscription:
*   put:
*     tags:
*       - Employees
*     name: Update subscription status
*     summary: Update a employee's subscription based on an [employee code].
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
*         description: Updated employee's subscription status.
*       401:
*         description: Employee not found.
*/
// router.put('/:employeeCode/subscription', passport.authenticate('jwt', { session: false }), isManager, Controller.set_subscription_status.put);

/**
* @swagger
* /employees/{employeeCode}/suspend:
*   post:
*     tags:
*       - Employees
*     name: Suspend bank teller
*     summary: Suspend a bank teller for a temporary period of time.
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
*               reason:
*                 type: string
*               start:
*                 type: string
*               expiration:
*                 type: string
*     responses:
*       200:
*         description: Updated employee's subscription status.
*       401:
*         description: Employee not found.
*/
router.post('/:employeeCode/suspend', passport.authenticate('jwt', { session: false }), isManager, Controller.suspend.post);

/**
* @swagger
* /employees/{employeeCode}/suspend:
*   put:
*     tags:
*       - Employees
*     name: Update suspension of bank teller
*     summary: Update suspension information of a bank teller.
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
*               id:
*                 type: integer
*               reason:
*                 type: string
*               expiration:
*                 type: string
*     responses:
*       200:
*         description: Updated employee's subscription status.
*       401:
*         description: Employee not found.
*/
router.put('/:employeeCode/suspend', passport.authenticate('jwt', { session: false }), isManager, Controller.update_suspension.put);

/**
* @swagger
* /employees:
*   put:
*     tags:
*       - Employees
*     name: Update bank teller info
*     summary: Update information of a bank teller.
*     consumes:
*       - application/json
*     requestBody:
*       required: true
*       content:
*         application/json:
*           schema:
*             type: object
*             properties:
*               employeeCode:
*                 type: string
*               fullname:
*                 type: string
*               roleId:
*                 type: integer
*               counterId:
*                 type: integer  
*               phoneNumber:
*                 type: string
*               email:
*                 type: string
*     responses:
*       200:
*         description: Updated employee's subscription status.
*       401:
*         description: Employee not found.
*/
router.put('/', passport.authenticate('jwt', { session: false }), isAdmin, Controller.update_employee.put);

/**
* @swagger
* /employees/{employeeCode}/suspend/{suspensionId}:
*   delete:
*     tags:
*       - Employees
*     name: Delete suspension of bank teller
*     summary: Delete suspension information of a bank teller.
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
*       - name: suspensionId
*         in: path
*         required: true
*         description: Select a suspension with matching suspensionId.
*         schema:
*           type : integer
*     responses:
*       201:
*         description: Suspension is deleted.
*       401:
*         description: Employee not found.
*/
router.delete('/:employeeCode/suspend/:suspensionId', passport.authenticate('jwt', { session: false }), isManager, Controller.delete_suspension.delete);


/**
* @swagger
* /employees/{employeeCode}:
*   delete:
*     tags:
*       - Employees
*     name: Delete a employee.
*     summary: Delete a employee based on an [employee code].
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
*         description: Employee's details is deleted
*       404:
*         description: Employee not found.
*/
router.delete('/:employeeCode', passport.authenticate('jwt', { session: false }), isAdmin, Controller.set_avail_status.delete);

/**
* @swagger
* /employees/bulk-register:
*   post:
*     tags:
*       - Employees
*     name: Bulk register
*     summary: Register a list of employees based on an Excel file.
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
*       200:
*         description: List of employees is added into the DB.
*       401:
*         description: Bad employee(s) in the file
*/
router.post('/bulk-register', passport.authenticate('jwt', { session: false }), isAdmin, fileUpload.single("file"), Controller.bulk_register.post);

export default router;
