import React from 'react';
import Grid from '@material-ui/core/Grid';
import withStyles from '@material-ui/core/styles/withStyles';
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import IntegrationAutosuggest from "../../../pages/aapi/CustomAutoComplete";
import Input from "@material-ui/core/Input";
import Button from "@material-ui/core/Button";
import PathEditTable from "components/api/PathEditTable";
import QueryEditTable from "components/api/QueryEditTable";
import SplitPane from "react-split-pane";
import Divider from "@material-ui/core/Divider";
import {formatFlag} from "utils";
import RequestBody from "components/api/RequestBody";
import ResponseBody from "components/api/ResponseBody";

const drawerWidth = 230;

const styles=theme=>({
  root: {
    // display: 'flex',
    // flexGrow: 1,
    width: '100%',
    height: '100%',
    backgroundColor: theme.palette.background.paper,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
    top: 114,
    height: 'calc(100% - 114px)',
  },
  content: {
    flexGrow: 1,
    // padding: theme.spacing.unit * 3,
    height: '100%',
  },
  mainContent: {
    position: 'absolute',
    right: 0,
    top: 114,
    height: 'calc(100% - 114px)',
    width: `calc(100% - ${drawerWidth}px)`,
  },
  tabsRoot: {
    // borderBottom: '1px solid #e8e8e8',
  },
  tabsIndicator: {
    backgroundColor: '#1890ff',
  },

  tabSelected: {},
  typography: {
    padding: theme.spacing.unit * 2,
    height: 'calc(100% - 48px)',
    width: '100%',
    overflowY: 'auto',
    // backgroundColor: 'rgba(0, 0, 0, 0.03)',
  },



  mainContentBox: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
  },
  mainContentBottom: {
    flex: 1,
    // borderTop: '2px dashed #ddf',
    overflowY: 'auto',
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
  },

  sendBtn: {
    color: '#666',
    marginRight: 10,
    width: '100%',
    minWidth: 70,
  },
  saveBtn: {
    width: '100%',
    minWidth: 70,
  },
  input: {
    color: 'inherit',
    // margin: theme.spacing.unit,
    width: '100%',
    minWidth: 200,
    fontSize: 14,
  },
  inputInput: {
    paddingTop: theme.spacing.unit,
    paddingRight: theme.spacing.unit,
    paddingBottom: theme.spacing.unit,
    paddingLeft: theme.spacing.unit * 2,
    transition: theme.transitions.create('width'),
    width: '100%',
    border: '1px solid #eee',
    [theme.breakpoints.up('md')]: {
      width: 200,
    },
  },
  formRoot: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  formControl: {
    margin: theme.spacing.unit,
    width: '100%',
    minWidth: 120,
    fontSize: 14,
  },
  tableHeadRow: {
    height: 36,
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
  },
  tableHead: {
    fontWeight: 600,
    // color: '#333',
  },
  tableCellRoot: {
    border: '1px solid #eee',
    paddingRight: 10,
  },
  tableCellPadding: {
    padding: '0 10px',
  },
  checkboxPadding: {
    padding: 0,
  },
  tableBtn: {
    float: 'right',
    display: 'inline-block',
    color: '#40a9ff',
    cursor: 'pointer',
    height: '100%',
  },
  textLength: {
    display: 'inline-block',
    width: '100%',
    maxWidth: '100%',
    height: 25,
    lineHeight: '25px',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'noWrap',
  },
  desStyle: {
    float: 'left',
    width: '90%',
    maxWidth: '90%',
    height: 25,
    lineHeight: '25px',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'noWrap',
  },
  closeBtn: {
    float: 'right',
    padding: 0,
    fontSize: 14,
    color: '#666',
    verticalAlign: 'middle',
  },
  bulkSaveBtn: {
    position: 'absolute',
    top: 5,
    right: 5,
    color: '#40a9ff',
    fontSize: 12,
    cursor: 'pointer',
  },
  mainContentBottomHead: {
    // height: 40,
    backgroundColor: '#fff',
    margin: '10px 5px 10px 10px',
    '& > span': {
      display: 'inline-block',
      width: 90,
      textAlign: 'center',
      lineHeight: '40px',
      fontSize: 13,
      cursor: 'pointer',
      '&:hover': {
        backgroundColor: '#40a9ff',
        color: '#fff',
      },
    },
  },
  active: {
    backgroundColor: '#40a9ff',
    color: '#fff',
  },
  mainContentBottomTitle: {
    height: 25,
    fontSize: 13,
    padding: '5px 0',
    '& > span': {
      display: 'inline-block',
      width: 50,
      textAlign: 'center',
      borderRight: '1px solid #dde',
      cursor: 'pointer',
      '&:hover': {
        color: '#40a9ff',
      },
    },
  },
  spanActive: {
    color: '#40a9ff',
  },
  MuiFormControlRoot: {
    padding: '0 12px',
  },
  MuiFormControlLabelRoot: {
    margin: 0,
  },
});

