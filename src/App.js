import React, { Component } from "react";

import "./App.css";

import Routes from "./routes";

import Login from "./app/Component/Login";

import styled from "styled-components";



const AppStyle = styled.div`
  text-align: center;
  position: relative;
`;



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
