require('dotenv').config()

module.exports = {
  authCallback: async (req, res) => {
    const { REACT_APP_DOMAIN, REACT_APP_CLIENT_ID, CLIENT_SECRET, REACT_APP_SITE_HOST } = process.env
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
      // console.log(response);
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
      // console.log(response);
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
      // console.log(response);
      // console.log(difficulty);
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
    const {user_id} = req.session.user
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
    res.redirect(`${REACT_APP_SITE_HOST}/#/`)
  },
  profile: (req,res) => {
    const db = req.app.get('db')
    const {id} = req.params
    db.get_profile([id]).then((response) => {
      res.status(200).send(response)
    }).catch(err => console.log(err))
  },
  editUser: (req,res) => {
    const db = req.app.get('db')
    const {email, description} = req.body
    const {user_id} = req.session.user
    db.update_user([email, description, user_id]).then((response) => {
      res.status(200).send(response)
    }).catch(err => console.log(err))
  },

  submitChallenge: (req, res) => {
    const db = req.app.get('db')
    const {instructions, starting_code, solution, difficulty, name} = req.body
    const {user_id} = req.session.user
    db.submit_challenge({name, instructions, starting_code, difficulty: +difficulty, solution, creator: +user_id}).then(response => {
      res.status(200).send(response)
      console.log('challenge added, ID: ', response)
    })
  },
  submitTest: (req, res) => {
    const db = req.app.get('db')
    const {test, result, challenge_id} = req.body
    db.submit_test({test, result, challenge_id: +challenge_id}).then(response => {
      res.status(200).send(console.log('unit test added'))
    })
  },
  submitUserSolution: (req, res) => {
    const db = req.app.get('db')
    let {challenge_id, solution, completed} = req.body
    let {user_id} = req.session.user
    db.submit_solution({challenge_id: + challenge_id, solution, completed, user_id: +user_id}).then(response => {
      res.status(200).send(console.log('solution added'))
    })
  },

  getUsersCompletedChallenges: (req, res) => {
    const db = req.app.get('db')
    const {id} = req.params
    db.users_challenges([id]).then((response) => {
      res.status(200).send(response)
    }).catch(err => console.log(err))
  }
};
