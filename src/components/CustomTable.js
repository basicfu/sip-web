/* eslint-disable react/no-array-index-key */
import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import LastPageIcon from '@material-ui/icons/LastPage';
import dialog from 'utils/dialog';
import {getOrCreateStore} from 'utils/store';
import TableHeader from "components/TableHeader";

const CustomTableCell = withStyles(theme => ({
  head: {
    padding: 4,
  },
  body: {
    padding: 4,
  },
}))(TableCell);
const actionsStyles = theme => ({
  root: {
    flexShrink: 0,
    color: theme.palette.text.secondary,
    marginLeft: theme.spacing.unit * 2.5,
  },
});

class TablePaginationActions extends React.Component {
  handleFirstPageButtonClick = event => {
    this.props.onChangePage(event, 0);
  };

  handleBackButtonClick = event => {
    this.props.onChangePage(event, this.props.page - 1);
  };

  handleNextButtonClick = event => {
    this.props.onChangePage(event, this.props.page + 1);
  };

  handleLastPageButtonClick = event => {
    this.props.onChangePage(
      event,
      Math.max(0, Math.ceil(this.props.count / this.props.rowsPerPage) - 1),
    );
  };

  render() {
    const { classes, count, page, rowsPerPage, theme } = this.props;

    return (
      <div className={classes.root}>
        <IconButton
          onClick={this.handleFirstPageButtonClick}
          disabled={page === 0}
          aria-label="First Page"
        >
          <FirstPageIcon />
        </IconButton>
        <IconButton
          onClick={this.handleBackButtonClick}
          disabled={page === 0}
          aria-label="Previous Page"
        >
          <KeyboardArrowLeft />
        </IconButton>
        <IconButton
          onClick={this.handleNextButtonClick}
          disabled={page >= Math.ceil(count / rowsPerPage) - 1}
          aria-label="Next Page"
        >
          <KeyboardArrowRight />
        </IconButton>
        <IconButton
          onClick={this.handleLastPageButtonClick}
          disabled={page >= Math.ceil(count / rowsPerPage) - 1}
          aria-label="Last Page"
        >
          <LastPageIcon />
        </IconButton>
      </div>
    );
  }
}

TablePaginationActions.propTypes = {
  classes: PropTypes.object.isRequired,
  count: PropTypes.number.isRequired,
  onChangePage: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
  theme: PropTypes.object.isRequired,
};

const TablePaginationActionsWrapped = withStyles(actionsStyles, { withTheme: true })(
  TablePaginationActions,
);
function getDomWidth(text) {
  if (typeof window !== 'undefined') {
    const span = document.createElement('span');
    const result = {};
    result.width = span.offsetWidth;
    result.height = span.offsetHeight;
    span.style.visibility = 'hidden';
    span.style.fontSize = '0.8125rem';
    span.style.fontFamily = '"Roboto", "Helvetica", "Arial", sans-serif';
    span.style.display = 'inline-block';
    document.body.appendChild(span);
    if (typeof span.textContent !== 'undefined') {
      span.textContent = text;
    } else {
      span.innerText = text;
    }
    const width = parseFloat(window.getComputedStyle(span).width) - result.width;
    document.body.removeChild(span);
    return width;
  }
  return 0;
}
// 计算自适应宽度
function calcTableAuto(props) {
  const { list, columns, key, addOrEdit, table } = props;
  const selected = table.selected || [];
  const headerMinWidths = [];
  const contentWidths = [];
  let calcList = [...list];
  if (addOrEdit) {
    calcList = calcList.filter(it => it[key] !== selected[0]);
  }
  let totalPart = 0;
  columns.forEach(column => {
    const widths = calcList.map(it => getDomWidth(column.render ? column.render(it[column.id], column.id, table, it, key) : it[column.id]));
    if (widths && widths.length > 0) {
      totalPart += widths.reduce((a, b) => a + b) / calcList.length;
    }
  });
  const totalPerRate = 100 / totalPart;
  columns.forEach((column, index) => {
    let contentRate = 0;
    if (index === columns.length - 1) {
      headerMinWidths.push((column.label.length * 12) + 10 + 28);
    } else {
      headerMinWidths.push((column.label.length * 12) + 10);
    }
    const totalHeader = (columns.map(it => it.label).join('').length * 12);
    let headerRate = 0;
    if (totalHeader !== 0) {
      headerRate = (column.label.length * 12) * (100 / totalHeader);
    }
    const widths = calcList.map(it => getDomWidth(column.render ? column.render(it[column.id], column.id, table, it, key) : it[column.id]));
    if (widths && widths.length > 0) {
      const total = widths.reduce((a, b) => a + b);
      contentRate = total / calcList.length * totalPerRate;
    }
    if (contentRate !== 0) {
      contentRate = (headerRate + contentRate) / 2;
    } else {
      // 需要重新计算contentRate=headerRate
    }
    contentWidths.push(contentRate.toFixed(2));
  });
  return { headerMinWidths, contentWidths };
}
const styles = {
  root: {
    width: '100%',
  },
  tableWrapper: {
    overflowX: 'auto',
  },
  pagination: {
    paddingRight: '20px',
  },
};
// TODO 性能待优化
let timerId;
class CustomTable extends React.Component {
  state = {
    rowsPerPage: 20,
    rowsPerPageOptions: [20, 50, 100],
  }

