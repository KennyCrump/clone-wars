const express = require('express')
const massive = require('massive')
const sessions = require('express-session')
const axios = require('axios')

const app = express()

app.use(express.json())

const SERVER_PORT=4444

app.listen(SERVER_PORT, () => {
    console.log(`server running on port ${SERVER_PORT}`)
})



