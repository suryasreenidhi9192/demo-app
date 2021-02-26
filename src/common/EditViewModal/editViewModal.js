import React, {Component, Fragment} from 'react';
import PropTypes from 'prop-types';
import {FormLabel, Button, Checkbox, FormControlLabel, Divider} from '@material-ui/core';
import SearchBar from 'material-ui-search-bar';
import styled from 'styled-components';
import SearchIcon from '@material-ui/icons/Search';
import SelectView from './selectView';
import _ from 'lodash';
import ModalComponent from '../modal';

const Styles = styled.div`
  .search-icon {
    float: left;
    margin-top: -28px;
    color: #000;
  }
  .searchbar {
    box-shadow: 0px 2px 0px 0px;
    border-radius: 0;
    width: 50%;
    margin-top: 16px;

    input {
      text-indent: 20px;
      margin-top: 16px;
    }

    button[class*="SearchBar-searchIconButton"] {
      display: none;
    }

    button {
      margin-right:0;
      display: none;
    }
  }

  .formcontrollabel {
    padding-top: 4px;
    padding-bottom: 4px;
    span {
      font-weight: 600;

      &.indeterminate-color {
        color: #2196f3;
      }
    }
  }
  
`;

class EditViewModal extends Component {
  constructor(props) {
    super(props);
    const showColumn = this.getInitialColumns();
    this.state = {showColumn, value: {}, searchField: '', newName: '', setAsDefault: false, isDuplicateViewName: false};
  }

  componentWillReceiveProps(nextProps) {
    const {viewActionType, value} = nextProps;
    if (this.props.viewActionType !== nextProps.viewActionType) {
      const stateToSet = {};
      if (viewActionType === 'editView' || viewActionType === 'saveAsNew') {
        stateToSet.value = value;
      } else if (viewActionType === 'create') {
        stateToSet.value = {};
      }
      this.setState(stateToSet);
    }
  }

  handleGroupSelect = (name, event) => {
    this.setState({[name]: event.target.checked});
    const {options} = this.props;
    const {value} = this.state;
    const group = options[name];

    group.forEach(item => {
      value[item.name] = event.target.checked;
    });

    this.setState({
      value
    });
  };

  onCancelSearch = () => {
    const showColumn = this.getInitialColumns();
    this.setState({
      showColumn
    });
  }

  getGroupSelectState(name) {
    const {options} = this.props;
    const {value} = this.state;
    const group = options[name];
    const hasAllSelected = _.every(group, item => value[item.name] === true);
    const hasAnySelected = _.some(group, item => value[item.name] === true);

    return {checked: hasAllSelected, indeterminate: hasAnySelected && !hasAllSelected};
  }

  getInitialColumns() {
    const showColumn = {};
    const {options} = this.props;
    _.each(options, (group, groupName) => {
      showColumn[groupName] = true;
      group.forEach(item => {
        showColumn[item.name] = true;
      });
    });
    return showColumn;
  }

  onChangeCheckbox(name, newValue) {
    const {value} = this.state;
    this.setState({value: {...value, [name]: newValue}});
  }

  checkAll(checked) {
    const {options} = this.props;
    this.onSearch('');
    const value = {};
    _.each(options, group => {
      group.forEach(item => {
        value[item.name] = checked;
      });
    });

    this.setState({
      value
    });
  }

  getSelectAllStatus() {
    const {options} = this.props;
    const {value} = this.state;
    const hasAllSelected = _.every(options, group => {
      return _.every(group, item => value[item.name] === true);
    });
    const hasAnySelected = _.some(options, group => {
      return _.some(group, item => value[item.name] === true);
    });

    return {checked: hasAllSelected, indeterminate: hasAnySelected && !hasAllSelected};
  }

  onSearch(newValue) {
    const {options} = this.props;
    this.setState({searchField: newValue});
    const showColumn = {};
    _.each(options, (group, groupName) => {
      showColumn[groupName] = false;
      group.forEach(item => {
        const reg = new RegExp(newValue, 'i');
        if (item.label && item.label.match(reg)) {
          showColumn[groupName] = true;
          showColumn[item.name] = true;
        } else {
          showColumn[item.name] = false;
        }
      });
    });
    this.setState({showColumn});
  }

  handleClose = () => {
    const {onClose, value} = this.props;
    this.setState({
      value
    });
    onClose();
  }

  toggleDefaultView = e => {
    this.setState({
      setAsDefault: e.target.checked
    });
  }

  handleSubmit = () => {
    const {onChange, handleSubmit, onClose} = this.props;
    const {value} = this.state;
    const selectedValue = {};
    Object.keys(value).forEach(key => {
      if (value[key]) {
        selectedValue[key] = true;
      }
    });
    onChange(selectedValue, false);
    handleSubmit();
    this.onSearch('');
    onClose();
  }

  saveView = () => {
    const {onSaveView, onClose, viewList, selectedView} = this.props;
    const selected = viewList[selectedView - 1];
    onSaveView(selected.name, selectedView);
    onClose();
  }

  handleNewNameChange = (name, isDuplicateViewName) => {
    this.setState({
      newName: name,
      isDuplicateViewName
    });
  }

  createNewView = () => {
    const {onSaveView, onChange, onClose} = this.props;
    const {value, newName, setAsDefault} = this.state;
    const selectedValue = {};
    Object.keys(value).forEach(key => {
      if (value[key]) {
        selectedValue[key] = true;
      }
    });
    onChange(selectedValue, false);
    onSaveView(newName, null, setAsDefault);
    this.onSearch('');
    onClose();
  }

