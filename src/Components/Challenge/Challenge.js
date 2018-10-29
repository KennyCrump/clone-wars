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
            instructions: '',
            error: '',
            userCode: '',
            result: '',
            unitTests: [{}],
            solution: '',
            completed: false,
            changes: false
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
        this.setState({userCode: newCode, completed: false})
    }

    submitSolution = () => {
        let {solution, completed} = this.state
        axios.post(`/api/challenge/${this.props.match.params.id}`, {solution, completed}).then(res => {

        })
    }

    runCode = () =>{
        let passedAllTests = true
        // let tests = [...this.state.unitTests]
        let tests = this.state.unitTests.slice('')
        let code = this.state.userCode
        let hasErrors = false
        for(let i =0; i < tests.length; i++){
            let unitTest = code + '\n ' + tests[i].test //Adds each individual unit test onto user code, so unit test can be ran with their code.

            try{
                let answer = eval(unitTest)             //Evaluates their code with the unit tests
                tests[i].userAttempt = answer
            }catch(error){                              //Console log's error and alerts user to check console.
                console.error(error)
                hasErrors = true
                this.setState({error: 'There was an error in compiling your code, check your developer console for details.'})
                tests[i].userAttempt = 'an Error'       //This will add onto the unit test object even though setState doesn't get ran since it is pass by reference 
            }

            if(tests[i].userAttempt != tests[i].result){ //Determines if user code is valid solution
                passedAllTests = false
            }
        }
        if(!hasErrors){                                  //Sets State only if the code compiled successfully
            this.setState({ error: '', unitTests: tests, completed: passedAllTests, solution: this.state.userCode})
        }
    }
    
    render() { 
        console.log(this.state.unitTests)
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
                if(Array.isArray(test.userAttempt)){
                    return <p key={index} className='failed'>{`${test.test} should return ${test.result} but returned  ${test.userAttempt}`}</p>
                }
                return <p key={index} className='failed'>{`${test.test} should return ${test.result} but returned ${test.userAttempt}`}</p>
            }
        })
        return (
            <div>
                <Nav />
                <div className='challengePage'>
                    <div className='instructions'><h1>Instructions</h1>
                        <p className='textColor instructionText'>
                            {this.state.instructions}
                        </p>
                    </div>
                    <div className='codeEditor'>
                        <h1 className='solutionHeader'>Challenge</h1>
                        <div>
                            {this.state.userCode &&
                                <CodeMirror codeMirrorMatchingBracket
                                value={this.state.userCode} 
                                onChange={this.updateCode} 
                                options={options}
                                mode='javascript'/>
                            }
                        </div>
                        <button className="run challengeButtons" onClick={this.runCode}>Run</button>
                        {this.state.completed ? <button className=" submit challengeButtons">Submit Completed Challenge</button>
                        :
                        <button className=" submit challengeButtons" disabled>Pass All Tests to Submit</button>}
                        <div className='SolutionWrapper'>
                            <h1 className='textColor solutionHeader'>Solution: </h1>
                            <div className='solutionBox'>
                                {this.state.error && <p>{this.state.error}</p>}
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