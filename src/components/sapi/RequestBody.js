/* eslint-disable jsx-a11y/no-autofocus */
import React, {Fragment} from 'react';
import {withStyles} from '@material-ui/core';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormEditTable from 'components/sapi/FormEditTable';
import PathEditTable from "components/sapi/PathEditTable";
import {formatFlag} from "utils";
import {Controlled as CodeMirror} from "react-codemirror2";
import NoSsr from "@material-ui/core/NoSsr";

const styles = {
  tabs: {
    minHeight: 0,
  },
  tab: {
    minWidth: 90,
    minHeight: 40,
  },
  radioGroup: {
    margin: '4px 0 4px 24px',
  },
  radio:{
    // width: 32,
    height:32,
  },
  codeMirror:{
    height: 'calc( 100% - 80px )',
    margin: '0 0 10px 0',
    '& .CodeMirror':{
      height: '100%',
    }
  }
};
if (process.browser) {
  // 引用js
  require('codemirror/mode/javascript/javascript');
  require('codemirror/mode/xml/xml');
  // 引用css
  const codemirror = require('codemirror/lib/codemirror.css');
  // 注入
  const styleNode = document.createElement('style');
  styleNode.setAttribute('data-prism', 'true');
  styleNode.textContent = codemirror;
  document.head.appendChild(styleNode);
}
function RequestBody(props) {
  // console.log(props);
  const { classes,reqHeaders,reqBodyType,reqBody,reqHeadersChange,reqBodyTypeChange,reqBodyChange } = props;
  const [tabValue, setTabValue] = React.useState(0);
  const formData=[
    { key: 'nickname', value: '小明', require: true, description: '昵称' },
    { key: 'test', value: '', require: false, description: '' },
  ];
  const formColumns=[
    { id: 'key', label: '参数名称' },
    { id: 'type', label: '类型' },
    { id: 'value', label: '值' },
    { id: 'require', label: '必选', render: formatFlag },
    { id: 'description', label: '描述' },
  ];
  const [form, setForm] = React.useState({bulk:false,data:formData});
  return (
    <Fragment>
      <Tabs className={classes.tabs} value={tabValue} indicatorColor="primary" textColor="primary" onChange={(e, v) => setTabValue(v)}>
        <Tab className={classes.tab} label="Body" />
        <Tab className={classes.tab} label="Header" />
      </Tabs>
      {tabValue === 0 &&
      <Fragment>
        <RadioGroup value={reqBodyType} onChange={(e, v) => reqBodyTypeChange(v)} row className={classes.radioGroup}>
          <FormControlLabel value="json" control={<Radio className={classes.radio}/>} label="json" />
          <FormControlLabel value="form" control={<Radio className={classes.radio}/>} label="form" />
          <FormControlLabel value="binary" control={<Radio className={classes.radio}/>} label="binary" />
          <FormControlLabel value="raw" control={<Radio className={classes.radio}/>} label="raw" />
        </RadioGroup>
        {reqBodyType === 'form' && <FormEditTable value={form} setValue={setForm} columns={formColumns}/>}
        {reqBodyType === 'json' && <NoSsr>
          <CodeMirror
            className={classes.codeMirror}
            value={reqBody}
            onBeforeChange={(editor, data, value)=>reqBodyChange(value)}
            options={
              {
                mode: 'javascript',
                lineWrapping: true,
                foldGutter: true,
                // gutters:["CodeMirror-linenumbers", "CodeMirror-foldgutter"],
                lineNumbers: true,
                matchBrackets: true,
                autofocus: true,
              }
            }
          />
        </NoSsr>
        }
        {reqBodyType==='binary'&&<input type="file"/>}
        {reqBodyType==='raw'&&<input />}
      </Fragment>
      }
    </Fragment>
  );
}

export default withStyles(styles)(RequestBody);


