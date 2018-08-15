import React from "react";
import styled from "styled-components";

const StyledTitle = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  width: 600px;
  position: fixed;
`;

const Text = styled.h1`
  color: white;
  font-family: "Eczar", serif;
  font-size: 2em;
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
  color: blue;
`;

const Title = () => {
  return (
    <StyledTitle>
      <Text>
        EN
        <Mid>CYCLE</Mid>
        PEDIA
        <Dot>.</Dot>
      </Text>
      <Sub />
    </StyledTitle>
  );
};

export default Title;
