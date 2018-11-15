/* eslint-disable */
import React, {Fragment} from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
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
import { getOrCreateStore } from 'utils/store';
import TableHeader from 'components/TableHeader';
import notify from 'utils/notify';
import Divider from "../../node_modules/@material-ui/core/Divider/Divider";
import MuiThemeProvider from "../../node_modules/@material-ui/core/es/styles/MuiThemeProvider";
import createMuiTheme from "../../node_modules/@material-ui/core/styles/createMuiTheme";

const theme = createMuiTheme({
  typography: {
    useNextVariants: true,
  },
});
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
const styles = {
  root: {
    width: '100%',
    '& input':{
      fontSize: 14
    }
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
let headerMinWidths=[];
let contentWidths=[];
class CustomTable extends React.Component {
  state = {
    rowsPerPage: 20,
    rowsPerPageOptions: [20, 50, 100],
  }

  componentDidMount() {
    window.addEventListener('keyup', (e) => {
      if (e.keyCode === 27) {
        //取消
        this.handleClear()
      } else if (e.keyCode === 13) {
        //回车
        const { tableStatus } = this.data();
        if (tableStatus==='add'||tableStatus==='edit') {
          this.handleDone();
        }
      }
    });
  }

  componentWillUnmount() {
    clearTimeout(timerId);
  }

  handleSelectAllClick = (event, checked) => {
    const { namespace, keyName, tableName, list, dispatch,table } = this.data();
    if (checked) {
      dispatch({ type: `${namespace}/updateState`, payload: { [tableName]: { ...table,selected: list.map(it => it[keyName]) } } });
      return;
    }
    dispatch({ type: `${namespace}/updateState`, payload: { [tableName]: { ...table,selected: [] } } });
  };
  handleChangePage = (event, page) => {
    const { namespace, page: { pageSize }, dispatch,listAction,tableName } = this.data();
    dispatch({ type: `${namespace}/queryState`, payload: { tableName,pageNum: page + 1, pageSize } });
    dispatch({ type: `${namespace}/${listAction}` });
  };

  handleChangeRowsPerPage = event => {
    const { namespace, page: { pageNum }, dispatch,listAction,tableName } = this.data();
    dispatch({ type: `${namespace}/queryState`, payload: { tableName,pageNum, pageSize: event.target.value } });
    dispatch({ type: `${namespace}/${listAction}` });
  };

  // 预添加模式
  handleAdd =(edit) => {
    const { namespace, tableName, page, list, dispatch, table, tableStatus,keyName,columns,mode } = this.data();
    if (!(tableStatus==='add'||tableStatus==='edit')) {
      let newTableStatus='add';
      const defaultItem = {
        [keyName]: -1,
      };
      columns.forEach(it=>{
        //默认值需要忽略主键，不处理主键添加
        if(keyName!==it.id){
          defaultItem[it.id]=it.addDefaultValue;
        }
      });
      let currentMode=edit;
      //行添加模式
      if((mode==='all'||mode==='row')&&currentMode==='row'){
        list.unshift(defaultItem);
        let newTable={ ...table, selected: [defaultItem[keyName]], item: defaultItem, status: newTableStatus,currentMode };
        dispatch({ type: `${namespace}/updateState`, payload: { data: { page, list },[tableName]: newTable } });
      }else if(mode==='all'||mode==='modal'){
        let newTable={ ...table, selected: [], item: defaultItem, status: 'add',editStatus:'modal' };
        //行弹窗添加
        if(currentMode==="row"){
          //添加状态由行更改为弹窗
          currentMode='modal';
          newTable={ ...newTable,currentMode};
        }
        //标准弹窗添加
        let elements=[];
        columns.forEach((column,index)=>{
          const visible=column.visible||['all'];
          const flag=visible.includes('all')
            ||(visible.includes('dialogAdd'));
          if(flag){
            let ele=this.renderField(column,defaultItem,newTable,currentMode);
            if(index!==0){
              elements.push(<Divider key={index} style={{height:0,margin:'5px 0'}}/>)
            }
            elements.push(ele)
          }
        });
        dispatch({ type: `${namespace}/updateState`, payload: { [tableName]: newTable } });
        dialog.confirm({title:'添加',content:elements,onOk:this.handleDone,onClose:this.handleClear})
      }
    }
  };

  // 预编辑模式,行双击事件需要指定行id
  // all 行编辑、添加，弹窗编辑、添加共存
  // row 双击行编辑,修改行编辑，隐藏弹窗添加/编辑按钮
  // modal 双击弹窗编辑，隐藏正常添加、编辑按钮
  handleEdit =(edit,id) => {
    let tableStatus='edit';
    const { namespace, tableName, dispatch,columns, table,item,keyName,page,list,mode } = this.data();
    if(mode==='false'){
      return;
    }
    //准备数据
    let newItem={...item};
    let newTable={...table};
    let currentMode=edit;
    let elements=[];
    let selected=[...table.selected||[]];
    if(currentMode==='row'){
      clearTimeout(timerId);
      if(id!==undefined){
        if (id === -1) {
          return;
        }
        newItem=list.filter(it => it[keyName] === id)[0];
        selected=[id];
        if(list[0].id===-1){
          //如果有新建行不进入编辑状态
          list.shift();
          newItem={};
          selected=[];
          tableStatus='';
          newTable={ ...newTable, selected, item:newItem, status:tableStatus,currentMode };
          dispatch({ type: `${namespace}/updateState`, payload: { [tableName]: newTable, data: { page, list } } });
          return;
        }
      }
    }
    //行编辑模式
    newTable={ ...newTable, selected, item:newItem,status:tableStatus,currentMode };
    if((mode==='all'||mode==='row')&&currentMode==='row'){
      dispatch({ type: `${namespace}/updateState`, payload: { [tableName]: newTable, data: { page, list } } });
    }else if(mode==='all'||mode==='modal'){
      //行弹窗编辑
      if(currentMode==="row"){
        //编辑状态由行更改为弹窗
        currentMode='modal';
        newTable={ ...newTable,currentMode};
      }
      //标准弹窗编辑
      columns.forEach((column,index)=>{
        const visible=column.visible||['all'];
        const flag=visible.includes('all')
          ||(visible.includes('dialogEdit'));
        if(flag){
          let ele=this.renderField(column,newItem,newTable,currentMode);
          if(index!==0){
            elements.push(<Divider key={index} style={{height:0,margin:'5px 0'}}/>)
          }
          elements.push(ele)
        }
      });
      dispatch({ type: `${namespace}/updateState`, payload: { [tableName]: newTable, data: { page, list } } });
      dialog.confirm({title:'修改',content:elements,onOk:this.handleDone,onClose:this.handleClear})
    }
  };

  // 单击事件，处理单击/双击冲突事件
  handleClick = (event, record) => {
    clearTimeout(timerId);
    timerId = setTimeout(() => {
      const { namespace, keyName, tableName,page, list, dispatch, selected, tableStatus,table,onClick } = this.data();
      const id=record[keyName];
      onClick&&onClick(record);
      //单击当前编辑行无操作
      if (id !== -1) {
        let newSelected=[...selected];
        let newItem = list.filter(it => it[keyName] === id)[0];
        if(list[0].id===-1){
          //如果有新建行不进入编辑状态
          list.shift();
          newItem={};
          newSelected=[];
        }else{
          newSelected=[id]
        }
        if (selected.indexOf(id) === -1) {
          dispatch({ type: `${namespace}/updateState`, payload: { [tableName]: { ...table,selected: newSelected, item:newItem },data:{page,list} } });
          } else if (!(tableStatus==='add'||tableStatus==='edit')) {
          dispatch({ type: `${namespace}/updateState`, payload: { [tableName]: { ...table,selected: [] },data:{page,list}  } });
        }
      }
    }, 200);
  };

  //行checkbox事件
  handleCheckbox = (event, id) => {
    clearTimeout(timerId);
    const { namespace, selected, tableName, dispatch,page,list,table } = this.data();
    if (id !== -1) {
      let newSelected=selected.filter(it => it !== id);
      let isNull=false;
      if(list[0].id===-1){
        //如果有新建行删除
        list.shift();
        newSelected=[]
        isNull=true
      }
      if (event.target.checked&&!isNull) {
        dispatch({ type: `${namespace}/updateState`, payload: {  data: { page, list },[tableName]: { ...table,selected: [...selected, id] } } });
      } else {
        dispatch({ type: `${namespace}/updateState`, payload: {  data: { page, list },[tableName]: { ...table,selected: newSelected } } });
      }
    }
  };

  handleDelete = () => {
    const { namespace, dispatch, selected,deleteTitle,deleteContent,onDelete } = this.data();
    if(onDelete){
      onDelete(selected)
    }else{
      dialog.confirm({ title:deleteTitle||"确定要删除吗？",content:deleteContent,onOk() { dispatch({ type: `${namespace}/delete`, payload: selected }); } });
    }
  };

  // insert/update
  handleDone=() => {
    const { namespace, keyName, dispatch, table, item,list, columns } = this.data();
    const add = table.status === 'add';
    const edit = table.status === 'edit';
    // check field
    // 必填   过滤null/underfind/""
    // 非必填  过滤null/underfind
    for (const it of columns) {
      let v=item[it.id];
      //check required
      if (it.required===true) {
        if((it.addRequired!==true&&it.editRequired!==true)||(add===true&&it.addRequired===true)||(edit===true&&it.editRequired===true)){
          if(v===undefined||v===null||v===''){
            notify.warning(`[${it.label}]必填`);
            return;
          }
        }
      }else{
        if(v===undefined||v===null){
          delete item[it.id]
        }
      }
      //check validator
      if(it.validator){
        let msg=it.validator(v,item)
        if(msg){
          notify.warning(msg);
          return
        }
      }
    }
    if (add) {
      //添加过滤主键
      delete item[keyName];
      dispatch({ type: `${namespace}/insert`, payload: { ...item } });
    } else if (edit) {
      dispatch({ type: `${namespace}/update`, payload: { ...item } });
    }
  }

  // cancel
  handleClear=() => {
    const { namespace, keyName, tableName, dispatch, list, page, table } = this.data();
    if (list.length>0&&list[0][keyName]===-1) {
      list.shift();
      dispatch({ type: `${namespace}/updateState`, payload: { [tableName]: {search:{...table.search}}, data: { page, list } } });
    }else {
      dispatch({ type: `${namespace}/updateState`, payload: { [tableName]: {search:{...table.search}}, data: { page, list } } });
    }
  }

  data=() => {
    const dispatch = getOrCreateStore().dispatch;
    const { classes, columns, data, keyName, tableName, mode, actionName, showCheck, showHeader, headerChild, showFooter, deleteTitle,deleteContent
      ,userPaper,listAction,onClick,onDoubleClick,onDelete } = this.props;
    const { namespace, data: { list, page }, all } = data;
    const table = data[tableName] || {};
    const selected = table.selected || [];
    const item = {...table.item} || {};
    //表格当前状态add/edit
    const tableStatus = table.status;
    //表格当前操作模式row/modal
    const currentMode = table.currentMode;
    return { classes, dispatch, columns, keyName, tableName, namespace, list, page, all, table, item, selected, currentMode, mode, actionName,
      showCheck, showHeader, headerChild, showFooter, deleteTitle,deleteContent,tableStatus,userPaper,listAction,onClick,onDoubleClick,onDelete };
  };
  handleItemChange = (itemKey, itemValue) => {
    const { dispatch, tableName, namespace, table } = this.data();
    // TODO 保存会闪原数据
    dispatch({ type: `${namespace}/updateState`, payload: { [tableName]: { ...table, item: { ...table.item, [itemKey]: itemValue } } } });
  };
  renderField(column,listItem,table,edit){
    const { keyName,currentMode } = this.data();
    let addOrEdit = (table.status === 'add' && listItem[keyName] === -1)||(table.status === 'edit' && listItem[keyName] === table.selected[0]);
    let newColumn={...column};
    //不是弹窗模式时置空label字段，不渲染tip,如果edit没值则是行渲染，且currentMode是modal时将addOrEdit置为false，在弹窗时不渲染行编辑
    if(!edit&&currentMode==='modal'){
      console.log(currentMode)
      addOrEdit=false;
    }else if(!(edit&&edit==='modal')){
      newColumn.label=''
    }
    return column.render ? column.render(listItem[column.id], newColumn ,addOrEdit,listItem,this.handleItemChange) : listItem[column.id]
  }
  // 计算自适应宽度
  calcTableAuto(props) {
    const { list, columns,tableStatus,currentMode } = props;
    const renderField=(column,item)=>{
      // const add = table.status === 'add' && item[keyName] === -1;
      // const edit = table.status === 'edit' && item[keyName] === table.selected[0];
      const visible=column.visible||['all'];
      const flag=visible.includes('all')
        ||(visible.includes('row')&&tableStatus===undefined||tableStatus==='')
        ||(visible.includes('rowAdd')&&tableStatus==='add'&&currentMode==='row')
        ||(visible.includes('rowEdit')&&tableStatus==='edit'&&currentMode==='row')
        ||(visible.includes('dialogAdd')&&tableStatus==='add'&&currentMode==='modal')
        ||(visible.includes('dialogEdit')&&tableStatus==='edit'&&currentMode==='modal');
      if(flag){
        //不处理是否添加编辑模式
        return column.render ? column.render(item[column.id], column,'',item) : item[column.id]
      }else{
        return ""
      }
    };
    const headerMinWidths = [];
    const contentWidths = [];
    let calcList = [...list];
    let totalPart = 0;
    columns.forEach(column => {
      const widths = calcList.map(it => getDomWidth(renderField(column,it)));
      if (widths && widths.length > 0) {
        totalPart += widths.reduce((a, b) => a + b) / calcList.length;
      }
    });
    const totalPerRate = 100 / totalPart;
    columns.forEach((column, index) => {
      const visible=column.visible||['all'];
      const flag=visible.includes('all')
        ||(visible.includes('row')&&tableStatus===undefined||tableStatus==='')
        ||(visible.includes('rowAdd')&&tableStatus==='add'&&currentMode==='row')
        ||(visible.includes('rowEdit')&&tableStatus==='edit'&&currentMode==='row')
        ||(visible.includes('dialogAdd')&&tableStatus==='add'&&currentMode==='modal')
        ||(visible.includes('dialogEdit')&&tableStatus==='edit'&&currentMode==='modal');
      if(flag){
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
        const widths = calcList.map(it => getDomWidth(renderField(column,it)));
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
      }
    });
    this.headerMinWidths=headerMinWidths;
    this.contentWidths=contentWidths;
    // console.log(headerMinWidths)
    // console.log(contentWidths)
  }
  renderCell=(columns,tableStatus,currentMode,renderElement)=>{
    let index=-1;
    return columns.map((column, columnIndex) => {
      const visible=column.visible||['all'];
      const flag=visible.includes('all')
        ||(visible.includes('row'))
        ||(visible.includes('rowAdd')&&tableStatus==='add'&&(currentMode==='row'||currentMode==='modal'))
        ||(visible.includes('rowEdit')&&tableStatus==='edit'&&(currentMode==='row'||currentMode==='modal'))
        ||(visible.includes('dialogAdd')&&tableStatus==='add'&&currentMode==='row')
        ||(visible.includes('dialogEdit')&&tableStatus==='edit'&&currentMode==='row');
      if(flag){
        index++;
        return renderElement(column,index);
      }
    })
  };
  render() {
    const { classes, tableStatus, columns, keyName, mode, list, page, table, selected, currentMode, showCheck, showHeader, headerChild, showFooter,userPaper } = this.data();
    const { rowsPerPageOptions, rowsPerPage } = this.state;
    //非添加编辑、弹窗模式进行计算
    if((currentMode===undefined||currentMode==='')&&(tableStatus===undefined||tableStatus==='')){
      this.calcTableAuto({ list, columns, keyName, table,tableStatus,currentMode });
    }
    const renderElement=()=>{
      return (<Fragment>
        {showHeader &&
        <TableHeader
          numSelected={selected.length}
          onAdd={this.handleAdd}
          onEdit={this.handleEdit}
          onDelete={this.handleDelete}
          onDone={this.handleDone}
          onClear={this.handleClear}
          headerChild={headerChild}
          tableStatus={tableStatus}
          mode={mode}
        />}
        <div className={classes.tableWrapper}>
          <Table className={classes.table}>
            <TableHead>
              <TableRow>
                {showCheck &&
                <CustomTableCell style={{ textAlign: 'left', width: 56 }}>
                  <Checkbox
                    indeterminate={selected.length > 0 && selected.length < list.length}
                    checked={selected.length === list.length && list.length !== 0}
                    onChange={this.handleSelectAllClick}
                  />
                </CustomTableCell>}
                {this.renderCell(columns,tableStatus,currentMode,(column,index)=>(
                  <CustomTableCell key={index} style={{ minWidth: `${this.headerMinWidths[index]}px`, width: `${this.contentWidths[index]}%` }}>
                    {column.label}
                  </CustomTableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {list.map((item, itemIndex) => {
                const isSelected = selected.indexOf(item[keyName]) !== -1;
                return (
                  <TableRow
                    hover
                    onClick={event => this.handleClick(event, item)}
                    onDoubleClick={event => this.handleEdit('row', item[keyName])}
                    aria-checked={isSelected}
                    tabIndex={-1}
                    key={item[keyName]}
                    selected={isSelected}
                  >
                    {showCheck &&
                    <CustomTableCell style={{ textAlign: 'left' }}>
                      <Checkbox checked={isSelected} onChange={e => this.handleCheckbox(e, item[keyName])} />
                    </CustomTableCell>}
                    {this.renderCell(columns,tableStatus,currentMode,(column,index)=>(
                      <CustomTableCell key={index} style={{textAlign: column.align || undefined}}>
                        {this.renderField(column, item, table)}
                      </CustomTableCell>
                    ))}
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
      </Fragment>)
    }
    return (
      <MuiThemeProvider theme={theme}>
        {userPaper?
          <Paper className={classes.root}>
            {renderElement()}
          </Paper>
          :
          renderElement()
        }
      </MuiThemeProvider>
    );
  }
}
CustomTable.propTypes = {
  actionName: PropTypes.string.isRequired,
  columns: PropTypes.array.isRequired,
  mode: PropTypes.oneOf(['all', 'row', 'modal', 'false']),
  keyName: PropTypes.string.isRequired,
  tableName: PropTypes.string.isRequired,
};
CustomTable.defaultProps = {
  actionName: 'list',
  mode: 'all',
  keyName: 'id',
  tableName: 'table',
  showCheck: true,
  showHeader: true,
  showFooter: true,
  userPaper: true,
  listAction: 'list',
};
export default withStyles(styles)(CustomTable);
