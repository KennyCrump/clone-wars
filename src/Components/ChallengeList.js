import React, { Component } from 'react';
import Nav from './Nav/Nav'
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
            </div> 
        );
    }
}
 
export default ChallengeList;