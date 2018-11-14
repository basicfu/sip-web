import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'dva';
import Input from 'components/Input';
import { FieldType, SelectDefault } from 'enum';
import Tab from '../../node_modules/@material-ui/core/Tab/Tab';
import Tabs from '../../node_modules/@material-ui/core/Tabs/Tabs';
import AppBar from '../../node_modules/@material-ui/core/AppBar/AppBar';
import Divider from '../../node_modules/@material-ui/core/Divider/Divider';
import Grid from '../../node_modules/@material-ui/core/Grid/Grid';
import createMuiTheme from '../../node_modules/@material-ui/core/styles/createMuiTheme';
import MuiThemeProvider from '../../node_modules/@material-ui/core/styles/MuiThemeProvider';
import Toolbar from '@material-ui/core/Toolbar';
import CustomSearch from 'components/CustomSearch';
import CustomTable from 'components/CustomTable';
import { formatDict, formatFlag } from 'utils';
import InputNumber from 'components/InputNumber';
import Select from 'components/Select';
import ReactSelect from 'components/ReactSelect';
import Switch from 'components/Switch';
import TableHead from '../../node_modules/@material-ui/core/TableHead/TableHead';
import TableRow from '../../node_modules/@material-ui/core/TableRow/TableRow';
import TableBody from '../../node_modules/@material-ui/core/TableBody/TableBody';
import Table from '../../node_modules/@material-ui/core/Table/Table';
import CustomTableCell from 'components/CustomTableCell';
import Paper from '@material-ui/core/Paper';
import SpeedDial from '../../node_modules/@material-ui/lab/SpeedDial/SpeedDial';
import SpeedDialIcon from '../../node_modules/@material-ui/lab/SpeedDialIcon/SpeedDialIcon';
import EditOutlinedIcon from '../../node_modules/@material-ui/icons/EditOutlined';
import Component from 'components/Component';
import request from 'utils/request';
import { suggest } from 'api';
import notify from 'utils/notify';
import dialog from 'utils/dialog';

const namespace = 'permissionRole';
const userNamespace = 'baseUser';
const menuNamespace = 'permissionMenu';
const permissionNamespace = 'permissionPermission';
const resourceNamespace = 'permissionResource';

const styles = theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
});
class Role extends Component {
  state = {
    value: 0,
  };

  componentDidMount() {
    this.handleSearch();
  }

  componentWillReceiveProps(nextProps, _) {
    const { selected } = nextProps.data.table;
    const { list } = nextProps.userData.data;
    if (selected && selected.length !== 1 && list.length !== 0) {
      this.dispatch({ type: `${userNamespace}/updateState`, payload: { data: { list: [], page: {} } } });
    }
  }

  handleSearch = (value) => {
    this.dispatch({ type: `${namespace}/list`, payload: { q: value } });
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };

  handleUser=(roleCode) => {
    this.props.dispatch({ type: `${userNamespace}/list`, payload: { condition: JSON.stringify({ roleCode: { condition: 'EQUAL_TO', value: roleCode } }) } });
  };

  handleDeleteUser=(selected) => {
    const { dispatch,data } = this.props;
    const selectedRole = data.table.selected || [];
    const item = data.table.item || {};
    dialog.confirm({ title: '确定解除角色-用户关系吗？', onOk() { dispatch({ type: `${namespace}/deleteUser`, payload: { id: selectedRole[0], userIds: selected, roleCode: item.code } }); } });
  };

  renderColumns=(text, column, addOrEdit, item, onChange) => {
    const { id, type, extra } = column;
    switch (type) {
      case FieldType.TEXT:
        if (addOrEdit) {
          return <Input key={id} defaultValue={text} onChange={e => onChange(id, e.target.value)} column={column} />;
        }
        return text;
      case FieldType.SWITCH:
        if (addOrEdit) {
          return <Switch key={id} checked={text} onChange={checked => onChange(id, checked)} column={column} />;
        }
        return formatFlag(text);
      default:
        break;
    }
  };

  // renderUserTable() {
  //   const { classes,userData } = this.props;
  //   console.log(userData.data.list);
  //   return (
  //     <Paper className={classes.root}>
  //       <Toolbar>
  //         <CustomSearch placeholder="查询并添加用户" onSearch={(value) => this.handleSearch(value)} />
  //         <div className={classes.spacer} />
  //       </Toolbar>
  //     <Table>
  //     <TableHead>
  //       <TableRow>
  //         <CustomTableCell width="25%">check</CustomTableCell>
  //         <CustomTableCell width="25%">用户名</CustomTableCell>
  //         <CustomTableCell width="10%">昵称</CustomTableCell>
  //         <CustomTableCell width="10%">手机号</CustomTableCell>
  //         <CustomTableCell width="12%">邮箱</CustomTableCell>
  //       </TableRow>
  //     </TableHead>
  //     <TableBody>
  //       {userData.data.list.map((item, index) =>
  //         <TableRow key={index}>
  //           <CustomTableCell>check</CustomTableCell>
  //           <CustomTableCell>{item.username}</CustomTableCell>
  //           <CustomTableCell>{item.nickname}</CustomTableCell>
  //           <CustomTableCell>{item.mobile}</CustomTableCell>
  //           <CustomTableCell>{item.email}</CustomTableCell>
  //         </TableRow>,
  //       )}
  //     </TableBody>
  //     </Table>
  //     </Paper>
  //       );
  // }

