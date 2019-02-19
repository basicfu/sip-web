import React, { Fragment } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'dva';
import Input from 'components/Input';
import { FieldType } from 'enum';
import Table from '@material-ui/core/Table/Table';
import TableHead from '@material-ui/core/TableHead/TableHead';
import TableBody from '@material-ui/core/TableBody/TableBody';
import { DragDropContext, DragSource, DropTarget } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import TableCell from '@material-ui/core/TableCell/TableCell';
import TableRow from '@material-ui/core/TableRow/TableRow';
import { findDOMNode } from 'react-dom';
import update from 'immutability-helper';
import Paper from '@material-ui/core/Paper';
import CustomSearch from 'components/CustomSearch';
import Toolbar from '@material-ui/core/Toolbar/Toolbar';
import IconButton from '@material-ui/core/IconButton/IconButton';
import DeleteOutlinedIcon from '../../node_modules/@material-ui/icons/DeleteOutlined';
import PlaylistAddIcon from '../../node_modules/@material-ui/icons/PlaylistAdd';
import AddIcon from '../../node_modules/@material-ui/icons/Add';
import Tooltip from '@material-ui/core/Tooltip';
import EditOutlinedIcon from '../../node_modules/@material-ui/icons/EditOutlined';
import notify from 'utils/notify';
import DoneIcon from '../../node_modules/@material-ui/icons/Done';
import ClearIcon from '../../node_modules/@material-ui/icons/Clear';
import LaunchIcon from '../../node_modules/@material-ui/icons/Launch';
import Switch from 'components/Switch';
import Component from 'components/Component';
import SpeedDialIcon from '../../node_modules/@material-ui/lab/SpeedDialIcon/SpeedDialIcon';
import SpeedDial from '../../node_modules/@material-ui/lab/SpeedDial/SpeedDial';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import createMuiTheme from '@material-ui/core/styles/createMuiTheme';
import dialog from 'utils/dialog';
import CollapseCheckBox from 'components/CollapseCheckBox';
import ResourceDialog from 'components/ResourceDialog';

const styles = {
  root: {
    width: '100%',
    '& input': {
      fontSize: 14,
    },
  },
  upBorder: {
    borderTop: '2px dashed #1890ff',
  },
  downBorder: {
    borderBottom: '2px dashed #1890ff',
  },
  addChildrenButton: {
    color: '#4caf50',
  },
  rowDoneIcon: {
    color: '#4caf50',
  },
  rowClearIcon: {
    color: '#ba68c8',
  },
  spacer: {
    flex: '1 1 100%',
  },
  speedDial: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
  fab: {
    backgroundColor: '#d23f31',
    width: 46,
    height: 46,
    margin: '0 auto',
  },
  editInputBottom: {
    '& :before': {
      bottom: 2,
    },
  },
  a: {
    color: '#2196f3',
    ':visited': {
      color: '#2196f3',
    },
  },
};

const namespace = 'permissionMenu';

const CustomTableCell = withStyles(theme => ({
  head: {
    padding: 4,
  },
  body: {
    padding: 4,
  },
}))(TableCell);
function dragDirection(
  dragIndex,
  hoverIndex,
  initialClientOffset,
  clientOffset,
  sourceClientOffset,
) {
  const hoverMiddleY = (initialClientOffset.y - sourceClientOffset.y) / 2;
  const hoverClientY = clientOffset.y - sourceClientOffset.y;
  if (hoverClientY > hoverMiddleY) {
    return 'downward';
  }
  if (hoverClientY < hoverMiddleY) {
    return 'upward';
  }
}

