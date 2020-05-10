import React, { memo } from 'react';
import styled from 'styled-components';
import { Color } from '../../constants';

interface CardProps {
    id: number;
    index: number;
    isFlipped: boolean;
    isClickable: boolean;
    imageURL: string;
    handleFlip: (event: React.MouseEvent<HTMLDivElement>, index: number, id: number) => void;
}

export const Card = memo(({ id, index, isFlipped, isClickable, imageURL, handleFlip }: CardProps) => {
    const flipCard = (event: React.MouseEvent<HTMLDivElement>) => {
        if (!isClickable) {
            return;
        }

        handleFlip(event, index, id);
    };

    return (
        <CardContainerElement onClick={flipCard} data-test-id="card-container">
            <CardElement isFlipped={isFlipped}>
                <CardInnerElement isClickable={isClickable} />
                <CardBackElement isClickable={isClickable}>
                    <ImageElement src={imageURL} alt={imageURL} draggable={false} />
                </CardBackElement>
            </CardElement>
        </CardContainerElement>
    );
});

Card.displayName = 'Card';

const CARD_SIZE = '125px';

const CardContainerElement = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: ${CARD_SIZE};
    height: ${CARD_SIZE};
    font-size: 24px;
    perspective: 1000px;
`;

interface CardElementProps {
    isFlipped: boolean;
}

const CardElement = styled.div<CardElementProps>`
    position: relative;
    width: 100%;
    height: 100%;
    transition: transform 0.2s;
    transform-style: preserve-3d;
    will-change: transform;

    ${props => props.isFlipped && 'transform: rotateY(180deg);'}
`;

interface CardInnerElementProps {
    isClickable: boolean;
}

const CardInnerElement = styled.div<CardInnerElementProps>`
    position: absolute;
    width: 100%;
    height: 100%;
    backface-visibility: hidden;
    border-radius: 8px;
    border: 1px solid ${Color.Silver};
    overflow: hidden;
    box-shadow: 0 5px 16px rgba(0, 0, 0, 0.05);
    
    ${props => props.isClickable && `
        cursor: pointer;
    
        &:hover {
            box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.3);
        }
    `}
`;

const CardBackElement = styled(CardInnerElement)`
    transform: rotateY(180deg);
`;

const ImageElement = styled.img`
    padding: 4px;
    max-width: 100%;
`;