  componentDidMount() {
    window.addEventListener('keyup', (e) => {
      // esc 暂只重置第一个table
      if (e.keyCode === 27) {
        const { namespace, keyName, tableName, page, list, dispatch } = this.data();
        if (list.length > 0 && list[0][keyName] === -1) {
          list.shift();
          dispatch({ type: `${namespace}/updateState`, payload: { [tableName]: {}, data: { page, list } } });
        } else {
          dispatch({ type: `${namespace}/updateState`, payload: { [tableName]: {} } });
        }
      } else if (e.keyCode === 13) {
        const { addOrEdit } = this.data();
        if (addOrEdit) {
          this.handleDone();
        }
      }
    });
  }

  componentWillUnmount() {
    clearTimeout(timerId);
  }

  handleSelectAllClick = (event, checked) => {
    const { namespace, keyName, tableName, list, dispatch } = this.data();
    if (checked) {
      dispatch({ type: `${namespace}/updateState`, payload: { [tableName]: { selected: list.map(it => it[keyName]) } } });
      return;
    }
    dispatch({ type: `${namespace}/updateState`, payload: { [tableName]: { selected: [] } } });
  };

  // 处理单击/双击冲突事件
  handleClick = (event, id) => {
    clearTimeout(timerId);
    timerId = setTimeout(() => {
      const { namespace, keyName, tableName, list, dispatch, selected, addOrEdit } = this.data();
      const item = list.filter(it => it[keyName] === id)[0];
      if (selected.indexOf(id) === -1) {
        dispatch({ type: `${namespace}/updateState`, payload: { [tableName]: { selected: [id], item } } });
      } else if (!addOrEdit) {
        dispatch({ type: `${namespace}/updateState`, payload: { [tableName]: { selected: [], item: {} } } });
      }
    }, 200);
  };

  handleCheckbox = (event, id) => {
    clearTimeout(timerId);
    const { namespace, selected, tableName, dispatch } = this.data();
    if (event.target.checked) {
      dispatch({ type: `${namespace}/updateState`, payload: { [tableName]: { selected: [...selected, id] } } });
    } else {
      dispatch({ type: `${namespace}/updateState`, payload: { [tableName]: { selected: selected.filter(it => it !== id) } } });
    }
  }

  handleChangePage = (event, page) => {
    const { namespace, page: { pageSize }, dispatch } = this.data();
    dispatch({ type: `${namespace}/list`, payload: { pageNum: page + 1, pageSize } });
  };

  handleChangeRowsPerPage = event => {
    const { namespace, page: { pageNum }, dispatch } = this.data();
    dispatch({ type: `${namespace}/list`, payload: { pageNum, pageSize: event.target.value } });
  };

  // 添加默认值
  handleAdd =() => {
    const { namespace, tableName, page, list, dispatch, table, addOrEdit } = this.data();
    if (!addOrEdit) {
      const preItem = {
        id: -1,
        required: false,
        sort: 0,
      };
      list.unshift(preItem);
      dispatch({ type: `${namespace}/updateState`, payload: { data: { page, list }, [tableName]: { ...table, selected: [preItem.id], item: preItem, status: 'add' } } });
    }
  };

  // 赋值当前选中项
  handleEdit =() => {
    const { namespace, tableName, dispatch, table } = this.data();
    dispatch({ type: `${namespace}/updateState`, payload: { [tableName]: { ...table, status: 'edit' } } });
  };

  // 双击事件
  handleDoubleClick = (event, id) => {
    clearTimeout(timerId);
    const { namespace, keyName, tableName, list, dispatch, table } = this.data();
    dispatch({ type: `${namespace}/updateState`, payload: { [tableName]: { ...table, selected: [id], item: list.filter(it => it[keyName] === id)[0], status: 'edit' } } });
  };

  handleDelete = () => {
    const { namespace, dispatch, selected } = this.data();
    dialog.warning({ onOk() { dispatch({ type: `${namespace}/delete`, payload: selected }); } });
  };

  // insert
  handleDone=() => {
    const { namespace, keyName, dispatch, table, item } = this.data();
    const add = table.status === 'add';
    const edit = table.status === 'edit';
    if (add) {
      delete item[keyName];
      dispatch({ type: `${namespace}/insert`, payload: { ...item } });
    } else if (edit) {
      dispatch({ type: `${namespace}/update`, payload: { ...item } });
    }
  }

