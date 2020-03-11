import React from 'react';
import { shallow } from 'enzyme';
import { findByTestAttr } from './utils';
import App from './App';

const setUp = (props={}) => {
  return shallow(<App {...props} />);
};

describe('App Component', () => {
  let component;
  beforeEach(() => {
    component = setUp();
  });

  it('Should render without errors', () => {
    const wrapper = findByTestAttr(component, 'app-component');
    expect(wrapper.length).toBe(1);
  });

  it('Should render without errors', () => {
    const wrapper = findByTestAttr(component, 'grid-div');
    expect(wrapper.length).toBe(1);
  });
});