class BodyRow extends React.Component {
  render() {
    const {
      isOver,
      connectDragSource,
      connectDropTarget,
      moveRow,
      dragRow,
      clientOffset,
      sourceClientOffset,
      initialClientOffset,
      onDoubleClick,
      classes,
      ...restProps
    } = this.props;
    const style = { ...restProps.style, cursor: 'move' };
    let n;
    if (isOver && initialClientOffset) {
      const direction = dragDirection(
        dragRow.index,
        restProps.index,
        initialClientOffset,
        clientOffset,
        sourceClientOffset,
      );
      if (direction === 'downward') {
        n = 'downBorder';
      }
      if (direction === 'upward') {
        n = 'upBorder';
      }
    }
    return <TableRow
      onDoubleClick={onDoubleClick}
      hover
      {...restProps}
      ref={instance => {
        const node = findDOMNode(instance);
        connectDragSource(node);
        connectDropTarget(node);
      }}
      className={classes[n]}
      style={style}
    />;
  }
}

const DragableBodyRow = DropTarget('row', {
  drop(props, monitor) {
    const dragIndex = monitor.getItem().index;
    const hoverIndex = props.index;
    // console.log(`--${dragIndex}----${hoverIndex}`);
    if (dragIndex === hoverIndex) {
      return;
    }
    props.moveRow(dragIndex, hoverIndex);
    monitor.getItem().index = hoverIndex;
  },
}, (connect, monitor) => ({
  connectDropTarget: connect.dropTarget(),
  isOver: monitor.isOver(),
  sourceClientOffset: monitor.getSourceClientOffset(),
}))(
  DragSource('row', {
    beginDrag(props) {
      return {
        index: props.index,
      };
    },
  }, (connect, monitor) => ({
    connectDragSource: connect.dragSource(),
    dragRow: monitor.getItem(),
    clientOffset: monitor.getClientOffset(),
    initialClientOffset: monitor.getInitialClientOffset(),
  }))(withStyles(styles)(BodyRow)),
);
function setItemFlag(list, id, flag) {
  for (let i = 0; i < list.length; i += 1) {
    const item = list[i];
    if (item.id === id) {
      item.open = flag;
      return;
    }
    if (item.children && item.children.length > 0) {
      setItemFlag(item.children, id, flag);
    }
  }
}
function deleteItem(list, id) {
  for (let i = 0; i < list.length; i += 1) {
    const item = list[i];
    if (item.id === id) {
      list.splice(i, 1);
      return;
    }
    if (item.children && item.children.length > 0) {
      deleteItem(item.children, id);
    }
  }
}
// 添加或更新item
function appendItem(list, id, obj, add, children, parent) {
  for (let i = 0; i < list.length; i += 1) {
    const item = list[i];
    if (item.id === id) {
      if (add) {
        // 如果是children添加子元素，且不处理pid
          if (children) {
            if (item.children === undefined) {
              item.children = [];
            }
            item.children.push(obj);
          } else {
            if (parent === undefined) {
              obj.pid = 0;
            } else {
              obj.pid = parent.id;
            }
            obj.sort = item.sort + 1;
            list.splice(i + 1, 0, obj);
          }
        } else {
          list.splice(i, 1, obj);
        }
      return;
    }
    if (item.children && item.children.length > 0) {
      appendItem(item.children, id, obj, add, children, item);
    }
  }
}
function getItem(list, id) {

}
function exchangeItem(list, dragId, hoverId) {
  for (let i = 0; i < list.length; i += 1) {
    const item = list[i];
    let dragItem;
    let hoverItem;
    let dragIndex;
    let hoverIndex;
    for (let j = 0; j < list.length; j += 1) {
      const childItem = list[j];
      if (childItem.id === dragId) {
        dragItem = childItem;
        dragIndex = j;
      }
      if (childItem.id === hoverId) {
        hoverItem = childItem;
        hoverIndex = j;
      }
    }
    if ((dragItem === undefined && hoverItem !== undefined) || (dragItem !== undefined && hoverItem === undefined)) {
      notify.warning('只能在同一层级拖动');
      return;
    } if (dragItem === undefined && hoverItem === undefined) {
      if (item.children && item.children.length > 0) {
        const newList = exchangeItem(item.children, dragId, hoverId);
        if (newList !== undefined) {
          item.children = newList;
          return newList;
        }
      }
    } else {
      const state = { rows: list };
      const newState = update(state, {
        rows: {
          $splice: [[dragIndex, 1], [hoverIndex, 0, dragItem]],
        },
      });
      list.length = 0;
      newState.rows.forEach(item => {
        list.push(item);
      });
      return newState.rows;
    }
  }
}
const theme = createMuiTheme({
  typography: {
    useNextVariants: true,
  },
});
@DragDropContext(HTML5Backend)
class Menu extends Component {
  state = {
    list: [],
    allOpen: true,
    status: '',
    item: {},
    speedDialOpen: false,
    open: false,
    id: 0,
  };

