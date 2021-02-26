/* istanbul ignore file */
import React, {Component} from 'react';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import InputLabel from '@material-ui/core/InputLabel';
import styled from 'styled-components';
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';

const Styles = styled.div`
  .form-control{
    marginRight: 10px;
    border: 2px groove;
    borderRadius: '6px';
    width: 150px
  }
.load-button{
  width: 150px;
}
`;
const Views = [
  {
    label: 'Default',
    value: 'default'
  },
  {
    label: 'Grid View',
    value: 'grid'
  },
  {
    label: 'Graph View',
    value: 'graph'
  }
];

const Hierarchy = [
  {
    label: 'class'
  }
];

const Subclass = [
  {
    label: 'subclass'
  }
];

export default class SelectViewOptions extends Component {
  constructor(props) {
    super(props);
    this.state = {
      views: Views,
      selectedView: '',
      hierarchy: Hierarchy,
      selectedHierarchy: '',
      subClass: Subclass,
      selectedSubClass: ''
    };
  }

  onChangeViewOptions(name, event) {
    this.setState({
      [name]: event.target.value
    });
  }

  render() {
    const {views, selectedView, hierarchy, selectedHierarchy, subClass, selectedSubClass} = this.state;
    return (
      <Styles>
        <FormControl className="form-control">
          <Select
            value={selectedView}
            style={{padding: '8px 5px'}}
            onChange={event => this.onChangeViewOptions('selectedView', event)}
          >
            {views.map(option => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <Button variant="contained" color="secondary" style={{float: 'right'}} onClick="">SAVE CHANGES</Button>

        <div style={{padding: '10px', display: 'block'}}>
          <FormControl style={{minWidth: 150, marginRight: 10}}>
            <InputLabel htmlFor="selectedView">HEIRARCHY</InputLabel>
            <Select
              value={selectedHierarchy}
              inputProps={{name: 'selectedView', id: 'selectedView'}}
              onChange={event => this.onChangeViewOptions('selectedHierarchy', event)}
            >
              {hierarchy.map(option => (
                <MenuItem key={option.label} value={option.label}>
                  {option.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl style={{minWidth: 150, marginRight: 10, borderBottom: '2px dotted'}}>
            <InputLabel htmlFor="selectedView">Subclass</InputLabel>
            <Select
              value={selectedSubClass}
              inputProps={{name: 'selectedView', id: 'selectedView'}}
              onChange={event => this.onChangeViewOptions('selectedSubClass', event)}
            >
              {subClass.map(option => (
                <MenuItem key={option.label} value={option.label}>
                  {option.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <Button variant="contained" className="load-button" color="default" onClick="">LOAD</Button>
        </div>
      </Styles>
    );
  }
}
