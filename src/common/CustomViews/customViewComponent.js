import React, {Component, Fragment} from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types';
import SelectView from './selectView';
import ColumnPicker from './column-picker';

class CustomViewComponent extends Component {
  saveView = (name, id, setAsDefault = false) => {
    const {gridType, selectedColumns, viewList, onSaveView} = this.props;
    const columnList = Object.entries(selectedColumns).filter(keyValue => keyValue[1]).map(([key]) => key).join(',');
    let action = ufpService.createUserView;
    const reqObj = {name, columnList, gridType};
    if (id) {
      reqObj.id = id;
      action = ufpService.updateUserView;
    }
    action(reqObj).then(resp => {
      const existingView = _.find(viewList, view => view.id === resp.data.id);
      let viewType = 1;
      if (existingView && existingView.systemView) {
        viewType = 2;
      }
      if (setAsDefault) {
        ufpService.updateDefaultView({...resp.data, viewType});
      }
      if (!existingView) {
        viewList.push({...resp.data, defaultView: setAsDefault});
      }
      const updatedViewList = viewList.map(v => {
        v.defaultView = v.defaultView || (setAsDefault && v.id === id);
        return v;
      });
      onSaveView(resp.data.id, updatedViewList, columnList);
    });
  }

  updateDefaultView = view => {
    const {onUpdateDefaultView, gridType} = this.props;
    const {systemView, name, id, columnList, userId} = view;
    const viewType = systemView ? 2 : 1;
    ufpService.updateDefaultView({name, id, columnList, userId, viewType, gridType});

    const viewList = this.props.viewList.map(v => {
      v.defaultView = v.id === id;
      return v;
    });
    onUpdateDefaultView(viewList);
  }

  deleteView = id => {
    const {viewList, onDeleteView, gridType} = this.props;
    const view = _.find(viewList, view => view.id === id);
    ufpService.deleteUserView({...view, gridType}).then(() => {
      const filteredViews = _.filter(viewList, view => view.id !== id);
      let selectedView = 'all';
      if (filteredViews.length) {
        selectedView = filteredViews[0].id;
      }
      onDeleteView(selectedView, filteredViews);
    });
  }

  render() {
    const {gridType,
      selectedView,
      viewList,
      viewActionType,
      editColumnOptions,
      changeView,
      selectColumnOptions,
      selectedColumns,
      showSaveChangesModal,
      discardChanges,
      onCloseModal,
      onChange,
      noColumnGrouping
    } = this.props;

    return (
      <Fragment>
        <SelectView selectedView={selectedView} viewList={viewList} changeView={changeView}/>
        <ColumnPicker
          noColumnGrouping={noColumnGrouping}
          gridType={gridType}
          viewActionType={viewActionType}
          selectedView={selectedView}
          viewList={viewList}
          options={selectColumnOptions}
          editColumnOptions={editColumnOptions}
          value={selectedColumns}
          changeView={changeView}
          showSaveChangesModal={showSaveChangesModal}
          discardChanges={discardChanges}
          updateDefaultView={this.updateDefaultView}
          onCloseModal={onCloseModal}
          onDeleteView={this.deleteView}
          onSaveView={this.saveView}
          onChange={onChange}
        />
      </Fragment>
    );
  }
}

CustomViewComponent.propTypes = {
  selectedView: PropTypes.string.isRequired,
  viewList: PropTypes.array.isRequired,
  changeView: PropTypes.func.isRequired,
  viewActionType: PropTypes.string.isRequired,
  selectColumnOptions: PropTypes.array.isRequired,
  editColumnOptions: PropTypes.array.isRequired,
  selectedColumns: PropTypes.object.isRequired,
  showSaveChangesModal: PropTypes.bool.isRequired,
  discardChanges: PropTypes.func.isRequired,
  onCloseModal: PropTypes.func.isRequired,
  onDeleteView: PropTypes.func.isRequired,
  onSaveView: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  onUpdateDefaultView: PropTypes.func.isRequired,
  noColumnGrouping: PropTypes.bool,
  gridType: PropTypes.number
};

CustomViewComponent.defaultProps = {
  noColumnGrouping: false,
  gridType: 1
};

export default CustomViewComponent;