  componentDidMount() {
    window.addEventListener('keyup', (e) => {
      if (e.keyCode === 27) {
        this.handleCancel();
      } else if (e.keyCode === 13) {
        const { status } = this.state;
        if (status !== '') {
          this.handleOk();
        }
      }
    });
    this.handleSearch();
  }

  componentWillReceiveProps(nextProps, _) {
    if (this.props.data.rid !== nextProps.data.rid) {
      this.setState({ list: JSON.parse(JSON.stringify(nextProps.data.all)), item: {} });
    }
  }

  componentWillUnmount() {
    this.resetState(namespace);
  }

  handleSearch = (value) => {
    this.props.dispatch({ type: `${namespace}/all`, payload: { q: value } });
  };

  handleChange=(id, value) => {
    const { item } = this.state;
    item[id] = value;
    this.setState({ item });
  }


  moveRow = (dragId, hoverId) => {
    const { list } = this.state;
    const newRows = exchangeItem(list, dragId, hoverId);
    if (newRows !== undefined) {
      this.props.dispatch({ type: `${namespace}/updateSort`, payload: { dragId, hoverId } });
      this.setState({ list });
    }
  };

  handleAllCollapse=(e) => {
    const { list } = this.state;
    if (e.target.checked) {
      list.forEach(item => {
        item.open = true;
      });
      this.setState({ list });
    } else {
      list.forEach(item => {
        item.open = false;
      });
      this.setState({ list });
    }
  };

  handleOneCollapse=id => e => {
    const { list } = this.state;
    if (e.target.checked) {
      setItemFlag(list, id, true);
      this.setState({ list });
    } else {
      setItemFlag(list, id, false);
      this.setState({ list });
    }
  };

  handleDialOpen=open => event => {
    this.setState({ speedDialOpen: open });
  };

  handleAdd=id => event => {
    const { list, status } = this.state;
    if (status === '') {
      const newItem = { id: -1, name: '', path: '', icon: '', type: '', display: true };
      appendItem(list, id, newItem, true, false);
      this.setState({ list, item: newItem, status: 'add' });
    } else {
      notify.warning('当前有未完成的操作');
    }
  };

  handleLastAdd=event => {
    const { list, status } = this.state;
    if (status === '') {
      const newItem = { id: -1, name: '', path: '', icon: '', type: '', display: true };
      list.push(newItem);
      this.setState({ list, item: newItem, status: 'add' });
    } else {
      notify.warning('当前有未完成的操作');
    }
  };

  handleAddChildren=id => event => {
    const { list, status } = this.state;
    if (status === '') {
      const newItem = { id: -1, pid: id, name: '', path: '', icon: '', type: '', display: true };
      appendItem(list, id, newItem, true, true);
      this.setState({ list, item: newItem, status: 'add' });
    } else {
      notify.warning('当前有未完成的操作');
    }
  };

  handleUpdate=item => event => {
    const { list, status } = this.state;
    if (status === '') {
      this.setState({ list, item: JSON.parse(JSON.stringify(item)), status: 'edit' });
    } else {
      notify.warning('当前有未完成的操作');
    }
  };

