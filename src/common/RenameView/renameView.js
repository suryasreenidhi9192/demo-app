import React, {Component, Fragment} from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import ModalComponent from '../modal';
import {FormControl, Input, InputLabel, FormHelperText, Button} from '@material-ui/core';

class RenameView extends Component {
  constructor(props) {
    super(props);
    this.state = {viewName: props.view.name, isDuplicateName: false};
  }

  componentWillReceiveProps(nextProps) {
    const {view, openModal} = nextProps;
    if (openModal && this.props.openModal !== openModal) {
      this.setState({
        viewName: view.name
      });
    }
  }

  renameView = () => {
    const {view, onSaveView} = this.props;
    view.name = this.state.viewName || view.name;
    onSaveView(view);
  }

  handleChange = e => {
    const {value} = e.target;
    const {viewList} = this.props;
    let isDuplicateName = false;
    const view = _.find(viewList, v => v.name === value);
    if (view) {
      isDuplicateName = true;
    }
    this.setState({
      viewName: value,
      isDuplicateName
    });
  }

  render() {
    const {openModal, onClose} = this.props;
    const {viewName, isDuplicateName} = this.state;
    return (
      <ModalComponent
        fullWidth
        hideDivider
        open={openModal}
        maxWidth="md"
        title="Rename View"
        actionContent={
          <Fragment>
            <Button
              variant="contained"
              size="large"
              disabled={!viewName || isDuplicateName}
              color="secondary"
              style={{marginRight: '8px'}}
              onClick={this.renameView}
            >
              Rename View
            </Button>
            <Button size="large" style={{marginRight: '8px'}} color="secondary" onClick={onClose}>Cancel</Button>
          </Fragment>
        }
        onClose={onClose}
      >
        <FormControl style={{width: '50%'}} className="view-name-form" error={isDuplicateName} aria-describedby="rename-view">
          <InputLabel htmlFor="rename-view-input">View Name</InputLabel>
          <Input id="rename-view-input" value={viewName} onChange={this.handleChange}/>
          {isDuplicateName ? <FormHelperText id="rename-view">This View Name is already in use by another one of your views</FormHelperText> : null}
        </FormControl>

      </ModalComponent>
    );
  }
}
RenameView.propTypes = {
  openModal: PropTypes.bool,
  onClose: PropTypes.func,
  onSaveView: PropTypes.func.isRequired,
  view: PropTypes.object.isRequired,
  viewList: PropTypes.array.isRequired
};

RenameView.defaultProps = {
  openModal: false,
  onClose: () => {}
};

export default RenameView;
