import React, { Component } from 'react';
import './Dashboard.css'
import Nav from '../Nav/Nav'
class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        return (

            <div className="dashboard">
            <Nav />
            <div className="Challenges" id="blocks">
                <h1>Challenges</h1>
            </div>
            <div className="create" id="blocks">
                <h1>Create</h1>
            </div>
            <div className="leaderboard" id="blocks">
                <h1>Leaderboard</h1>
            </div>
            </div>
        );
    }
}
 
export default Dashboard;