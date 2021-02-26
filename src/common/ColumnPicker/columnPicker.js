import _ from 'lodash';
import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {Button, Dialog, DialogActions, DialogContent, FormLabel} from '@material-ui/core';
import EditViewModal from './editViewModal';
import DropdownMenu from './dropdown';
import SaveChanges from './saveChanges';
import RenameView from './renameView';
import SearchView from './searchView';

class ColumnPicker extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      openMenu: false,
      action: '',
      dropdownOptions: this.getOptions(props.viewList, props.selectedView),
      openSaveViewModal: false,
      showDeletCofirmModal: false,
      openRenameViewModal: false
    };
  }

  handleMenuItemClick = type => {
    const stateToSet = {};
    if (type === 'editView') {
      stateToSet.action = type;
    } else if (type === 'saveAsNew') {
      stateToSet.action = type;
    } else if (type === 'saveView') {
      this.handleSaveView();
    } else if (type === 'deleteView') {
      stateToSet.showDeletCofirmModal = true;
    } else if (type === 'renameView') {
      stateToSet.openRenameViewModal = true;
    } else if (type === 'setAsMyDefault') {
      this.setAsDefault();
    }
    this.setState({
      ...stateToSet,
      openMenu: false
    });
  }

  handleSaveView = () => {
    const {selectedView, viewList} = this.props;
    const view = _.find(viewList, view => view.id === selectedView) || {};
    this.onSaveView(view);
    this.setState({dropdownOptions: this.getOptions(viewList, selectedView)});
  }

  setAsDefault() {
    const {viewList, selectedView, updateDefaultView} = this.props;
    const view = _.find(viewList, view => view.id === selectedView) || {};
    updateDefaultView(view);
    this.handleClose();
  }

  componentWillReceiveProps(nextProps) {
    const {selectedView, viewActionType, viewList} = nextProps;
    const stateToSet = {};
    const {selectedView: currentView, viewList: currentList} = this.props;
    if (selectedView !== currentView || viewList.length !== currentList.length) {
      stateToSet.dropdownOptions = this.getOptions(viewList, selectedView);
    }
    if ((viewActionType && viewActionType !== this.state.action) || (!viewActionType && this.state.action === 'create')) {
      stateToSet.action = viewActionType;
    }

    this.setState(stateToSet);
  }

  getOptions(viewList, selectedView, enable = false) {
    const {editColumnOptions} = this.props;
    const view = _.find(viewList, view => view.id === selectedView) || {};
    return editColumnOptions.map(option => {
      if (option.key === 'saveAsNew') {
        option.disabled = !enable;
      }
      if (option.key === 'saveView') {
        option.disabled = Boolean(view.systemView) || !enable;
      }
      if (option.key === 'deleteView' || option.key === 'renameView') {
        option.disabled = Boolean(view.systemView);
      }
      if (option.key === 'setAsMyDefault') {
        option.checked = view.defaultView;
      }
      return option;
    });
  }

  onHandleClick = () => {
    this.setState(prevState => {
      return {
        openMenu: !prevState.openMenu
      };
    });
  };

  handleClose = () => {
    this.setState({openMenu: false, action: '', openRenameViewModal: false, openSaveViewModal: false});
    this.props.onCloseModal();
  };

  discardChanges = () => {
    const {editColumnOptions} = this.props;
    this.setState({
      openSaveViewModal: false
    });
    this.setState({
      dropdownOptions: editColumnOptions.map(option => {
        if (option.key === 'saveView' || option.key === 'saveAsNew') {
          option.disabled = true;
        }
        return option;
      })
    }, () => this.props.discardChanges());
  }

  enableSaveOptions = () => {
    const {viewList, selectedView} = this.props;
    this.setState({
      dropdownOptions: this.getOptions(viewList, selectedView, true)
    });
  }

  closeDeleteModal = () => {
    this.setState({
      showDeletCofirmModal: false
    });
  }

  deleteView = () => {
    const {selectedView, onDeleteView} = this.props;
    onDeleteView(selectedView);
    this.closeDeleteModal();
  }

  openSaveAsNewModal = () => {
    this.setState({
      action: 'saveAsNew',
      openSaveViewModal: false
    });
  }

  onSaveView = view => {
    const {onSaveView} = this.props;
    onSaveView(view.name, view.id, view.defaultView);
    this.handleClose();
  }

  // Delete Dialog
  getDeleteConfirmDialog() {
    const {viewList, selectedView} = this.props;
    const {showDeletCofirmModal} = this.state;
    const view = _.find(viewList, view => view.id === selectedView) || {};
    return showDeletCofirmModal ? (
      <Dialog
        open
        maxWidth="md"
        onClose={this.closeDeleteModal}
      >
        <DialogContent style={{display: 'grid'}}>
          <FormLabel style={{padding: '20px', fontSize: '28px', color: '#000', fontWeight: '400'}}>Delete View?</FormLabel>
          <FormLabel style={{padding: '20px', fontSize: '18px', color: '#000', fontWeight: '300'}}>Are you sure you want to delete the view, <b>{view.name}</b>?</FormLabel>
        </DialogContent>
        <DialogActions style={{padding: '20px'}}>
          <Button color="secondary" onClick={this.closeDeleteModal}>No</Button>
          <Button color="secondary" onClick={this.deleteView}>Yes, Delete</Button>
        </DialogActions>
      </Dialog>
    ) : null;
  }

  getTitle(action) {
    switch (action) {
      case 'editView':
        return 'Add/Remove Columns';
      case 'create':
        return 'Create New View';
      case 'saveAsNew':
        return 'Save as New View';
      default:
        break;
    }
  }

  selectFromSearch = (view, action) => {
    const stateToSet = {action: ''};
    if (action === 'copy') {
      stateToSet.action = 'saveAsNew';
    }
    this.props.changeView(view.id);
    this.setState(stateToSet);
  }

  render() {
    const {options, value, onChange, viewList, selectedView, changeView, onSaveView, showSaveChangesModal, noColumnGrouping, gridType} = this.props;
    const {openMenu, action, openSaveViewModal, openRenameViewModal, dropdownOptions} = this.state;

    const confirmDialog = this.getDeleteConfirmDialog();

    const title = this.getTitle(action);

    const view = _.find(viewList, view => view.id === selectedView) || {};

    return (
      <div className="column-picker">
        <Button
          style={{marginTop: '40px', marginLeft: '16px'}}
          color="secondary"
          size="small"
          aria-owns={openMenu ? 'simple-menu' : undefined}
          aria-haspopup="true"
          onClick={this.onHandleClick}
        >
          Manage View
        </Button>
        <DropdownMenu
          menuId={gridType === 1 ? 'grid-manage-view-menu' : 'forecast-manage-view-menu'}
          open={openMenu}
          view={view}
          items={dropdownOptions}
          handleMenuItemClick={this.handleMenuItemClick}
          onClose={this.handleClose}
        />

        <EditViewModal
          noColumnGrouping={noColumnGrouping}
          showViewActions={action === 'create' || action === 'saveAsNew'}
          changeView={changeView}
          title={title}
          handleSubmit={this.enableSaveOptions}
          selectedView={selectedView}
          viewList={viewList}
          openModal={action && action !== 'searchView'}
          value={value}
          options={options}
          viewActionType={action}
          onSaveView={onSaveView}
          onChange={onChange}
          onClose={this.handleClose}
        />
        <SearchView gridType={gridType} view={view} openModal={action === 'searchView'} changeView={this.selectFromSearch} onClose={this.handleClose} onSaveView={view => this.onSaveView(view)}/>
        <SaveChanges view={view} openModal={openSaveViewModal || showSaveChangesModal} value={value} options={options} createNewView={this.openSaveAsNewModal} onSaveView={() => this.onSaveView(view)} onClose={this.discardChanges}/>
        <RenameView view={view} viewList={viewList} openModal={openRenameViewModal} onClose={this.handleClose} onSaveView={view => this.onSaveView(view)}/>
        {confirmDialog}
      </div>
    );
  }
}
ColumnPicker.propTypes = {
  options: PropTypes.object,
  value: PropTypes.object,
  onChange: PropTypes.func.isRequired,
  onSaveView: PropTypes.func.isRequired,
  onDeleteView: PropTypes.func.isRequired,
  viewList: PropTypes.array,
  selectedView: PropTypes.string.isRequired,
  changeView: PropTypes.func.isRequired,
  viewActionType: PropTypes.string.isRequired,
  onCloseModal: PropTypes.func.isRequired,
  showSaveChangesModal: PropTypes.bool,
  discardChanges: PropTypes.func,
  editColumnOptions: PropTypes.object.isRequired,
  updateDefaultView: PropTypes.func.isRequired,
  noColumnGrouping: PropTypes.bool,
  gridType: PropTypes.number
};
ColumnPicker.defaultProps = {
  options: {},
  value: {},
  viewList: [],
  showSaveChangesModal: false,
  discardChanges: () => {},
  noColumnGrouping: false,
  gridType: 1
};

export default ColumnPicker;
