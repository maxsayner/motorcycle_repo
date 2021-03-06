import React from "react";
import SpecSheet from "./SpecSheet";
import styled from "styled-components";

export default props => {
  const StyledImg = styled.img`
    width: 50vw;
  `;

  const StyledText = styled.div`
    font-size: 30px;
    color:red;
    font-style: italic;
  `;

  // const styles = styled.div``;

  return (
    <div>
      <h1>{props.selectedModel.model_name}</h1>
      {!props.selectedModel.image_url ? (
        <StyledText>no image available </StyledText>
      ) : (
          <StyledImg src={props.selectedModel.image_url} alt="" />
        )}

      <SpecSheet spec_id={props.selectedModel.spec_id} />
    </div>
  );
};
