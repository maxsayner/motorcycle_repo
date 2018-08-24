import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import Title from "./Title";
import Slide from "@material-ui/core/Slide";

import MyGarage from "./MyGarage";

const MainWrapper = styled.div`
  display: grid;
  grid-column: 1/-1;

  background-color: #989898;
`;

const ButtonsWrapper = styled.div``;

const MyGarageLink = styled.button`
  grid-column: 1/-1;

  background-color: transparent;
  border: none;
  text-decoration: none;
  font-size: 12px;
`;

const Login = styled.button`
  grid-column: 1/-1;
  background-color: transparent;
  border: none;
  text-decoration: none;
  font-size: 12px;
`;

const StyledTitleWrapper = styled.div``;

const Nav = () => {
  return (
    <MainWrapper>
      <ButtonsWrapper>
        <MyGarageLink>
          <Link to="/MyGarage" className="GarageLink">
            <Slide
              direction="right"
              in={true}
              timeout={1500}
              mountOnEnter
              unmountOnExit
            >
              <i className="fas fa-motorcycle fa-3x" />
            </Slide>
          </Link>
          <br />
          My Garage
        </MyGarageLink>

        <Login>
          <a href="http://localhost:4000/login" className="Login">
            <Slide
              direction="left"
              in={true}
              timeout={1500}
              mountOnEnter
              unmountOnExit
            >
              <i class="fas fa-sign-in-alt fa-3x" />
            </Slide>
            <br />
            Log In
          </a>
        </Login>
      </ButtonsWrapper>
      <StyledTitleWrapper>
        <Title />
      </StyledTitleWrapper>
    </MainWrapper>
  );
};

export default Nav;
