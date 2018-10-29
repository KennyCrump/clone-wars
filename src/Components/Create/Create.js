import React, { Component } from "react";
import Nav from "../Nav/Nav";
import "./Create.css";
import CodeMirror from "react-codemirror";
import axios from 'axios';

require("codemirror/lib/codemirror.css");
require("codemirror/theme/icecoder.css");
require("codemirror/mode/javascript/javascript");

class Create extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: "",
      startingCode: `function myFunction(params){
   //Code Here
}`,
      result: "",
      unitTests: [{}],
      solution: "",
      newTest: "",
      newResult: "",
      completed: false,
      changes: false,
      instructions: "",
      difficulty: 1,
      name: ""
    };
  }

  runCode = () => {
    let passedAllTests = true;
    let tests = [...this.state.unitTests];
    let code = this.state.solution;
    let hasErrors = false;
    for (let i = 0; i < tests.length; i++) {
      let unitTest = code + "\n " + tests[i].test;

      try {
        let answer = eval(unitTest);
        tests[i].userAttempt = answer;
      } catch (error) {
        console.error(error);
        hasErrors = true;
        this.setState({
          error:
            "There was an error in compiling your code, check your developer console for details."
        });
        tests[i].userAttempt = "an Error";
      }

      if (tests[i].userAttempt != tests[i].result) {
        passedAllTests = false;
      }
    }
    if (!hasErrors) {
      this.setState({
        error: "",
        unitTests: tests,
        completed: passedAllTests,
        solution: this.state.userCode
      });
    }
  };

  addTest = () => {
    let newUnitTest = {
      test: this.state.newTest,
      result: this.state.newResult
    };
    let unitTests = [...this.state.unitTests, newUnitTest];
    this.setState({ unitTests: unitTests, newResult: "", newTest: "" });
  };
  deleteTest(i) {
    let unitTests = [...this.state.unitTests];
    unitTests.splice(i, 1);
    this.setState({
      unitTests
    });
  }
  updateStartingCode = newCode => {
    this.setState({ startingCode: newCode });
  };
  updateSolution = newCode => {
    this.setState({ solution: newCode, completed: false });
  };
  submitChallenge(){
      let {instructions, startingCode, difficulty, name, solution, unitTests} = this.state;
      axios.post('/api/challenge/submit', {instructions, starting_code: startingCode, difficulty, name})
      .then(res=>{
          for (let i = 1; i < unitTests.length; i++) {
              axios.post('/api/challenge/unittest', {test: unitTests[i].test, result: unitTests[i].result, challenge_id: +res})
          }
          axios.post('/api/challenge/solution', {challenge_id: +res, solution: solution, completed: true})
      })
  }

  render() {
    const options = {
      lineNumbers: true,
      theme: "icecoder"
    };
    let unitTestList = this.state.unitTests.map((test, index) => {
      if (index !== 0) {
        if (typeof test.userAttempt === "number") {
          test.result = +test.result;
        }
        if (!test.userAttempt) {
          return (
            <div>
              <p key={index} className="failed">{`${test.test} should return ${
                test.result
              }`}</p>
              <button onClick={() => this.deleteTest(index)}>Delete</button>
            </div>
          );
        } else if (test.result === test.userAttempt) {
          return (
            <div>
              <p key={index} className="passed">{`${test.test} passed`}</p>
              <button onClick={() => this.deleteTest(index)}>Delete</button>
            </div>
          );
        } else {
          return (
            <div>
              <p key={index} className="failed">{`${test.test} should return ${
                test.result
              } but returned ${test.userAttempt}`}</p>
              <button onClick={() => this.deleteTest(index)}>Delete</button>
            </div>
          );
        }
      } else {
        return null;
      }
    });
    console.log(this.state.unitTests);
    // let unitTestList = this.state.unitTests.map((e, i) => {
    //     if (i !== 0){
    //         return (
    //             <div key={i}>
    //                 <p>{` Test: ${e.test} Result: ${e.result}`}</p>
    //                 <button onClick={()=>this.deleteTest(i)}>Delete</button>
    //             </div>
    //         )
    //     }else{
    //         return null
    //     }
    // })
    return (
      <div>
        <Nav />
        <div className="create">
          <div className="create-instructions">
            <h1>Steps to Creating a Challenge</h1>
            <p className="textColor instructionText">
              Your challenge will need four parts, instructions, starting code,
              unit tests, and a working solution.
            </p>
            <p className="bold">Instructions:</p>
            <p>
              Detailed explanation of the problem, including what paramaters
              will be taken in, what the function should do, and what the
              function should return. Instructions should also address any
              special cases you want the challenge to cover.
            </p>
            <p className="bold">Starting Code:</p>{" "}
            <p>
              The starting code should include the function name and parameters
              if any. The function name must match what you write in the unit
              tests. Alter the starting code to fit your needs. Example:
              function myAddingFunction (param1, param2) {`{ }`}
            </p>
            <p className="bold">Unit Tests:</p>{" "}
            <p>
              Unit tests are what will check the user's code to ensure it is
              working as expected. All unit tests must pass before the solution
              can be submitted. Unit tests must be written as a function
              declaration, and the result is what they should get when that unit
              test is ran. Example: Unit Test: myAddingFunction(2, 3) Result: 5
            </p>
            <p className="bold">Working Solution:</p>
            <p>
              Before your challenge can be submitted, you must provide a working
              solution for your problem. This means that we will run your code
              against the unit tests that you created. This will allow you to
              ensure unit tests and code are working as intended before allowing
              other users to try out your Challenge.
            </p>
          </div>
          <div className="mirror-solution">
            <div>
                <div className="namedifficulty">
                <h3>Challenge Name: </h3>
                <input type="text" className="challengename" value={this.state.name} onChange={e=>this.setState({name: e.target.value})}/>
                <h3>Difficulty: </h3>
                <select name="difficulty" className="difficulty" id="" onChange={e=>this.setState({difficulty: e.target.value})} value={this.state.difficulty}>
                <option value="1">Level: 1</option>
                <option value="2">Level: 2</option>
                <option value="3">Level: 3</option>
                <option value="4">Level: 4</option>
                <option value="5">Level: 5</option>
                <option value="6">Level: 6</option>
                <option value="7">Level: 7</option>
                <option value="8">Level: 8</option>
                <option value="9">Level: 9</option>
                <option value="10">Level: 10</option>
                </select>
                </div>
              <h1>Instructions</h1>
              <textarea
                placeholder="Type your instructions here."
                rows="15"
                cols="63" 
                onChange={e=>this.setState({instructions: e.target.value})}
                value={this.state.instructions}
              />
            </div>
            <div>
              <h1 className="solutionHeader">Starting Code</h1>
              <CodeMirror
                codeMirrorMatchingBracket
                value={this.state.startingCode}
                onChange={this.updateStartingCode}
                options={options}
                mode="javascript"
              />
            </div>

            <div className="SolutionWrapper">
              <h1 className="textColor solutionHeader">Unit Tests: </h1>
              <div className="solutionBox">
                {/* {this.state.error && <p>{this.state.error}</p>}
            {tests} */}
                <div className="new-unit-test">
                  <p className="test-text">Test: </p>
                  <input
                    type="text"
                    value={this.state.newTest}
                    placeHolder="myFunction(2, 3)"
                    onChange={e => this.setState({ newTest: e.target.value })}
                  />
                  <p className="test-text">Result: </p>
                  <input
                    type="text"
                    value={this.state.newResult}
                    placeHolder="5"
                    onChange={e => this.setState({ newResult: e.target.value })}
                  />
                  <button className="test-text" onClick={this.addTest}>
                    Add Test
                  </button>
                </div>
                {unitTestList}
              </div>
              <div>
                <h1 className="textColor solutionHeader">Working Solution: </h1>
                <CodeMirror
                  codeMirrorMatchingBracket
                  value={this.state.solution}
                  onChange={this.updateSolution}
                  options={options}
                  mode="javascript"
                />
          <button className="run challengeButtons" onClick={this.runCode}>
            Run
          </button>
        <button className="run challengeButtons" onClick={this.submitChallenge}>Submit!</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Create;
