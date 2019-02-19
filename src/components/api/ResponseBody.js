/* eslint-disable jsx-a11y/no-autofocus */
import React, {Fragment} from 'react';
import {withStyles} from '@material-ui/core';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormEditTable from 'components/api/FormEditTable';
import PathEditTable from "components/api/PathEditTable";
import {formatFlag} from "utils";

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
  }
};
function ResponseBody(props) {
  // console.log(props);
  const { classes } = props;
  const [tabValue, setTabValue] = React.useState(0);
  const [radioValue, setRadioValue] = React.useState('form');
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
        <RadioGroup value={radioValue} onChange={(e, v) => setRadioValue(v)} row className={classes.radioGroup}>
          <FormControlLabel value="pretty" control={<Radio className={classes.radio}/>} label="pretty" />
          <FormControlLabel value="raw" control={<Radio className={classes.radio}/>} label="raw" />
        </RadioGroup>
        {radioValue === 'pretty' && <div>a</div>}
      </Fragment>
      }
    </Fragment>
  );
}

export default withStyles(styles)(ResponseBody);
