import React from 'react';
import { shallow } from 'enzyme';
import { findByTestAttr, checkProps } from '../utils';
import SortingVisualizer from './SortingVisualizer';

const setUp = (props={}) => {
	return shallow(<SortingVisualizer {...props} />);
};

describe('SortingVisualizer Component', () => {

    describe('Checking PropTypes', () => {

		it('Should not throw a warning', () => {
			const expectedProps = {
				array: [60,37,6,157], 
                startSort: true,
                randomAlgoClicks: 12,
                isArraySorted: false
			};
			const propsErr = checkProps(SortingVisualizer, expectedProps);
            expect(propsErr).toBeUndefined();
		});
	});

    describe('Checking DOM objects', () => {

        it('Should render a Sorting Visualizer Component', () => {
            const component = findByTestAttr(setUp(), 'sorting-visualizer');
            expect(component.length).toBe(1);
        });
    
        it('Should render a canvas-content div wrapper', () => {
            const component = findByTestAttr(setUp(), 'content');
            expect(component.length).toBe(1);
        });

        it('Should render an array-container div wrapper', () => {
            const component = findByTestAttr(setUp(), 'container');
            expect(component.length).toBe(1);
        });

        it('Should render a static bar', () => {
            const component = findByTestAttr(setUp(), 'static');
            expect(component.length).toBe(1);
        });

        it('Should render an algorithm-bar', () => {
            const component = findByTestAttr(setUp(), 'algorithm-bar');
            expect(component.length).toBe(1);
        });
    });	

});
