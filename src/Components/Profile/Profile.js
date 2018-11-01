import React, { Component } from "react";
import Nav from "../Nav/Nav";
import "./Profile.css";
import { connect } from "react-redux";
import { getUserData } from "../../ducks/reducer";
import axios from "axios";
import { Link } from "react-router-dom";

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      edit: false,
      email: '',
      description: ""
    };
    this.handleSave = this.handleSave.bind(this)
  }

  componentDidMount() {
    axios.get("/api/userData").then(response => {
      this.props.getUserData(response.data);
    });

    axios.get(`/api/profile/${this.props.match.params.id}`).then(response => {
      this.setState({
        users: response.data
      });
    });
  }

  // componentDidUpdate(prevProps, prevState) {
  //   axios.get(`/api/profile/${this.props.match.params.id}`).then(response => {
  //     if(prevProps.data !== this.props.data) {
  //     this.setState({
  //       users: response.data
  //     });
  //     }
  //   });
  // }

  handleEdit = () => {
    this.setState({
      edit: !this.state.edit
    });
  };

  handleInput = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  async handleSave () {
      await axios.put('/api/editUser', {email: this.state.email, description: this.state.description})
      this.setState({
        edit: false
      })
      await axios.get(`/api/profile/${this.props.match.params.id}`).then(response => {
        this.setState({
          users: response.data
        });
      });
  }

  

  render() {
    console.log(this.props.user)
    console.log(this.state.description)
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
              {!this.state.edit ? (
                <div className="user-container">
                  <div className="userinfo">
                    <h4 className="profiletext">{user.email}</h4>

                    <h4 className="user-rank">Level: {user.rank}</h4>
                    <h4 className="user-score">{user.score}</h4>
                  </div>

                  <div className="bio">
                    <p align="left">
                      {user.description}
                    </p>
                  </div>
                  <div className="edit-button">
                    {this.props.user.user_id === user.user_id ? (
                      <h4 onClick={this.handleEdit} className="edit-profile">
                        Edit Profile
                      </h4>
                    ) : null}
                  </div>
                </div>
              ) : (
                <div className="user-container">
                  <div className="userinfo">
                    <input onChange={this.handleInput} defaultValue={user.email} name='email' className='profile-input'placeholder='enter new email' type="text"/>

                    <h4 className="user-rank">Level: {user.rank}</h4>
                    <h4 className="user-score">{user.score}</h4>
                  </div>

                  <div className="bio">
                    <textarea onChange={this.handleInput} defaultValue={user.description}className='text-bio'name="description" id="" cols="20" rows="10"></textarea>
                  </div>
                  <div className="edit-button">
                  <h4 onClick={this.handleEdit} className="edit-profile">
                        Cancel
                      </h4>
                    {this.props.user.user_id === user.user_id ? (
                      <h4 onClick={this.handleSave} className="edit-profile">
                        Save Changes
                      </h4>
                    ) : null}
                    
                  </div>
                </div>
              )}
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