  handleDelete=id => event => {
    const dispatch = this.props.dispatch;
    dialog.confirm({ title: '确定要删除吗？', onOk() { dispatch({ type: `${namespace}/delete`, payload: [id] }); } });
  };

  handleOk=() => {
    const { list, item, status } = this.state;
    if (status === 'add') {
      appendItem(list, -1, item, false, false);
      this.setState({ status: '' });
      this.dispatch({ type: `${namespace}/insert`, payload: item });
    } else if (status === 'edit') {
      this.setState({ status: '' });
      this.dispatch({ type: `${namespace}/update`, payload: item });
    }
  };

  handleCancel=() => {
    const { list, status } = this.state;
    if (status === 'add') {
      deleteItem(list, -1);
      this.setState({ status: '', item: {}, list });
    } else if (status === 'edit') {
      this.setState({ status: '', item: {} });
    }
  };

  handleSwitchDisplay=(key, id, display) => {
    const { status } = this.state;
    if (status === '') {
      this.dispatch({ type: `${namespace}/updateDisplay`, payload: { id, display } });
    } else {
      this.handleChange(key, display);
    }
  };

  handleOpen=(id) => {
    this.setState({ id, open: true });
  };

  handleClose=() => {
    this.dispatch({ type: `${namespace}/all` });
    this.setState({ open: false });
  };

  renderColumns = (row, id, type, addOrEdit, width) => {
    const text = row[id];
    switch (type) {
      case FieldType.TEXT:
        if (addOrEdit) {
          return <Input key={id} defaultValue={text} onChange={e => this.handleChange(id, e.target.value)} width={width} />;
        }
        if (id === 'icon' && text.length > 30) {
          return `${text.substring(0, 30)}...`;
        }
        return text;
      default:
        break;
    }
  };

  renderRow = (items, level = 0) => {
    const { classes, data } = this.props;
    const { status, item } = this.state;
    const rowItem = [];
    items.forEach((row, index) => {
      const haveChildren = row.children && row.children.length > 0;
      const addOrEdit = status !== '' && row.id === item.id;
      const editParent = haveChildren && status === 'edit' && row.id === item.id;
      const rowChildren = () => {
        return (<Fragment>
          <CustomTableCell style={{ paddingLeft: (haveChildren ? 0 : 48) + 2 + 26 * level }}>
            {haveChildren && <CollapseCheckBox checked={row.open === undefined ? true : row.open} onChange={this.handleOneCollapse(row.id)} />}
            {this.renderColumns(row, 'name', FieldType.TEXT, addOrEdit, editParent && 'calc(100% - 48px)')}
          </CustomTableCell>
          <CustomTableCell>{this.renderColumns(row, 'path', FieldType.TEXT, addOrEdit)}</CustomTableCell>
          <CustomTableCell>{row.sort}</CustomTableCell>
          <CustomTableCell>{this.renderColumns(row, 'icon', FieldType.TEXT, addOrEdit)}</CustomTableCell>
          <CustomTableCell>{this.renderColumns(row, 'type', FieldType.TEXT, addOrEdit)}</CustomTableCell>
          <CustomTableCell>
            <Switch
              key={!addOrEdit ? row.display : item.display}
              checked={!addOrEdit ? row.display : item.display}
              onChange={checked => this.handleSwitchDisplay('display', row.id, checked)} />
          </CustomTableCell>
          <CustomTableCell><a href="#" className={classes.a} onClick={e => this.handleOpen(row.id)}>{row.resourceCount}</a></CustomTableCell>
          <CustomTableCell>
            {!addOrEdit ?
              <Fragment>
                <Tooltip title="当前层添加">
                  <IconButton onClick={this.handleAdd(row.id)}>
                    <AddIcon />
                  </IconButton>
                </Tooltip>
                <Tooltip title="添加子元素">
                  <IconButton onClick={this.handleAddChildren(row.id)} className={classes.addChildrenButton}>
                    <PlaylistAddIcon />
                  </IconButton>
                </Tooltip>
                <Tooltip title="修改">
                  <IconButton onClick={this.handleUpdate(row)} color={'primary'}>
                    <EditOutlinedIcon />
                  </IconButton>
                </Tooltip>
                <Tooltip title="删除">
                  <IconButton onClick={this.handleDelete(row.id)} color={'secondary'}>
                    <DeleteOutlinedIcon />
                  </IconButton>
                </Tooltip>
              </Fragment>
              :
              <Fragment>
                <Tooltip title="确定">
                  <IconButton onClick={this.handleOk} className={classes.rowDoneIcon}>
                    <DoneIcon />
                  </IconButton>
                </Tooltip>
                <Tooltip title="取消">
                  <IconButton onClick={this.handleCancel} className={classes.rowClearIcon}>
                    <ClearIcon />
                  </IconButton>
                </Tooltip>
              </Fragment>
            }
          </CustomTableCell>
                </Fragment>);
      };
      rowItem.push((
        addOrEdit ?
          <TableRow key={row.id} onDoubleClick={this.handleUpdate(row)}>
            {rowChildren()}
          </TableRow>
          :
          <DragableBodyRow key={row.id} index={row.id} moveRow={this.moveRow.bind(this)} style={{ height: 57 }} onDoubleClick={this.handleUpdate(row)}>
            {rowChildren()}
          </DragableBodyRow>
      ));
      if (haveChildren && row.open !== false) {
        const children = this.renderRow(row.children, level + 1);
        rowItem.push([...children]);
      }
    });
    return rowItem;
  };

