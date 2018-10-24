import React, { Component } from "react";
import { Link } from "react-router-dom";
import './Nav.css'
import {connect} from 'react-redux'
import {getUserData} from '../../ducks/reducer'
import axios from 'axios'
import Logo from '../Login/cloud-coding.png'
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
        
        <img className='nav-logo'src={Logo} alt=""/>
        <Link to={"/dashboard"}>
          <button id="navbuttons">Dashboard</button>
          </Link>
          <Link to={"/challenges"}>
          <button id="navbuttons">Challenges</button>
          </Link>
        </div>
        <div className="right-nav">
        <div className="dropdown">
        <div className='user-info'>
        <span>{username}</span>
        <img className='user-picture' src={picture} alt=""/>
        <button className='rank'>{rank}</button>
        <span className='score' >{score}</span>
        </div>
        <div className="dropdown-content">
        
          <a href="/#/profile"><i className="fas fa-user fa-1x"></i> View Profile</a>
          <hr/>
          <a href="#"><i className="fas fa-sign-out-alt"></i> Sign out</a>
          
        </div>
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
