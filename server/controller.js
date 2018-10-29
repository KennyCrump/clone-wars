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
  }, 
  getChallenges: (req, res) => {
    const db = req.app.get("db");
    db.get_challenges()
    .then(response => {
      console.log(response);
      res.status(200).send(response);
    })
    .catch(err => {
      console.log(err);
      res.status(500).send(err);
    })
  },
  challenge: (req, res) => {
    const db = req.app.get("db");
    const {id} = req.params;
    db.one_challenge({id})
    .then(response => {
      console.log(response);
      res.status(200).send(response);
    })
    .catch(err => {
      console.log(err);
      res.status(500).send(err);
    })
  },
  byDifficulty: (req, res) => {
    const db = req.app.get("db");
    const {difficulty} = req.body;
    db.challenge_by_diff({difficulty})
    .then(response => {
      console.log(response);
      console.log(difficulty);
      res.status(200).send(response);
    })
    .catch(err => {
      console.log(err);
      res.status(500).send(err);
    })
  },
  submitSolution: (req, res) => {
    const db = req.app.get("db");
    const {id: challenge_id} = req.params;
    const {solution, completed} = req.body
    const {user_id} = req.sessions.user
    db.create_user_solution({user_id, challenge_id, solution, completed})
    res.status(200).send('solution added')
  },

  getUsers: (req,res) => {
    const db = req.app.get("db");
    db.get_users_by_rank().then((response) => {
      res.status(200).send(response)
    })
  },

  logout: (req,res) => {
    req.session.destroy()
    res.redirect('http://localhost:3000/#/')
  },
  profile: (req,res) => {
    const db = req.app.get('db')
    const {id} = req.params
    db.get_profile([id]).then((response) => {
      res.status(200).send(response)
    }).catch(err => console.log(err))
  }
};
