import React from 'react';
import CustomViewComponent from './custom-views';

import {shallow} from 'enzyme';

const defaultProps = {
  viewActionType: '',
  selectedView: '1',
  viewList: [],
  options: [],
  editColumnOptions: [],
  value: [],
  changeView: () => {},
  showSaveChangesModal: false,
  discardChanges: () => {},
  onCloseModal: () => {},
  onDeleteView: () => {},
  onSaveView: () => {},
  onChange: () => {}
};

describe('<CustomViewComponent />', () => {
  test('renders without error', () => {
    shallow(<CustomViewComponent {...defaultProps}/>);
  });
});
