const express = require('express');

const router = express.Router();
const multer = require('../middleware/multer-config');
const dbDepts = require('../middleware/get-db-departments');
const authenticate = require('../middleware/authenticate_admin');
const authCtrl = require('../controllers/auth');

const b = (req, res, next) => {
  console.log("before multer req body ");
  next();
}; 

const test1 = (req, res, next) => {
  console.log("hello world from TEST 1");
  next();
}; 
const test2 = (req, res, next) => {
  console.log("hello world from TEST 2");
   console.log("after multer req body ", req.body);
  next();
};

router.post('/create-user', test1, b, multer,  test2);
// router.post('/login', authCtrl.login);

module.exports = router;
