import React from 'react';
import ColumnPicker from './column-picker';
import {Button, Dialog} from '@material-ui/core';
import {shallow} from 'enzyme';
import DropdownMenu from './dropdown';
import EditViewModal from './editViewModal';
import SaveChanges from './saveChanges';
import RenameView from './renameView';
import SearchView from './searchView';

const defaultProps = {
  viewActionType: '',
  selectedView: '1',
  viewList: [],
  options: {},
  editColumnOptions: [
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
  value: {},
  changeView: jest.fn(),
  showSaveChangesModal: false,
  discardChanges: jest.fn(),
  onCloseModal: jest.fn(),
  onDeleteView: jest.fn(),
  onSaveView: jest.fn(),
  onChange: jest.fn(),
  updateDefaultView: jest.fn()
};

describe('<ColumnPicker />', () => {
  test('renders without error', () => {
    const wrapper = shallow(<ColumnPicker {...defaultProps}/>);
    expect(wrapper.find(Button)).toHaveLength(1);
    expect(wrapper.find(RenameView)).toHaveLength(1);
    expect(wrapper.find(DropdownMenu)).toHaveLength(1);
    expect(wrapper.find(EditViewModal)).toHaveLength(1);
    expect(wrapper.find(SaveChanges)).toHaveLength(1);
    expect(wrapper.find(SearchView)).toHaveLength(1);
  });

  test('should be able to change view', () => {
    const wrapper = shallow(<ColumnPicker {...defaultProps}/>);
    const {handleMenuItemClick} = wrapper.find(DropdownMenu).props();
    handleMenuItemClick('editView');
    expect(wrapper.instance().state.action).toEqual('editView');
    handleMenuItemClick('saveView');
  });

  test('should be able to set default view', () => {
    const wrapper = shallow(<ColumnPicker {...defaultProps}/>);
    const {handleMenuItemClick} = wrapper.find(DropdownMenu).props();
    handleMenuItemClick('setAsMyDefault');
    expect(defaultProps.updateDefaultView.mock.calls.length).toBe(1);
  });

  test('should be able to save view', () => {
    const wrapper = shallow(<ColumnPicker {...defaultProps}/>);
    const {handleMenuItemClick} = wrapper.find(DropdownMenu).props();
    handleMenuItemClick('saveView');

    wrapper.find(SaveChanges).props().onSaveView();
    expect(defaultProps.onSaveView.mock.calls.length).toBe(3);
  });

  test('should call discard changes', () => {
    const wrapper = shallow(<ColumnPicker {...defaultProps}/>);
    const {handleMenuItemClick} = wrapper.find(DropdownMenu).props();
    handleMenuItemClick('saveView');

    wrapper.find(SaveChanges).props().onClose();
    expect(defaultProps.discardChanges.mock.calls.length).toBe(1);
  });

  test('should call delet view', () => {
    const wrapper = shallow(<ColumnPicker {...defaultProps}/>);
    const {handleMenuItemClick} = wrapper.find(DropdownMenu).props();
    handleMenuItemClick('deleteView');
    expect(wrapper.instance().state.showDeletCofirmModal).toEqual(true);
    wrapper.find(Dialog).props().onClose();
    expect(wrapper.instance().state.showDeletCofirmModal).toEqual(false);
  });
});
