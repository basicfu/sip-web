import React, { Fragment } from 'react';
import Grid from '@material-ui/core/Grid';
import withStyles from '@material-ui/core/styles/withStyles';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import EnvironmentAutosuggest from 'components/api/EnvironmentAutosuggest';
import Input from '@material-ui/core/Input';
import Button from '@material-ui/core/Button';
import PathEditTable from 'components/api/PathEditTable';
import QueryEditTable from 'components/api/QueryEditTable';
import SplitPane from 'react-split-pane';
import Divider from '@material-ui/core/Divider';
import { formatFlag } from 'utils';
import RequestBody from 'components/api/RequestBody';
import ResponseBody from 'components/api/ResponseBody';

const drawerWidth = 230;

const styles = theme => ({
  root: {
    height: '100%',
  },
  request: {
    padding: 8,
    height: 48,
  },
  pathInput: {
    width: '100%',
  },
  select: {
    width: '100%',
  },
  button: {
    margin: '0 2px',
    width: 80,
    padding: '4px 0',
  },
  split: {
    display: 'flex',
    flexDirection: 'column',
    height: 'calc( 100% - 48px )',
  },
  paramSplitPane: {
    position: 'inherit!important',
  },
  bodySplitPane: {
    position: 'inherit!important',
    flex: 1,
  },
});
const pathData = [
  { key: 'id', value: 3, description: '用户ID' },
  { key: 'name', value: 'xiaoming', description: '姓名' },
];
const headerData = [
  { key: 'Content-Type', value: 'application/json', require: true, description: '请求头类型' },
  { key: 'token', value: 'adak231489fadkjfahs', require: false, description: 'token' },
];
const queryData = [
  { key: 'nickname', value: '小明', require: true, description: '昵称' },
  { key: 'test', value: '', require: false, description: '' },
];
class Run extends React.Component{
  state={
    path:{ bulk: false, data: pathData },
    header:{ bulk: false, data: headerData },
    query:{ bulk: false, data: queryData },
  }
  run=()=>{

  };
 render(){
   const { classes } = this.props;
   const data = {
     queryHeadValue: 'body',
     responseHeadValue: 'body',
     isQueryEdit: false,
     isBodyParamEdit: false,
     isHeadParamEdit: false,
     requestType: 'get',
     inputValue: '/get/{id}/aa/{nbc}?app=sip&call=get&secret=wutong',
     projectLists: ['propject1', 'project2'],
     queryParamsBulk: '', // 参数批量编辑的 value
     bodyParamType: 'form',
     reBodyParamType: 'pretty',
     bodyParams: [],
     bodyParamsBulk: '',
     headerParams: [],
     headerParamsBulk: '',
     responseBodyData: [],
     responseHeaderData: [],
   };
   const pathColumns = [
     { id: 'key', label: '参数名' },
     { id: 'value', label: '值' },
     { id: 'description', label: '描述' },
   ];
   const headerColumns = [
     { id: 'key', label: '参数名' },
     { id: 'value', label: '值' },
     { id: 'require', label: '必选', render: formatFlag },
     { id: 'description', label: '描述' },
   ];
   const queryColumns = [
     { id: 'key', label: '参数名称' },
     { id: 'value', label: '值' },
     { id: 'require', label: '必选', render: formatFlag },
     { id: 'description', label: '描述' },
   ];
   const method = [
     { label: 'GET', value: 'GET' },
     { label: 'POST', value: 'POST' },
     { label: 'PUT', value: 'PUT' },
     { label: 'PATCH', value: 'PATCH' },
     { label: 'DELETE', value: 'DELETE' },
     { label: 'HEAD', value: 'HEAD' },
     { label: 'OPTIONS', value: 'OPTIONS' },
   ];

   const { inputValue, requestType, inlineParams } = data;
   return (
     <div className={classes.root}>
       <div className={classes.request}>
         <Grid container spacing={8}>
           <Grid item xs={1}>
             <Select
               className={classes.select}
               displayEmpty
               value="GET"
             >
               {method.map(it =>
                 <MenuItem key={it.value} value={it.value}>{it.label}</MenuItem>,
               )}
             </Select>
           </Grid>
           <Grid item xs={3}>
             <EnvironmentAutosuggest />
           </Grid>
           <Grid item xs={6}>
             <Input className={classes.pathInput} value={inputValue} />
           </Grid>
           <Grid item xs={2}>
             <Button onClick={this.run()} variant="contained" className={classes.button}>发 送</Button>
             <Button color="primary" variant="contained" className={classes.button}>
               保 存
             </Button>
           </Grid>
         </Grid>
       </div>
       <div id="split" className={classes.split}>
         <div>
           <SplitPane split="vertical" defaultSize="50%" className={classes.paramSplitPane}>
             <PathEditTable value={path} setValue={setPath} columns={pathColumns} />
             <QueryEditTable value={query} setValue={setQuery} columns={queryColumns} />
           </SplitPane>
         </div>
         <Divider />
         <SplitPane split="vertical" defaultSize="50%" className={classes.bodySplitPane}>
           <RequestBody />
           <ResponseBody />
         </SplitPane>
       </div>
     </div>
   );
 }
}

export default withStyles(styles)(Run);
