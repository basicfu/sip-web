import React, { Fragment } from 'react';
import Grid from '@material-ui/core/Grid';
import withStyles from '@material-ui/core/styles/withStyles';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import EnvironmentAutosuggest from 'components/sapi/EnvironmentAutosuggest';
import Input from '@material-ui/core/Input';
import Button from '@material-ui/core/Button';
import PathEditTable from 'components/sapi/PathEditTable';
import QueryEditTable from 'components/sapi/QueryEditTable';
import SplitPane from 'react-split-pane';
import Divider from '@material-ui/core/Divider';
import { formatFlag } from 'utils';
import RequestBody from 'components/sapi/RequestBody';
import ResponseBody from 'components/sapi/ResponseBody';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import Tooltip from "@material-ui/core/Tooltip";

const drawerWidth = 230;

const styles = theme => ({
  root: {
    height: 'calc( 100% - 48px )',
  },
  request: {
    padding: 8,
    height: 48,
  },
  pathInput: {
    width: '100%',
    minWidth: 200,
  },
  select: {
    width: '100%',
  },
  buttonGroup: {
    display: 'flex',
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
  grid: {
    flexWrap: 'inherit',
  },
  alertMessage: {
    width: '100%',
    backgroundColor: '#fffee6',
    border: '1px solid #fff07a',
    padding: '4px 8px',
    fontSize: '14px',
    '& a': {
      fontWeight: 'bold',
      color: '#4fb6ff',
      textDecoration: 'none',
    },
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
const methodList = [
  { label: 'GET', value: 'GET' },
  { label: 'POST', value: 'POST' },
  { label: 'PUT', value: 'PUT' },
  { label: 'PATCH', value: 'PATCH' },
  { label: 'DELETE', value: 'DELETE' },
  { label: 'HEAD', value: 'HEAD' },
  { label: 'OPTIONS', value: 'OPTIONS' },
];
const initCrossRequest = (fn) => {
  let startTime = 0;
  const _crossRequest = setInterval(() => {
    startTime += 500;
    if (startTime > 5000) {
      clearInterval(_crossRequest);
    }
    if (window.crossRequest) {
      clearInterval(_crossRequest);
      fn(true);
    } else {
      fn(false);
    }
  }, 500);
  return _crossRequest;
};
class Run extends React.Component {
  state={
    hasPlugin: true,
    path1: { bulk: false, data: pathData },
    header: { bulk: false, data: headerData },
    query: { bulk: false, data: queryData },
    data: {
      method: 'GET',
      host: '',
      path: '',
      reqHeaders: [],
      reqBodyType: 'json',
      reqBody: '',
    },
    responseData: {},
    envList: [
      { label: '本地', host: 'http://api-dev.dmka.cn' },
      { label: '开发', host: 'http://api-dev.dmka.cn' },
      { label: '测试', host: 'https://api-test.dmka.cn' },
    ],
  };

  componentDidMount() {
    this._crossRequestInterval = initCrossRequest(hasPlugin => {
      this.setState({ hasPlugin });
    });
  }

  componentWillUnmount() {
    clearInterval(this._crossRequestInterval);
  }

  run=() => {
    const { method,host,path,reqBody } = this.state.data;
    const reqData={};
    reqData.method=method;
    reqData.url=host+path;
    reqData.data=JSON.parse(reqBody);
    reqData.success=(res)=>{
      this.setState({responseData:res.body})
    };
    reqData.error=(res)=>{
      this.setState({responseData:res.body})
    };
    window.crossRequest(reqData);
  };

  handleChangeValue=(key, value) => {
    const { data } = this.state;
    data[key] = value;
    this.setState({ data });
  };

 render() {
   const { classes } = this.props;
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
   const { path1, query, data, envList, hasPlugin,responseData } = this.state;
   const { method, host, path, reqHeaders, reqBodyType, reqBody } = data;
   const setPath = (path) => {
     this.setState({ path1 });
   };
   const setQuery = (query) => {
     this.setState({ query });
   };
   return (
     <div className={classes.root}>
       <div className={classes.alertMessage} style={{ display: hasPlugin ? 'none' : undefined }}>
          <div>当前的接口请求服务需浏览器安装免费sip-cross跨域请求插件，选择下面任意一种安装方式，安装成功后请刷新浏览器：</div>
          <div><a target='_blank' href="http://tmp.static.dmka.cn/sip-cross.crx">[Google商店获取]</a>需翻墙</div>
          <div><a target='_blank' href="http://tmp.static.dmka.cn/sip-cross.crx">[手动下载]</a>将crx文件拖入到chrome://extensions/中</div>
       </div>
       <div className={classes.request}>
         <Grid className={classes.grid} container spacing={8}>
           <Grid item xs={2}>
             <Select
               className={classes.select}
               displayEmpty
               value={method}
               onChange={(e) => this.handleChangeValue('method', e.target.value)}
             >
               {methodList.map(it =>
                 <MenuItem key={it.value} value={it.value}>{it.label}</MenuItem>,
               )}
             </Select>
           </Grid>
           <Grid item xs={8}>
             <EnvironmentAutosuggest
               onChange={(value) => this.handleChangeValue('host', value)}
               value={host}
               list={envList}
               placeholder="http://127.0.0.1:80"
             />
           </Grid>
           <Grid item xs={10}>
             <Input
               className={classes.pathInput}
               value={path}
               onChange={(e) => this.handleChangeValue('path', e.target.value)} />
           </Grid>
           <Grid item className={classes.buttonGroup}>
             <Tooltip title={hasPlugin?'':'请先安装sip-cross插件'}>
               <span><Button onClick={this.run} variant="contained" className={classes.button} disabled={!hasPlugin}>发 送</Button></span>
             </Tooltip>
             <Button onClick={this.run} color="primary" variant="contained" className={classes.button}>保 存</Button>
           </Grid>
         </Grid>
       </div>
       <div id="split" className={classes.split}>
         {/* <div> */}
           {/* <SplitPane split="vertical" defaultSize="50%" className={classes.paramSplitPane}> */}
             {/* <PathEditTable value={path1} setValue={setPath} columns={pathColumns} /> */}
             {/* <QueryEditTable value={query} setValue={setQuery} columns={queryColumns} /> */}
           {/* </SplitPane> */}
         {/* </div> */}
         <Divider />
         <SplitPane split="vertical" defaultSize="50%" className={classes.bodySplitPane}>
           <RequestBody
             reqHeaders={reqHeaders}
             reqBodyType={reqBodyType}
             reqBody={reqBody}
             reqHeadersChange={(value) => this.handleChangeValue('reqHeaders', value)}
             reqBodyTypeChange={(value) => this.handleChangeValue('reqBodyType', value)}
             reqBodyChange={(value) => this.handleChangeValue('reqBody', value)}
           />
           <ResponseBody
             responseData={responseData}
           />
         </SplitPane>
       </div>
     </div>
   );
 }
}

export default withStyles(styles)(Run);
