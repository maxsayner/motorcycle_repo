import React, { Component } from "react";
import axios from "axios";
import styled from "styled-components";
import Main from "./Main";
import Slide from "@material-ui/core/Slide";
import { URL } from "url";
import { connect } from "react-redux";

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
const StyledHome = styled.div`
  align-items: center;
  background-color: transparent;
  border: none;
`;

const GarageTitle = styled.h1`
  color: #176117;
  font-size: 2.5em;
  font-family: serif;
`;

const GarageBody = styled.div`
  align-items: center;
  margin-bottom: 10px;
`;

const NoModel = styled.h1`
  font-style: italic;
  color: red;
`;

const StyledDelete = styled.div`
  align-items: flex-start;
  background-color: transparent;
  border: none;
  margin-right: 100px;
`;

const GarageDiv = styled.div`
  display: flex;
  justify-content: center;
`;

const ModelDisplay = styled.div`
  display: flex;
  justify-content: flex-wrap;
  color: green;
  font-size: 10px;
`;

const StyledImg = styled.img`
  width: 10vw;
`;

class MyGarage extends Component {
  constructor() {
    super();
    this.state = {
      selectedModel: [],
      model_id: [],
      models: []
    };
  }

  componentDidMount = () => {
    axios({
      method: "GET",
      url: BASE_URL + "/api/get_garage_bikes/" + this.props.userId
    }).then(response => {
      this.setState({ models: response.data });
    });
  };

  handleDeleteClick = model_id => {
    axios({
      method: "DELETE",
      url: BASE_URL + "/api/delete_model/" + model_id
    }).then(response => {
      this.state.model_id();
    });
  };

  handleHomeClick = () => {
    axios({
      method: "get",
      url: BASE_URL + "/api/Main/"
    }).then(response => {
      this.handleGet();
    });
  };
  showSavedModel = event => {
    const index = event.target.value;
    console.log("index", index);

    this.props.selectedModel(index);
  };

  render() {
    console.log(!!this.props.selectedModel);
    return (
      <MainWrapper>
        <GarageNav>
          <StyledDelete>
            {/* {this.props.selectedModel ? ( */}
            <button
              onClick={() =>
                this.handleDeleteClick(this.state.selectedModel.model_id)
              }
            >
              Delete Bike
            </button>
            {/* ) : null} */}
            <StyledHome>
              <button
                onClick={() =>
                  this.handleHomeClick(this.props.history.push("/"))
                }
              >
                Home
              </button>
            </StyledHome>
          </StyledDelete>
          <GarageDiv>
            <Slide
              direction="down"
              in={true}
              timeout={1500}
              mountOnEnter
              unmountOnExit
            >
              <GarageTitle> My Garage </GarageTitle>
            </Slide>
          </GarageDiv>
        </GarageNav>

        <GarageBody>
          {console.log("hello", this.props.selectedModel)}
          <NoModel>
            {this.state.models.length ? (
              <ModelDisplay>
                {this.state.models.map(model => (
                  <div>
                    <ul>
                      <li>
                        <h1>{model ? model.model_name : null}</h1>
                        {model ? <StyledImg src={model.image_url} /> : null}
                      </li>
                    </ul>
                  </div>
                ))}
              </ModelDisplay>
            ) : (
              "no models saved!"
            )}
          </NoModel>
        </GarageBody>
      </MainWrapper>
    );
  }
}

const mapStateToProps = state => {
  return {
    userId: state.user.id
  };
};

export default connect(
  mapStateToProps,
  null
)(MyGarage);
