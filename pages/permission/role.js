import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'dva';
import Input from 'components/Input';
import { FieldType } from 'enum';
import Tab from '@material-ui/core/Tab/Tab';
import Tabs from '@material-ui/core/Tabs/Tabs';
import AppBar from '@material-ui/core/AppBar/AppBar';
import Divider from '@material-ui/core/Divider/Divider';
import Grid from '@material-ui/core/Grid/Grid';
import createMuiTheme from '@material-ui/core/styles/createMuiTheme';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import Toolbar from '@material-ui/core/Toolbar';
import CustomSearch from 'components/CustomSearch';
import CustomTable from 'components/CustomTable';
import { formatFlag, getAllIdByTreeData, getCountByTreeData } from 'utils';
import ReactSelect from 'components/ReactSelect';
import Switch from 'components/Switch';
import TableHead from '@material-ui/core/TableHead/TableHead';
import TableRow from '@material-ui/core/TableRow/TableRow';
import TableBody from '@material-ui/core/TableBody/TableBody';
import Table from '@material-ui/core/Table/Table';
import CustomTableCell from 'components/CustomTableCell';
import Paper from '@material-ui/core/Paper';
import Component from 'components/Component';
import { suggestUser } from 'api';
import notify from 'utils/notify';
import dialog from 'utils/dialog';
import CollapseCheckBox from 'components/CollapseCheckBox';
import Checkbox from '@material-ui/core/Checkbox';

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
const theme = createMuiTheme({
  typography: {
    useNextVariants: true,
  },
});

function setItemFlag(list, id, flag) {
  for (let i = 0; i < list.length; i += 1) {
    const item = list[i];
    if (item.id === id) {
      item.open = flag;
      return;
    }
    if (item.children && item.children.length > 0) {
      setItemFlag(item.children, id, flag);
    }
  }
}

class Role extends Component {
  state = {
    tab: 0,
    menuList: [],
    permissionList: [],
  };

  componentDidMount() {
    this.handleRoleSearch();
  }

  componentWillReceiveProps(nextProps, _) {
    const { roleUser, roleMenu, rolePermission, table: { selected } } = nextProps.data;
    // 取消选中时清空用户、菜单、权限
    if (selected && selected.length !== 1) {
      if (roleUser.list.length !== 0) {
        this.dispatch({ type: `${namespace}/updateState`, payload: { roleUser: { list: [], page: {} } } });
      }
      if (roleMenu.length !== 0) {
        this.dispatch({ type: `${namespace}/updateState`, payload: { roleMenu: [] } });
      }
      if (rolePermission.length !== 0) {
        this.dispatch({ type: `${namespace}/updateState`, payload: { rolePermission: [] } });
      }
    }
    if (this.props.menuData.rid !== nextProps.menuData.rid) {
      this.setState({ menuList: JSON.parse(JSON.stringify(nextProps.menuData.all)) });
    }
    if (this.props.permissionData.rid !== nextProps.permissionData.rid) {
      this.setState({ permissionList: JSON.parse(JSON.stringify(nextProps.permissionData.all)) });
    }
  }

  componentWillUnmount() {
    this.resetState(namespace);
    this.resetState(userNamespace);
    this.resetState(menuNamespace);
    this.resetState(permissionNamespace);
  }

  handleRoleSearch = (value) => {
    this.dispatch({ type: `${namespace}/list`, payload: { q: value } });
  };

  handleMenuSearch = () => {
    this.dispatch({ type: `${menuNamespace}/all`, payload: { q: '' } });
  };

  handlePermissionSearch = () => {
    this.dispatch({ type: `${permissionNamespace}/all`, payload: { q: '' } });
  };

  handleTabChange = (event, value) => {
    const { table: { selected } } = this.props.data;
    this.setState({ tab: value });
    if (selected && selected.length === 1) {
      this.handleRoleClick(selected[0], value);
    } else if (value === 1) {
        this.handleMenuSearch();
    } else if (value === 2) {
        this.handlePermissionSearch();
    }
  };

  handleRoleClick = (id, tab) => {
    if (tab === 0) {
      this.dispatch({ type: `${namespace}/listUser`, payload: { id } });
    } else if (tab === 1) {
      this.handleMenuSearch();
      this.dispatch({ type: `${namespace}/listMenu`, payload: { id } });
    } else if (tab === 2) {
      this.handlePermissionSearch();
      this.dispatch({ type: `${namespace}/listPermission`, payload: { id } });
    }
  };

