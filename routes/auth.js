const express = require('express');

const router = express.Router();
const multer = require('../middleware/multer-config');
const dbDepts = require('../middleware/get-db-departments');
const dbUserEmails = require('../middleware/get-db-usersEmail');
const authenticate = require('../middleware/authenticate');
const authCtrl = require('../controllers/auth');

router.post('/create-user', authenticate.admin, multer, dbDepts, dbUserEmails, authCtrl.createUser);
// router.post('/login', authCtrl.login);

module.exports = router;
