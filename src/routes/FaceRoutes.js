'user strict'

/**
 * Face Route
 * path: /faces
 */

let express = require('express');
let Controller = require('../controllers/FaceController');
let router = express.Router();
let passport = require('passport');;
//router.get('/', passport.authenticate('jwt', {session: false}), isAdmin, Controller.view.get);
// router.get('/', Controller.view.get);
router.get('/upload', Controller.upload.get);
module.exports = router;