import React from "react";
import styled from "styled-components";

const TokenStyled = styled.div`
  width: 130px;
  height: 125px;
  padding: ${({ name }) => (name === "default" ? "16px" : "0")};
  border: 16px solid ${({ color }) => color.base};
  box-sizing: border-box;
  border-radius: 50%;
  display: flex;
  background: ${({ name }) => (name === "default" ? "#122343" : "white")};
  box-shadow: 0 5px 0px ${({ color }) => color.border};
  cursor: pointer;
  position: relative;
  z-index: 2;
  box-shadow: 0 0 10px 40px rgba(0, 0, 0, 0.15), 0 0 0 40px rgba(0, 0, 0, 0.125);
  &:active {
    transform: scale(0.9);
  }
  .box {
    box-shadow: 0 0 0 0px rgba(255, 255, 255, 0.04),
      0 0 0 0px rgba(255, 255, 255, 0.04), 0 0 0 0px rgba(255, 255, 255, 0.02);

    flex: 1;
    align-self: stretch;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;
const colors = {
  paper: {
    base: "#516ef4",
    border: "#2543c3",
  },
  rock: {
    base: "#de3a5a",
    border: "#980e31",
  },
  scissors: {
    base: "#eca81e",
    border: "#c76c14",
  },
  default: {
    base: "transparent",
    border: "transparent",
  },
};

function Token({ name = "default", onClick }) {
  function handleClick() {
    if (onClick) {
      onClick(name);
    }
  }
  const color = colors[name];
  return (
    <TokenStyled color={color} onClick={handleClick} name={name}>
      <div className="box">
        <img src={`./images/icon-${name}.svg`} alt="" />
      </div>
    </TokenStyled>
  );
}

export default Token;
