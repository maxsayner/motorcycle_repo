import React, { Component } from "react";
import styled from "styled-components";
import axios from "axios";

const Specs = styled.div`
  display: flex;
  flex-direction: column;
  align-content: center;
  justify-content: center;
  border: 2px solid black;
  height: 350px;
  width: 400px;
  color: black;
  font-size: 20px;
`;

const StyledSpecs = styled.div`
  font-size: 30px;
  color: red;
  font-style: italic;
`;

const Specifications = styled.div`
  color: red;
`;

class SpecSheet extends Component {
  constructor() {
    super();
    this.state = {
      specs: null
    };
  }
  componentDidMount = () => {
    this.getSpecs();
  };
  getSpecs = () => {
    axios({
      method: "get",
      url: "/api/specs/" + this.props.spec_id
    })
      .then(response => {
        console.log("XXXXXX RESPONSE XXX", response);
        this.setState({ specs: response.data[0] });
      })
      .catch(err => console.log("XXX ERROR", err));
  };
  render() {
    if (!this.state.specs) return <StyledSpecs>no specs available</StyledSpecs>;
    return (
      <Specs>
        <br />
        <Specifications>specifications:</Specifications>
        {Object.entries(this.state.specs).map(([key, value]) => {
          if (key === "id") {
            return null;
          }
          return (
            <ul>
              <li>
                {key}:{value}
              </li>
            </ul>
          );
        })}
      </Specs>
    );
  }
}

export default SpecSheet;
