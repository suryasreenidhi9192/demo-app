import React from 'react';
import SelectViewOptions from './select-view-options';
import {FormControl, Button, InputLabel, Select} from '@material-ui/core';
import {mount} from 'enzyme';

describe('<SelectViewOptions />', () => {
  test('renders without error', () => {
    const wrapper = mount(<SelectViewOptions/>);
    expect(wrapper.find(FormControl)).toHaveLength(3);
    expect(wrapper.find(Button)).toHaveLength(2);
    expect(wrapper.find(InputLabel)).toHaveLength(2);
    expect(wrapper.find(Select)).toHaveLength(3);
    expect(wrapper.find(FormControl)).toHaveLength(3);
  });
});
