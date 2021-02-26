import React from 'react';
import RenameView from './renameView';
import {Input} from '@material-ui/core';
import {shallow} from 'enzyme';
import ModalComponent from '../modal';

const defaultProps = {
  onClose: () => {},
  onSaveView: () => {},
  openModal: false,
  view: {},
  viewList: [
    {
      id: 1,
      name: 'Test'
    },
    {
      id: 2,
      name: 'Test2'
    }
  ]
};

describe('<RenameView />', () => {
  test('renders without error', () => {
    const wrapper = shallow(<RenameView {...defaultProps}/>);
    expect(wrapper.find(ModalComponent)).toHaveLength(1);
    expect(wrapper.find(Input)).toHaveLength(1);
  });

  test('should render view name correctly', () => {
    const wrapper = shallow(<RenameView {...{...defaultProps, view: {name: 'Test'}}}/>);
    expect(wrapper.find(ModalComponent)).toHaveLength(1);
    expect(wrapper.find(Input)).toHaveLength(1);
    expect(wrapper.find(Input).props().value).toEqual('Test');
  });

  test('should show duplicate error message', () => {
    const wrapper = shallow(<RenameView {...{...defaultProps, view: {name: 'Test'}}}/>);
    expect(wrapper.find(ModalComponent)).toHaveLength(1);
    const input = wrapper.find(Input);
    expect(input).toHaveLength(1);
    expect(input.props().value).toEqual('Test');
    input.props().onChange({target: {value: 'Test'}});
    expect(wrapper.instance().state.isDuplicateName).toEqual(true);
  });
});
