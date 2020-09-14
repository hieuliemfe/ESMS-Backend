'use strict';

/**
 * User Route
 * path: /users
 */

let express = require('express');
let Controller = require('../controllers/UserController');
let router = express.Router();
let passport = require('passport');
let {isAdmin} = require('../middlewares/authorization');
//router.get('/', passport.authenticate('jwt', {session: false}), isAdmin, Controller.view.get);
router.get('/', Controller.view.get);
router.post('/email',Controller.send_email.post);
router.put('/subscription');
router.get('/:username', Controller.view_one.get);
router.put('/:username/avatar',Controller.update_avatar_url.put);
router.put('/:username/fullname',Controller.update_fullname.put);
router.put('/:username', Controller.set_avail_status.put);
module.exports = router;