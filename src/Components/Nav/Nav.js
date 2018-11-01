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
    const {username, picture, rank, score, user_id} = this.props.user
    return (
      <div className="outer">
      <div className="nav">
        <div className="left-nav">
        
        <a href='/#/dashboard'><img className='nav-logo'src={Logo} alt=""/></a>
        <Link to={"/dashboard"}>
        {window.location.hash === "#/dashboard" ?
          <button id="activebutton">Dashboard</button> :
          <button id="navbuttons">Dashboard</button>}
          </Link>
          <Link to={"/challenges"}>
          {window.location.hash === "#/challenges" ?
          <button id="activebutton">Challenges</button> :
          <button id="navbuttons">Challenges</button>}
          </Link>
          <Link to={"/about"}>
          {window.location.hash === "#/about" ?
          <button id="activebutton">About</button> :
          <button id="navbuttons">About</button>}
          </Link>
        </div>
        <div className="right-nav">
        <div className="dropdown">
        <div className='user-info'>
        <span className="username">{username}</span>
        <img className='user-picture' src={picture} alt=""/>
        <button className='rank'>{rank}</button>
        <span className='score' >{score}</span>



        
        </div>
        <div className="dropdown-content">
        
          <Link to={`/profile/${user_id}`}><i className="fas fa-user fa-1x"></i> View Profile</Link>
          <hr/>
          <a href='http://localhost:4444/logout'><i className="fas fa-sign-out-alt sign-out"></i> Sign out</a>
          
          
        </div>
        </div>
        <Link to={"/profile"}>
        
        </Link>
        </div>
      </div>
        <div className="navsmall">
        <div className="left-nav">
        <a href='/#/dashboard'><img className='nav-logo'src={Logo} alt=""/></a>
        <button>menu</button>
        </div>
        <div className="right-nav">
        <div className="dropdown">
        <div className='user-info'>
        <span className="username">{username}</span>
        <img className='user-picture' src={picture} alt=""/>
        <button className='rank'>{rank}</button>
        <span className='score' >{score}</span>



        
        </div>
        <div className="dropdown-content">
        
          <Link to={`/profile/${user_id}`}><i className="fas fa-user fa-1x"></i> View Profile</Link>
          <hr/>
          <a href='/#/account'><i class="fas fa-cogs"></i>   Account Settings</a>
          <hr/>
          <a href='http://localhost:4444/logout'><i className="fas fa-sign-out-alt"></i> Sign out</a>
          
          
        </div>
        </div>
        <Link to={"/profile"}>
        
        </Link>
        </div>
        </div>
      <hr className="navline"/>
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
