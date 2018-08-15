import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import Title from "./Title";

import MyGarage from "./MyGarage";

const StyledNav = styled.nav`
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 1;
  margin-bottom: 10px;
`;

const Wrapper = styled.div`
  display: flex;
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
  margin-left: 20px;
`;

const Nav = () => {
  return (
    <Wrapper>
      <MyGarageLink>
        <Link to="/MyGarage" className="GarageLink">
          <i className="fas fa-motorcycle fa-3x" />
          <br />
          My Garage
        </Link>
      </MyGarageLink>
      <Login>
        <a href="http://localhost:4000/login" className="Login">
          <i class="fas fa-sign-in-alt fa-3x" />
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
