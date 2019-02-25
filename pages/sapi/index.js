import React from 'react';
import {withStyles} from '@material-ui/core/styles';
import {connect} from 'dva';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Sidebar from 'components/sapi/Sidebar';
import Member from 'components/sapi/Member';
import Setting from 'components/sapi/Setting';
import Interface from 'components/sapi/Interface';

const namespace = 'aapiAapi';
const styles ={
  root: {
    width: '100%',
    height: '100%',
  },
  content: {
    height: 'calc( 100% - 48px )',
  },
  mainContent: {
    position: 'absolute',
    top: 112,
    left: 230,
    width: 'calc( 100% - 230px )',
    height: 'calc( 100% - 112px )',
  },
};
const items = [
  {
    display: true,
    icon: '<svg viewBox="0 0 24 24" width="24px" height="24px" fill="currentColor">\n  <path d="M12,5.69l5,4.5V12v6h-2v-4v-2h-2h-2H9v2v4H7v-6v-1.81L12,5.69 M12,3L2,12h3v8h6v-6h2v6h6v-8h3L12,3L12,3z"></path>\n</svg>',
    pid: 0,
    sort: -1,
    type: 'PAGE',
    path: '/',
    cdate: 0,
    children: [],
    appId: 1,
    resourceCount: 0,
    name: '首页',
    id: 24,
    udate: 1545815131,
  },
  {
    display: true,
    icon: '<svg viewBox="0 0 1024 1024" width="24px" height="24px" fill="currentColor">\n  <path d="M464 144H160c-8.8 0-16 7.2-16 16v304c0 8.8 7.2 16 16 16h304c8.8 0 16-7.2 16-16V160c0-8.8-7.2-16-16-16zm-52 268H212V212h200v200zm452-268H560c-8.8 0-16 7.2-16 16v304c0 8.8 7.2 16 16 16h304c8.8 0 16-7.2 16-16V160c0-8.8-7.2-16-16-16zm-52 268H612V212h200v200zM464 544H160c-8.8 0-16 7.2-16 16v304c0 8.8 7.2 16 16 16h304c8.8 0 16-7.2 16-16V560c0-8.8-7.2-16-16-16zm-52 268H212V612h200v200zm452-268H560c-8.8 0-16 7.2-16 16v304c0 8.8 7.2 16 16 16h304c8.8 0 16-7.2 16-16V560c0-8.8-7.2-16-16-16zm-52 268H612V612h200v200z"></path>\n</svg>',
    pid: 0,
    sort: 0,
    type: 'PAGE',
    path: '/base',
    cdate: 0,
    children: [
      {
        display: true,
        icon: '<svg viewBox="0 0 24 24" width="24px" height="24px" fill="currentColor">\n  <path d="M17.27,6.73l-4.24,10.13l-1.32-3.42l-0.32-0.83l-0.82-0.32l-3.43-1.33L17.27,6.73 M21,3L3,10.53v0.98l6.84,2.65L12.48,21h0.98L21,3L21,3z"></path>\n</svg>',
        pid: 1,
        sort: 0,
        type: 'PAGE',
        path: '/base/app',
        cdate: 0,
        children: [],
        appId: 1,
        resourceCount: 0,
        name: '应用管理',
        id: 2,
        udate: 0,
      },
      {
        display: true,
        icon: '<svg viewBox="0 0 24 24" width="24px" height="24px" fill="currentColor">\n  <path d="M17.63,5.84C17.27,5.33,16.67,5,16,5L5,5.01C3.9,5.01,3,5.9,3,7v10c0,1.1,0.9,1.99,2,1.99L16,19c0.67,0,1.27-0.33,1.63-0.84L22,12L17.63,5.84z M16,17H5V7h11l3.55,5L16,17z"/>\n</svg>',
        pid: 1,
        sort: 0,
        type: 'PAGE',
        path: '/base/app-service',
        cdate: 0,
        children: [],
        appId: 1,
        resourceCount: 0,
        name: '应用服务',
        id: 3,
        udate: 1547022480,
      }
    ],
    appId: 1,
    resourceCount: 0,
    name: '基础服务',
    id: 1,
    udate: 0,
  },
];

class BaseApi extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tabValue: 0,
    };
  }

  handleTabChange = (event, value) => {
    this.setState({ tabValue: value });
  };

  render() {
    const { classes } = this.props;
    const { tabValue } = this.state;

    return (
      <div className={classes.root}>
        <AppBar position="static" color="default">
          <Tabs
            value={tabValue}
            onChange={this.handleTabChange}
            indicatorColor="primary"
            textColor="primary"
            scrollButtons="auto"
          >
            <Tab label="接口" />
            <Tab label="设置" />
            <Tab label="成员" />
          </Tabs>
        </AppBar>
        <div className={classes.content}>
          <Sidebar items={items} />
          <div className={classes.mainContent}>
            {tabValue === 0 &&<Interface />}
            {tabValue === 1 &&<Setting />}
            {tabValue === 2 &&<Member />}
          </div>
        </div>
      </div>
    );
  }
}

export default connect(state => ({
  data: state[namespace],
}))(withStyles(styles)(BaseApi));