  handleAllCollapse = (e) => {
    const menuList = this.state.menuList;
    if (e.target.checked) {
      menuList.forEach(item => {
        item.open = true;
      });
      this.setState({ menuList });
    } else {
      menuList.forEach(item => {
        item.open = false;
      });
      this.setState({ menuList });
    }
  };

  handleOneCollapse = id => e => {
    const menuList = this.state.menuList;
    if (e.target.checked) {
      setItemFlag(menuList, id, true);
      this.setState({ menuList });
    } else {
      setItemFlag(menuList, id, false);
      this.setState({ menuList });
    }
  };

  handleCheckboxAll = checked => {
    const { tab, menuList, permissionList } = this.state;
    const selected = this.props.data.table.selected || [];
    if (selected.length !== 1) {
      notify.warning('请选择一个角色后再继续操作');
      return;
    }
    if (tab === 1) {
      const menuIds = getAllIdByTreeData(menuList);
      let type = '';
      if (checked) {
        type = 'insertMenu';
      } else {
        type = 'deleteMenu';
      }
      this.dispatch({ type: `${namespace}/${type}`, payload: { id: selected[0], menuIds } });
    } else if (tab === 2) {
      const permissionIds = permissionList.map(it => it.id);
      let type = '';
      if (checked) {
        type = 'insertPermission';
      } else {
        type = 'deletePermission';
      }
      this.dispatch({ type: `${namespace}/${type}`, payload: { id: selected[0], permissionIds } });
    }
  };

  handleItem = (id, checked) => {
    const { data, userData, dispatch } = this.props;
    const { tab } = this.state;
    const selected = data.table.selected || [];
    if (selected.length !== 1) {
      notify.warning('请选择一个角色后再继续操作');
      return;
    }
    if (tab === 0) {
      const selectedRole = data.table.selected || [];
      const userIds = userData.table.selected || [];
      dialog.confirm({ title: '确定解除角色-用户关系吗？', onOk() { dispatch({ type: `${namespace}/deleteUser`, payload: { id: selectedRole[0], userIds } }); } });
    }
    if (tab === 1) {
      if (checked) {
        this.dispatch({ type: `${namespace}/insertMenu`, payload: { id: selected[0], menuIds: [id] } });
      } else {
        this.dispatch({ type: `${namespace}/deleteMenu`, payload: { id: selected[0], menuIds: [id] } });
      }
    } else if (tab === 2) {
      if (checked) {
        this.dispatch({ type: `${namespace}/insertPermission`, payload: { id: selected[0], permissionIds: [id] } });
      } else {
        this.dispatch({ type: `${namespace}/deletePermission`, payload: { id: selected[0], permissionIds: [id] } });
      }
    }
  };

  handleSuggestLoadOptions = (inputValue, callback) => {
    if (inputValue) {
      const promise = suggestUser({ q: inputValue });
      promise.then(response => {
        callback(response.data.map(it => ({ label: `${it.username}(${it.nickname})`, value: it.id })));
      });
    } else {
      callback([]);
    }
  };

  handleSuggestOnChange = value => {
    const { table } = this.props.data;
    const selected = table.selected || [];
    if (selected.length !== 1) {
      notify.warning('请选择一个角色后再继续操作');
      return;
    }
    this.dispatch({ type: `${namespace}/insertUser`, payload: { id: selected[0], userIds: [value] } });
  };