  // cancel
  handleClear=() => {
    const { namespace, keyName, tableName, dispatch, list, page, table, item } = this.data();
    if (item[keyName] === -1) {
      list.shift();
      dispatch({ type: `${namespace}/updateState`, payload: { [tableName]: { ...table, selected: [], item: {}, status: '' }, data: { page, list } } });
    } else {
      dispatch({ type: `${namespace}/updateState`, payload: { [tableName]: { ...table, status: '' } } });
    }
  }

  data=() => {
    const dispatch = getOrCreateStore().dispatch;
    const { classes, columns, data, keyName, tableName, edit, actionName, showCheck, showHeader, headerChild, showFooter } = this.props;
    const { namespace, data: { list, page }, all } = data;
    const table = data[tableName];
    const selected = table.selected || [];
    const item = table.item || {};
    const addOrEdit = table.status === 'add' || table.status === 'edit';
    return { classes, dispatch, columns, keyName, tableName, namespace, list, page, all, table, item, selected, addOrEdit, edit, actionName, showCheck, showHeader, headerChild, showFooter };
  }

  render() {
    const { classes, dispatch, columns, keyName, tableName, namespace, list, page, table, selected, addOrEdit, showCheck, showHeader, headerChild, showFooter } = this.data();
    const { rowsPerPageOptions, rowsPerPage } = this.state;
    const handleItemChange = (itemKey, itemValue) => {
      // TODO 保存会闪原数据
      dispatch({ type: `${namespace}/updateState`, payload: { [tableName]: { ...table, item: { ...table.item, [itemKey]: itemValue } } } });
    };
    const { headerMinWidths, contentWidths } = calcTableAuto({ list, columns, keyName, table, addOrEdit });
    return (
      <Paper className={classes.root}>
        {showHeader &&
        <TableHeader
          numSelected={selected.length}
          onAdd={this.handleAdd}
          onEdit={this.handleEdit}
          onDelete={this.handleDelete}
          onDone={this.handleDone}
          onClear={this.handleClear}
          headerChild={headerChild}
          addOrEdit={addOrEdit}
        />}
        <div className={classes.tableWrapper}>
          <Table className={classes.table}>
            <TableHead>
              <TableRow>
                {showCheck &&
                <CustomTableCell style={{ textAlign: 'left',width: 56 }}>
                  <Checkbox
                    indeterminate={selected.length > 0 && selected.length < list.length}
                    checked={selected.length === list.length && list.length !== 0}
                    onChange={this.handleSelectAllClick}
                  />
                </CustomTableCell>}
                {columns.map((column, columnIndex) => {
                  return (
                    <CustomTableCell key={columnIndex} style={{ minWidth: `${headerMinWidths[columnIndex]}px`, width: `${contentWidths[columnIndex]}%` }}>
                      {column.label}
                    </CustomTableCell>
                  );
                }, this)}
              </TableRow>
            </TableHead>
            <TableBody>
              {list.map((item, itemIndex) => {
                const isSelected = selected.indexOf(item[keyName]) !== -1;
                return (
                  <TableRow
                    hover
                    onClick={event => this.handleClick(event, item[keyName])}
                    onDoubleClick={event => this.handleDoubleClick(event, item[keyName])}
                    aria-checked={isSelected}
                    tabIndex={-1}
                    key={item[keyName]}
                    selected={isSelected}
                  >
                    {showCheck &&
                    <CustomTableCell style={{ textAlign: 'center' }}>
                      <Checkbox checked={isSelected} onChange={e => this.handleCheckbox(e, item[keyName])} />
                    </CustomTableCell>}
                    {columns.map((column, columnIndex) => {
                      return (
                        <CustomTableCell key={columnIndex} style={{ textAlign: column.align || undefined }}>
                          {column.render ? column.render(item[column.id], column.id, table, item, keyName, handleItemChange) : item[column.id]}
                        </CustomTableCell>);
                    })}
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
        {showFooter &&
        <TablePagination
          classes={{ select: classes.pagination }}
          colSpan={3}
          component="div"
          count={page.total || 0}
          rowsPerPage={page.pageSize && rowsPerPageOptions.indexOf(page.pageSize) !== -1 ? page.pageSize : rowsPerPage}
          rowsPerPageOptions={rowsPerPageOptions}
          labelRowsPerPage={'Rows per page'}
          page={page.pageNum ? page.pageNum - 1 : 0}
          onChangePage={this.handleChangePage}
          onChangeRowsPerPage={this.handleChangeRowsPerPage}
          ActionsComponent={TablePaginationActionsWrapped}
        />}
      </Paper>
    );
  }
}
CustomTable.propTypes = {
  actionName: PropTypes.string.isRequired,
  columns: PropTypes.array.isRequired,
  edit: PropTypes.oneOf(['all', 'row', 'modal', 'false']),
  keyName: PropTypes.string.isRequired,
  tableName: PropTypes.string.isRequired,
};
CustomTable.defaultProps = {
  actionName: 'list',
  edit: 'all',
  keyName: 'id',
  tableName: 'table',
  showCheck: true,
  showHeader: true,
  showFooter: true,
};
export default withStyles(styles)(CustomTable);
