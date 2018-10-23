import React, { Component } from "react";
import Nav from '../Nav/Nav'
import "./Profile.css";

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div>
        <Nav />
        <div className="Profile">
          <div className="userblock" id="profileblocks">
          <div>
              <div className="imgdiv">
            <img
              className="profilepic"
              src="https://www.gannett-cdn.com/-mm-/407586a6f51dbe0859b2af64c70056e11532d6d2/c=324-0-2772-3264/local/-/media/2017/04/11/WIGroup/Milwaukee/636275293684983286-MJS-ALPACA-NWS-PORTER-6-WILD-DANCE-37070047.JPG?width=534&height=712&fit=crop"
              alt=""
            />
              </div>
            <h2 id="profiletext">kenabenioni</h2>
          </div>
            <div className="userinfo">
            <h4 id="profiletext">kenabenioni@gmail.com</h4>
            <h4 id="profiletext">Level: 10 </h4>
            <h4 id="profiletext">3056</h4>
            </div>
          </div>
          <div className="statsblock" id="profileblocks">
            <h2 id="profiletext">Stats</h2>
          </div>
          <div />
        </div>
      </div>
    );
  }
}

export default Profile;
