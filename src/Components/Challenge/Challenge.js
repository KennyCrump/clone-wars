import React, { Component } from 'react';
import CodeMirror from 'react-codemirror';
import axios from 'axios'
import Nav from '../Nav/Nav'

import './Challenge.css'
require('codemirror/lib/codemirror.css');
require('codemirror/theme/icecoder.css')
require('codemirror/mode/javascript/javascript')

class Challenge extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            userCode: '',
    result: '',
    unitTests: [{test: 'add(2, 3)', result: 5},{test: 'add(7, 4)', result: 11}]
         }
    }

    componentDidMount(){
        axios.get(`/api/challenge/${this.props.match.params.id}`).then(res => {
            let unitTests = []
            for(let i = 0; i < res.data.length; i++){
                let unitTest = {test: res.data[i].test, result: res.data[i].result}
                unitTests.push(unitTest)
            }
                this.setState({
                    userCode: res.data[0].starting_code,
                    instructions: res.data[0].instructions,
                    unitTests: unitTests
                })
            })
            

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
        let tests = this.state.unitTests.map((test, index) => {
            if(typeof(test.userAttempt) === 'number'){
                test.result = +test.result
            }
            if(!test.userAttempt){
                return <p key={index} className='failed'>{`${test.test} should return ${test.result}`}</p>
            }
            else if(test.result === test.userAttempt){
                return <p key={index} className='passed'>{`${test.test} passed`}</p>
            }else{
                return <p key={index} className='failed'>{`${test.test} should return ${test.result} but returned ${test.userAttempt}`}</p>
            }
        })
        console.log(this.state.unitTests)
        console.log(tests)
        return (
            <div>
                <Nav />
                <div className='challengePage'>
                    <div className='instructions'><h1>Instructions</h1>
                        <p>
                            {this.state.instructions}
                        </p>
                    </div>
                    <div className='codeEditor'>
                        <h1>Challenge</h1>
                        <div>
                            {this.state.userCode &&
                                <CodeMirror value={this.state.userCode} 
                                onChange={this.updateCode} 
                                options={options}
                                mode='javascript'/>
                            }
                        </div>
                        <button onClick={this.runCode}>Run</button>
                        <div className='SolutionWrapper'>
                            <h1 className='textColor'>Solution: </h1>
                            <div className='solutionBox'>
                                {tests}
                            </div>
                        </div>
                            
                    </div>
                </div>
            </div>

        );
    }
}
 
export default Challenge;