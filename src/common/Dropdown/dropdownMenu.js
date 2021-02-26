import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Menu, MenuItem, ListItemText} from '@material-ui/core';
import {Done} from '@material-ui/icons';
import {grey} from 'ansi-colors';

class DropdownMenu extends Component {
  render() {
    const {items, open, menuId, menuStyles, onClose, handleMenuItemClick} = this.props;
    return (
      <Menu open={open} id={menuId} style={menuStyles} onClose={onClose}>
        {items.map(item => {
          return (
            <div key={item.key} style={{outline: 'none'}}>
              <MenuItem disabled={item.disabled} onClick={() => (handleMenuItemClick(item.key))}>
                {item.checked ? <Done style={{color: '#2196f3'}}/> : null}
                <ListItemText>{item.label}</ListItemText>
              </MenuItem>
              {item.showSeparator ? <hr style={{color: grey}}/> : null}
            </div>
          );
        })}
      </Menu>
    );
  }
}

DropdownMenu.propTypes = {
  items: PropTypes.array.isRequired,
  open: PropTypes.bool.isRequired,
  menuId: PropTypes.string,
  menuStyles: PropTypes.object,
  onClose: PropTypes.func.isRequired,
  handleMenuItemClick: PropTypes.func.isRequired
};

DropdownMenu.defaultProps = {
  menuId: '',
  menuStyles: {}
};

export default DropdownMenu;
