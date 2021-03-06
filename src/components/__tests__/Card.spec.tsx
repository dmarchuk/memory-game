import React from 'react';
import { mount, shallow } from 'enzyme';
import { Card } from '../../components';

describe('Card component', () => {
    const id = 10;
    const index = 4;
    const baseProps = {
        id,
        index,
        isFlipped: false,
        isClickable: true,
        imageURL: 'images/img0.jpg',
    };

    it('displays the correct image', () => {
        const props = {
            ...baseProps,
            handleFlip: jest.fn(),
        };
        const wrapper = mount(<Card {...props} />);
        const imageURL = wrapper.find('img').prop('src');

        expect(imageURL).toBe(baseProps.imageURL);
    });

    describe('handleFlip', () => {
        describe('handleFlip successfully called', () => {
            const props = {
                ...baseProps,
                handleFlip: jest.fn(),
            };
            const mockedEvent = {};
            const wrapper = shallow(<Card {...props} />);
            const element = wrapper.find('[data-test-id="card-container"]').first();

            element.simulate('click', mockedEvent);

            it('calls handleFlip on click', () => {
                expect(props.handleFlip).toHaveBeenCalledTimes(1);
            });

            it('calls handleFlip on click with correct parameters', () => {
                expect(props.handleFlip).toHaveBeenCalledWith(mockedEvent, index, id);
            });
        });

        describe('handleFlip successfully called', () => {
            it('does not call handleFlip if isClickable is false', () => {
                const props = {
                    ...baseProps,
                    isClickable: false,
                    handleFlip: jest.fn(),
                };
                const wrapper = shallow(<Card {...props} />);
                const element = wrapper.find('[data-test-id="card-container"]').first();

                element.simulate('click');

                expect(props.handleFlip).not.toHaveBeenCalled();
            });
        });
    });
});
