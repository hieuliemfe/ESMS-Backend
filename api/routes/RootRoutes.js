

'use strict';

/**
* Public Route
* path: /
*/

let express = require('express');
let UserController = require('../controllers/UserController');
const { check, body } = require('express-validator');
let router = express.Router();

router.post('/login', [
  body('username')
    .not().isEmpty()
    .trim()
    .escape(),
  body('password')
    .not().isEmpty()
], UserController.login.post);

router.post('/register', [
  check('email', 'Invalid Email').isEmail().normalizeEmail(),
  check('username', 'Username must be at least 5 characters').isLength({ min: 5 }),
  check('password', 'Password must be at least 5 characters').isLength({ min: 5 }),
  check('confirmPassword', 'Password have to match Confirm Password').custom((value, { req, loc, path }) => {
    if (value !== req.body.confirmPassword) {
      throw new Error("Passwords don't match");
    } else {
      return value;
    }
  }),
], UserController.register.post);

router.get('/profile', UserController.profile.get);
module.exports = router;