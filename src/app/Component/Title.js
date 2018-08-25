import React from "react";
import styled from "styled-components";
import Slide from "@material-ui/core/Slide";

const Text = styled.h1`
  color: white;
  font-family: "Eczar", serif;
  font-size: 20px;
  margin: 0;
`;

const Mid = styled.span`
  color: #176117;
  font-size: 1.5em;
  font-family: "Pacifico", cursive;
  font-family: "Permanent Marker", cursive;
`;

const Dot = styled.span`
  color: #176117;
  font-size: 1.5em;
`;

const Sub = styled.text`
  color: #1308a5;
  font-size: 80%;
`;

const Title = () => {
  return (
    <div>
      <Slide
        direction="down"
        in={true}
        timeout={1500}
        mountOnEnter
        unmountOnExit
      >
        <Text>
          EN
          <Mid>CYCLE</Mid>
          PEDIA
          <Dot>.</Dot>
          <br />
        </Text>
      </Slide>
      <Slide direction="up" in={true} timeout={1000} mountOnEnter unmountOnExit>
        <Sub> A database for all things moto.</Sub>
      </Slide>
    </div>
  );
};

export default Title;
