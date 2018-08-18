import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import Title from "./Title";
import Slide from "@material-ui/core/Slide";

import MyGarage from "./MyGarage";

const StyledNav = styled.nav`
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 1;
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #989898;
  width: 100%;
`;

const MyGarageLink = styled.button`
  background-color: transparent;
  border: none;
  text-decoration: none;
  font-size: 16px;
`;

const Login = styled.button`
  background-color: transparent;
  border: none;
  text-decoration: none;
  font-size: 12px;
`;

const Nav = () => {
  return (
    <Wrapper>
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
      <StyledNav>
        <Title />
      </StyledNav>
    </Wrapper>
  );
};

export default Nav;
