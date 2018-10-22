import React, { Component } from "react";
import { Link } from "react-router-dom";
import './Nav.css'

class Nav extends Component {
  render() {
    return (
      <div className="nav">
        <div className="left-nav">
        <Link to={"/dashboard"}>
          <button id="navbuttons">Dashboard</button>
          </Link>
          <Link to={"/challenges"}>
          <button id="navbuttons">Challenges</button>
          </Link>
        </div>
        <div className="right-nav">
        <Link to={"/profile"}>
        <button id="navbuttons">Profile</button>
        </Link>
        </div>
      </div>
    );
  }
}
export default Nav;
