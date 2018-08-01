import React, { Fragment } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import DeleteOutlinedIcon from '@material-ui/icons/DeleteOutlined';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import AddOutlinedIcon from '@material-ui/icons/AddOutlined';
import ClearIcon from '@material-ui/icons/Clear';
import DoneIcon from '@material-ui/icons/Done';
import { lighten } from '@material-ui/core/styles/colorManipulator';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import LastPageIcon from '@material-ui/icons/LastPage';
import dialog from 'utils/dialog';
import ReactDOM from 'react-dom';
import CustomDialogDelete from 'components/CustomDialog';

const CustomTableCell = withStyles(theme => ({
  head: {
    padding: 4,
  },
  body: {
    padding: 4,
  },
}))(TableCell);

const toolbarStyles = theme => ({
  root: {
    paddingRight: theme.spacing.unit,
  },
  highlight:
    theme.palette.type === 'light'
      ? {
        color: theme.palette.secondary.main,
        backgroundColor: lighten(theme.palette.secondary.light, 0.90),
      }
      : {
        color: theme.palette.text.primary,
        backgroundColor: theme.palette.secondary.dark,
      },
  spacer: {
    flex: '1 1 100%',
  },
  actions: {
    color: theme.palette.text.secondary,
  },
  title: {
    flex: '0 0 auto',
  },
  iconGroup: {
    display: 'flex',
  },
  rowDoneIcon: {
    color: '#4caf50',
  },
  rowClearIcon: {
    color: '#ba68c8',
  },
});

let EnhancedTableToolbar = props => {
  const { numSelected, classes, addOrEdit, onAdd, onEdit, onDelete, onDone, onClear } = props;

  return (
    <Toolbar
      className={classNames(classes.root, {
        [classes.highlight]: numSelected > 0,
      })}
    >
      <div className={classes.title}>
        {numSelected > 0 ? (
          <Typography color="inherit" variant="subheading">
            {numSelected} selected
          </Typography>
        ) : (
          <Typography variant="title" id="tableTitle">
            Nutrition
          </Typography>
        )}
      </div>
      <div className={classes.spacer} />
      <div className={classes.actions}>
        {numSelected > 0 ? (
          <div className={classes.iconGroup}>
            {addOrEdit &&
            <Fragment>
              <Tooltip title="确定">
                <IconButton color={'primary'} className={classes.rowDoneIcon} onClick={() => onDone()}>
                  <DoneIcon />
                </IconButton>
              </Tooltip>
              <Tooltip title="取消">
                <IconButton color={'secondary'} className={classes.rowClearIcon} onClick={() => onClear()}>
                  <ClearIcon />
                </IconButton>
              </Tooltip>
            </Fragment>
            }
            <Tooltip title="修改">
              <IconButton color={'primary'} onClick={() => onEdit()}>
                <EditOutlinedIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="删除">
              <IconButton color={'secondary'} onClick={() => onDelete()}>
                <DeleteOutlinedIcon />
              </IconButton>
            </Tooltip>
          </div>
        ) : (
          <Tooltip title="添加">
            <Button mini variant="fab" color="secondary" onClick={() => onAdd()}>
              <AddOutlinedIcon />
            </Button>
          </Tooltip>
        )}
      </div>
    </Toolbar>
  );
};

EnhancedTableToolbar.propTypes = {
  classes: PropTypes.object.isRequired,
  numSelected: PropTypes.number.isRequired,
};

