const jwt = require('jsonwebtoken');
const db = require('../dbconn');
const authCtrl = require('../controllers/auth');

module.exports = (req, res, next) => {
  console.log('INSIDE THE ADMIN EMPLOYEE FREAKING TESTER');
  try {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, process.env.USERS_TOKEN_SECRET);
    const { userId, email } = decodedToken;
    // console.log("expected user id : ", userId, " email :", email)
    // check if userId and email are attached to an account
    db.query('SELECT * FROM users WHERE "user_id"=$1 AND "email"=$2', [userId, email])
      .then(({ rowCount, rows }) => {
        const user = rowCount > 0 ? rows[0] : false;
        if (user) {
          console.log('is a valid user');
          db.query('SELECT job_title FROM job_roles WHERE job_id = $1', [user.job_role]).then((result) => {
            const { rowCount: rowC, rows: rowS } = result;
            // console.log('TRYING TO verify USER JOB AND RESULT IS : ', result);
            if (rowC > 0 && rowS[0].job_title === 'admin') {
              // global.$User = user;
              console.log('user verified to be an admin');
              try {
                db.$departments = {
                  d1003: ['j1004', 'j1006'],
                  d1002: ['j1001', 'j1005', 'j1003'],
                  d1001: ['j1002'],
                  d1004: ['j1007'],
                  d1005: ['j1008'],
                  d1006: ['j1009'],
                };
                db.$usersEmail = ['admin@gmail.com', 'user@gmail.com'];
                authCtrl.createUser(req, res);
                // next();
              } catch (error) {
                console.log('Error firing "next" to continue the execution ', error);
              }
            } else {
              console.log('User not admin', result);
              res.status(401).json({
                status: 'error',
                error: 'Invalid request',
              });
            }
          }).catch((error) => {
            console.log(error);
            res.status(401).json({
              status: 'error',
              error: 'Invalid request',
            });
          });
        } else {
          res.status(401).json({
            status: 'error',
            error: 'Invalid request',
          });
        }
      })
      .catch((error) => {
        console.log('MOTHUCKING FAILED TESTING IF USER EXIST', error);
        res.status(401).json({
          status: 'error',
          error: 'Invalid request',
        });
      });
  } catch (error) {
    console.log(error);
    res.status(401).json({
      status: 'error',
      error: 'Invalid request',
    });
  }
};
