import React, {Component, Fragment} from 'react';
import PropTypes from 'prop-types';
import {FormLabel, Button} from '@material-ui/core';
import ModalComponent from '../modal';

class SaveChanges extends Component {
  constructor(props) {
    super(props);
    this.state = {viewName: props.view.name};
  }

  componentWillReceiveProps(nextProps) {
    const {view, openModal} = nextProps;
    if (openModal && this.props.openModal !== openModal) {
      this.setState({
        viewName: view.name
      });
    }
  }

  getContent = systemView => {
    const {viewName} = this.state;
    if (systemView) {
      return (
        <Fragment>
          <FormLabel style={{padding: '20px', fontSize: '28px', color: '#000', fontWeight: '400'}}>Create new view?</FormLabel>
          <FormLabel style={{padding: '20px', fontSize: '18px', color: '#000', fontWeight: '300'}}>
          You have unsaved changes to your current view,<b>{`${viewName}`}</b> (i.e. you added, removed, or reordered columns. Would you like to save as new view?)
          </FormLabel>
        </Fragment>
      );
    }

    return (
      <Fragment>
        <FormLabel style={{padding: '20px', fontSize: '28px', color: '#000', fontWeight: '400'}}>Save changes to view?</FormLabel>
        <FormLabel style={{padding: '20px', fontSize: '18px', color: '#000', fontWeight: '300'}}>
        You have unsaved changes to your current view, <b>{`${viewName}`}</b> (i.e.you added, removed or reordered columns). Would you like to save as your own custom view?
        </FormLabel>
      </Fragment>
    );
  }

  getActions = systemView => {
    const {onSaveView, createNewView, onClose} = this.props;
    if (systemView) {
      return (
        <Fragment>
          <Button size="large" style={{marginRight: '8px'}} color="secondary" onClick={createNewView}>SAVE AS NEW VIEW</Button>
          <Button size="large" style={{marginRight: '8px'}} color="secondary" onClick={onClose}>PROCEED WITHOUT SAVING</Button>
        </Fragment>
      );
    }

    return (
      <div>
        <Button size="large" style={{marginRight: '8px'}} color="secondary" onClick={createNewView}>SAVE AS NEW VIEW</Button>
        <Button size="large" style={{marginRight: '8px'}} color="secondary" onClick={onSaveView}>SAVE VIEW</Button>
        <Button size="large" style={{marginRight: '8px'}} color="secondary" onClick={onClose}>PROCEED WITHOUT SAVING</Button>
      </div>
    );
  }

  render() {
    const {openModal, onClose, view} = this.props;
    return (
      <ModalComponent
        fullWidth
        hideDivider
        open={openModal}
        maxWidth="md"
        actionContent={this.getActions(view.systemView)}
        contentStyles={{display: 'grid'}}
        actionContentStyles={{display: 'flex', justifyContent: 'flex-end', padding: '20px'}}
        onClose={onClose}
      >
        {this.getContent(view.systemView)}
      </ModalComponent>
    );
  }
}
SaveChanges.propTypes = {
  openModal: PropTypes.bool,
  onClose: PropTypes.func,
  onSaveView: PropTypes.func.isRequired,
  createNewView: PropTypes.func.isRequired,
  view: PropTypes.object
};

SaveChanges.defaultProps = {
  openModal: false,
  onClose: () => {},
  view: {}
};

export default SaveChanges;