//
// {/*<div className={classes.mainContentBottom}>*/}
// {/*<Grid container style={{ height: '100%' }}>*/}
// {/*<Grid item xs={6} style={{ height: '100%' }}>*/}
// {/*<div className={classes.mainContentBottomHead}>*/}
// {/*<span*/}
// {/*className={queryHeadValue === 'body' ? classes.active : null}*/}
// {/*onClick={() => onHeadChange('body', 'queryHeadValue')}>Body*/}
// {/*</span>*/}
// {/*<span*/}
// {/*className={queryHeadValue === 'header' ? classes.active : null}*/}
// {/*onClick={() => onHeadChange('header', 'queryHeadValue')}>Header*/}
// {/*</span>*/}
// {/*{queryHeadValue === 'body' ? <div style={{ borderTop: '1px solid #eee' }}>*/}
// {/*<FormControl component="fieldset" classes={{ root: classes.MuiFormControlRoot }}>*/}
// {/*<RadioGroup*/}
// {/*row*/}
// {/*name="type"*/}
// {/*aria-label="type"*/}
// {/*value={bodyParamType}*/}
// {/*onChange={(event, value) => onRadioChange('bodyParamType', value)}*/}
// {/*>*/}
// {/*{radioData.map(e => (*/}
// {/*<FormControlLabel*/}
// {/*key={e.key}*/}
// {/*value={e.value}*/}
// {/*control={<Radio*/}
// {/*icon={<RadioButtonUncheckedIcon fontSize="small" />}*/}
// {/*checkedIcon={<RadioButtonCheckedIcon fontSize="small" />}*/}
// {/*/>}*/}
// {/*label={e.label} />*/}
// {/*))}*/}
// {/*</RadioGroup>*/}
// {/*</FormControl>*/}
// {/*</div> : ''}*/}
// {/*</div>*/}
// {/*<div style={{*/}
// {/*height: queryHeadValue === 'header' ? 'calc(100% - 75px)' : 'calc(100% - 120px)',*/}
// {/*backgroundColor: '#fff',*/}
// {/*margin: '0 5px 0 10px',*/}
// {/*}}>*/}
// {/*{bodyParamType === 'raw' && queryHeadValue === 'body'*/}
// {/*&& <div className={classes.mainContentBottomTitle}>*/}
// {/*<span className={classes.spanActive}>Text</span>*/}
// {/*<span>Html</span>*/}
// {/*<span>Xml</span>*/}
// {/*</div>}*/}
// {/*<div>*/}
// {/*{(queryHeadValue === 'body'*/}
// {/*&& (bodyParamType === 'raw' || bodyParamType === 'json' || isBodyParamEdit))*/}
// {/*|| (isHeadParamEdit && queryHeadValue === 'header')*/}
// {/*? (<div style={{ width: '100%', height: '100%', position: 'relative', padding: '5px' }}>*/}
// {/*<textarea*/}
// {/*name=""*/}
// {/*id=""*/}
// {/*cols="120"*/}
// {/*rows="10"*/}
// {/*placeholder={'请输入'}*/}
// {/*style={{ width: '100%', resize: 'none', padding: 5 }}*/}
// {/*value={bulkValue}*/}
// {/*onChange={event => onBulkEditChange(event, bulkFlag)}*/}
// {/*/>*/}
// {/*<span*/}
// {/*className={classes.bulkSaveBtn}*/}
// {/*onClick={() => onBulkEdit(editStateFlag, false)}*/}
// {/*>key-value Edit*/}
// {/*</span>*/}
// {/*</div>)*/}
// {/*: queryHeadValue === 'body' && bodyParamType === 'binary' ? <input type="file" />*/}
// {/*: (queryHeadValue === 'body' && bodyParamType === 'form') || queryHeadValue === 'header' ? (*/}
// {/*<div style={{ padding: '5px' }}>{*/}
// {/*EditTable({*/}
// {/*...props,*/}
// {/*data: tableValue,*/}
// {/*editFlag: editStateFlag,*/}
// {/*onDelete: onDeleteParam,*/}
// {/*tableType,*/}
// {/*})*/}
// {/*}*/}
// {/*</div>) : ''}*/}
// {/*</div>*/}
// {/*</div>*/}
// {/*</Grid>*/}
// {/*<Grid item xs={6}>*/}
// {/*<div className={classes.mainContentBottomHead} style={{ margin: '10px 10px 10px 5px' }}>*/}
// {/*<span*/}
// {/*className={responseHeadValue === 'body' ? classes.active : null}*/}
// {/*onClick={() => onHeadChange('body', 'responseHeadValue')}>Body*/}
// {/*</span>*/}
// {/*<span*/}
// {/*className={responseHeadValue === 'header' ? classes.active : null}*/}
// {/*onClick={() => onHeadChange('header', 'responseHeadValue')}>Header*/}
// {/*</span>*/}
// {/*{responseHeadValue === 'body' ? <div style={{ borderTop: '1px solid #eee' }}>*/}
// {/*<FormControl component="fieldset" classes={{ root: classes.MuiFormControlRoot }}>*/}
// {/*<RadioGroup*/}
// {/*row*/}
// {/*name="retype"*/}
// {/*aria-label="retype"*/}
// {/*value={reBodyParamType}*/}
// {/*onChange={(event, value) => onRadioChange('reBodyParamType', value)}*/}
// {/*>*/}
// {/*{responseRadioData.map(e => (*/}
// {/*<FormControlLabel*/}
// {/*key={e.key}*/}
// {/*value={e.value}*/}
// {/*control={<Radio*/}
// {/*icon={<RadioButtonUncheckedIcon fontSize="small" />}*/}
// {/*checkedIcon={<RadioButtonCheckedIcon fontSize="small" />}*/}
// {/*/>}*/}
// {/*label={e.label} />*/}
// {/*))}*/}
// {/*</RadioGroup>*/}
// {/*</FormControl>*/}
// {/*</div> : ''}*/}
// {/*</div>*/}
// {/*<div style={{*/}
// {/*height: responseHeadValue === 'header' ? 'calc(100% - 75px)' : 'calc(100% - 120px)',*/}
// {/*backgroundColor: '#fff',*/}
// {/*margin: '0 10px 0 5px',*/}
// {/*}}>*/}
// {/*/!* <div className={classes.mainContentBottomTitle}> *!/*/}
// {/*/!* <span className={classes.spanActive}>pretty</span> *!/*/}
// {/*/!* <span>raw</span> *!/*/}
// {/*/!* <span>preview</span> *!/*/}
// {/*/!* </div> *!/*/}
// {/*</div>*/}
// {/*</Grid>*/}
// {/*</Grid>*/}
// {/*</div>*/}

