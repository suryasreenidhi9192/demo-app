import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Paper from '@material-ui/core/Paper';
import Tooltip from '@material-ui/core/Tooltip';
import {Button} from '@material-ui/core';
import Typography from '@material-ui/core/Typography';

const rows = [
  {id: 'View Name', label: 'View Name'},
  {id: 'User Name', label: 'User Name'},
  {id: 'Action', label: 'Action'}
];

class EnhancedTableHead extends React.Component {
  createSortHandler = property => event => {
    this.props.onRequestSort(event, property);
  };

  render() {
    return (
      <TableHead>
        <TableRow>
          {rows.map(row => {
            return (
              <TableCell
                key={row.id}
              >
                <Tooltip>
                  <TableSortLabel>
                    {row.label}
                  </TableSortLabel>
                </Tooltip>
              </TableCell>
            );
          }, this)}
        </TableRow>
      </TableHead>
    );
  }
}

EnhancedTableHead.propTypes = {
  onRequestSort: PropTypes.func.isRequired
};

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    boxShadow: 'none'
  },
  table: {
    minWidth: 900
  },
  tableWrapper: {
    overflowX: 'auto'
  }
});

class EnhancedTable extends React.Component {
  state = {
    order: 'asc',
    selected: [],
    data: this.props.data,
    page: 0,
    rowsPerPage: 5
  };

  componentWillReceiveProps(nextProps) {
    if (this.props.data.length !== nextProps.data.length) {
      this.setState({
        data: nextProps.data
      });
    }
  }

  handleChangePage = (event, page) => {
    this.setState({page});
  };

  handleChangeRowsPerPage = event => {
    this.setState({rowsPerPage: event.target.value});
  };

  isSelected = id => this.state.selected.indexOf(id) !== -1;

  render() {
    const {classes, changeView} = this.props;
    const {data, order, selected, rowsPerPage, page} = this.state;
    const emptyRows = rowsPerPage - Math.min((rowsPerPage, data.length - page) * (rowsPerPage));

    return (
      <Paper className={classes.root}>
        <div className={classes.tableWrapper}>
          <Typography>
            <b>
              {data.length} results
            </b>
          </Typography>
          <Table className={classes.table} aria-labelledby="tableTitle">
            <EnhancedTableHead
              numSelected={selected.length}
              order={order}
              rowCount={data.length}
              onRequestSort={this.handleRequestSort}
            />
            <TableBody>
              {data
                .slice((page * rowsPerPage), (page * rowsPerPage) + rowsPerPage)
                .map(n => {
                  return (
                    <TableRow
                      key={n.id}
                    >
                      <TableCell component="th" scope="row">
                        {n.name}
                      </TableCell>
                      <TableCell>{n.userId}</TableCell>
                      <TableCell style={{padding: '0px'}}>
                        <Button size="small" onClick={() => changeView(n, 'view')}>VIEW</Button>
                        <Button size="small" onClick={() => changeView(n, 'copy')}>COPY</Button>
                      </TableCell>
                    </TableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow style={{height: 49 * emptyRows}}>
                  <TableCell colSpan={6}/>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={data.length}
          rowsPerPage={rowsPerPage}
          page={page}
          backIconButtonProps={{
            'aria-label': 'Previous Page'
          }}
          nextIconButtonProps={{
            'aria-label': 'Next Page'
          }}
          onChangePage={this.handleChangePage}
          onChangeRowsPerPage={this.handleChangeRowsPerPage}
        />
      </Paper>
    );
  }
}

EnhancedTable.propTypes = {
  classes: PropTypes.object.isRequired,
  data: PropTypes.array.isRequired,
  changeView: PropTypes.func.isRequired
};

export default withStyles(styles)(EnhancedTable);
