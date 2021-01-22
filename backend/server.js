// Config
const express = require('express')
      app = express()
      port = 3100
      cors = require('cors')
      router = express.Router()
      mysql = require('mysql')
      md5_hash = require('md5')

require('./config/dbconnection');

app.use(express.json());
app.use(cors());

// Setup database
const db = mysql.createConnection({
  host: '',
  user: '',
  password: '',
  database: ''
})

// Start server
app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`)
})


/************** ENDPOINTS **************/

app.get('/ejemplo/:name', (req, res) => {
  res.send(`Hello ${ req.params.name }!`)
})


// Returns the 3 highest seen referring domains.
app.get('/api/v1/domain/getHighestSeenDomains', (req, res) => {

  var sql = `SELECT
                DISTINCT(domain_name),
                count(domain_name) as views
              FROM
                domains
              GROUP BY domain_name
              ORDER BY views desc
              LIMIT 3`;

  db.query(sql, function(err, data, fields) {
    if (err) throw err;
    res.json(data)
  })

})

// Register current domain
app.post('/api/v1/domain/register', (req, res) => {

  const url = req.body.urlVisited;

  var sql = `INSERT INTO domains(domain_name, date_record) VALUES ('${ url }', NOW())`;
  
  db.query(sql, function(err, data, fields) {
    if (err) throw err;
    res.json({
      status: 200,
      message: "The url was registered succesfully!"
    })
  })

})

// Login user
app.post('/api/v1/user/login/', (req, res) => {

  const user_data = req.body.userData;

  var sql_check = `SELECT count(*) as reg
                    FROM users
                    WHERE username = ${ db.escape(user_data.username) }
                    AND password = md5(${ db.escape(user_data.password) })`;
  db.query(sql_check, [user_data], function(err, data, fields) {
    if (err) {
      console.log("There's was an error. Please Check the data.");
      console.log(err);
    }
    res.json({
      status: 200,
      records: data[0].reg
    })
  })

})

// Fetch user info
app.get('/api/v1/user/getData/', (req, res) => {

  const user_data = req.body.userData;

  var sql_check = `SELECT username, first_name, last_name
                    FROM users
                    WHERE username = ${ db.escape(user_data.username) }
                    AND password = md5(${ db.escape(user_data.password) })`;
  db.query(sql_check, [user_data], function(err, data, fields) {
    console.log("SQL>> ", sql_check);
    if (err) throw err
    res.json({
      status: 200,
      records: data
    })
  })

})



// Return count of users with given username
app.get('/api/v1/user/check_username/', (req, res) => {

  const user_data = req.body.userData;

  var sql_check = `SELECT COUNT(*) as reg FROM users WHERE username = '${ user_data.username }'`;
  db.query(sql_check, function(err, data, fields) {
    if (err) {
      console.log("There's was an error. Please Check the data.");
      console.log(err);
    }
    res.json({
      status: 200,
      records: data[0].reg
    })
  })

})


// Register user
app.post('/api/v1/user/register/', (req, res) => {

  const username = db.escape(req.body.userData.username);
  const firstName = db.escape(req.body.userData.firstName);
  const lastName = db.escape(req.body.userData.lastName);
  const password = db.escape(md5_hash(req.body.userData.password));

  var sql = `INSERT INTO users
              (username, first_name, last_name, date_created, password)
              VALUES
              (${ username },
               ${ firstName },
               ${ lastName },
               NOW(),
               ${ password } )`;
  
  db.query(sql, function(err, data, fields) {
    if (err) {
      console.log("There's was an error. Please Check the data.");
      console.log(err);
    }
    res.json({
      status: 200,
      message: "The user was registered succesfully!"
    })
  })

})