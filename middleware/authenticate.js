const jwt = require('jsonwebtoken');
const db = require('../dbconn');

exports.parseUser = (req) => new Promise((resolve, reject) => {
  /* must have first called get-db-userTokenSecret in router list of middlewares */

  try {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, process.env.USERS_TOKEN_SECRET);
    const { userId, email } = decodedToken;
    // console.log("expected user id : ", userId, " email :", email)
    // check if userId and email are attached to an account
    db.query('SELECT * FROM users WHERE "user_id"=$1 AND "email"=$2', [userId, email])
      .then(({ rowCount, rows }) => resolve(rowCount > 0 ? rows[0] : false))
      .catch((error) => reject(error));
  } catch (error) {
    reject(error);
  }
});


exports.employee = (req, res, next) => {
  exports.parseUser(req).then((result) => {
    if (result) {
      global.$User = result;
      next();
    } else {
      res.status(401).json({
        status: 'errort',
        error: 'Invalid request',
      });
    }
  }).catch((error) => {
    console.log(error);
    res.status(401).json({
      status: 'errort',
      error: 'Invalid request',
    });
  });
};

exports.admin = (req, res, next) => {
  exports.parseUser(req).then((user) => {
    if (user) {
      console('is a valid user');
      db.query('SELECT job_title FROM job_roles WHERE job_id = $1', [user.job_role]).then(({ rowCount, rows }) => {
        if (rowCount > 0 && rows[0].job_title === 'admin') {
          global.$User = user;
          next();
          console('user verified to be an admin');
        } else {
          console.log(rows);
          throw new Error('User not admin');
        }
      }).catch((error) => {
        console.log(error);
        res.status(401).json({
          status: 'error',
          error: 'Invalid request',
        });
      });
    } else throw new Error('User was not found');
  }).catch((error) => {
    console.log(error);
    res.status(401).json({
      status: 'error',
      error: 'Invalid request',
    });
  });
};
