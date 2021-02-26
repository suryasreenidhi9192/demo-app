import './loading-spinner.scss';
import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import SettingsIcon from '@material-ui/icons/Settings';

class LoadingSpinner extends Component {
  static propTypes = {
    isLoading: PropTypes.bool.isRequired
  };

  render() {
    if (this.props.isLoading) {
      return (<div className="loading-lockout"><SettingsIcon className="settings-icon"/></div>);
    }
    return null;
  }
}
const mapStateToProps = state => ({
  isLoading: state.loading.get('isLoading')
});

export default connect(mapStateToProps)(LoadingSpinner);
