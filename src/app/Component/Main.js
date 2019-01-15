import React, { Component } from "react";
import axios from "axios";
// import { Link } from "react-router-dom";
import Model from "./Model";
import styled from "styled-components";
import Nav from "./Nav";
import Title from "./Title";
import { Button } from "react-bootstrap"


import { connect } from "react-redux";
import {
  updateBrands,
  updateModels,
  updateSelectedModel,
  updateUser
} from "../../ducks/reducer";



const styles = {
  brandSelect: {
    color: "black",
    backgroundColor: "#990000",
    height: 40,
    width: 200
  }
};

const StyledMain = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #144f4c;
  height: 100em;
`;

const StyledSelect = styled.div`
  display: flex;
  justify-content: space-evenly;
  margin: 20px;
`;

const StyledBrand = styled.select`
  color: black;
  background-color: #990000;
  height: 40px;
  width: 200px;
`;

const StyledModel = styled.select`
  display: flex;
  justify-content: center;
  color: black;
  background-color: #990000;
  height: 40px;
  width: 200px;
`;

const StyledSave = styled.div`


`;



const BASE_URL = "";

class Main extends Component {
  constructor() {
    super();
    this.state = {
      selectedModel: null,
      models: [],
      brands: [],
      specs: null,
      user: {},
      currentModelId: ""
    };
  }

  componentDidMount() {
    axios({
      method: "get",
      //gets brand id and name

      url: BASE_URL + "/api/brands"
    }).then(response => {


      this.props.updateBrands(response.data);

    });

    axios({
      method: "get",
      url: BASE_URL + "/api/user?1"
    }).then(response => this.props.updateUser(response.data));
  }

  getModel = event => {

    axios({
      //gets ModelID, model image and model name
      method: "get",
      url: BASE_URL + `/api/models/${event.target.value}`

      //e.target.value is the BRAND ID
      // e.target.value +
      // "/models"
    }).then(response => {

      this.props.updateModels(response.data);
    });
  };

  showModel = event => {

    // event.persist();
    const index = event.target.value;
    const model_id = this.props.models[index].model_id;
    this.setState({ currentModelId: model_id });

    this.props.updateSelectedModel(index);
  };

  // TODO: USE this.props.updateSelectedModel function

  onSaveClick = () => {

    axios({
      method: "post",
      url: BASE_URL + "/api/post_models",
      data: {
        model_id: this.state.currentModelId
      }
    })
      .then(() => {
        this.props.snackbar.showMessage("Bike added to Garage", "Undo", () =>
          this.handleUndo()
        );
      })
      .catch(err => {

      });
    //make an axios request to an endpoint on your backend that saves
    //a bike to your garage using this.state.selectedModel
  };

  render() {


    const Select = () => {
      return (
        <StyledSelect>
          <StyledBrand style={styles.brandSelect} onChange={this.getModel}>
            <option>-- Select A Brand --</option>
            {this.props.brands.map(motorcycle => (
              <option key={motorcycle.brand_id} value={motorcycle.id}>
                {motorcycle.brand_name}
              </option>
            ))}
          </StyledBrand>
          <StyledModel onChange={this.showModel}>
            <option>-- Select A Model ---</option>
            {this.props.models
              ? this.props.models.map((model, index) => (
                <option key={model.model_id} value={index}>
                  {model.model_name}
                </option>
              ))
              : null}
          </StyledModel>
        </StyledSelect>
      );
    };


    return (
      <StyledMain>
        <Nav>
          <Title />
        </Nav>
        <Select />
        <div>
          {this.props.selectedModel >= 0 ? (
            <div>
              <h1>
                {
                  this.props.models[this.props.selectedModel].model_name.image_url
                }
              </h1>

              <StyledSave>
                <Button bsSize="large" onClick={this.onSaveClick}>Save Bike</Button>
              </StyledSave>
              <br />
              <br />
              {/* <Garage>favorited bikes </Garage> */}
              {/* TODO: Use selectedModel from props */}
              <Model
                selectedModel={this.props.models[this.props.selectedModel]}
                key={this.props.selectedModel.model_id}
                specs={this.state.specs}
              />
            </div>
          ) : null}
        </div>
        <div />
        <div />
      </StyledMain>
    );
  }
}

// TODO: Use selectModel state
const mapStateToProps = state => {

  return {
    brands: state.brands,
    models: state.modelType,
    selectedModel: state.selectedModel
  };
};

// TODO: Link updateSelectedModel fuction
export default connect(
  mapStateToProps,
  { updateBrands, updateModels, updateSelectedModel, updateUser }
)(Main);
