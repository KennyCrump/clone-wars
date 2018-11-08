import React, { Component } from 'react';
import './About.css';
import Nav from '../Nav/Nav';
import Ken from './profile_img/EDIT-7646.JPG';
import Kenny from './profile_img/EDIT-7791.JPG';
import {Link} from 'react-router-dom';

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
                <div className="thing1">
                <img src="https://arcweb.co/wp-content/uploads/2016/10/react-logo-1000-transparent.png" alt="" className="siteimg"/>
                <h4 className="techname">React</h4>
                </div>
                <div className="thing1">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/6/6a/JavaScript-logo.png" alt="" className="siteimg"/>
                    <h4 className="techname">Javascript</h4>
                </div>
                <div className="thing1">
                    <img src="https://melbournechapter.net/images/transparent-html-png-3.png" alt="" className="siteimg" id="resize"/>
                    <h4 className="techname">HTML</h4>
                </div>
                <div className="thing1">
                    <img src="https://melbournechapter.net/images/svg-style-css3-3.png" alt="" className="siteimg" id="resize"/>
                    <h4 className="techname">CSS</h4>
                </div>
                <div className="thing1">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/89/Baboon.svg/220px-Baboon.svg.png" alt="" className="siteimg"/>
                    <h4 className="techname">CodeMirror</h4>
                </div>
                <div className="thing1">
                    <img src="http://www.stickpng.com/assets/images/584815fdcef1014c0b5e497a.png" alt="" className="siteimg"/>
                    <h4 className="techname">PostgreSQL</h4>
                </div>
                <div className="thing1">
                    <img src="http://www.stickpng.com/assets/images/5848309bcef1014c0b5e4a9a.png" alt="" className="siteimg"/>
                    <h4 className="techname">Redux</h4>
                </div>
                <div className="thing1">
                    <img src="https://seeklogo.com/images/N/nodejs-logo-FBE122E377-seeklogo.com.png" alt="" className="siteimg"/>
                    <h4 className="techname">Node</h4>
                </div>
                </div>
                </div>
                <div className="us">
                    <div className="aboutus">
                    <img src={Kenny} className="profileimg"/>
                        <h1>Kenny Crump</h1>
                        <a href="https://www.linkedin.com/in/kenny-crump/"><button className="profilelink">Linkedin</button></a>
                        <a href="https://github.com/KennyCrump"><button className="profilelink">GitHub</button></a>
                    </div>
                    <div className="aboutus">
                        <img src="https://media.licdn.com/dms/image/C5603AQEJwF3GURNGUw/profile-displayphoto-shrink_800_800/0?e=1547078400&v=beta&t=6fkTU3I8iNDU-e8XVf7VWU6zAFIVNJApn-cxK-sLNi4" className="profileimg"/>
                        <h1>Kaleb Manley</h1>
                        <a href="https://www.linkedin.com/in/kaleb-manley/"><button className="profilelink">Linkedin</button></a>
                        <a href="https://github.com/klubb"><button className="profilelink">GitHub</button></a>
                    </div>
                    <div className="aboutus"> 
                        <img src={Ken} className="profileimg"/>
                        <h1>Kenneth Benioni</h1>
                        <a href="https://www.linkedin.com/in/kenneth-benioni/"><button className="profilelink">Linkedin</button></a>
                        <a href="https://github.com/kenabenioni"><button className="profilelink">GitHub</button></a>
                    </div>
                </div>
            </div>
        );
    }
}
 
export default About;