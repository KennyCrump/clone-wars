import React, { Component } from 'react';
import CodeMirror from 'react-codemirror';

import './Challenge.css'
require('codemirror/lib/codemirror.css');
require('codemirror/mode/javascript/javascript')

class Challenge extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            userCode:
`function hello(){
    return 'hello'
}`,
    solution: ''
         }
    }

    updateCode = (newCode) => {
        this.setState({userCode: newCode})
    }

    runCode = () =>{
        let code = this.state.userCode
        this.setState({ solution: eval(code) })
    }

    render() { 
        const options = {
            lineNumbers: true
        }
        return (
            <div className='challengePage'>
                <div className='codeEditor'>
                    <h1>Challenge</h1>
                    <CodeMirror value={this.state.userCode} 
                    onChange={this.updateCode} 
                    theme='dracula'
                    options={options}
                    mode='javascript'/>
                    <button onClick={this.runCode}>Run</button>

                    <h2>solution: {this.state.solution}</h2>
                        
                </div>
            </div>

        );
    }
}
 
export default Challenge;