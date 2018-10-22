require('dotenv').config()
const express = require('express')
const massive = require('massive')
const sessions = require('express-session')
const axios = require('axios')
const { SERVER_PORT, REACT_APP_CLIENT_ID, REACT_APP_DOMAIN, CLIENT_SECRET, SESSION_SECRET} = process.env
const app = express()

app.use(express.json())

app.use(
    sessions({
      secret: SESSION_SECRET,
      resave: false,
      saveUninitialized: true
    })
  );

app.get("/auth/callback", async (req, res) => {
    let payload = {
      client_id: REACT_APP_CLIENT_ID,
      client_secret: CLIENT_SECRET,
      code: req.query.code,
      grant_type: "authorization_code",
      redirect_uri:  `http://${req.headers.host}/auth/callback`
    };
    // post request with code for token
    let tokenRes = await axios.post(
      `https://${REACT_APP_DOMAIN}/oauth/token`,
      payload
    );
    // use token to get user data
    let userRes = await axios.get(
      `https://${REACT_APP_DOMAIN}/userinfo?access_token=${
        tokenRes.data.access_token
      }`
    );
  
    // const db = req.app.get("db");
    // const { name, picture, sub } = userRes.data;
  
    // let foundUser = await db.find_user([sub]);
  
    // if (foundUser[0]) {
    //   req.session.user = foundUser[0];
    // } else {
    //   let createUser = await db.create_user([name, picture, sub]);
    //   req.session.user = createUser[0];
    // }
    // res.redirect("/#/dashboard");
  })
  



app.listen(SERVER_PORT, () => {
    console.log(`server running on port ${SERVER_PORT}`)
})



