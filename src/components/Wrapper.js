import React from 'react';
import styled from 'styled-components';

const WrappedStyled =styled.div`
max-width: 1024px;
margin: auto;
`

function Wrapper( {children} ) {
    return(
        <WrappedStyled>
            {children}
        </WrappedStyled>
    )
}

export default Wrapper;