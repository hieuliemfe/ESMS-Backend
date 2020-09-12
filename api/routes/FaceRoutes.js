'user strict'

/**
 * Face Route
 * path: /faces
 */

let express = require('express');
let Controller = require('../controllers/FaceController');
let router = express.Router();
let passport = require('passport');
let {isAdmin} = require('../middlewares/authorization');
//router.get('/', passport.authenticate('jwt', {session: false}), isAdmin, Controller.view.get);
// router.get('/', Controller.view.get);
router.post('/upload', Controller.view_one.get);
module.exports = router;