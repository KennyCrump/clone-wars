import React, { Component } from "react";
import { Button, Container, Img, Text, Header } from "./loginStyles";
import Logo from "./cloud-coding.png";
import axios from "axios";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedin: ""
    };
  }

  componentDidMount() {
    axios.get("/api/userData").then(response => {
      if (response.data != "please login") {
        this.setState({
          loggedin: response.data
        });
      }
    });
  }

  login = () => {
    let { REACT_APP_DOMAIN, REACT_APP_CLIENT_ID } = process.env;
    let url = `${encodeURIComponent(window.location.origin)}/auth/callback`;
    window.location = `https://${REACT_APP_DOMAIN}/authorize?client_id=${REACT_APP_CLIENT_ID}&scope=openid%20profile%20email&redirect_uri=${url}&response_type=code`;
  };

  dashboard = () => {
    window.location.href = 'http://localhost:3000/#/dashboard'
  }

  render() {
    console.log(this.state.loggedin);
    return (
      <div>
        <Header>
          <Img className='animated zoomIn faster'src={Logo} />
        </Header>
        <Container>
          <Img src={Logo} alt="" />

          {this.state.loggedin ? (
            <div>
              <Text>
                Hello, {this.state.loggedin.username} you are already logged in
              </Text>
              <Button onClick={this.dashboard}>Dashboard</Button>
            </div>
          ) : (
            <div>
              <Text> Login to get started </Text>
              <Button onClick={this.login}>LOGIN</Button>
            </div>
          )}
        </Container>
      </div>
    );
  }
}

export default Login;
