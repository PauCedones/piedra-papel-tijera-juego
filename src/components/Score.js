import React from 'react';
import styled from 'styled-components';

const ScoreStyled = styled.div`
    background: white;
    text-align: center;
    padding: 10px;
    border-radius: 8px;
    width: 80px;
    

    small {
        color: #2A45C2;
        text-transform: uppercase;
        font-size: 10px;
        font-weight: bold;
        letter-spacing: 1px;
    }
    p {
        color: #565468;
        font-size: 40px;
        margin:0;
        font-weight: 700;
        position: relative;
    }
`

function Score(){
    return (
        <ScoreStyled>
            <small>Score</small>
            <p>12</p>
        </ScoreStyled>

    )
    
}

export default Score;