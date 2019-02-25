import React, {Fragment} from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import ParamPreviewTable from 'components/sapi/ParamPreviewTable';
import withStyles from '@material-ui/core/styles/withStyles';
import {formatFlag} from "utils";

const styles={
  contentPanel: {
    padding: 16,
  },
  title: {
    display: 'inline-block',
    height: 40,
    lineHeight: '40px',
    fontSize: 14,
    marginRight: 10,
  },
  titleBar: {
    display: 'inline-block',
    marginTop: 3,
    borderLeft: '3px solid #1890ff',
    paddingLeft: 5,
  },
  panelHeader: {
    height: 30,
    fontSize: 18,
  },
};

function Preview(props) {
  const {classes} = props;
  const pathColumns= [
    { id: 'key', label: '参数名' },
    { id: 'value', label: '示例' },
    { id: 'description', label: '描述' },
  ];
  const headerColumns= [
    { id: 'key', label: '参数名' },
    { id: 'value', label: '示例' },
    { id: 'require', label: '必选', render: formatFlag },
    { id: 'description', label: '描述' },
  ];
  const queryColumns=[
    { id: 'key', label: '参数名称' },
    { id: 'value', label: '示例' },
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
  const PanelHeader = ({title}) => <Typography className={classes.panelHeader}>
    <span className={classes.titleBar}>{title}</span>
  </Typography>;
  return (
    <Fragment>
      <div>
        <PanelHeader title={'基本信息'}/>
        <div className={classes.contentPanel}>
          <Grid container spacing={8}>
            <Grid item xs={6}>
              <Typography
                style={{minWidth: 300, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'noWrap'}}>
                <span className={classes.title}>接口名称：</span>
                /api/group/get_member_list
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography><span className={classes.title}>创&nbsp;建&nbsp;人：</span>basicfu</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography><span className={classes.title}>状&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;态：</span>
                未完成
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography><span className={classes.title}>更新时间：</span>2019-01-08 13:32:54</Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography><span className={classes.title}>接口路径：</span>fadsfasdf</Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography>
                <span className={classes.title}>Mock地址：</span>
                <a
                  style={{color: '#1890ff', textDecoration: 'none'}}
                  href={'http://yapi.demo.qunar.com/mock/37828/api/group/get_member_list'}>http://yapi.demo.qunar.com/mock/37828/api/group/get_member_list
                </a>
              </Typography>
            </Grid>
          </Grid>
        </div>
      </div>
      <div>
        <PanelHeader title={'请求参数'}/>
        <ParamPreviewTable title={'路径参数:'} columns={pathColumns} data={pathData}/>
        <ParamPreviewTable title={'Headers:'} columns={headerColumns} data={headerData}/>
        <ParamPreviewTable title={'Querys:'} columns={queryColumns} data={queryData}/>
      </div>
      <div>
        <PanelHeader title={'返回数据'}/>
      </div>
    </Fragment>
  );
}

export default withStyles(styles)(Preview);
