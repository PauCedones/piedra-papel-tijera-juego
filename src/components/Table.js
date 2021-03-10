import React, { useState } from "react";
import styled from "styled-components";
import Token from "./Token.js";
import { WhiteButton } from "./Button";

const TableStyled = styled.div`
  display: grid;
  grid-template-columns: 130px 130px;
  justify-content: center;
  justify-items: center;
  grid-gap: 30px 50px;
  margin: 2em 0;
  position: relative;
  & div:nth-of-type(3) {
    grid-column: span 2;
  }
  .in-game {
    text-align: center;
    text-transform: uppercase;
    font-size: 0.8em;
    font-weight: 700;
    letter-spacing: 1px;
  }
  .results {
    text-align: center;
    h2 {
      text-transform: uppercase;
    }
  }
  .line {
    //si no estoy jugando, el display que sea de block, de lo contrario que sea none
    display: ${({ playing }) => (!playing ? "block" : "none")};
    height: 14px;
    background: rgba(0, 0, 0, 0.2);
    position: absolute;
    left: 60px;
    right: 60px;
    top: 58px;

    &:before {
      content: "";
      height: 10px;
      background: rgba(0, 0, 0, 0.2);
      position: absolute;
      left: 0;
      right: 0;
      top: 0;
      transform: rotate(60deg);
      transform-origin: left top;
    }
    &:after {
      content: "";
      height: 10px;
      background: rgba(0, 0, 0, 0.2);
      position: absolute;
      left: 0;
      right: 0;
      top: 0;
      transform: rotate(-60deg);
      transform-origin: right top;
    }
  }
`;

const elements = ["paper", "scissors", "rock"];

function Table() {
  const [result, setResult] = useState("");
  const [playing, setPlaying] = useState(false);
  //const [score, setScore] = useState(0);
  const [pick, setPick] = useState("");
  const [housePick, setHousePick] = useState("default");

  function getRandom(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
  }
  function launchHousePick() {
    return new Promise((resolve, reject) => {
      let pick;
      const interval = setInterval(() => {
        pick = elements[getRandom(0, 3)];
        setHousePick(pick);
      }, 75);

      setTimeout(() => {
        clearInterval(interval);
        resolve(pick);
      }, 2000);
    });
  }

  async function onClick(name) {
    setPlaying(true);
    setPick(name);
    const house = await launchHousePick();
    const housePick = launchHousePick();
    //console.log("la casa eligió", house);
    const results = playWithIA(name, house);
    setResult(results);
    //console.log(results);
  }
  function playWithIA(pick, housePick) {
    if (housePick === pick) {
      return "empate";
    }
    if (pick === "paper") {
      if (housePick === "rock") {
        return "ganaste";
      }
      if (housePick === "scissors") {
        return "perdiste";
      }
    }
    if (pick === "scissors") {
      if (housePick === "paper") {
        return "ganaste";
      }
      if (housePick === "rock") {
        return "perdiste";
      }
    }
    if (pick === "rock") {
      if (housePick === "paper") {
        return "perdiste";
      }
      if (housePick === "scissors") {
        return "ganaste";
      }
    }
  }
  function handleTryAgainClick() {
    setPlaying(false);
  }
  return (
    <TableStyled playing={playing}>
      <span className="line"></span>
      {!playing ? (
        <>
          <Token name="paper" onClick={onClick} />
          <Token name="scissors" onClick={onClick} />
          <Token name="rock" onClick={onClick} />
        </>
      ) : (
        <>
          <div className="in-game">
            <Token name={pick} />
            <p>Vos elegiste</p>
          </div>
          <div className="in-game">
            <Token name={housePick} />
            <p>La casa eligió</p>
          </div>
          <div className="results">
            <h1>{result}</h1>
            <WhiteButton onClick={handleTryAgainClick}>
              Volver a jugar
            </WhiteButton>
          </div>
        </>
      )}
    </TableStyled>
  );
}
export default Table;
