import React, { Component } from "react";
import axios from "axios";
import styled from "styled-components";
import Main from "./Main";

const BASE_URL = "http://localhost:4000";

const MainWrapper = styled.div`
  height: 100vh;
  width: 100vw;
  background-color: #eae5e5;
  display: flex;
  align-items: center;
  flex-direction: column;
`;

const GarageNav = styled.div`
  display: flex;
  width: 100%;
  height: 100px;
  background-color: #989898;
  align-items: center;
  justify-content: flex-start;
`;

const GarageTitle = styled.h1`
  display: flex;
  align-items: center;
  justify-content: center;
  color: #176117;
  font-size: 2.5em;
  font-family: "Eczar", serif;
`;

const GarageBody = styled.body`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
`;

const NoModel = styled.h1`
  font-style: italic;
  color: red;
`;

const StyledDelete = styled.button`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  background-color: white;
  margin-right: 100px;
`;

const StyledHome = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: white;
`;

export default class MyGarage extends Component {
  constructor() {
    super();
    this.state = {
      selectedModel: null,
      model_id: []
    };
  }

  componentDidMount = () => {
    // axios({
    //     method: "delete",
    //     //gets brand id and name
    //     url: BASE_URL + "/api/delete_id"
    //   }).then(response => {
    //     this.setState({ model_id: response.data });
    //   });
  };

  handleDeleteClick = model_id => {
    axios({
      method: "DELETE",
      url: BASE_URL + "/api/delete_model/" + model_id
    }).then(response => {
      this.handleGet();
    });
  };

  handleHomeClick = () => {
    axios({
      method: "DELETE",
      url: BASE_URL + "/api/Main/"
    }).then(response => {
      this.handleGet();
    });
  };

  render() {
    console.log(!!this.state.selectedModel);
    return (
      <MainWrapper>
        <GarageNav>
          <StyledDelete>
            {this.state.selectedModel ? (
              <button
                onClick={() =>
                  this.handleDeleteClick(this.state.selectedModel.model_id)
                }
              >
                Delete Bike
              </button>
            ) : null}
          </StyledDelete>
          <StyledHome>
            <button
              onClick={() => this.handleHomeClick(this.props.history.push("/"))}
            >
              Home
            </button>
          </StyledHome>
          <GarageTitle> My Garage </GarageTitle>
        </GarageNav>
        <GarageBody>
          <NoModel>
            {this.state.selectedModel
              ? this.state.selectedModel.model_name
              : "no model found"}
          </NoModel>
        </GarageBody>
      </MainWrapper>
    );
  }
}
