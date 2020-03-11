import React from 'react';
import { shallow } from 'enzyme';
import { findByTestAttr, checkProps } from '../utils';
import Navbar from './Navbar';

const setUp = (props={}) => {
	return shallow(<Navbar {...props} />);
};

describe('Navbar Component', () => {

	it('Should render Nav without errors', () => {
		const component = findByTestAttr(setUp(), 'nav-component');
		expect(component.length).toBe(1);
	});

	it('Should render a H3', () => {
		const component = findByTestAttr(setUp(), 'title');
		expect(component.length).toBe(1);
	});

	describe('Checking PropTypes', () => {
		it('Should not throw a warning', () => {
			const expectedProps = {
				shuffleArray: () => {},
				randomizeAlgo: () => {},
				startSort: () => {},
			};
			const propsErr = checkProps(Navbar, expectedProps);
			expect(propsErr).toBeUndefined();
		});
	});

});
