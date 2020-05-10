import React from 'react';
import styled from 'styled-components';
import { Board, GlobalStyle } from './components';

export const App = () => (
    <div>
        <GlobalStyle />
        <Heading>Memory game</Heading>
        <ContainerElement>
            <Board numberOfCards={8} />
        </ContainerElement>
    </div>
);

export const Heading = styled.h1`
    text-align: center;
`;

export const ContainerElement = styled.div`
    display: flex;
    justify-content: center;
`;
