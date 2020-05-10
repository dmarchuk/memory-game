import React from 'react';
import styled from 'styled-components';
import { IMAGES_PATH } from '../../constants';
import { getAllCardNumbers, shuffleArrayOfNumbers } from '../../utils';
import { Card, SuccessMessage } from '../../components';

export interface BoardProps {
    numberOfCards: number;
    resetTimeoutSeconds: number;
}

export interface BoardState {
    coordinates: number[];
    flippedCardsIndexes: number[];
    solvedCards: number[];
    canFlip: boolean;
    isSolved: boolean;
}

export class Board extends React.Component<BoardProps, BoardState> {
    private timeoutId: number | null = null;

    constructor(props: BoardProps) {
        super(props);

        this.state = {
            coordinates: [],
            flippedCardsIndexes: [],
            solvedCards: [],
            canFlip: true,
            isSolved: false,
        };
    }

    componentDidMount = () => {
        this.reset();
    }

    componentWillUnmount() {
        if (this.timeoutId) {
            window.clearTimeout(this.timeoutId);
        }
    }

    reset = () => {
        const allCoordinates = getAllCardNumbers(this.props.numberOfCards);
        const randomCoordinates = shuffleArrayOfNumbers(allCoordinates);

        this.setState({
            coordinates: randomCoordinates,
            solvedCards: [],
            isSolved: false,
        });
    }

    isCardCorrectChoice = (index: number, id: number) => {
        const { coordinates, flippedCardsIndexes } = this.state;

        if (flippedCardsIndexes.length === 0 || flippedCardsIndexes.includes(index)) {
            return false;
        }

        const flippedCardIndex = flippedCardsIndexes[0];
        const flippedCardId = coordinates[flippedCardIndex];
        return flippedCardId === id;
    }

    resetFlippedCards = () => {
        this.setState({
            flippedCardsIndexes: [],
            canFlip: true,
        });
    }

    flipCard = (index: number, id: number) => {
        let flippedCardsIndexes: number[] = [];
        let solvedCards = [...this.state.solvedCards];
        let canFlip = true;

        const isCorrectChoice = this.isCardCorrectChoice(index, id);

        if (isCorrectChoice) {
            solvedCards = [...solvedCards, id];
        } else if (flippedCardsIndexes.length <= 2) {
            flippedCardsIndexes = [...this.state.flippedCardsIndexes, index];
        }

        const isSolved = this.props.numberOfCards === solvedCards.length;

        if (isSolved) {
            this.timeoutId = window.setTimeout(this.reset, this.props.resetTimeoutSeconds * 1000);
        }

        if (flippedCardsIndexes.length === 2) {
            canFlip = false;
            this.timeoutId = window.setTimeout(this.resetFlippedCards, 1000);
        }

        this.setState({
            canFlip,
            flippedCardsIndexes,
            solvedCards,
            isSolved,
        });
    }

    onClickHandler = (event: React.MouseEvent<HTMLElement>, index: number, id: number) => {
        const { canFlip } = this.state;

        if (!canFlip) {
            return;
        }

        this.flipCard(index, id);
    }

    render = () => {
        const {
            coordinates,
            solvedCards,
            flippedCardsIndexes,
            canFlip,
            isSolved,
        } = this.state;

        return (
            <BoardContainerElement canFlip={canFlip}>
                <BoardElement>
                    {coordinates.map((id, index) => {
                        const isFlipped = solvedCards.includes(id) || flippedCardsIndexes.includes(index);
                        const imageURL = `${IMAGES_PATH}/img${id}.jpg`;
                        const isClickable = !isFlipped && canFlip;

                        return (
                            <Card
                                key={index}
                                id={id}
                                index={index}
                                isFlipped={isFlipped}
                                isClickable={isClickable}
                                imageURL={imageURL}
                                handleFlip={this.onClickHandler}
                            />
                        );
                    })}
                </BoardElement>
                {isSolved && <SuccessMessage />}
            </BoardContainerElement>
        );
    }
}

interface BoardContainerElementProps {
    canFlip: boolean;
}

export const BoardContainerElement = styled.div<BoardContainerElementProps>`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    ${props => !(props.canFlip) && 'cursor: not-allowed;'}
`;

export const BoardElement = styled.div`
    display: grid;
    width: 532px;
    grid-template-columns: repeat(4, 1fr);
    grid-gap: 8px;

    &:before {
        padding-top: 100%;
    }
`;
