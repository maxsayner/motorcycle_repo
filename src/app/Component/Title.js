import React from "react";
import styled from "styled-components";
import Slide from "@material-ui/core/Slide";

const Text = styled.h1`
  padding: none;
  color: black;
  font-family: "Eczar", serif;
  font-size: 30px;
`;

const Mid = styled.span`
  color: #176117;
  font-size: 1.5em;

  font-family: "Permanent Marker", cursive;
`;

const Sub = styled.text`
  color: #176117;
  font-size: 18px;
  font-family: "Permanent Marker", cursive;
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
          <br />
        </Text>
      </Slide>

      <Sub>
        {" "}
        <b> A DATABASE FOR ALL THINGS MOTO </b>
      </Sub>
    </div>
  );
};

export default Title;
