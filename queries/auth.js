const pool = require('../config/database').pool;

const postUser = (req, res) => {
  const {
    first_name,
    last_name,
    email,
    password
  } = req.body;

  let stmt = `INSERT INTO users (first_name, last_name, email, password) VALUES ('${first_name}', '${last_name}', '${email}', '${password}') RETURNING *`;
  pool.query(stmt, (err, result) => {
    if(err){
      console.log(err);
      res.status(500).json(err);
    }else{
      res.status(200).json(result.rows);
    }
  });
};

const getUser = (req, res) => {
  const { email, password } = req.body;
  let stmt = `SELECT * FROM users WHERE email='${email}' AND password='${password}'`;

  pool.query(stmt, (err, result) => {
    if(err){
      console.log(err);
      res.status(500).json(err);
    }else{
      console.log(result.rows);
      res.status(200).json(result.rows);
    }
  })
};

module.exports = {
  postUser,
  getUser
};

