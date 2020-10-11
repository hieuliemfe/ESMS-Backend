'use strict'

/**
 * Face Route
 * path: /faces
 */

import express from 'express';
import Controller from '../controllers/FaceController';
let router = express.Router();
import passport from 'passport';
//router.get('/', passport.authenticate('jwt', {session: false}), isAdmin, Controller.view.get);
// router.get('/', Controller.view.get);
router.get('/upload', Controller.upload.get);
export default router;