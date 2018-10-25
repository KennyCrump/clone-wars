import React, { Component } from 'react';
import './About.css';
import Nav from '../Nav/Nav';

class About extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        return (
            <div>
                <Nav />
                <div className="aboutsite">
                <h1 className="techtitle">Tech Used</h1>
                <hr className="techr"/>
                <div className="techused">
                <div className="react">
                <img src="https://arcweb.co/wp-content/uploads/2016/10/react-logo-1000-transparent.png" alt="" className="siteimg"/>
                <h4>React</h4>
                </div>
                <div>
                    <img src="https://upload.wikimedia.org/wikipedia/commons/6/6a/JavaScript-logo.png" alt="" className="siteimg"/>
                    <h4>Javascript</h4>
                </div>
                <div>
                    <img src="https://melbournechapter.net/images/transparent-html-png-3.png" alt="" className="siteimg" id="resize"/>
                    <h4>HTML</h4>
                </div>
                <div>
                    <img src="https://melbournechapter.net/images/svg-style-css3-3.png" alt="" className="siteimg" id="resize"/>
                    <h4>CSS</h4>
                </div>
                <div>
                    <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/89/Baboon.svg/220px-Baboon.svg.png" alt="" className="siteimg"/>
                    <h4>CodeMirror</h4>
                </div>
                <div>
                    <img src="http://www.stickpng.com/assets/images/584815fdcef1014c0b5e497a.png" alt="" className="siteimg"/>
                    <h4>PostgreSQL</h4>
                </div>
                <div>
                    <img src="http://www.stickpng.com/assets/images/5848309bcef1014c0b5e4a9a.png" alt="" className="siteimg"/>
                    <h4>Redux</h4>
                </div>
                <div>
                    <img src="https://seeklogo.com/images/N/nodejs-logo-FBE122E377-seeklogo.com.png" alt="" className="siteimg"/>
                    <h4>Node</h4>
                </div>
                </div>
                </div>
            </div>
        );
    }
}
 
export default About;