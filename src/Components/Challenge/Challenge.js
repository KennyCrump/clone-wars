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
`function add(num1, num2){
    //Code Here
}`,
    solution: '',
    unitTests: [{test: 'add(2, 3)', solution: 5},{test: 'add(7, 4)', solution: 11}]
         }
    }

    updateCode = (newCode) => {
        this.setState({userCode: newCode})
    }

    runCode = () =>{
        let tests = [...this.state.unitTests]
        let code = this.state.userCode
        for(let i =0; i < tests.length; i++){
            let unitTest = code + '\n ' + tests[i].test
            tests[i].userAttempt = eval(unitTest)
        }
        this.setState({ unitTests: tests})
    }
    
    render() { 
        const options = {
            lineNumbers: true,
            theme: 'icecoder'
        }
        let tests = this.state.unitTests.map(test => {
            if(test.solution === test.userAttempt){
                return <p className='passed'>{`${test.test} passed`}</p>
            }else{
                return <p className='failed'>{`${test.test} should return ${test.solution} but returned ${test.userAttempt}`}</p>
            }
        })
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
                        <div className='solutionBox'>
                            {this.state.unitTests[0].userAttempt ? tests : null}
                        </div>
                    </div>
                        
                </div>
            </div>

        );
    }
}
 
export default Challenge;