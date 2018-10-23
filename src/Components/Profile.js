import React, { Component } from 'react';
import Nav from './Nav/Nav'
class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        return (
            <div>
                <Nav />
            <h1>Profile</h1>
            </div>
        );
    }
}
 
export default Profile;