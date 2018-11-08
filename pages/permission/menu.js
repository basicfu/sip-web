import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'dva';
import Input from 'components/Input';
import { FieldType } from 'enum';
import Table from '../../node_modules/@material-ui/core/Table/Table';
import TableHead from '../../node_modules/@material-ui/core/TableHead/TableHead';
import TableBody from '../../node_modules/@material-ui/core/TableBody/TableBody';
import { DragDropContext, DragSource, DropTarget } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import TableCell from '../../node_modules/@material-ui/core/TableCell/TableCell';
import TableRow from '../../node_modules/@material-ui/core/TableRow/TableRow';
import { findDOMNode } from 'react-dom';
import update from 'immutability-helper';

const styles = {
  upBorder: {
    borderTop: '2px dashed #1890ff',
  },
  downBorder: {
    borderBottom: '2px dashed #1890ff',
  },
};

const namespace = 'permissionMenu';
function dragDirection(
  dragIndex,
  hoverIndex,
  initialClientOffset,
  clientOffset,
  sourceClientOffset,
) {
  const hoverMiddleY = (initialClientOffset.y - sourceClientOffset.y) / 2;
  const hoverClientY = clientOffset.y - sourceClientOffset.y;
  if (dragIndex < hoverIndex && hoverClientY > hoverMiddleY) {
    return 'downward';
  }
  if (dragIndex > hoverIndex && hoverClientY < hoverMiddleY) {
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

@DragDropContext(HTML5Backend)
class Menu extends React.Component {
  state={
    rows: [
      { id: 1, name: '小明' },
      { id: 2, name: '测试一下' },
      { id: 3, name: '哈哈' },
      { id: 4, name: '你好' },
    ],
  }

  componentDidMount() {
    this.handleSearch();
  }

  handleSearch = (value) => {
    this.props.dispatch({ type: `${namespace}/all`, payload: { q: value } });
  };

  renderColumns = (text, column, addOrEdit, item, onChange) => {
    const { id, type } = column;
    switch (type) {
      case FieldType.TEXT:
        if (addOrEdit) {
          return <Input key={id} defaultValue={text} onChange={e => onChange(id, e.target.value)} column={column} />;
        }
        return text;
      default:
        break;
    }
  };

  moveRow = (dragIndex, hoverIndex) => {
    const { rows } = this.state;
    const dragRow = rows[dragIndex];
    this.setState(
      update(this.state, {
        rows: {
          $splice: [[dragIndex, 1], [hoverIndex, 0, dragRow]],
        },
      }),
    );
  };

  render() {
    const { data } = this.props;
    const { rows } = this.state;
    return (
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>姓名</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row,index) => {
              return (
                <DragableBodyRow key={row.id} index={index} moveRow={this.moveRow.bind(this)}>
                  <TableCell>{row.id}</TableCell>
                  <TableCell>{row.name}</TableCell>
                </DragableBodyRow>
              );
            })}
          </TableBody>
        </Table>
    );
  }
}
export default connect(state => ({
  data: state[namespace],
}))(withStyles(styles)(Menu));
// const tableProps = {
//   data,
//   headerChild: <CustomSearch placeholder="应用名或code" onSearch={(value) => this.handleSearch(value)} />,
//   columns: [
//     { id: 'username', label: '菜单名', type: FieldType.TEXT, required: true, render: this.renderColumns },
//     { id: 'mobile', label: '路径', type: FieldType.TEXT, required: true, render: this.renderColumns },
//     { id: 'email', label: '排序', type: FieldType.TEXT, required: false, render: this.renderColumns },
//     { id: 'email', label: 'icon', type: FieldType.TEXT, required: false, render: this.renderColumns },
//     { id: 'email', label: '类型', type: FieldType.TEXT, required: true, render: this.renderColumns },
//     { id: 'email', label: '是否显示', type: FieldType.TEXT, required: true, render: this.renderColumns },
//   ],
// };
