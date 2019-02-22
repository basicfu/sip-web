import React from 'react';
import {withStyles} from '@material-ui/core/styles';
import {connect} from 'dva';
// import CustomTable from 'components/CustomTable';
import styles from 'styles/aapi';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Sidebar from 'components/api/Sidebar';
import Member from 'components/api/Member';
import Setting from 'components/api/Setting';
import Interface from 'components/api/Interface';

const namespace = 'aapiAapi';

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
      },
      {
        display: true,
        icon: '<svg viewBox="0 0 24 24" width="24px" height="24px" fill="currentColor">\n  <path d="M20,4v12H8V4H20 M20,2H8C6.9,2,6,2.9,6,4v12c0,1.1,0.9,2,2,2h12c1.1,0,2-0.9,2-2V4C22,2.9,21.1,2,20,2L20,2z"/>\n\t\t<polygon points="11.5,11.67 13.19,13.93 15.67,10.83 19,15 9,15 \t\t"/>\n\t\t<path d="M2,6v14c0,1.1,0.9,2,2,2h14v-2H4V6H2z"/>\n</svg>',
        pid: 1,
        sort: 0,
        type: 'PAGE',
        path: '/base/app-secret',
        cdate: 0,
        children: [],
        appId: 1,
        resourceCount: 0,
        name: 'Secrets',
        id: 4,
        udate: 0,
      },
      {
        display: true,
        icon: '<svg viewBox="0 0 24 24" width="24px" height="24px" fill="currentColor">\n  <path d="M19,2H5C3.9,2,3,2.9,3,4v14c0,1.1,0.9,2,2,2h4l3,3l3-3h4c1.1,0,2-0.9,2-2V4C21,2.9,20.1,2,19,2z M19,18h-4h-0.83l-0.59,0.59L12,20.17l-1.59-1.59L9.83,18H9H5V4h14V18z"/>\n  <polygon points="12,17 13.88,12.88 18,11 13.88,9.12 12,5 10.12,9.12 6,11 10.12,12.88"/>\n</svg>',
        pid: 1,
        sort: 0,
        type: 'PAGE',
        path: '/base/user-template',
        cdate: 0,
        children: [],
        appId: 1,
        resourceCount: 0,
        name: '用户模板',
        id: 5,
        udate: 0,
      },
      {
        display: true,
        icon: '<svg viewBox="0 0 1024 1024" width="24px" height="24px" fill="currentColor">\n  <path d="M858.5 763.6a374 374 0 0 0-80.6-119.5 375.63 375.63 0 0 0-119.5-80.6c-.4-.2-.8-.3-1.2-.5C719.5 518 760 444.7 760 362c0-137-111-248-248-248S264 225 264 362c0 82.7 40.5 156 102.8 201.1-.4.2-.8.3-1.2.5-44.8 18.9-85 46-119.5 80.6a375.63 375.63 0 0 0-80.6 119.5A371.7 371.7 0 0 0 136 901.8a8 8 0 0 0 8 8.2h60c4.4 0 7.9-3.5 8-7.8 2-77.2 33-149.5 87.8-204.3 56.7-56.7 132-87.9 212.2-87.9s155.5 31.2 212.2 87.9C779 752.7 810 825 812 902.2c.1 4.4 3.6 7.8 8 7.8h60a8 8 0 0 0 8-8.2c-1-47.8-10.9-94.3-29.5-138.2zM512 534c-45.9 0-89.1-17.9-121.6-50.4S340 407.9 340 362c0-45.9 17.9-89.1 50.4-121.6S466.1 190 512 190s89.1 17.9 121.6 50.4S684 316.1 684 362c0 45.9-17.9 89.1-50.4 121.6S557.9 534 512 534z"></path>\n</svg>',
        pid: 1,
        sort: 0,
        type: 'PAGE',
        path: '/base/user',
        cdate: 0,
        children: [],
        appId: 1,
        resourceCount: 0,
        name: '用户管理',
        id: 6,
        udate: 0,
      },
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
      inputValue: '/get/{id}/aa/{nbc}?app=sip&call=get&secret=wutong',
    };
  }

  /**
   * 参数json处理
   */
  getParams = url => {
    const querys = url.split('?')[1];
    const arr = querys ? querys.split('&') : [];
    const params = [];
    for (let i = 0; i < arr.length; i += 1) {
      const curItem = arr[i];
      const item = curItem.split('=');
      params.push({ key: item[0], value: item[1], description: '', id: i, isChecked: true });
    }
    return params;
  };

  /**
   * 嵌入式参数处理
   * @param url
   * @returns {Array}
   */
  getInlineParams = url => {
    const querys = url.split('?')[0];
    const arr = querys.match(/\{.*?\}/g);
    const params = [];
    for (let i = 0; i < arr.length; i += 1) {
      const curItem = arr[i].replace(/\{/g, '').replace(/\}/g, '');
      params.push({ key: curItem, value: '', description: '', id: i });
    }
    return params;
  };


  handleTabChange = (event, value) => {
    this.setState({ tabValue: value });
  };

  handleRadioChange = (flag, value) => {
    this.setState({
      [flag]: value,
    });
  };

  render() {
    const { classes } = this.props;
    const { tabValue } = this.state;

    return (
      <div className={classes.root}>
        <AppBar position="static" color="default">
          <Tabs
            value={tabValue}
            // onChange={this.handleTabChange}
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

//
//
// /**
//  * 表格中删除 某一个参数
//  */
// handleDeleteParam = id => {
//   const { queryParams, inputValue } = this.state;
//   const filterData = queryParams.filter(item => item.id !== id);
//   const tar = queryParams.filter(item => item.id === id)[0];
//   const curArr = inputValue.split('?');
//   const arr = curArr[1] ? curArr[1].split('&') : [];
//   const params = [];
//   for (let i = 0; i < arr.length; i += 1) {
//     const curItem = arr[i];
//     const item = curItem.split('=');
//     if (tar.key !== item[0]) {
//       params.push(curItem);
//     }
//   }
//   const newValue = `${curArr[0]}?${params.join('&')}`;
//   this.setState({ queryParams: filterData, inputValue: newValue });
// };
//
// /**
//  * 行内参数的删除
//  */
// handleDeleteInlineParam = id => {
//   const { inlineParams, inputValue } = this.state;
//   const filterData = inlineParams.filter(item => item.id !== id);
//   const tar = inlineParams.filter(item => item.id === id)[0];
//   const curArr = inputValue.replace(`/{${tar.key}}`, '');
//   this.setState({
//     inlineParams: filterData,
//     inputValue: curArr,
//   });
// };
//
// /**
//  * checkBox change事件
//  */
// handleRowSelectChange = (id, event, checked) => {
//   const { queryParams, inputValue } = this.state;
//   const tar = queryParams.filter(item => item.id === id)[0];
//   if (tar && checked) {
//     tar.isChecked = checked;
//   } else {
//     delete tar.isChecked;
//   }
//   const curArr = inputValue.split('?');
//   const params = [];
//   for (let i = 0; i < queryParams.length; i += 1) {
//     const curItem = queryParams[i];
//     if (curItem.isChecked) {
//       params.push(`${curItem.key}=${curItem.value}`);
//     }
//   }
//   const newValue = `${curArr[0]}?${params.join('&')}`;
//   this.setState({
//     queryParams,
//     inputValue: newValue,
//   });
// };
//
// handleEditableChange = (id, key, event, flag) => {
//   const { value } = event.target;
//   const { inlineParams, queryParams, inputValue } = this.state;
//   const curData = flag === 'inlineParams' ? inlineParams : queryParams;
//   const tar = curData.filter(item => item.id === id)[0];
//   tar[key] = value;
//   if (flag === 'queryParams') {
//     let newValue = inputValue;
//     if (key !== 'description') {
//       const curArr = inputValue.split('?');
//       const params = [];
//       for (let i = 0; i < queryParams.length; i += 1) {
//         const curItem = queryParams[i];
//         params.push(`${curItem.key}=${curItem.value}`);
//       }
//       newValue = `${curArr[0]}?${params.join('&')}`;
//     }
//     this.setState({
//       queryParams: curData,
//       inputValue: newValue,
//     });
//   } else {
//     this.setState({
//       inlineParams: curData,
//     });
//   }
// };
//
// handleBulkEdit = (flag, isEdit) => {
//   const { queryParams, inputValue, queryParamsBulk, headerParams, headerParamsBulk } = this.state;
//   let newQueryParamsBulk = queryParamsBulk;
//   const temArr = [];
//   let newInputValue = inputValue;
//   if (flag === 'isQueryEdit') {
//     if (isEdit) {
//       const params = [];
//       for (let i = 0; i < queryParams.length; i += 1) {
//         const curItem = queryParams[i];
//         params.push(`${curItem.key}:${curItem.value}`);
//       }
//       newQueryParamsBulk = `${params.join('\r\n')}`;
//       this.setState({
//         [flag]: isEdit,
//         queryParamsBulk: newQueryParamsBulk,
//       });
//     } else {
//       const bulkParams = queryParamsBulk.replace(/\r\n/g, ',').replace(/\r/g, ',').replace(/\n/g, ',').split(',');
//       const temParams = [];
//       for (let i = 0; i < bulkParams.length; i += 1) {
//         const curItemArr = bulkParams[i].split(':');
//         temParams.push(curItemArr.join('='));
//         temArr.push({ key: curItemArr[0], value: curItemArr[1], description: '', id: i, isChecked: true });
//       }
//       newInputValue = `${newInputValue.split('?')[0]}?${temParams.join('&')}`;
//       this.setState({
//         [flag]: isEdit,
//         queryParams: temArr,
//         inputValue: newInputValue,
//       });
//     }
//   } else if (flag === 'isHeadParamEdit') {
//     if (isEdit) {
//       const params = [];
//       for (let i = 0; i < headerParams.length; i += 1) {
//         const curItem = headerParams[i];
//         params.push(`${curItem.key}:${curItem.value}`);
//       }
//       const newHeaderParamsBulk = `${params.join('\r\n')}`;
//       this.setState({
//         [flag]: isEdit,
//         headerParamsBulk: newHeaderParamsBulk,
//       });
//     } else {
//       const bulkParams = headerParamsBulk.replace(/\r\n/g, ',').replace(/\r/g, ',').replace(/\n/g, ',').split(',');
//       // const temParams = [];
//       for (let i = 0; i < bulkParams.length; i += 1) {
//         const curItemArr = bulkParams[i].split(':');
//         // temParams.push(curItemArr.join('='));
//         temArr.push({ key: curItemArr[0], value: curItemArr[1], description: '', id: i, isChecked: true });
//       }
//       // newInputValue = `${newInputValue.split('?')[0]}?${temParams.join('&')}`;
//       this.setState({
//         [flag]: isEdit,
//         headerParams: temArr,
//       });
//     }
//   } else if (flag === 'isBodyParamEdit') {
//
//   }
// };