  renderColumns = (text, column, addOrEdit, item, onChange) => {
    const { id, type } = column;
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

  renderMenuRow = (items, level = 0) => {
    const { roleMenu } = this.props.data;
    const rowItem = [];
    items.forEach(row => {
      const haveChildren = row.children && row.children.length > 0;
      rowItem.push(<TableRow key={row.id}>
        <CustomTableCell style={{ paddingLeft: (haveChildren ? 0 : 48) + 2 + 26 * level }}>
          {haveChildren && <CollapseCheckBox
            checked={row.open === undefined ? true : row.open}
            onChange={this.handleOneCollapse(row.id)} />}
          <Checkbox
            style={{ padding: '10px 12px 14px 0px' }}
            checked={roleMenu.indexOf(row.id) !== -1}
            onChange={e => this.handleItem(row.id, e.target.checked)} />
          {row.name}
        </CustomTableCell>
        <CustomTableCell>{row.path}</CustomTableCell>
        <CustomTableCell>{row.type}</CustomTableCell>
        <CustomTableCell>{formatFlag(row.display)}</CustomTableCell>
                   </TableRow>);
      if (haveChildren && row.open !== false) {
        const children = this.renderMenuRow(row.children, level + 1);
        rowItem.push([...children]);
      }
    });
    return rowItem;
  };

  render() {
    const { data, userData, permissionData } = this.props;
    const { roleUser, roleMenu, rolePermission } = data;
    const { tab, menuList, permissionList } = this.state;
    const roleMenuListCount = getCountByTreeData(menuList);
    const tableProps = {
      data,
      onClick: (record) => this.handleRoleClick(record.id, tab),
      deleteContent: '删除后将自动解除角色-用户、角色-菜单、角色-权限关系',
      headerChild: { left: <CustomSearch placeholder="应用名或code" onSearch={(v) => this.handleRoleSearch(v)} /> },
      columns: [
        { id: 'name', label: '角色名', type: FieldType.TEXT, required: true, render: this.renderColumns },
        { id: 'code', label: 'CODE', type: FieldType.TEXT, required: true, render: this.renderColumns },
        {
          id: 'enable',
          label: '启用',
          type: FieldType.SWITCH,
          required: true,
          addDefaultValue: true,
          render: this.renderColumns,
        },
      ],
    };
    const userTableProps = {
      data: { ...userData, data: roleUser },
      mode: 'false',
      onDelete: () => { this.handleItem(null, null); },
      headerChild: {
        left: (
          <div style={{ width: 300 }}>
            <ReactSelect
              defaultValue={[]}
              async
              loadOptions={this.handleSuggestLoadOptions}
              onChange={this.handleSuggestOnChange} />
          </div>),
      },
      columns: [
        { id: 'username', label: '用户名', type: FieldType.TEXT, required: true, render: this.renderColumns },
        { id: 'nickname', label: '昵称', type: FieldType.TEXT, required: true, render: this.renderColumns },
        { id: 'mobile', label: '手机号', type: FieldType.TEXT, required: true, render: this.renderColumns },
        { id: 'email', label: '邮箱', type: FieldType.TEXT, required: true, render: this.renderColumns },
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
            <Tabs value={tab} onChange={this.handleTabChange} style={{ backgroundColor: '#ef6c00' }}>
              <Tab label="用户" />
              <Tab label="菜单" />
              <Tab label="权限" />
            </Tabs>
          </AppBar>
          {tab === 0 && <CustomTable {...userTableProps} />}
          {tab === 1 &&
          <MuiThemeProvider theme={theme}>
            <Paper>
              <Toolbar>
                <CustomSearch placeholder="菜单名或路径" />
              </Toolbar>
              <Table>
                <TableHead>
                  <TableRow>
                    <CustomTableCell width="35%">
                      <CollapseCheckBox
                        checked={menuList.filter(it => it.children && it.children.length > 0).filter(it => it.open !== false).length !== 0}
                        onChange={this.handleAllCollapse} />
                      <Checkbox
                        style={{ padding: '10px 12px 14px 0px', marginLeft: -2 }}
                        indeterminate={roleMenu.length > 0 && roleMenu.length < roleMenuListCount}
                        checked={roleMenu.length === roleMenuListCount && roleMenuListCount !== 0}
                        onChange={e => this.handleCheckboxAll(e.target.checked)}
                      />
                      菜单名
                    </CustomTableCell>
                    <CustomTableCell width="35%">路径</CustomTableCell>
                    <CustomTableCell width="15%">类型</CustomTableCell>
                    <CustomTableCell width="15%">是否显示</CustomTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {this.renderMenuRow(menuList)}
                </TableBody>
              </Table>
            </Paper>
          </MuiThemeProvider>
          }
          {tab === 2 &&
          <MuiThemeProvider theme={theme}>
            <Paper>
              <Toolbar>
                <CustomSearch placeholder="权限名或CODE" />
              </Toolbar>
              <Table>
                <TableHead>
                  <TableRow>
                    <CustomTableCell style={{ textAlign: 'left', width: 56 }}>
                      <Checkbox
                        indeterminate={rolePermission.length > 0 && rolePermission.length < permissionList.length}
                        checked={rolePermission.length === permissionList.length && permissionList.length !== 0}
                        onChange={e => this.handleCheckboxAll(e.target.checked)}
                      />
                    </CustomTableCell>
                    <CustomTableCell>权限名</CustomTableCell>
                    <CustomTableCell>CODE</CustomTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {permissionData.all.map(row => {
                    return (<TableRow key={row.id}>
                      <CustomTableCell><Checkbox
                        checked={rolePermission.indexOf(row.id) !== -1}
                        onChange={e => this.handleItem(row.id, e.target.checked)} />
                      </CustomTableCell>
                      <CustomTableCell>{row.name}</CustomTableCell>
                      <CustomTableCell>{row.code}</CustomTableCell>
                            </TableRow>);
                  })}
                </TableBody>
              </Table>
            </Paper>
          </MuiThemeProvider>
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
