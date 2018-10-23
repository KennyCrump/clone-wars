module.exports = {
  authCallback: async (req, res) => {
    const { REACT_APP_DOMAIN, REACT_APP_CLIENT_ID, CLIENT_SECRET } = process.env
    const axios = require('axios')
    const db = req.app.get("db");
    const { code } = req.query;

    const payload = {
      client_id: REACT_APP_CLIENT_ID,
      client_secret: CLIENT_SECRET,
      code: code,
      grant_type: "authorization_code",
      redirect_uri: `http://${req.headers.host}/auth/callback`
    };

    try {
      let tokenRes = await axios.post(
        `https://${REACT_APP_DOMAIN}/oauth/token`,
        payload
      );
      let userRes = await axios.get(
        `https://${REACT_APP_DOMAIN}/userinfo?access_token=${
          tokenRes.data.access_token
        }`
      );

      const { email, name, picture, sub} = userRes.data;
      let foundUser = await db.find_user([sub]);
      if (foundUser[0]) {
        req.session.user = foundUser[0];
      } else {
        let createdUser = await db.create_user([name, email, picture, sub]);
      
        req.session.user = createdUser[0];
      }
    } catch (err) {
      console.log(err);
    }
    res.redirect("/#/dashboard");
  },

  checkUser: (req, res) => {
    if(req.session.user) {
      res.status(200).send(req.session.user)
    } else {
      res.status(200).send('please login')
    }
  }
};
