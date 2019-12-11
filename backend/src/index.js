//import dependencies
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');

// define the Express app
const app = express();

// the database
let logins = [{userName: "John Doe", password: "password"}];

// enhance your app security with Helmet
app.use(helmet());

// use bodyParser to parse application/json content-type
app.use(bodyParser.json());

// enable all CORS requests
app.use(cors());

// log HTTP requests
app.use(morgan('combined'));

// insert a new answer to a question
app.post('/login', (req, res) => {
  const login = req.body;
  var match = false;
  for (var i=0; i < logins.length && !match; i++) {
     match = (login.userName === logins[i].userName) && (login.password === logins[i].password);
  }
   
  if (match) {

    let date = new Date();

    res.send({      
      message: "Welcome " + login.userName,
      currentPath: process.cwd(),
      date: date.toDateString(),
      loginSuccess: true
    });
  }
  else {
    res.send({
      message: "Unknown User",
      loginSuccess: false 
    });
  }
 
});
  

// start the server
app.listen(8081, () => {
  console.log('listening on port 8081');
});