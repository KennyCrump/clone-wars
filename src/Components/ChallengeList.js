import React, { Component } from 'react';
import Nav from './Nav/Nav'
import Challenge from './Challenge/Challenge'
class ChallengeList extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        return (
            <div>
                <Nav />
            <h1>ChallengeList</h1>
            <Challenge />
            </div> 
        );
    }
}
 
export default ChallengeList;