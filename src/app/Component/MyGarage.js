import React, { Component } from "react";
import axios from "axios";
import styled from "styled-components";
import Slide from "@material-ui/core/Slide";
import { connect } from "react-redux";

const BASE_URL = "http://localhost:4000";

const MainWrapper = styled.div`
  background-color: #808080;
  height: 2000px;
`;

const GarageNav = styled.div`
  background-color:#193086;
  height: 200px;
`;

const StyledHome = styled.div`
display: flex
justify-content: flex-start;
  font-size: 20px;
  padding-left: 80px;
  padding-top: 60px;

`;

const GarageTitle = styled.h1`
  display: flex;
  justify-content: center;
  color: white;
  font-size: 60px;
  font-family: serif;
`;

const GarageBody = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-top: 100px;
  margin-right: 1000px;
`;

const NoModel = styled.h1`
  font-style: italic;
  color: black;
`;

const GarageDiv = styled.div`
  display: flex;
  justify-content: center;
`;

const ModelDisplay = styled.div`
  display: flex;
  flex-direction: column;
  margin-right: 100px;

  color: #fc5f09
  font-size: 20px;
`;

const StyledImg = styled.img`
  width: 10vw;
`;

const DeleteButton = styled.div`
 
  font-size: 20px;

  width: 70px;
  height: 30px;
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
    this.loadGarageBikes();
  };

  loadGarageBikes = () => {
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
      url: BASE_URL + "/api/delete_models/" + model_id
    }).then(response => {
      this.loadGarageBikes();
    });
  };

  //main doesnt exist
  handleHomeClick = () => {
    axios({
      method: "get",
      url: BASE_URL + "/api//"
    }).then(response => {
      this.handleGet();
    });
  };

  render() {
    return (
      <MainWrapper>
        <GarageNav>
          <StyledHome>
            <button
              onClick={() => this.handleHomeClick(this.props.history.push("/"))}
            >
              Home
            </button>
          </StyledHome>
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
          <NoModel>
            {this.state.models.length ? (
              <ModelDisplay>
                <ul>
                  {this.state.models.map(model => (
                    <li>
                      <h1>{model ? model.model_name : null}</h1>{" "}
                      {model ? <StyledImg src={model.image_url} /> : null}
                      <DeleteButton>
                        <button
                          onClick={() => this.handleDeleteClick(model.model_id)}
                        >
                          Delete
                        </button>
                      </DeleteButton>
                    </li>
                  ))}
                </ul>
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
