import React, { Component } from 'react';
import './Dashboard.css'
import Nav from '../Nav/Nav'
import axios from 'axios'
import {Link} from 'react-router-dom'

class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            challenges: [],
            challenge: []

         }
    }

    componentDidMount () {
        
        axios.get('/api/allchallenges').then((response) => {
                this.setState({
                    challenges: response.data
                })
        })
        
        
    }

   
    

    getRandom = () => {
        const {challenges} = this.state
        let random  = challenges[Math.floor(Math.random() * this.state.challenges.length)]
        this.setState({
            challenge: random
        }, () => console.log(this.state.challenge))
    }

    

    render() { 
        const {name, instructions, difficulty, challenge_id } = this.state.challenge
        console.log(this.state.challenges)
        console.log(this.state.challenge)
        
        // console.log(this.state.challenge[0].challenge_id)
        // let randomChallenge = this.state.challenge.map((e, i) => {
        //     return <div>{e.name}</div>
        // })
        return (

            <div className="dashboard">
            <Nav />
            <div className="Challenges" id="blocks">
                    <div className="left-side">
                    <div className="challenge">
                    <h4>Your Next Challenge...</h4>
                    <Link to={`/challenge/${challenge_id}`}><button className='train-button'>Train</button></Link>
                    <button onClick={this.getRandom} className='skip-button'>Skip</button>
                    </div>
                    
                    </div>

                    <div className="right-side">
                    <div className='challenge-container'>
                    <button className={difficulty === '3' ? 'rank-dash2' : difficulty === '1' ? 'rank-dash' : difficulty === '5' ? 'rank-dash3' : null}>{difficulty}</button>
                    <span>{name}</span>
                    </div>
                    <div className="details">
                    <p align='left'>{instructions}</p>
                    </div>
                    

                    </div>
                
            </div>
            {/* <div className="create" id="blocks">
                <h1>Create</h1>
            </div> */}
            <div className="leaderboard" id="blocks">
                <h1>Leaderboard</h1>
            </div>
            </div>
        );
    }
}
 
export default Dashboard;