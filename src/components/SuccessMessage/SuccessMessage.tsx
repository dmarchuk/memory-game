import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { RESET_TIMEOUT_SECONDS } from '../../constants';

export const SuccessMessage = () => {
    const [timer, setTimer] = useState(RESET_TIMEOUT_SECONDS);

    useEffect(() => {
        const interval = window.setInterval(() => {
            setTimer(secondsLeft => secondsLeft - 1);
        }, 1000);
        return () => window.clearInterval(interval);
    }, []);

    return <SuccessMessageElement>Congratulations, you have solved the puzzle! The board will reset in {timer} seconds.</SuccessMessageElement>;
};

export const SuccessMessageElement = styled.div`
    padding: 16px;
    color: #4BB543;
`;
