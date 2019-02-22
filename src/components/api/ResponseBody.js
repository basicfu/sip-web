/* eslint-disable jsx-a11y/no-autofocus */
import React, {Fragment} from 'react';
import {withStyles} from '@material-ui/core';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import {formatFlag} from 'utils';
import {UnControlled as CodeMirror} from 'react-codemirror2';
import NoSsr from '@material-ui/core/NoSsr';
// import 'codemirror/lib/codemirror.css';
// import 'codemirror/theme/material.css';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import createMuiTheme from '@material-ui/core/styles/createMuiTheme';
import {loadCSS} from 'fg-loadcss/src/loadCSS';
import ToggleButtonGroup from "@material-ui/lab/ToggleButtonGroup";
import ToggleButton from "@material-ui/lab/ToggleButton";
import JsonFormat from "components/api/JsonFormat";


const styles = theme => ({
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
  radio: {
    // width: 32,
    height: 32,
  },
  toggleContainer: {
    height: 56,
    padding: `${theme.spacing.unit}px ${theme.spacing.unit * 2}px`,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    margin: `${theme.spacing.unit}px 0`,
    background: theme.palette.background.default,
    '& span': {
      textTransform: 'none',
    }
  },
  responseBody:{
    height: 'calc( 100% - 40px )',
  },
  responseHeader:{
    overflow: 'auto',
    padding: '2px 10px 2px 10px',
    height: 'calc( 100% - 40px )',
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    '& p':{
      margin: '8px 0',
      color: '#444',
      fontSize: '14px',
    },
    '& label':{
      fontWeight: 'bold'
    }
  }
});

function ResponseBody(props) {
  // console.log(props);
  const {classes} = props;
  const [tabValue, setTabValue] = React.useState(1);
  const [radioValue, setRadioValue] = React.useState('pretty');

  const formData = [
    {key: 'nickname', value: '小明', require: true, description: '昵称'},
    {key: 'test', value: '', require: false, description: ''},
  ];
  const formColumns = [
    {id: 'key', label: '参数名称'},
    {id: 'type', label: '类型'},
    {id: 'value', label: '值'},
    {id: 'require', label: '必选', render: formatFlag},
    {id: 'description', label: '描述'},
  ];
  const [form, setForm] = React.useState({bulk: false, data: formData});
  // https://github.com/JedWatson/react-codemirror/issues/21
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

  const options = {
    // mode: 'javascript',
    // lineWrapping:true,
    // foldGutter: true,
    // gutters:["CodeMirror-linenumbers", "CodeMirror-foldgutter"],
    // readOnly: true,
    lineNumbers: true,
    matchBrackets: true,
  };
  const json = {
    test: 'hello',
    abcd: 123,
  };
  return (
    <Fragment>
      <Tabs className={classes.tabs} value={tabValue} indicatorColor="primary" textColor="primary"
            onChange={(e, v) => setTabValue(v)}>
        <Tab className={classes.tab} label="Body"/>
        <Tab className={classes.tab} label="Header"/>
      </Tabs>
      {tabValue === 0 &&
      <div className={classes.responseBody}>
        {/*<ToggleButtonGroup className={classes.toggleContainer} value={radioValue} exclusive onChange={(e, v) => setRadioValue(v)}>*/}
        {/*<ToggleButton value="pretty">*/}
        {/*<label>pretty</label>*/}
        {/*</ToggleButton>*/}
        {/*<ToggleButton value="raw">*/}
        {/*raw*/}
        {/*</ToggleButton>*/}
        {/*</ToggleButtonGroup>*/}
        <JsonFormat/>
        {/*<RadioGroup value={radioValue} onChange={(e, v) => setRadioValue(v)} row className={classes.radioGroup}>*/}
        {/*<FormControlLabel value="pretty" control={<Radio className={classes.radio} />} label="pretty" />*/}
        {/*<FormControlLabel value="raw" control={<Radio className={classes.radio} />} label="raw" />*/}
        {/*</RadioGroup>*/}
        {/*{radioValue === 'pretty' &&*/}
        {/*<NoSsr>*/}
        {/*<CodeMirror*/}
        {/*value={JSON.stringify(json)}*/}
        {/*options={options}*/}
        {/*/>*/}
        {/*</NoSsr>*/}
        {/*}*/}
      </div>
      }
      {tabValue === 1 &&
      <div className={classes.responseHeader}>
        <p><label>status: </label>200</p>
        <p><label>content-type: </label>application/json;charset=UTF-8</p>
        <p><label>content-type: </label>application/json;charset=UTF-8</p>
        <p><label>content-type: </label>application/json;charset=UTF-8</p>
        <p><label>content-type: </label>application/json;charset=UTF-8</p>
        <p><label>content-type: </label>application/json;charset=UTF-8</p>
        <p><label>content-type: </label>application/json;charset=UTF-8</p>
      </div>
      }
    </Fragment>
  );
}

export default withStyles(styles)(ResponseBody);
