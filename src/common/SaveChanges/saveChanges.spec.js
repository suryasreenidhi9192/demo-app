import React from 'react';
import SaveChanges from './saveChanges';
import {shallow} from 'enzyme';
import ModalComponent from '../modal';

const defaultProps = {
  onClose: () => {},
  onSaveView: () => {},
  openModal: false,
  view: [],
  createNewView: () => {}
};

describe('<RenameView />', () => {
  test('renders without error', () => {
    const wrapper = shallow(<SaveChanges {...defaultProps}/>);
    expect(wrapper.find(ModalComponent)).toHaveLength(1);
  });
});
