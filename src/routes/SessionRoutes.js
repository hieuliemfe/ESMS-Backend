'use strict'

/**
 * Sessions Route
 * path: /sessions
 */

import express from 'express';
import Controller from '../controllers/SessionController';
let router = express.Router();
//auth imports
import passport from 'passport';
import { isAuthorized, isBankTeller, isManager } from '../middlewares/authorization';

/**
* @swagger
* /sessions:
*   get:
*     tags:
*       - Sessions
*     name: Get session(s)'s details by shiftId .
*     summary: get a employee's details based on an [employee code] or a [fullname].
*     consumes:
*       - application/json
*     parameters:
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
*       - name: fullname
*         in: query
*         required: false
*         description: Employee's fullname to filter
*         schema:
*           type : string
*           format: string
*       - name: employeeCode
*         in: query
*         required: false
*         description: Employee's code to filter
*         schema:
*           type : string
*           format: string
*       - name: status
*         in: query
*         required: false
*         description: sessionStatus to filter (negative || positive || neutral || emotionless)
*         schema:
*           type : string
*           format: string
*       - name: shiftType
*         in: query
*         required: false
*         description: shiftType to filter (morning || afternoon || night)
*         schema:
*           type : string
*           format: string
*       - name: limit
*         in: query
*         required: false
*         description: Default value is 10.
*         schema:
*           type : integer
*       - name: page
*         in: query
*         required: false
*         description: Default value is 1.
*         schema:
*           type : integer
*     responses:
*       200:
*         description: A list of sessions is displayed.
*       400:
*         description: Error.
*/
router.get('/', passport.authenticate('jwt', { session: false }), isAuthorized, Controller.view.get);

/**
* @swagger
* /sessions/available:
*   get:
*     tags:
*       - Sessions
*     name: Get session(s)'s details by shiftId .
*     summary: get a employee's details based on an [employee code] or a [fullname].
*     consumes:
*       - application/json
*     parameters:
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
*       - name: employeeCode
*         in: query
*         required: false
*         description: Employee's code to filter
*         schema:
*           type : string
*           format: string
*     responses:
*       200:
*         description: A list of sessions is displayed.
*       400:
*         description: Error.
*/
router.get('/available', passport.authenticate('jwt', { session: false }), isAuthorized, Controller.available.get);

/**
* @swagger
* /sessions:
*   post:
*     tags:
*       - Sessions
*     name: Create a session
*     summary: Create an employee's session with a customer.
*     consumes:
*       - application/json
*     responses:
*       201:
*         description: Session's created.
*/
router.post('/', passport.authenticate('jwt', { session: false }), isBankTeller, Controller.create.post);

/**
* @swagger
* /sessions/{sessionId}:
*   get:
*     tags:
*       - Sessions
*     name: Get a session details
*     summary: Get a session details using sessionId
*     consumes:
*       - application/json
*     parameters:
*       - in: path
*         name: sessionId
*         schema:
*           type: string
*         description: Get session based on sessionId.
*     responses:
*       201:
*         description: Session's added.
*/
router.get('/:sessionId', passport.authenticate('jwt', { session: false }), isManager, Controller.view_one.get);

/**
* @swagger
* /sessions/{sessionId}/start:
*   put:
*     tags:
*       - Sessions
*     name: Update a session
*     summary: Update a session with periods & emotions.
*     consumes:
*       - application/json
*     parameters:
*       - in: path
*         name: sessionId
*         schema:
*           type: string
*         description: Get session based on sessionId.
*     responses:
*       201:
*         description: Session's added.
*/
router.put('/:sessionId/start', passport.authenticate('jwt', { session: false }), isBankTeller, Controller.start_session.put);

/**
* @swagger
* /sessions/{sessionId}/end:
*   put:
*     tags:
*       - Sessions
*     name: Update a session
*     summary: Update a session with periods & emotions.
*     consumes:
*       - application/json
*     parameters:
*       - in: path
*         name: sessionId
*         schema:
*           type: string
*         description: Get session based on sessionId.
*     requestBody:
*       required: true
*       content:
*         application/json:
*           schema:
*             type: object
*             properties:
*               emotions:
*                 type: array
*                 items:
*                   type: object
*                   properties:
*                     emotion:
*                       type: integer
*                       value: 0
*                     periods:
*                       type: array
*                       items:
*                           type: object
*                           properties:
*                               duration:
*                                   type: integer
*                                   value: 0
*                               periodStart:
*                                   type: integer
*                                   value: 0
*                               periodEnd:
*                                   type: integer
*                                   value: 0
*               info:
*                   type: string
*             example:
*               emotions:
*                   [
                        {
                        "emotion": 1,
                        "periods": [
                            {
                            "duration": 6059,
                            "periodStart": 12182,
                            "periodEnd": 18241
                            },
                            {
                            "duration": 8268,
                            "periodStart": 21662,
                            "periodEnd": 29930
                            },
                            {
                            "duration": 3772,
                            "periodStart": 33322,
                            "periodEnd": 37094
                            }
                        ]
                        },
                        {
                        "emotion": 2,
                        "periods": []
                        },
                        {
                        "emotion": 3,
                        "periods": []
                        },
                        {
                        "emotion": 4,
                        "periods": []
                        },
                        {
                        "emotion": 5,
                        "periods": [
                            {
                            "duration": 1268,
                            "periodStart": 18241,
                            "periodEnd": 19509
                            },
                            {
                            "duration": 0,
                            "periodStart": 28393,
                            "periodEnd": 28393
                            },
                            {
                            "duration": 0,
                            "periodStart": 34568,
                            "periodEnd": 34568
                            }
                        ]
                        },
                        {
                        "emotion": 6,
                        "periods": []
                        },
                        {
                        "emotion": 7,
                        "periods": [
                            {
                            "duration": 0,
                            "periodStart": 22042,
                            "periodEnd": 22042
                            },
                            {
                            "duration": 0,
                            "periodStart": 30742,
                            "periodEnd": 30742
                            },
                            {
                            "duration": 1619,
                            "periodStart": 31250,
                            "periodEnd": 32869
                            }
                        ]
                        },
                        {
                        "emotion": 8,
                        "periods": [
                            {
                            "duration": 11925,
                            "periodStart": 0,
                            "periodEnd": 11925
                            }
                        ]
                        }
                    ]
*               info: "{\"total_session_duration\":37094,\"emotions_duration\":[18099,0,0,0,1268,0,1619,11925],\"emotions_period_count\":[3,0,0,0,3,0,3,1],\"negative_emotions_duration\":30024,\"positive_emotions_duration\":1619,\"neutral_emotions_duration\":1268,\"no_face_detected_duration\":0,\"negative_emotions_period_count\":4,\"positive_emotions_period_count\":3,\"neutral_emotion_period_count\":3,\"no_face_detected_period_count\":0,\"unidentified_period_duration\":4183,\"no_face_detected_warning\":0,\"angry_warning\":2,\"angry_duration_warning_max\":8268,\"no_face_detected_duration_warning_max\":0,\"emotionless_warning\":false,\"emotion_level\":-0.977982}"
*     responses:
*       201:
*         description: Session's added.
*/
router.put('/:sessionId/end', passport.authenticate('jwt', { session: false }), isBankTeller, Controller.end_session.put);

export default router;
