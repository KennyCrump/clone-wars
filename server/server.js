require('dotenv').config()
const express = require('express')
const massive = require('massive')
const session = require('express-session')
const axios = require('axios')
const app = express()
const ctrl = require('./controller')
const { SERVER_PORT, SESSION_SECRET} = process.env

app.use(express.json())



app.use(
    session({
      secret: SESSION_SECRET,
      resave: false,
      saveUninitialized: true
    })
  );

  app.get('/auth/callback', ctrl.authCallback)


app.listen(SERVER_PORT, () => {
    console.log(`server running on port ${SERVER_PORT}`)
})



