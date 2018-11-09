import React, { Component } from "react";
import "./Dashboard.css";
import Nav from "../Nav/Nav";
import axios from "axios";
import { Link } from "react-router-dom";
import { getUserData } from "../../ducks/reducer";
import { connect } from "react-redux";
import LoadingSpinner from '../Loading/LoadingSpinner'

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rankedChallenge: [],
      challenges: [],
      challenge: [],
      loading: false,
      users: []
    };
  }

  async componentDidMount() {
    let res = await axios.get("/api/allchallenges");
    this.setState({
      challenges: res.data
    });

    let users = await axios.get("/api/getUsers");
    this.setState({
      users: users.data,
      loading: true
    });
    console.log(this.state.users);

    const { challenges } = this.state;

    let filterChallenge = challenges.filter((challenge, i) => {
      return challenge.difficulty > this.props.user.rank;
    });
    

    let random = filterChallenge[Math.floor(Math.random() * filterChallenge.length)];
    this.setState(
      {
        challenge: random
      },
      () => console.log(this.state.challenge)
    );
  }

  getRandom = () => {
    const { challenges } = this.state;
    let filterChallenge = challenges.filter((challenge, i) => {
      return challenge.difficulty >= this.props.user.rank;
    });
    

    let random =
      filterChallenge[Math.floor(Math.random() * filterChallenge.length)];
    this.setState(
      {
        challenge: random
      },
      () => console.log(this.state.challenge)
    );
  };

  render() {
    let rank = 0
    let displayUsers = this.state.users.map((user, i) => {
        
        rank++
      return (
        
          <tbody>
            <tr>
              <td>{rank}</td>
              <td>
                <button className="rank-dash">{user.rank}</button>
                <Link to={`/profile/${user.user_id}`}>{user.username}</Link>
              </td>
              <td>{user.score}</td>
            </tr>
          </tbody>
        
      );
    });
    const {
      name,
      instructions,
      difficulty,
      challenge_id
    } = this.state.challenge;
  
    return (
      <div className="dashboard">
        <Nav />
        {this.state.loading ?<div> <div className="Challenges" id="blocks">
          <div className="left-side">
            <div className="challenge">
              <h3 className="your-challenge">Your Next Challenge...</h3>
              <Link to={`/challenge/${challenge_id}`}>
                <button className="train-button">Train</button>
              </Link>
              <button onClick={this.getRandom} className="skip-button">
                Skip
              </button>
            </div>
          </div>

          <div className="right-side">
            <div className="challenge-container">
              <button
                className={
                  difficulty === "3"
                    ? "rank-dash2"
                    : difficulty === "1" || difficulty === "2"
                      ? "rank-dash"
                      : difficulty === "5"
                        ? "rank-dash3"
                        : null
                }
              >
                {difficulty}
              </button>
              <h3>{name}</h3>
            </div>
            <div className="details">
              <p align="left">{instructions}</p>
            </div>
          </div>
        </div> 
         <div className="leaderboard">
          <table>
            <thead>
              <tr>
                <th>Position</th>
                <th>User</th>
                <th>Score</th>
              </tr>
            </thead>
            {displayUsers}
          </table>
        </div> 
           </div>   : <LoadingSpinner /> }
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
)(Dashboard);
