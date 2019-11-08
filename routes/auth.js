const express = require('express');

const router = express.Router();
const multer = require('../middleware/multer-config');
const dbDepts = require('../middleware/get-db-departments');
const dbUserEmails = require('../middleware/get-db-usersEmail');
const authenticate = require('../middleware/authenticate_admin');
const authCtrl = require('../controllers/auth');

router.post('/create-user', multer, authenticate /* dbDepts, dbUserEmails,  */);
// router.post('/login', authCtrl.login);

module.exports = router;
