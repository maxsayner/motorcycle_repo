import React, { Component } from "react";

import "./App.css";
import axios from "axios";
import Routes from "./routes";
import Main from "./app/Component/Main";
import Login from "./app/Component/Login";

import styled from "styled-components";

const Button = styled.button`
  height: 50px;
  color: red;
  border: 2px solid black;
  text-align: center;
  height: 30px;
`;

const AppStyle = styled.div`
  text-align: center;
  position: relative;
`;

const BASE_URL = "http://localhost:3000";

class App extends Component {
  constructor() {
    super();
    this.state = {
      isLoggedIn: true
    };
  }

  render() {
    return (
      <AppStyle>
        <div className="App">
          {!this.state.isLoggedIn ? <Login /> : <div>{Routes}</div>}
        </div>
      </AppStyle>
    );
  }
}

export default App;
