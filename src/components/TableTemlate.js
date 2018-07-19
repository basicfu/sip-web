import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableFooter from '@material-ui/core/TableFooter';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';

class EnhancedTableHead extends React.Component {
  createSortHandler = property => event => {
    this.props.onRequestSort(event, property);
  };

  render() {
    const { onSelectAllClick, numSelected, rowCount, columns } = this.props;
    return (
      <TableHead>
        <TableRow>
          <TableCell padding="checkbox">
            <Checkbox
              indeterminate={numSelected > 0 && numSelected < rowCount}
              checked={numSelected === rowCount}
              onChange={onSelectAllClick}
            />
          </TableCell>
          {columns.map(column => {
            return (
              <TableCell
                key={column.id}
                numeric={column.numeric}
                padding={column.disablePadding ? 'none' : 'default'}
              >
                <TableSortLabel>
                  {column.label}
                </TableSortLabel>
              </TableCell>
            );
          }, this)}
        </TableRow>
      </TableHead>
    );
  }
}

EnhancedTableHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  rowCount: PropTypes.number.isRequired,
};
const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
  },
  table: {
    minWidth: 1020,
  },
  tableWrapper: {
    overflowX: 'auto',
  },
  '@global': {
    '& .MuiTableCell-root-306': {
      textAlign: 'center',
    },
  }
});

const actionsStyles = theme => ({
  root: {
    flexShrink: 0,
    color: theme.palette.text.secondary,
    marginLeft: theme.spacing.unit * 2.5,
  },
});

class EnhancedTable extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selected: [],
      pageN: 0,
      rowsPerPage: 5
    };
  }

  isSelected = id => this.state.selected.indexOf(id) !== -1;

  handleClick = (event, item) => {
    const { selected } = this.state;
    const { props: { dispatch }, namespace } = this.props;
    const selectedIndex = selected.indexOf(item.id);
    let newSelected = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, item.id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }
    dispatch({
      type: `${namespace}/updateState`,
      payload: {
        selectedRowKeys: newSelected,
        columnItem: item
      }
    });
    this.setState({ selected: newSelected });
  };

  handleSelectAllClick = (event, checked) => {
    const { props: { dispatch, page,data }, namespace } = this.props;
    if (checked) {
      dispatch({
        type: `${namespace}/updateState`,
        payload: {
          selectedRowKeys: data.map(n => n.id)
        }
      });
      this.setState(state => ({ selected: data.map(n => n.id) }));
      return;
    }
    dispatch({
      type: `${namespace}/updateState`,
      payload: {
        selectedRowKeys: []
      }
    });
    this.setState(state => ({ selected: [] }));
  };
  handleChangePage = (curPage,event) => {
    const { props: { dispatch, page }, namespace } = this.props;
    dispatch({
      type: `${namespace}/all`,
      payload: {
        page: {
          pageNum: curPage,
          pageSize: page.pageSize
        }
      }
    });
  };

  handleChangeRowsPerPage = event => {
    const { props: { dispatch, page }, namespace } = this.props;
    dispatch({
      type: `${namespace}/all`,
      payload: {
        page: {
          pageNum: page.pageNum,
          pageSize: event.target.value
        }
      }
    });
    // this.setState({ rowsPerPage: event.target.value });
  };

  render() {
    const { classes, props: { data, page, selectedRowKeys, loading, search,modalType }, namespace, columns, ...tableProps } = this.props;
    const { pageNum, pageSize } = page;
    const { selected } = this.state;
    console.log(pageSize)
    const emptyRows = pageSize - Math.min(pageSize, data.length - (pageNum-1) * pageSize);
    return (
      <Paper className={classes.root}>
        <div className={classes.tableWrapper}>
          <Table className={classes.table} aria-labelledby="tableTitle">
            <EnhancedTableHead
              numSelected={selected.length}
              rowCount={data.length}
              columns={columns}
              onSelectAllClick={this.handleSelectAllClick}
            />
            <TableBody>
              {data
                .slice((pageNum-1) * pageSize, (pageNum-1) * pageSize + pageSize)
                .map(n => {
                  const isSelected = this.isSelected(n.id);
                  return (
                    <TableRow
                      hover
                      onClick={event => this.handleClick(event, n)}
                      role="checkbox"
                      aria-checked={isSelected}
                      tabIndex={-1}
                      key={n.id}
                      selected={isSelected}
                    >
                      <TableCell padding="checkbox">
                        <Checkbox checked={isSelected}/>
                      </TableCell>
                      <TableCell component="th" scope="row">
                        {n.tenantId}
                      </TableCell>
                      <TableCell numeric>{n.name}</TableCell>
                      <TableCell numeric>{n.enName}</TableCell>
                      <TableCell numeric>{n.type}</TableCell>
                      <TableCell numeric>{n.extra}</TableCell>
                      <TableCell numeric>{n.defaultValue}</TableCell>
                      <TableCell numeric>{n.required === true ? 1 : 0}</TableCell>
                      <TableCell numeric>{n.sort}</TableCell>
                      <TableCell numeric>{n.cdate}</TableCell>
                      <TableCell numeric>{n.udate}</TableCell>
                    </TableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow style={{ height: 48 * emptyRows }}>
                  <TableCell colSpan={6}/>
                </TableRow>
              )}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TablePagination
                  colSpan={3}
                  count={data.length}
                  rowsPerPage={pageSize}
                  page={pageNum-1}
                  onChangePage={(e) => this.handleChangePage(pageNum, e)}
                  onChangeRowsPerPage={(e) => this.handleChangeRowsPerPage(e)}
                />
              </TableRow>
            </TableFooter>
          </Table>
        </div>
      </Paper>
    );
  }
}

EnhancedTable.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(EnhancedTable);
