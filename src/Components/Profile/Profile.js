import React, { Component } from "react";
import Nav from "../Nav/Nav";
import "./Profile.css";
import { connect } from "react-redux";
import { getUserData } from "../../ducks/reducer";
import axios from "axios";
import {Link} from 'react-router-dom'
class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      edit: false,
      email: '',
      bio: ''


    };
  }

  componentDidMount() {
    axios.get("/api/userData").then(response => {
      this.props.getUserData(response.data);
    });
  }

  componentDidUpdate() {
    axios.get(`/api/profile/${this.props.match.params.id}`).then(response => {
      this.setState({
        users: response.data
      });
    });
  }

  handleEdit = () => {
    this.setState({
      edit: !this.state.edit
    });
  };

  handleInput = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  render() {
    console.log(this.state.users);
    console.log(this.props.user);
    let displayUser = this.state.users.map((user, i) => {
      return (
        <div>
          <div className="Profile animated fadeIn faster">
          
            <div className="userblock" id="profileblocks">
              <div>
                <div className="imgdiv">
                  <img className="profilepic" src={user.picture} alt="" />
                </div>
                <h2 className="profiletext">{user.username}</h2>
              </div>
              <div className="user-container">
                <div className="userinfo">
                  <h4 className="profiletext">{user.email}</h4>

                  <h4 className="user-rank">Level: {user.rank}</h4>
                  <h4 className="user-score">{user.score}</h4>
                  
                  
                  
                  
                  
                </div>
                
                
                <div className="bio">
                  <p align="left">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Dolorem eveniet ducimus voluptate porro repudiandae
                    cupiditate doloremquri incidunt reiciendis
                    quibusdam debitis p oremquri incidunt reiciendis
                    quibusdam debitis p oremquri incidunt reiciendis
                    quibusdam debitis
                  </p>
                  {this.props.user.user_id === user.user_id ?  <Link to='/account'><h4 onClick={this.handleEdit} className="edit-profile">
                  Edit Profile
                </h4></Link> : null }
                  
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
