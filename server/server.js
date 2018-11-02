require('dotenv').config()
const express = require('express')
const massive = require('massive')
const session = require('express-session')
const axios = require('axios')
const app = express()
const ctrl = require('./controller')
const { SERVER_PORT, SESSION_SECRET, CONNECTION_STRING, ENVIRONMENT} = process.env

app.use(express.json())


massive(CONNECTION_STRING).then((db) => {
  app.set('db', db)
  app.listen(SERVER_PORT, () => {
    console.log(`server running on port ${SERVER_PORT}`)
  })
})




app.use(
    session({
      secret: SESSION_SECRET,
      resave: false,
      saveUninitialized: true
    })
  );

  app.get('/auth/callback', ctrl.authCallback)
  app.get('/api/userData', ctrl.checkUser)
  app.get('/api/allchallenges', ctrl.getChallenges)
  app.get('/api/challenge/:id', ctrl.challenge)
  app.get('/api/difficulty', ctrl.byDifficulty)
  app.post('/api/challenge/:id', ctrl.submitUserSolution)
  app.get('/api/getUsers', ctrl.getUsers)
  app.get('/logout', ctrl.logout)
  app.get('/api/profile/:id', ctrl.profile)

  app.post('/api/challenges/submit', ctrl.submitChallenge)
  app.post('/api/challenges/unittest', ctrl.submitTest)
  app.post('/api/challenges/solution', ctrl.submitUserSolution)

  






