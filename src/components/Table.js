import React, { useContext, useState } from "react";
import styled from "styled-components";
import Token from "./Token.js";
import { WhiteButton } from "./Button";
import { ScoreContext } from "../App.js";

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
  const [pick, setPick] = useState("");
  const [housePick, setHousePick] = useState("default");
  const { score, setScore } = useContext(ScoreContext);

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
    // console.log(house)
    // console.log('la casa eligió ', house)
    const results = playWithIA(name, house);
    setResult(results);
    if (results === "win") {
      setScore(score + 1);
    }
  }
  function playWithIA(pick, housePick) {
    if (housePick === pick) {
      return "draw";
    }
    if (pick === "paper") {
      if (housePick === "scissors") {
        return "lose";
      }
      if (housePick === "rock") {
        return "win";
      }
    }
    if (pick === "scissors") {
      if (housePick === "paper") {
        return "win";
      }
      if (housePick === "rock") {
        return "lose";
      }
    }
    if (pick === "rock") {
      if (housePick === "paper") {
        return "lose";
      }
      if (housePick === "scissors") {
        return "win";
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
