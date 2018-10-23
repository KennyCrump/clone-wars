import React, { Component } from 'react';
import CodeMirror from 'react-codemirror'

class Challenge extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            code: '// your code here'
         }
    }

    updateCode = (newCode) => {
        this.setState({code: newCode})
    }

    render() { 
        const options = {
            lineNumbers: true,
            
        }
        return (
            <h1>Challenge</h1>

        );
    }
}
 
export default Challenge;