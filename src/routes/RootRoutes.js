'use strict';

/**
* Public Route
* path: /
*/

let express = require('express');
let UserController = require('../controllers/UserController');
const { check, body } = require('express-validator');
let router = express.Router();
const fileUpload = require("../middlewares/fileUpload.js");
/**
* @swagger
* /login:
*   post:
*     tags:
*       - Users
*     name: Login
*     summary: Login a user
*     consumes:
*       - application/json
*     parameters:
*       - name: body
*         in: body
*         schema:
*           type: object
*           properties:
*             username:
*               type: string
*             password:
*               type: string
*               format: password
*         required:
*           - username
*           - password
*     responses:
*       200:
*         description: User found and logged in successfully
*       401:
*         description: Bad username, not found in db
*       403:
*         description: Username and password don't match
*/
router.post('/login', [
  body('username')
    .not().isEmpty()
    .trim()
    .escape(),
  body('password')
    .not().isEmpty()
], UserController.login.post);
router.post('/bulk-register', fileUpload.single("file"), UserController.bulk_register.post);
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