  render() {
    const { data, userData, menuData, permissionData, resourceData } = this.props;
    const { value } = this.state;
    const loadOptions = (inputValue, callback) => {
      if (inputValue) {
        const promise = suggest({ q: 'b' });
        promise.then(response => {
          callback(response.data.map(it => ({ label: `${it.username}(${it.nickname})`, value: it.id })));
        });
      } else {
        callback([]);
      }
    };
    const onChange = value => {
      const selected = data.table.selected || [];
      const item = data.table.item || {};
      if (selected.length !== 1) {
        notify.warning('请选择一个角色后再继续操作');
        return;
      }
      this.dispatch({ type: `${namespace}/insertUser`, payload: { id: selected[0], userIds: [value], roleCode: item.code } });
    };
    const tableProps = {
      data,
      onClick: (record) => {
        this.handleUser(record.code);
      },
      deleteContent: '删除后将自动解除角色-用户、角色-菜单、角色-权限关系',
      headerChild: { left: <CustomSearch placeholder="应用名或code" onSearch={(v) => this.handleSearch(v)} /> },
      columns: [
        { id: 'name', label: '角色名', type: FieldType.TEXT, required: true, render: this.renderColumns },
        { id: 'code', label: 'CODE', type: FieldType.TEXT, required: true, render: this.renderColumns },
        { id: 'enable', label: '启用', type: FieldType.SWITCH, required: true, addDefaultValue: true, render: this.renderColumns },
      ],
    };
    const userTableProps = {
      data: userData,
      mode: 'false',
      onDelete: (selected) => {
        this.handleDeleteUser(selected);
      },
      headerChild: { left: <div style={{ width: 300 }}><ReactSelect defaultValue={[]} async loadOptions={loadOptions} onChange={onChange} /></div> },
      columns: [
        { id: 'username', label: '用户名', type: FieldType.TEXT, required: true, render: this.renderColumns },
        { id: 'nickname', label: '昵称', type: FieldType.TEXT, required: true, render: this.renderColumns },
        { id: 'mobile', label: '手机号', type: FieldType.TEXT, required: true, render: this.renderColumns },
        { id: 'email', label: '邮箱', type: FieldType.TEXT, required: true, render: this.renderColumns },
      ],
    };
    const menuTableProps = {
      data: menuData,
      // tableName: 'menuTable',
      headerChild: <CustomSearch placeholder="菜单名" onSearch={(v) => this.handleSearch(v)} />,
      showFooter: false,
      columns: [
        { id: 'username', label: '菜单名', type: FieldType.TEXT, required: true, render: this.renderColumns },
        { id: 'mobile', label: '路径', type: FieldType.TEXT, required: true, render: this.renderColumns },
        { id: 'email', label: '排序', type: FieldType.TEXT, required: true, render: formatFlag },
        { id: 'email', label: 'icon', type: FieldType.TEXT, required: true, render: formatFlag },
        { id: 'email', label: '类型', type: FieldType.TEXT, required: true, render: formatFlag },
        { id: 'email', label: '是否显示', type: FieldType.TEXT, required: true, render: formatFlag },
      ],
    };
    const resourceTableProps = {
      data: resourceData,
      // tableName: 'resourceTable',
      headerChild: <CustomSearch placeholder="URL" onSearch={(v) => this.handleSearch(v)} />,
      showFooter: false,
      columns: [
        { id: 'url', label: 'URL', type: FieldType.TEXT, required: true, render: this.renderColumns },
        { id: 'method', label: '方法', type: FieldType.TEXT, required: true, render: this.renderColumns },
      ],
    };
    const permissionTableProps = {
      data: permissionData,
      // tableName: 'permissionTable',
      headerChild: <CustomSearch placeholder="权限名" onSearch={(v) => this.handleSearch(v)} />,
      showFooter: false,
      columns: [
        { id: 'name', label: '权限名', type: FieldType.TEXT, required: true, render: this.renderColumns },
        { id: 'code', label: '权限Code', type: FieldType.TEXT, required: true, render: this.renderColumns },
      ],
    };
    return (
        <Grid container>
          <Grid item xs={5}>
            <CustomTable key={1} {...tableProps} />
          </Grid>
          <Divider />
          <Grid item xs={7}>
            <AppBar position="static">
              <Tabs value={value} onChange={this.handleChange}>
                <Tab label="用户" />
                <Tab label="菜单" />
                <Tab label="权限" />
              </Tabs>
            </AppBar>
            {value === 0 && <CustomTable {...userTableProps} />}
             {value === 1 &&
             <CustomTable {...menuTableProps} />
             }
             {value === 2 &&
             <CustomTable {...permissionTableProps} />
             }
          </Grid>
        </Grid>

    );
  }
}
export default connect(state => ({
  data: state[namespace],
  userData: state[userNamespace],
  menuData: state[menuNamespace],
  permissionData: state[permissionNamespace],
  resourceData: state[resourceNamespace],
}))(withStyles(styles)(Role));
