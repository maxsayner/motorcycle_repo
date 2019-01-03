import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import Title from "./Title";
import Slide from "@material-ui/core/Slide";



const MainWrapper = styled.div`
  background-color: #989898;
 
`;

const ButtonsWrapper = styled.div`
  display: flex;
  justify-content: space-around;
`;

const MyGarageLink = styled.button`
  color: black;
  font-size: 12px;
  background-color: transparent;
  border: none;
`;

const GarageIcon = styled.div`
  color: #176117;
  background-color: transparent;
  cursor: pointer;
  border: none;
  text-decoration: none;
  font-size: 12px;
`;

const Login = styled.div`
  background-color: transparent;
  border: none;
  text-decoration: none;
  font-size: 12px;
  color: black;
  cursor: pointer;
`;

const LoginIcon = styled.div`
  color: #176117;
  background-color: transparent;
  cursor: pointer;
  border: none;
  text-decoration: none;
  font-size: 12px;
`;

const LoginText = styled.div`
  color: black;
  text-decoration: none;
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
              <GarageIcon>
                <i className="fas fa-motorcycle fa-3x" />
              </GarageIcon>
            </Slide>
          </Link>
          <br />
          My Garage
        </MyGarageLink>

        <Login>
          <a href="https://encyclepedia-fylumvnhhv.now.sh/" className="Login">
            <Slide
              direction="left"
              in={true}
              timeout={1500}
              mountOnEnter
              unmountOnExit
            >
              <LoginIcon>
                <i className="fas fa-sign-in-alt fa-3x" />
              </LoginIcon>
            </Slide>
            <br />
            <LoginText>Log In</LoginText>
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