// {columns.map(col =>
//   editCell===`${index}${col.id}`?
//     <TableCell key={col.id} className={classes.tableCell}>
//       <input autoFocus={true} className={classes.input} value={item[col.id]} spellCheck={false}
//              onChange={(e)=>updateValue(index,col.id,e.target.value)}/>
//     </TableCell>
//     :
//     <TableCell
//       key={col.id} className={classes.tableCell}
//       onClick={() => setValue({ ...value, editCell: `${index}${col.id}` })}
//     >
//       <input className={classes.input} value={item[col.id]} spellCheck={false}/>
//     </TableCell>
// )}


// const moveRow = (dragId, hoverId) => {
//   console.log('hello')
//   // const { list } = this.state;
//   // const newRows = exchangeItem(list, dragId, hoverId);
//   // if (newRows !== undefined) {
//   //   this.props.dispatch({ type: `${namespace}/updateSort`, payload: { dragId, hoverId } });
//   //   this.setState({ list });
//   // }
// };
// // console.log(value);


//
// function dragDirection(
//   dragIndex,
//   hoverIndex,
//   initialClientOffset,
//   clientOffset,
//   sourceClientOffset,
// ) {
//   const hoverMiddleY = (initialClientOffset.y - sourceClientOffset.y) / 2;
//   const hoverClientY = clientOffset.y - sourceClientOffset.y;
//   if (hoverClientY > hoverMiddleY) {
//     return 'downward';
//   }
//   if (hoverClientY < hoverMiddleY) {
//     return 'upward';
//   }
// }
// class BodyRow extends React.Component {
//   render() {
//     const {
//       isOver,
//       connectDragSource,
//       connectDropTarget,
//       moveRow,
//       dragRow,
//       clientOffset,
//       sourceClientOffset,
//       initialClientOffset,
//       onDoubleClick,
//       classes,
//       ...restProps
//     } = this.props;
//     const style = { ...restProps.style, cursor: 'move' };
//     let n;
//     if (isOver && initialClientOffset) {
//       const direction = dragDirection(
//         dragRow.index,
//         restProps.index,
//         initialClientOffset,
//         clientOffset,
//         sourceClientOffset,
//       );
//       if (direction === 'downward') {
//         n = 'downBorder';
//       }
//       if (direction === 'upward') {
//         n = 'upBorder';
//       }
//     }
//     return <TableRow
//       onDoubleClick={onDoubleClick}
//       {...restProps}
//       ref={instance => {
//         const node = findDOMNode(instance);
//         connectDragSource(node);
//         connectDropTarget(node);
//       }}
//       className={classes[n]}
//       style={style}
//     />;
//   }
// }
// const DragableBodyRow = DropTarget('row', {
//   drop(props, monitor) {
//     const dragIndex = monitor.getItem().index;
//     const hoverIndex = props.index;
//     // console.log(`--${dragIndex}----${hoverIndex}`);
//     if (dragIndex === hoverIndex) {
//       return;
//     }
//     props.moveRow(dragIndex, hoverIndex);
//     monitor.getItem().index = hoverIndex;
//   },
// }, (connect, monitor) => ({
//   connectDropTarget: connect.dropTarget(),
//   isOver: monitor.isOver(),
//   sourceClientOffset: monitor.getSourceClientOffset(),
// }))(
//   DragSource('row', {
//     beginDrag(props) {
//       return {
//         index: props.index,
//       };
//     },
//   }, (connect, monitor) => ({
//     connectDragSource: connect.dragSource(),
//     dragRow: monitor.getItem(),
//     clientOffset: monitor.getClientOffset(),
//     initialClientOffset: monitor.getInitialClientOffset(),
//   }))(withStyles(styles)(BodyRow)),
// );
