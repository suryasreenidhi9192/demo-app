import React from 'react';
import SearchView from './searchView';
import {shallow} from 'enzyme';
import ModalComponent from '../modal';
import SearchBar from 'material-ui-search-bar';
import EnhancedTable from './tablePagination';

const defaultProps = {
  openModal: true,
  onClose: jest.fn(),
  searchField: jest.fn(),
  changeView: jest.fn()
};

describe('<SearchView />', () => {
  test('renders without error', () => {
    const wrapper = shallow(<SearchView {...defaultProps}/>);
    expect(wrapper.find(ModalComponent)).toHaveLength(1);
    expect(wrapper.find(SearchBar)).toHaveLength(1);
    expect(wrapper.find(EnhancedTable)).toHaveLength(1);
  });

  test('should be able to change view', () => {
    const wrapper = shallow(<SearchView {...defaultProps}/>);
    wrapper.find(EnhancedTable).props().changeView('1', 'view');
    expect(defaultProps.changeView.mock.calls.length).toBe(1);
  });
});
