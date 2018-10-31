import React, { Component } from "react";
import Nav from "../Nav/Nav";
import "./Profile.css";
import { connect } from "react-redux";
import { getUserData } from "../../ducks/reducer";
import axios from "axios";

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      toggle: false
    };
  }

  componentDidMount() {
    axios.get("/api/userData").then(response => {
      this.props.getUserData(response.data);
    });

    
  }

  componentDidUpdate() {
    axios.get(`/api/profile/${this.props.match.params.id}`).then((response) => {
      this.setState({
        users: response.data
      })
  })
  }


  render() {
    console.log(this.state.users)
    console.log(this.props.user)
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
          
        )
    })
    
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
  {getUserData}
  
)(Profile);


