import React, { Component } from "react";
import axios from "axios";
import Nav from "../Nav/Nav";
import "./ChallengeList.css";
import { Link } from "react-router-dom";

class ChallengeList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      challenges: []
    };
  }
  componentDidMount() {
    axios.get("/api/allchallenges").then(res => {
      this.setState({
        challenges: res.data
      });
    });
  }

  render() {
    console.log(this.state);
    let challengesToDisplay = this.state.challenges.map((e, i) => {
      return (
          <div>
        <div className="list">
          <div className="namedifficulty">
            <h1 id="challengeinfo">{e.name}</h1>
            <h4 id="challengeinfo">Difficulty</h4>
            <hr />
            <h4>Level: {e.difficulty}</h4>
            <Link to={`/challenge/${e.challenge_id}`}>
              <button className="attempt">Code Me!</button>
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
              <button className="attempt">Code Me!</button>
            </Link>
          </div>
        </div>
          </div>
      );
    });
    return (
      <div>
        <Nav />
        <div className="content">
          <div className="filter">
            <input type="text" placeholder="Search" className="searchbar" />
            <hr />
            <div className="difficulty">
              <h4>Difficulty:</h4>
              <select className="selectdifficulty">
                <option value="1">Level: 1</option>
                <option value="2">Level: 2</option>
                <option value="3">Level: 3</option>
                <option value="4">Level: 4</option>
                <option value="5">Level: 5</option>
                <option value="6">Level: 6</option>
                <option value="7">Level: 7</option>
                <option value="8">Level: 8</option>
                <option value="9">Level: 9</option>
                <option value="10">Level: 10</option>
              </select>
            </div>
            <hr />
          </div>
          <div className="listofchallenges">{challengesToDisplay}</div>
        </div>
      </div>
    );
  }
}

export default ChallengeList;
