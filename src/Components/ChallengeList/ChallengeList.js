import React, { Component } from 'react';
import axios from 'axios';
import Nav from '../Nav/Nav'
import './ChallengeList.css'
import {Link} from 'react-router-dom';


class ChallengeList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            challenges: []
        }
    }
    componentDidMount(){
        axios.get('/api/allchallenges')
        .then(res=>{
            this.setState({
                challenges: res.data
            })
        })
    }

    render() { 
        console.log(this.state)
        let challengesToDisplay = this.state.challenges.map((e, i) => {
            return (
                <Link to={`/challenge/${e.challenge_id}`}>
                <div className="list">
                    <h1 id="challengeinfo">{e.name}</h1>
                    <h4 id="challengeinfo">Difficulty: {e.difficulty}</h4>
                </div>
                </Link>
            )
        })
        return (
            <div>
                <Nav />
            {challengesToDisplay}
            </div> 
        );
    }
}
 
export default ChallengeList;