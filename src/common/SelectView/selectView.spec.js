import React from 'react';
import SelectView from './selectView';
import {shallow} from 'enzyme';
import {Input, Select, FormControlLabel} from '@material-ui/core';

const defaultProps = {
  selectedView: '1',
  viewList: [{id: 8, name: 'ABC', userId: 'z003nyc', columnList: 'storesRegUnits,storesRegDfe,storesRegDfeVar,storesRegLyUnits', defaultView: false}, {id: 2, name: 'Test', userId: 'z003nyc', columnList: 'storesRegUnits,storesRegLyUnits,storesRegDfe,storesRegLyUnitsVar', defaultView: false}, {id: 9, name: 'Test', userId: 'z003nyc', columnList: 'storesRegUnits,storesRegLyUnits,storesRegDfe,storesRegLyUnitsVar', defaultView: false}],
  showDefaultCheckbox: false,
  changeView: jest.fn(),
  labelName: '',
  selectStyles: [],
  createNewView: true,
  handleNewNameChange: jest.fn(),
  setAsDefault: false,
  handleDefaultViewChange: jest.fn(),
  action: ''
};

describe('<SelectView />', () => {
  test('renders without error', () => {
    const wrapper = shallow(<SelectView {...defaultProps}/>);
    expect(wrapper.find(Input)).toHaveLength(1);
    expect(wrapper.find(Select)).toHaveLength(0);
    expect(wrapper.find(FormControlLabel)).toHaveLength(0);
  });

  test('should render select view when not create new view', () => {
    defaultProps.createNewView = false;
    const wrapper = shallow(<SelectView {...defaultProps}/>);

    expect(wrapper.find(Input)).toHaveLength(0);
  });

  test('should render chaeck box to set as default view', () => {
    defaultProps.showDefaultCheckbox = true;
    const wrapper = shallow(<SelectView {...defaultProps}/>);
    expect(wrapper.find(FormControlLabel)).toHaveLength(1);
  });
});