  render() {
    const { classes } = this.props;
    const { list, speedDialOpen, id, open } = this.state;
    return (
      <Paper className={classes.root}>
        <ResourceDialog id={id} open={open} namespace={namespace} onClose={this.handleClose} />
        <Toolbar>
          <CustomSearch placeholder="菜单名或路径" onSearch={(value) => this.handleSearch(value)} />
          <div className={classes.spacer} />
          <MuiThemeProvider theme={theme}>
          <SpeedDial
            direction="down"
            ariaLabel="SpeedDial"
            className={classes.speedDial}
            classes={{ fab: classes.fab }}
            hidden={false}
            icon={<SpeedDialIcon openIcon={<EditOutlinedIcon />} />}
            onClick={this.handleLastAdd}
            onBlur={this.handleDialOpen(false)}
            onClose={this.handleDialOpen(false)}
            onFocus={this.handleDialOpen(true)}
            onMouseEnter={this.handleDialOpen(true)}
            onMouseLeave={this.handleDialOpen(false)}
            open={speedDialOpen}
          >tip
          </SpeedDial>
          </MuiThemeProvider>
        </Toolbar>
      <Table>
        <TableHead>
          <TableRow>
            <CustomTableCell width="25%">
              <CollapseCheckBox checked={list.filter(it => it.children && it.children.length > 0).filter(it => it.open !== false).length !== 0} onChange={this.handleAllCollapse} />
              菜单名
            </CustomTableCell>
            <CustomTableCell width="25%">路径</CustomTableCell>
            <CustomTableCell width="10%">排序</CustomTableCell>
            <CustomTableCell width="15%" style={{ minWidth: 220 }}>icon</CustomTableCell>
            <CustomTableCell width="10%">类型</CustomTableCell>
            <CustomTableCell width="12%">显示</CustomTableCell>
            <CustomTableCell width="10%" style={{ minWidth: 40 }}>资源</CustomTableCell>
            <CustomTableCell style={{ minWidth: 220, maxWidth: 220, paddingLeft: 20 }}>操作</CustomTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {this.renderRow(list)}
        </TableBody>
      </Table>
      </Paper>
    );
  }
}

export default connect(state => ({
  data: state[namespace],
}))(withStyles(styles)(Menu));
