require('dotenv').config();
const express = require('express')
    , bodyParser = require('body-parser')
    , session = require('express-session')
    , currentSession = require(`${__dirname}/middlewares/session.js`)
    , massive = require('massive')
    , app = express()
    , api = require('./api')
    , PORT = process.env.PORT
    , connection = process.env.CONNECTION_STRING;

app.use(bodyParser.json());
app.use(express.static(`${__dirname}/../public/build`));
massive(connection).then(db => app.set('db', db));

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 10000 } // sesson lasts 10 seconds
}));
app.use(currentSession);

api(app); // API endpoints

app.listen(PORT, _ => console.log(`Listening on ${PORT}.`));