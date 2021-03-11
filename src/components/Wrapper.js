import React from "react";
import styled from "styled-components";

const WrappedStyled = styled.div`
  max-width: 700px;
  margin: auto;
`;

function Wrapper({ children }) {
  return <WrappedStyled>{children}</WrappedStyled>;
}

export default Wrapper;
