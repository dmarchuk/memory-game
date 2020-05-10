import React from 'react';
import { mount, shallow } from 'enzyme';
import { act } from 'react-dom/test-utils';
import { RESET_TIMEOUT_SECONDS } from '../../constants';
import { Board, Card } from '../../components';
import { BoardProps, BoardState } from '../Board/Board';

describe('Board component', () => {
    it('renders the correct amount of cards', () => {
        const wrapper = mount<BoardProps, BoardState>(<Board numberOfCards={4}/>);
        const cards = wrapper.find(Card);
        const numberOfCards = cards.length;

        expect(numberOfCards).toBe(8);
    });

    it('has correct random initial coordinates', () => {
        const wrapper = shallow<Board, BoardProps, BoardState>(<Board numberOfCards={4}/>);
        const state = wrapper.state();
        const sortedCoordinates = state.coordinates.sort();
        const expected = [0, 0, 1, 1, 2, 2, 3, 3];

        expect(sortedCoordinates).toStrictEqual(expected);
    });

    describe('flipCard', () => {
        describe('click on a first card', () => {
            const wrapper = mount<BoardProps, BoardState>(<Board numberOfCards={4}/>);
            const firstCardElement = wrapper.find('[data-test-id="card-container"]').hostNodes().first();

            firstCardElement.simulate('click');

            const newFirstCardProps = wrapper.find(Card).first().props();

            it('sets flippedCardsIndexes correctly', () => {
                const expected = [0];

                expect(wrapper.state().flippedCardsIndexes).toStrictEqual(expected);
            });

            it('changes isFlipped of first card', () => {
                expect(newFirstCardProps.isFlipped).toBe(true);
            });

            it('changes isClickable of first card', () => {
                expect(newFirstCardProps.isClickable).toBe(false);
            });
        });
    });

    describe('solving the puzzle', () => {
        jest.useFakeTimers();
        const wrapper = mount<Board, BoardProps, BoardState>(<Board numberOfCards={4}/>);
        const { coordinates } = wrapper.state();
        const solvedCardIds = [0, 1, 2];
        const cardIdToSolve = 3;
        const cardElements = wrapper.find('[data-test-id="card-container"]').hostNodes();
        const firstCardIndexToSolve = coordinates.indexOf(cardIdToSolve);
        const secondCardIndexToSolve = coordinates.indexOf(cardIdToSolve, firstCardIndexToSolve + 1);

        const instance = wrapper.instance();

        instance.setState({
            solvedCards: solvedCardIds,
        });

        cardElements.at(firstCardIndexToSolve).simulate('click');
        cardElements.at(secondCardIndexToSolve).simulate('click');

        const updatedState = wrapper.state();

        describe('set correct state after solving the last pair', () => {
            it('sets isSolved to true', () => {
                expect(updatedState.isSolved).toBe(true);
            });

            it('sets flippedCardsIndexes to an empty array', () => {
                const expected: number[] = [];

                expect(updatedState.flippedCardsIndexes).toStrictEqual(expected);
            });

            it('sets solvedCards to all cards on the board', () => {
                const expected = [...solvedCardIds, cardIdToSolve];

                expect(updatedState.solvedCards).toStrictEqual(expected);
            });
        });

        describe(`reset the board correctly after ${RESET_TIMEOUT_SECONDS} seconds`, () => {
            act(() => {
                jest.advanceTimersByTime(RESET_TIMEOUT_SECONDS * 1000);
            });

            const stateAfterReset = wrapper.state();

            it('sets isSolved false', () => {
                expect(stateAfterReset.isSolved).toBe(false);
            });

            it('sets solvedCards to an empty array', () => {
                const expected: number[] = [];

                expect(stateAfterReset.solvedCards).toStrictEqual(expected);
            });
        });
    });
});
