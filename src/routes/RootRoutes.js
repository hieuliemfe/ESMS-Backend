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
*       - Root
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
*         description: Login Successful and return a JWT.
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
/**
* @swagger
* /bulk-register:
*   post:
*     tags:
*       - Root
*     name: Bulk register
*     summary: Register a list of users based on an Excel file.
*     consumes:
*       - multipart/form-data
*     parameters:
*         -in: formData
*         schema:
*           type: object
*           properties:
*             file:
*               type: file
*         required:
*     responses:
*       200:
*         description: List of users is added into the DB.
*       401:
*         description: Bad user(s) in the file
*/
router.post('/bulk-register', fileUpload.single("file"), UserController.bulk_register.post);
/**
* @swagger
* /register:
*   post:
*     tags:
*       - Root
*     name: Register
*     summary: Register a user
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
*             email:
*               type: string
*               format: email
*             password:
*               type: string
*               format: password
*             confirmPassword:
*               type: string
*               format: password
*         required:
*           - username
*           - password
*     responses:
*       201:
*         description: Register successful.
*       400:
*         description: Bad username, or found in db
*       403:
*         description: Password and confirm password doesn't match
*/
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
/**
* @swagger
* /profile/{username}:
*   get:
*     tags:
*       - Root
*     name: Profile
*     summary: Get a user details based on username.
*     consumes:
*       - application/json
*     parameters:
*       - in: path
*         name: username
*         schema:
*           type: string
*         required: true
*         description: Username to display info
*     responses:
*       200:
*         description: Displays user details
*       401:
*         description: User not found.
*/
router.get('/profile/:username', UserController.profile.get);
module.exports = router;