import React, { Component } from "react";
import { Button, Container, Img, Text, Header } from "./loginStyles";
import Logo from "./cloud-coding.png";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  login = () => {
    let { REACT_APP_DOMAIN, REACT_APP_CLIENT_ID } = process.env;
    let url = `${encodeURIComponent(window.location.origin)}/auth/callback`;
    window.location = `https://${REACT_APP_DOMAIN}/authorize?client_id=${REACT_APP_CLIENT_ID}&scope=openid%20profile%20email&redirect_uri=${url}&response_type=code`;
  };

  render() {
    return (
      <div>
        <Header>
          <Img src={Logo} />
        </Header>
        <Container>
          <Img src={Logo} alt="" />
          <Text> Login to get started </Text>
          <Button onClick={this.login}>LOGIN</Button>
        </Container>
      </div>
    );
  }
}

export default Login;
