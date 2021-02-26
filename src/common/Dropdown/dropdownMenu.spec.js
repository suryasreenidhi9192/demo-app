import React from 'react';
import DropdownMenu from './dropdown';
import {Menu} from '@material-ui/core';
import {shallow} from 'enzyme';

const defaultProps = {
  items: [
    {
      key: 'editView',
      label: 'Add/Remove Columns',
      showSeparator: true
    },
    {
      key: 'saveView',
      label: 'Save View',
      disabled: true
    },
    {
      key: 'saveAsNew',
      label: 'Save as New View',
      disabled: true,
      showSeparator: true
    },
    {
      key: 'renameView',
      label: 'Rename View'
    },
    {
      key: 'deleteView',
      label: 'Delete View',
      showSeparator: true
    },
    {
      key: 'setAsMyDefault',
      label: 'Set as My Default'
    }
  ],
  open: false,
  menuId: '',
  menuStyles: [],
  onClose: () => {},
  handleMenuItemClick: () => {}
};

describe('<DropdownMenu />', () => {
  test('renders without error', () => {
    const wrapper = shallow(<DropdownMenu {...defaultProps}/>);
    expect(wrapper.find(Menu)).toHaveLength(1);
  });
});
