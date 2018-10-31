import React, { Component } from "react";
import Nav from "../Nav/Nav";
import "./Profile.css";
import { connect } from "react-redux";
import { getUserData } from "../../ducks/reducer";
import axios from "axios";
import { Container, FormContainer } from "./AccountStyles";
class Account extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        <Nav />
        <Container>
          <FormContainer>
            


                    
                    <form action="">  


                    </form>


          </FormContainer>
        </Container>
      </div>
    );
  }
}

export default Account;
