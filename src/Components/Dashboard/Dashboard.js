import React, { Component } from "react";
import "./Dashboard.css";
import Nav from "../Nav/Nav";
import axios from "axios";
import { Link } from "react-router-dom";
import {getUserData} from '../../ducks/reducer'
import {connect} from 'react-redux'





class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
        rankedChallenge: [],
      challenges: [],
      challenge: [],
      loading: true,
      users: ['kaleb']
    };
  }

  async componentDidMount() {
    let res = await axios.get("/api/allchallenges");
    this.setState({
      challenges: res.data
    });

    // await axios.get('/api/userData').then((response) => {
    //     this.setState({
    //         users: response.data
    //     })
    //   })

    const { challenges } = this.state;

    let filterChallenge = challenges.filter((challenge, i) => {
        return challenge.difficulty > this.props.user.rank
    })
    // console.log(filterChallenge)

    let random = filterChallenge[Math.floor(Math.random() * filterChallenge.length)];
    this.setState({
        challenge: random
    }, () => console.log(this.state.challenge)
);
}
    
    

  getRandom = () => {
    const { challenges } = this.state;
    let filterChallenge = challenges.filter((challenge, i) => {
        return challenge.difficulty > this.props.user.rank
    })
    // console.log(filterChallenge)

    let random = filterChallenge[Math.floor(Math.random() * filterChallenge.length)];
    this.setState(
      {
        challenge: random
      },
      () => console.log(this.state.challenge)
    );
  };






  render() {
      let displayUser = this.state.users.map((user, i) => {

      })
    const {rank, score} = this.props.user
    const {name, instructions, difficulty, challenge_id} = this.state.challenge
    console.log(this.state.users)
    // console.log(rank)
    // console.log(this.state.challenges);
    // console.log(this.state.challenge);

    return (
      <div className="dashboard">
        <Nav />
        <div className="Challenges" id="blocks">
          <div className="left-side">
            <div className="challenge">
              <h3 className='your-challenge'>Your Next Challenge...</h3>
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
        {/* <div className="create" id="blocks">
                <h1>Create</h1>
            </div> */}
        <div className="leaderboard">
        <table>
        <thead>
          <tr>
              <th>Position</th>
              <th>User</th>
              <th>Score</th>
          </tr>
        </thead>

        <tbody>
          <tr>
            <td>1</td>
            <td><button className='rank-dash'>2 </button>Kaleb</td>
            <td>67</td>
          </tr>
          <tr>
            <td>2</td>
            <td><button className='rank-dash'>2 </button>Kaleb</td>
            <td>67</td>
          </tr>
          <tr>
            <td>3</td>
            <td><button className='rank-dash'>2 </button>Kaleb</td>
            <td>67</td>
          </tr>
          <tr>
            <td>1</td>
            <td><button className='rank-dash'>2 </button>Kaleb</td>
            <td>67</td>
          </tr>
          <tr>
            <td>2</td>
            <td><button className='rank-dash'>2 </button>Kaleb</td>
            <td>67</td>
          </tr>
          <tr>
            <td>3</td>
            <td><button className='rank-dash'>2 </button>Kaleb</td>
            <td>67</td>
          </tr>
          
        </tbody>
      </table>
         </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
    return {
        user: state.user
    }
}

export default connect(mapStateToProps, {getUserData})(Dashboard);