  getColumnGroupListContent() {
    const {options, noColumnGrouping} = this.props;
    const {showColumn, value} = this.state;

    const groupList = _.map(options, (columnGroup, groupName) => {
      const items = _.map(columnGroup, ({name, label}) => {
        const isChecked = value[name];
        const checkbox = <Checkbox checked={isChecked} value={name} onChange={e => this.onChangeCheckbox(name, e.target.checked)}/>;
        if (noColumnGrouping || showColumn[name]) {
          return (
            <div key={`${name}-${isChecked}`} className="column-div" style={{display: 'inline-flex', width: '300px'}}>
              <FormControlLabel control={checkbox} label={label}/>
            </div>
          );
        }
      });

      if (noColumnGrouping) {
        return (
          <li key={groupName} className="list" style={{listStyle: 'none', paddingTop: '16px'}}>
            {items}
          </li>
        );
      }
      if (!noColumnGrouping && showColumn[groupName]) {
        return (
          <li key={groupName} className="list" style={{listStyle: 'none', paddingTop: '16px'}}>
            <FormControlLabel
              className="formcontrollabel"
              style={{textTransform: 'capitalize'}}
              control={
                <Checkbox
                  indeterminate={this.getGroupSelectState(groupName).indeterminate}
                  checked={this.getGroupSelectState(groupName).checked}
                  className={this.getGroupSelectState(groupName).indeterminate ? 'indeterminate-color' : ''}
                  value={`${showColumn[groupName]}`}
                  onChange={e => this.handleGroupSelect(groupName, e)}
                />
              }
              label={groupName.toLowerCase()}
            />
            <Divider/>
            {items}
          </li>
        );
      }
    });

    return groupList;
  }

  getColumnListContent() {
    const {searchField} = this.state;
    const columnGroupList = this.getColumnGroupListContent();
    return (
      <Styles>
        <div className="searchbar-div">
          <div>
            <SearchBar
              className="searchbar"
              placeholder="Search"
              value={searchField}
              onChange={newValue => this.onSearch(newValue)}
              onRequestSearch={() => console.log('onRequestSearch')}
              onCancelSearch={this.onCancelSearch}
            />
            <SearchIcon className="search-icon"/>
            <FormLabel component="legend" style={{color: 'currentColor', paddingTop: '20px'}}>Once in the grid, you will be able to drag or drop columns in your desired order.</FormLabel>
            <FormControlLabel
              className="formcontrollabel"
              control={
                <Checkbox
                  indeterminate={this.getSelectAllStatus().indeterminate}
                  checked={this.getSelectAllStatus().checked}
                  className={this.getSelectAllStatus().indeterminate ? 'indeterminate-color' : ''}
                  onChange={e => this.checkAll(e.target.checked)}
                />
              }
              label="Select All"
            />
          </div>
          <Divider/>
          {columnGroupList}
        </div>
      </Styles>
    );
  }

  render() {
    const {openModal, viewList, selectedView, changeView, showViewActions, title, viewActionType} = this.props;

    const columnList = this.getColumnListContent();

    const isCreateNewView = viewActionType === 'create' || viewActionType === 'saveAsNew';

    const submitCallback = isCreateNewView ? this.createNewView : this.handleSubmit;

    const {newName, isDuplicateViewName} = this.state;
    const disabled = (!newName && isCreateNewView) || (isDuplicateViewName);

    return (
      <ModalComponent
        open={openModal}
        title={title}
        actionContent={
          <Fragment>
            <Button variant="contained" size="large" style={{marginRight: '8px'}} disabled={disabled} color="secondary" onClick={submitCallback}>
              {isCreateNewView ? 'SAVE' : 'OK'}
            </Button>
            <Button size="large" style={{marginRight: '8px'}} onClick={this.handleClose}>Cancel</Button>
          </Fragment>
        }
        onClose={this.handleClose}
      >
        {showViewActions ? (
          <SelectView
            showDefaultCheckbox
            action={viewActionType}
            setAsDefault={this.state.setAsDefault}
            createNewView={isCreateNewView}
            selectStyles={{width: '50%'}}
            labelName="Selected  View"
            viewList={viewList}
            selectedView={selectedView}
            changeView={changeView}
            handleDefaultViewChange={this.toggleDefaultView}
            handleNewNameChange={this.handleNewNameChange}
          />

        ) : null}
        {columnList}
      </ModalComponent>
    );
  }
}

EditViewModal.propTypes = {
  options: PropTypes.array.isRequired,
  title: PropTypes.string.isRequired,
  onClose: PropTypes.func,
  value: PropTypes.object,
  openModal: PropTypes.bool,
  onChange: PropTypes.func,
  viewList: PropTypes.array.isRequired,
  selectedView: PropTypes.string.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  changeView: PropTypes.func.isRequired,
  showViewActions: PropTypes.bool,
  onSaveView: PropTypes.func,
  viewActionType: PropTypes.bool,
  noColumnGrouping: PropTypes.bool
};

EditViewModal.defaultProps = {
  onClose: () => {},
  value: {},
  openModal: false,
  onChange: () => {},
  showViewActions: false,
  onSaveView: () => {},
  viewActionType: false,
  noColumnGrouping: false
};

export default EditViewModal;
