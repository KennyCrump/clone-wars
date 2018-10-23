import React, { Component } from 'react';
import CodeMirror from 'react-codemirror';

import './Challenge.css'
require('codemirror/lib/codemirror.css');
require('codemirror/theme/icecoder.css')
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
            lineNumbers: true,
            theme: 'icecoder'
        }
        return (
            <div className='challengePage'>
                <div className='instructions'><h1>Instructions</h1></div>
                <div className='codeEditor'>
                    <h1>Challenge</h1>
                    <CodeMirror value={this.state.userCode} 
                    onChange={this.updateCode} 
                    options={options}
                    mode='javascript'/>
                    <button onClick={this.runCode}>Run</button>
                    <div className='solutionWrapper'>
                        <h1 className='textColor'>solution: </h1>
                        <div className='solutionBox'><p className='textColor'>{this.state.solution}</p></div>
                    </div>
                        
                </div>
            </div>

        );
    }
}
 
export default Challenge;