EnhancedTableToolbar = withStyles(toolbarStyles)(EnhancedTableToolbar);

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
        const { props: { key, name, dispatch, data } } = this.props;
        const list = data.data.list || [];
        if (list.length > 0 && list[0][key || 'id'] === -1) {
          list.shift();
          dispatch({ type: `${data.namespace}/updateState`, payload: { [name || 'table']: {}, data: { ...data.data, list } } });
        } else {
          dispatch({ type: `${data.namespace}/updateState`, payload: { [name || 'table']: {} } });
        }
      } else if (e.keyCode === 13) {
        const { props: { key, name, dispatch, data } } = this.props;
        const list = data.data.list || [];
        const table = data[name || 'table'] || {};
        const addOrEdit = table.status === 'add' || table.status === 'edit';
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
    const { props: { key, name, dispatch, data: { namespace, data } } } = this.props;
    const list = data.list || [];
    if (checked) {
      dispatch({
        type: `${namespace}/updateState`,
        payload: { [name || 'table']: { selected: list.map(it => it[key || 'id']) } },
      });
      return;
    }
    dispatch({ type: `${namespace}/updateState`, payload: { [name || 'table']: { selected: [] } } });
  };

  // 处理单击/双击冲突事件
  handleClick = (event, id) => {
    clearTimeout(timerId);
    timerId = setTimeout(() => {
      const { props: { key, name, dispatch, data } } = this.props;
      const list = data.data.list || [];
      const table = data[name || 'table'] || {};
      const selected = table.selected || [];
      const addOrEdit = table.status === 'add' || table.status === 'edit';
      const item = list.filter(it => it[key || 'id'] === id)[0];
      if (selected.indexOf(id) === -1) {
        dispatch({ type: `${data.namespace}/updateState`, payload: { [name || 'table']: { selected: [id], item } } });
      } else if (!addOrEdit) {
        dispatch({ type: `${data.namespace}/updateState`, payload: { [name || 'table']: { selected: [], item: {} } } });
      }
    }, 200);
  };

  handleCheckbox = (event, id) => {
    clearTimeout(timerId);
    const { props: { name, dispatch, data } } = this.props;
    const table = data[name || 'table'] || {};
    const selected = table.selected || [];
    if (event.target.checked) {
      dispatch({ type: `${data.namespace}/updateState`, payload: { [name || 'table']: { selected: [...selected, id] } } });
    } else {
      dispatch({
        type: `${data.namespace}/updateState`,
        payload: { [name || 'table']: { selected: selected.filter(it => it !== id) } },
      });
    }
  }

  handleChangePage = (event, page) => {
    const { props: { dispatch, data: { namespace, data: { page: { pageSize } } } } } = this.props;
    dispatch({ type: `${namespace}/list`, payload: { pageNum: page + 1, pageSize } });
  };

  handleChangeRowsPerPage = event => {
    const { props: { dispatch, data: { namespace, data: { page: { pageNum } } } } } = this.props;
    dispatch({ type: `${namespace}/list`, payload: { pageNum, pageSize: event.target.value } });
  };

  // 添加默认值
  handleAdd =() => {
    const { props: { name, dispatch, data } } = this.props;
    const table = data[name || 'table'] || {};
    const list = data.data.list || [];
    const addOrEdit = table.status === 'add' || table.status === 'edit';
    if (!addOrEdit) {
      const preItem = {
        id: -1,
          required: false,
        sort: 0,
      };
      list.unshift(preItem);
      dispatch({ type: `${data.namespace}/updateState`, payload: { data: { ...data.data, list }, table: { ...table, selected: [preItem.id], item: preItem, status: 'add' } } });
    }
  };

  // 赋值当前选中项
  handleEdit =() => {
    const { props: { name, dispatch, data } } = this.props;
    const table = data[name || 'table'] || {};
    dispatch({ type: `${data.namespace}/updateState`, payload: { table: { ...table, status: 'edit' } } });
  };

  // 双击事件
  handleDoubleClick = (event, id) => {
    clearTimeout(timerId);
    const { props: { key, name, dispatch, data } } = this.props;
    const list = data.data.list || [];
    const table = data[name || 'table'] || {};
    const item = list.filter(it => it[key || 'id'] === id)[0];
    dispatch({ type: `${data.namespace}/updateState`, payload: { table: { ...table, selected: [id], item, status: 'edit' } } });
  };

  handleDelete = () => {
    const { props: { dispatch, name, data } } = this.props;
    dialog.warning({ onOk() { dispatch({ type: `${data.namespace}/delete`, payload: data[name || 'table'].selected }); } });
  };

  // insert
  handleDone=() => {
    const { props: { key, name, dispatch, data } } = this.props;
    const table = data[name || 'table'] || {};
    const item = table.item || {};
    const add = table.status === 'add';
    const edit = table.status === 'edit';
    if (add) {
      delete item[key || 'id'];
      dispatch({ type: `${data.namespace}/insert`, payload: { ...item } });
    } else if (edit) {
      dispatch({ type: `${data.namespace}/update`, payload: { ...item } });
    }
  }

  // cancel
  handleClear=() => {
    const { props: { key, name, dispatch, data } } = this.props;
    const list = data.data.list || [];
    const table = data[name || 'table'] || {};
    const item = table.item || {};
    if (item[key || 'id'] === -1) {
      list.shift();
      dispatch({ type: `${data.namespace}/updateState`, payload: { table: { ...table, selected: [], item: {}, status: '' }, data: { ...data.data, list } } });
    } else {
      dispatch({ type: `${data.namespace}/updateState`, payload: { table: { ...table, status: '' } } });
    }
  }

  render() {
    const { classes, columns, props } = this.props;
    const list = props.data.data.list || [];
    const page = props.data.data.page || {};
    const table = props.data[props.name || 'table'] || {};
    const selected = table.selected || [];
    const addOrEdit = table.status === 'add' || table.status === 'edit';
    const key = props.key || 'id';
    const { rowsPerPageOptions, rowsPerPage } = this.state;
    const handleItemChange = (itemKey, itemValue) => {
      // TODO 保存会闪原数据
      props.dispatch({ type: `${props.data.namespace}/updateState`, payload: { [props.name || 'table']: { ...table, item: { ...table.item, [itemKey]: itemValue } } } });
    };
    // 计算自适应宽度
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
    const headerMinWidths = [];
    const contentWidths = [];
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
    return (
      <Paper className={classes.root}>
        <EnhancedTableToolbar
          numSelected={selected.length}
          onAdd={this.handleAdd}
          onEdit={this.handleEdit}
          onDelete={this.handleDelete}
          onDone={this.handleDone}
          onClear={this.handleClear}
          addOrEdit={addOrEdit}
        />
        <div className={classes.tableWrapper}>
          <Table className={classes.table} aria-labelledby="tableTitle">
            <TableHead>
              <TableRow>
                <CustomTableCell style={{ textAlign: 'center' }}>
                  <Checkbox
                    indeterminate={selected.length > 0 && selected.length < list.length}
                    checked={selected.length === list.length}
                    onChange={this.handleSelectAllClick}
                  />
                </CustomTableCell>
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
                const isSelected = selected.indexOf(item[key]) !== -1;
                return (
                  <TableRow
                    hover
                    onClick={event => this.handleClick(event, item[key])}
                    onDoubleClick={event => this.handleDoubleClick(event, item[key])}
                    aria-checked={isSelected}
                    tabIndex={-1}
                    key={item[key]}
                    selected={isSelected}
                  >
                    <CustomTableCell style={{ textAlign: 'center' }}>
                      <Checkbox checked={isSelected} onChange={e => this.handleCheckbox(e, item[key])} />
                    </CustomTableCell>
                    {columns.map((column, columnIndex) => {
                      return (
                        <CustomTableCell key={columnIndex} style={{ textAlign: column.align || undefined }}>
                          {column.render ? column.render(item[column.id], column.id, table, item, key, handleItemChange) : item[column.id]}
                        </CustomTableCell>);
                    })}
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
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
        />
      </Paper>
    );
  }
}

export default withStyles(styles)(CustomTable);
