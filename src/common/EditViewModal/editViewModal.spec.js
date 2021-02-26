import React from 'react';
import _ from 'lodash';
import EditViewModal from './editViewModal';
import SearchBar from 'material-ui-search-bar';
import {shallow} from 'enzyme';
import columnDefs from '../../utils/grid-defs/column-defs';

const buildColumnOptions = () => {
  const columns = _.filter(columnDefs.map(colDef => ({name: colDef.field, label: colDef.headerName, group: colDef.metricsGroup})), column => column.group);
  return _.groupBy(columns, column => column.group || 'OTHER');
};

const defaultProps = {
  options: buildColumnOptions(),
  title: '',
  onClose: jest.fn(),
  value: {},
  openModal: false,
  onChange: jest.fn(),
  viewList: [],
  selectedView: '',
  handleSubmit: jest.fn(),
  changeView: jest.fn(),
  showViewActions: false,
  onSaveView: jest.fn(),
  viewActionType: false
};

describe('<EditViewModal />', () => {
  test('renders without error', () => {
    shallow(<EditViewModal {...defaultProps}/>);
  });

  test('should be able to search', () => {
    const wrapper = shallow(<EditViewModal {...defaultProps}/>);
    wrapper.find(SearchBar).props().onChange('s');
    expect(wrapper.instance().state.searchField).toBe('s');
  });
});
