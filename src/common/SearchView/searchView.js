import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Button} from '@material-ui/core';
import styled from 'styled-components';
import SearchBar from 'material-ui-search-bar';
import SearchIcon from '@material-ui/icons/Search';
import ModalComponent from '../modal';
import EnhancedTable from './tablePagination';

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
  }
}`;

class SearchView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      views: []
    };
  }

  onSearch(value) {
    if (!value) {
      return;
    }

    ufpService.searchUserViews(value, this.props.gridType).then(resp => {
      this.setState({
        views: resp || []
      });
    });
  }

  handleChangeView = (view, action) => {
    this.setState({
      views: []
    });
    this.props.changeView(view, action);
  }

  render() {
    const {openModal, onClose, searchField} = this.props;
    return (

      <ModalComponent
        fullWidth
        hideDivider
        open={openModal}
        maxWidth="md"
        title="Search for Another's View"
        onClose={onClose}
      >
        <Styles>
          <div style={{display: 'grid'}}>
            <div>
              <SearchBar
                className="searchbar"
                placeholder="Search by firstname.lastname"
                value={searchField}
                onChange={newValue => this.onSearch(newValue)}
                onRequestSearch={() => console.log('onRequestSearch')}
                onCancelSearch={this.onCancelSearch}
              />
              <SearchIcon className="search-icon"/>
            </div>
            <Button
              size="small"
              color="secondary"
              variant="contained"
              style={{marginLeft: '55%', marginTop: '-40px', width: '132px'}}
            >
              Search
            </Button>
          </div>
          <EnhancedTable data={this.state.views} changeView={this.handleChangeView}/>
        </Styles>
      </ModalComponent>
    );
  }
}
SearchView.propTypes = {
  openModal: PropTypes.bool,
  onClose: PropTypes.func,
  searchField: PropTypes.string,
  changeView: PropTypes.func.isRequired,
  gridType: PropTypes.number
};

SearchView.defaultProps = {
  openModal: false,
  onClose: () => {},
  searchField: '',
  gridType: 1
};

export default SearchView;
