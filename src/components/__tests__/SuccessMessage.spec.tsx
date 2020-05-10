import React from 'react';
import { mount, shallow } from 'enzyme';
import { act } from 'react-dom/test-utils';
import { SuccessMessage } from '../../components';

describe('SuccessMessage component', () => {
    it('displays the correct initial text', () => {
        const wrapper = shallow(<SuccessMessage />);
        const expected = 'Congratulations, you have solved the puzzle! The board will reset in 5 seconds.';

        expect(wrapper.text()).toBe(expected);
    });

    it('displays decremented counter after one second', () => {
        jest.useFakeTimers();
        const wrapper = mount(<SuccessMessage />);
        const expected = 'Congratulations, you have solved the puzzle! The board will reset in 4 seconds.';

        act(() => {
            jest.advanceTimersByTime(1000);
        });

        expect(wrapper.text()).toBe(expected);
    });

    it('does not set timer to negative values', () => {
        jest.useFakeTimers();
        const wrapper = mount(<SuccessMessage />);
        const expected = 'Congratulations, you have solved the puzzle! The board will reset in 0 seconds.';

        act(() => {
            jest.advanceTimersByTime(10000);
        });

        expect(wrapper.text()).toBe(expected);
    });
});
