const db = require('../dbconn');

module.exports = (req, res, next) => {
  console.log('WE GOING TO GET ALL EMPLOYEE EMAILS NOW');
  // Get and save all emails attach to user accounts
  db.query('SELECT "email" FROM users').then((result) => {
    const r = result.rows;
    db.$usersEmail = [];
    for (let i = r.length; i--; db.$usersEmail.unshift(r[i].email));

    console.log('EMPLOYEE EMAILS ', db.$usersEmail);
    next();
  }).catch((error) => {
    console.log('error at getting employee emails ', error);
    res.status(500).json({
      status: 'error',
      error: 'Sorry, we couldn\'t complete your request please again',
    });
  });
};
