import React, { Component } from "react";
import Nav from "../Nav/Nav";
import "./Profile.css";
import { connect } from "react-redux";
import { getUserData } from "../../ducks/reducer";
import axios from "axios";

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    axios.get("/api/userData").then(response => {
      this.props.getUserData(response.data);
    });
  }

  render() {
    const { username, picture, rank, score, email } = this.props.user;
    return (
      <div>
        <Nav />
        <div className="Profile animated fadeIn faster">
          <div className="userblock" id="profileblocks">
            <div>
              <div className="imgdiv">
                <img className="profilepic" src={picture} alt="" />
              </div>
              <h2 className="profiletext">{username}</h2>
            </div>
            <div className="user-container">
              <div className="userinfo">
                <h4 className="profiletext">{email}</h4>

                <h4 className="profiletext">Level: {rank}</h4>
                <h4 className="profiletext">{score}</h4>
              </div>

              <div className="bio">
                <p align="left">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Dolorem eveniet ducimus voluptate porro repudiandae cupiditate
                  doloremque excepturi incidunt reiciendis quibusdam debitis
                  praesentium cum error, odio explicabo et, rem cumque
                  inventore?
                </p>
              </div>
            </div>
          </div>
          <div className="statsblock" id="profileblocks">
            <h2 className="profiletext">Stats</h2>
          </div>
          <div />
        </div>
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
