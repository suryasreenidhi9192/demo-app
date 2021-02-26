import React, {Component} from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import {FormControl, InputLabel, Select, MenuItem, ListItemText} from '@material-ui/core';
import {Done} from '@material-ui/icons';

const MenuProps = {
  anchorOrigin: {
    vertical: 'bottom',
    horizontal: 'left'
  },
  transformOrigin: {
    vertical: 'top',
    horizontal: 'left'
  },
  getContentAnchorEl: null
};

class MenuDropdown extends Component {
  constructor(props) {
    super(props);
    this.state = {
      openMenu: false,
      selectedView: props.selectedView
    };
  }

  componentWillReceiveProps(nextProps) {
    const {selectedView, action, viewList, handleNewNameChange} = nextProps;
    const stateToSet = {};
    if (this.state.selectedView !== selectedView) {
      stateToSet.selectedView = selectedView;
    }
    if (action === 'saveAsNew' && action !== this.props.action) {
      const view = _.find(viewList, view => view.id === selectedView) || {};
      stateToSet.newName = `${view.name}-copy`;
      handleNewNameChange(stateToSet.newName);
    }

    this.setState(prevState => {
      return {
        ...prevState,
        ...stateToSet
      };
    });
  }

  onChangeViewOptions = e => {
    const {value} = e.target;
    this.setState({
      selectedView: value
    });
    this.props.changeView(value);
  }

  render() {
    const {selectedView} = this.state;
    const {labelName, selectStyles, viewList, createNewView} = this.props;

    const userViews = _.filter(viewList, view => !view.systemView);
    const systemViews = _.filter(viewList, view => view.systemView);

    const customViews = [];
    if (!createNewView && userViews.length > 0) {
      userViews.forEach(view => customViews.push(
        <MenuItem key={`${view.id}`} style={{paddingLeft: '44px'}} value={view.id}>
          {view.id === selectedView ? <Done style={{marginLeft: '-40px', color: '#2196f3'}}/> : null}
          <ListItemText primary={view.name}/> {view.defaultView ? '(default)' : ''}
        </MenuItem>)
      );
    }

    const systemViewsHTML = [];
    if (!createNewView && systemViews.length > 0) {
      systemViews.forEach(view => systemViewsHTML.push(
        <MenuItem key={`${view.id}`} style={{paddingLeft: '44px'}} value={view.id}>
          {view.id === selectedView ? <Done style={{marginLeft: '-40px', color: '#2196f3'}}/> : null}
          <ListItemText primary={view.name}/>
        </MenuItem>));
    }

    return (
      <FormControl style={{width: '100%'}}>
        <InputLabel htmlFor="selectedView" className="selectedView">{labelName}</InputLabel>

        <Select style={selectStyles} value={selectedView}
          inputProps={{name: 'selectedView', id: 'selectedView'
          }}
          MenuProps={MenuProps}
          renderValue={value => {
            return (_.find(viewList, view => view.id === value) || {}).name;
          }}
          onChange={event => this.onChangeViewOptions(event)}
        >
          <MenuItem value="create" style={{background: '#fff'}}>Create New View</MenuItem>
          <MenuItem divider value="searchView" style={{background: '#fff'}}>Search for Another&apos;s View</MenuItem>
          <MenuItem disabled style={{paddingLeft: '44px', paddingTop: '20px'}}>My Views</MenuItem>
          {customViews.length ? customViews : <ListItemText style={{color: '#999', paddingLeft: '44px'}} primary="No Custom views defined"/>}
          <hr/>
          <MenuItem disabled style={{background: '#fff', paddingLeft: '44px'}}>System Views</MenuItem>
          {systemViewsHTML}
        </Select>

      </FormControl>
    );
  }
}

MenuDropdown.propTypes = {
  selectedView: PropTypes.string.isRequired,
  labelName: PropTypes.string.isRequired,
  selectStyles: PropTypes.object,
  action: PropTypes.string,
  viewList: PropTypes.array.isRequired,
  changeView: PropTypes.func.isRequired,
  handleNewNameChange: PropTypes.func,
  createNewView: PropTypes.bool
};

MenuDropdown.defaultProps = {
  selectStyles: {},
  action: '',
  handleNewNameChange: () => {},
  createNewView: false
};
export default MenuDropdown;
