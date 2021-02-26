import React, {Component} from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import {FormControl, InputLabel, FormControlLabel, Checkbox, Input, FormHelperText} from '@material-ui/core';
import MenuDropdown from './menuDropdown';

class SelectView extends Component {
  constructor(props) {
    super(props);
    let newName = '';
    const {action, handleNewNameChange} = props;
    if (action === 'saveAsNew') {
      newName = '';
    }
    handleNewNameChange(newName);
    this.state = {
      newName,
      isDuplicateName: false
    };
  }

  onChange = e => {
    const {value} = e.target;
    let isDuplicateName = false;
    const view = _.find(this.props.viewList, v => v.name === value);
    if (view) {
      isDuplicateName = true;
    }
    this.setState({
      newName: value,
      isDuplicateName
    });

    this.props.handleNewNameChange(value, isDuplicateName);
  }

  render() {
    const {newName, isDuplicateName} = this.state;
    const {showDefaultCheckbox, createNewView, handleDefaultViewChange, setAsDefault, labelName, viewList, selectedView, changeView} = this.props;

    return (
      <FormControl className="view-select" style={{display: 'inline', paddingTop: '20px', flexDirection: 'row'}}>
        {createNewView ? (
          <FormControl style={{width: '50%'}} className="view-name-form" error={isDuplicateName} aria-describedby="standard-name-text">
            <InputLabel htmlFor="standard-name">View Name</InputLabel>
            <Input id="standard-name" value={newName} onChange={this.onChange}/>
            {isDuplicateName ? <FormHelperText id="standard-name-text">This View Name is already in use by another one of your views</FormHelperText> : null}
          </FormControl>
        ) : (
          <MenuDropdown labelName={labelName} viewList={viewList} selectedView={selectedView} changeView={changeView}/>
        )}
        {showDefaultCheckbox ? (
          <FormControlLabel
            control={<Checkbox value={setAsDefault} onChange={handleDefaultViewChange}/>}
            label="Set as my default view"
            style={{marginLeft: '16px'}}
          />
        ) : null}
      </FormControl>
    );
  }
}

SelectView.propTypes = {
  viewList: PropTypes.array.isRequired,
  showDefaultCheckbox: PropTypes.bool,
  createNewView: PropTypes.bool,
  handleNewNameChange: PropTypes.func,
  setAsDefault: PropTypes.bool,
  handleDefaultViewChange: PropTypes.func,
  action: PropTypes.string,
  labelName: PropTypes.string,
  selectedView: PropTypes.string.isRequired,
  changeView: PropTypes.func.isRequired
};

SelectView.defaultProps = {
  labelName: 'View',
  showDefaultCheckbox: false,
  createNewView: false,
  handleNewNameChange: () => {},
  setAsDefault: false,
  handleDefaultViewChange: () => {},
  action: ''
};

export default SelectView;
