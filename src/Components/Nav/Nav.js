import React, { Component } from "react";
import { Link } from "react-router-dom";
import './Nav.css'
import {connect} from 'react-redux'
import {getUserData} from '../../ducks/reducer'
import axios from 'axios'

class Nav extends Component {
  constructor(props) {
    super(props)
    this.state = {

    }
  }

  componentDidMount() {
    axios.get('/api/userData').then((response) => {
      this.props.getUserData(response.data)
    })
  }


  render() {
    console.log(this.props.user)
    const {username, picture, rank, score} = this.props.user
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
        <div className='user-info'>
        <span>{username}</span>
        <img className='user-picture' src={picture} alt=""/>
        <span>{rank}</span>
        
        <span>{score}</span>
        </div>
        <Link to={"/profile"}>
        {/* <button id="navbuttons">Profile</button> */}
        </Link>
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



export default connect(mapStateToProps, {getUserData})(Nav);