function Run(props) {

  const {classes} = props;
  const data={
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
  const pathColumns= [
    { id: 'key', label: '参数名' },
    { id: 'value', label: '值' },
    { id: 'description', label: '描述' },
  ];
  const headerColumns= [
    { id: 'key', label: '参数名' },
    { id: 'value', label: '值' },
    { id: 'require', label: '必选', render: formatFlag },
    { id: 'description', label: '描述' },
  ];
  const queryColumns=[
    { id: 'key', label: '参数名称' },
    { id: 'value', label: '值' },
    { id: 'require', label: '必选', render: formatFlag },
    { id: 'description', label: '描述' },
  ];
  const pathData=[
    { key: 'id', value: 3, description: '用户ID' },
    { key: 'name', value: 'xiaoming', description: '姓名' },
  ];
  const headerData= [
    { key: 'Content-Type', value: 'application/json', require: true, description: '请求头类型' },
    { key: 'token', value: 'adak231489fadkjfahs', require: false, description: 'token' },
  ];
  const queryData=[
    { key: 'nickname', value: '小明', require: true, description: '昵称' },
    { key: 'test', value: '', require: false, description: '' },
  ];
  const [path, setPath] = React.useState({bulk:false,data:pathData});
  const [header, setHeader] = React.useState({bulk:false,data:headerData});
  const [query, setQuery] = React.useState({bulk:false,data:queryData});

  const {inputValue,requestType,inlineParams}=data;
  return (
    <div>
      <div className={classes.mainContentBox}>
        <div style={{height:'100px'}}>
          <Grid container spacing={16} className={classes.formRoot}>
            <Grid item xs={2}>
              <FormControl className={classes.formControl}>
                {/* <InputLabel htmlFor="age-simple">Age</InputLabel> */}
                <Select
                  value={requestType}
                  style={{ width: '100%', fontSize: 14 }}
                  // onChange={handleSelectChange}
                  inputProps={{
                    name: 'requestType',
                    id: 'age-simple',
                  }}
                >
                  <MenuItem value={'get'} style={{ fontSize: 14 }}>GET</MenuItem>
                  <MenuItem value={'post'} style={{ fontSize: 14 }}>POST</MenuItem>
                  <MenuItem value={'delete'} style={{ fontSize: 14 }}>DELETE</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={3}>
              <FormControl className={classes.formControl}>
                <IntegrationAutosuggest />
              </FormControl>
            </Grid>
            <Grid item xs={5}>
              <FormControl className={classes.formControl}>
                {/* <InputLabel htmlFor="age-simple">Path&params</InputLabel> */}
                <Input
                  value={inputValue}
                  placeholder="Placeholder"
                  className={classes.input}
                  // onChange={onHandleInputChange}
                  inputProps={{
                    'aria-label': 'Description',
                  }}
                />
              </FormControl>
            </Grid>
            <Grid item xs={2}>
              <Grid container spacing={8} alignItems="center" justify="center">
                <Grid item xs={6}>
                  <Button variant="contained" className={classes.sendBtn}>
                    发 送
                  </Button>
                </Grid>
                <Grid item xs={6}>
                  <Button variant="contained" color="primary" className={classes.saveBtn}>
                    保 存
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </div>
        <div id="paramSplit">
          <SplitPane split="vertical" defaultSize="50%">
            <PathEditTable value={path} setValue={setPath} columns={pathColumns}/>
            <QueryEditTable value={query} setValue={setQuery} columns={queryColumns}/>
          </SplitPane>
        </div>
        <Divider />
        <div id="bodySplit">
          <SplitPane split="vertical" defaultSize="50%">
            <RequestBody/>
            <ResponseBody/>
          </SplitPane>
        </div>
      </div>
    </div>);
}

export default withStyles(styles)(Run);
