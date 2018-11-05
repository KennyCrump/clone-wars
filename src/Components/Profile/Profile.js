import React, { Component } from "react";
import Nav from "../Nav/Nav";
import "./Profile.css";
import { connect } from "react-redux";
import { getUserData } from "../../ducks/reducer";
import axios from "axios";
import { Link } from "react-router-dom";
import LoadingSpinner from '../Loading/LoadingSpinner'

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      challenges: [],
      users: [],
      user: [],
      edit: false,
      email: '',
      description: '',
      stat: true,
      challenge: false,
      loading: false
    };
    this.handleSave = this.handleSave.bind(this);
  }

  componentDidMount() {

    axios.all([
      axios.get("/api/userData").then(response => {
        this.props.getUserData(response.data);
  }),
  
  axios.get(`/api/usersChallenges/${this.props.match.params.id}`).then((response) => {
    this.setState({
      challenges: response.data
    })
  }),
  axios.get(`/api/profile/${this.props.match.params.id}`).then(response => {
    this.setState({
      user: response.data
    })
  }),
  axios.get('/api/getUsers').then((response) => {
    this.setState({
      users: response.data,
      loading: true
    })

  })
    ])


    
                            


  }

  // componentDidUpdate(prevProps, prevState) {
  //   axios.get(`/api/profile/${this.props.match.params.id}`).then(response => {
  //     if(prevProps.data !== this.props.data) {
  //     this.setState({
  //       users: response.data
  //     });
  //     }
  //   });
  // }

  handleEdit = () => {
    this.setState({
      edit: !this.state.edit
    });
  };

  handleInput = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleStatChange = () => {
    this.setState({
      stat: !this.state.stat,
      challenge: false
    });
  };

  handleChallengeChange = () => {
    axios.get(`/api/usersChallenges/${this.props.match.params.id}`).then((response) => {
      this.setState({
        challenges: response.data
      })
    })
                            

    this.setState({
      challenge: !this.state.challenge,
      stat: false
    });
  };


  handleSave =() =>{
    axios.put("/api/editUser", {
      email: this.state.email,
      description: this.state.description
    });
    this.setState({
      edit: false
    });
    axios
      .get(`/api/profile/${this.props.match.params.id}`)
      .then(response => {
        this.componentDidMount()
        this.setState({
          users: response.data
        });
      });
  }

  sortUsers = () => {
    const {users} = this.state
    const {user}= this.state
    for (let i = 0; i < users.length; i++) {
      if(users[i].user_id === this.state.user[0].user_id) {
        
        return users.indexOf(users[i + 1])
      } 
      }
    }

    
  render() {
    console.log(this.props.user)
    console.log(this.state.email)
    console.log(this.state.description)
    let displayChallenges = this.state.challenges.map((e, i) => {
      return (
        <div key={i}>
          <div className="completedChallenge animated fadeIn faster">
            <div className="nameddifficulty2 ">
              <h1 className="challengename" id="challengeinfo">{e.name}</h1>
              <h4 id="challengeinfo">Difficulty</h4>
              <hr />
              <h4>Level: {e.difficulty}</h4>
              <Link to={`/challenge/${e.challenge_id}`}>
                <button className="attempt">Code Me Again!</button>
              </Link>
            </div>
            <div className="instruction">
              <p>{e.instructions}</p>
            </div>
          </div>
          <div className="list-small">
            <div className="namedifficulty">
              <h1 id="challengeinfo">{e.name}</h1>
              <h4 id="challengeinfo">Difficulty</h4>
              <hr />
              <h4>Level: {e.difficulty}</h4>
              <Link to={`/challenge/${e.challenge_id}`}>
                <button className="attempt">Code Me Again!</button>
              </Link>
            </div>
          </div>
        </div>
      )
    })
    
    let displayUser = this.state.user.map((user, i) => {
      
      return (
        
        <div key={i}>
          {this.state.loading ? <div className="Profile animated fadeIn faster">
            <div className="userblock" id="profileblocks">
              <div>
                <div className="imgdiv">
                  <img className="profilepic" src={user.picture} alt="" />
                </div>
                <h2 className="profiletext">{user.username}</h2>
              </div>
              {!this.state.edit ? (
                <div className="user-container">
                  <div className="userinfo">
                    <h4 className="profiletext">{user.email}</h4>

                    <h4 className="user-rank">Level: {user.rank}</h4>
                    <h4 className="user-score">{user.score}</h4>
                  </div>

                  <div className="bio">
                    <p align="left">{user.description}</p>
                  </div>
                  <div className="edit-button">
                    {this.props.user.user_id === user.user_id ? (
                      <h4 onClick={this.handleEdit} className="edit-profile">
                        Edit Profile
                      </h4>
                    ) : null}
                  </div>
                </div>
              ) : (
                <div className="user-container">
                  <div className="userinfo">
                    <input
                      onChange={this.handleInput}
                      defaultValue={user.email}
                      name="email"
                      className="profile-input animated fadeIn"
                      placeholder="enter new email"
                      type="text"
                    />

                    <h4 className="user-rank">Level: {user.rank}</h4>
                    <h4 className="user-score">{user.score}</h4>
                  </div>

                  <div className="bio">
                    <textarea
                      onChange={this.handleInput}
                      defaultValue={user.description}
                      className="text-bio animated fadeInDown faster"
                      name="description"
                      id=""
                      cols="20"
                      rows="10"
                    />
                  </div>
                  <div className="edit-button">
                    <h4
                      onClick={this.handleEdit}
                      className="edit-profile animated "
                    >
                      Cancel
                    </h4>
                    {this.props.user.user_id === user.user_id ? (
                      <h4
                        onClick={this.handleSave}
                        className="edit-profile animated"
                      >
                        Save Changes
                      </h4>
                    ) : null}
                  </div>
                </div>
              )}
            </div>

            <div className="statsblock">
              <div className="tab">
                <h2
                  onClick={this.handleStatChange}
                  className={this.state.stat ? "stat" : "nostat"}
                >
                  Stats
                </h2>
                
                <h2
                  onClick={this.handleChallengeChange}
                  className={this.state.challenge ? "stat" : "nostat"}
                >
                  Completed Challenges
                </h2>
                
              </div>

              <div className="statsbody">
                {this.state.stat ? (
                  <div className="progress-body">
                    <h1>Progress</h1>
                    <span>
                      {" "}
                      <span style={{ color: "#b0b0b0" }}>
                        <strong>Rank:</strong>
                      </span>{" "}
                      &nbsp; {user.rank}{" "}
                    </span>
                    <br />
                    <span>
                      {" "}
                      <span style={{ color: "#b0b0b0" }}>
                        <strong>Score: </strong>
                      </span>{" "}
                      &nbsp; {user.score}{" "}
                    </span>
                    <br />
                    <span>
                      {" "}
                      <span style={{ color: "#b0b0b0" }}>
                        <strong>Leaderboard Position: </strong>
                      </span>{" "}
                      &nbsp; #{this.sortUsers(this.state.users)}{" "}
                    </span>
                    <br />
                    <span>
                      {" "}
                      <span style={{ color: "#b0b0b0" }}>
                        <strong>Completed Challenges:</strong>
                      </span>{" "}
                      &nbsp; {this.state.challenges.length}{" "}
                    </span>
                  </div>
                ) : (


                    <div className='challenge-body'>
                    
                      { this.state.challenges.length === 0 ? <h1>No Completed Challenges 😂</h1>  : <div><h1>Completed Challenges</h1>{displayChallenges}</div>}
                     
                    </div>
                 


                )}
                
              </div>
            </div>
            <div />
          </div> : 
          <div className='loader-container'>

            <LoadingSpinner />
          </div>
          
          }
          
        </div>
      );
    });

    return (
      <div>
        <Nav />

        {displayUser}
        
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    user: state.user
  };
}

export default connect(
  mapStateToProps,
  { getUserData }
)(Profile);
