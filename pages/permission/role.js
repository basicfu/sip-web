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
import Switch from "components/Switch";

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
class Role extends React.Component {
  state = {
    value: 0,
  };

  componentDidMount() {
    this.handleSearch();
  }

  handleSearch = (value) => {
    this.props.dispatch({ type: `${namespace}/list`, payload: { q: value } });
    this.props.dispatch({ type: `${userNamespace}/list`, payload: { q: value } });
  };

  handleChange = (event, value) => {
    this.setState({ value });
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

  render() {
    const { data, userData, menuData, permissionData, resourceData } = this.props;
    const { value } = this.state;
    const tableProps = {
      data,
      headerChild: <CustomSearch placeholder="应用名或code" onSearch={(v) => this.handleSearch(v)} />,
      showFooter: false,
      columns: [
        { id: 'name', label: '角色名', type: FieldType.TEXT, required: true, render: this.renderColumns },
        { id: 'code', label: 'CODE', type: FieldType.TEXT, required: true, render: this.renderColumns },
        { id: 'enalbe', label: '启用', type: FieldType.SWITCH, required: true, render: this.renderColumns },
      ],
    };
    const userTableProps = {
      userData,
      tableName: 'userTable',
      headerChild: <CustomSearch placeholder="用户名、手机号或邮箱" onSearch={(v) => this.handleSearch(v)} />,
      showFooter: false,
      columns: [
        { id: 'username', label: '用户名', type: FieldType.TEXT, required: true, render: this.renderColumns },
        { id: 'mobile', label: '手机号', type: FieldType.TEXT, required: true, render: this.renderColumns },
        { id: 'email', label: '邮箱', type: FieldType.TEXT, required: true, render: formatFlag },
      ],
    };
    const menuTableProps = {
      data,
      tableName: 'menuTable',
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
      data,
      tableName: 'resourceTable',
      headerChild: <CustomSearch placeholder="URL" onSearch={(v) => this.handleSearch(v)} />,
      showFooter: false,
      columns: [
        { id: 'username', label: 'URL', type: FieldType.TEXT, required: true, render: this.renderColumns },
        { id: 'mobile', label: '方法', type: FieldType.TEXT, required: true, render: this.renderColumns },
        { id: 'email', label: '名称', type: FieldType.TEXT, required: true, render: formatFlag },
      ],
    };
    const permissionTableProps = {
      data,
      tableName: 'permissionTable',
      headerChild: <CustomSearch placeholder="权限名" onSearch={(v) => this.handleSearch(v)} />,
      showFooter: false,
      columns: [
        { id: 'username', label: '权限名', type: FieldType.TEXT, required: true, render: this.renderColumns },
        { id: 'mobile', label: '权限Code', type: FieldType.TEXT, required: true, render: this.renderColumns },
      ],
    };
    return (
        <Grid container>
          <Grid item xs={4}>
            <CustomTable key={1} {...tableProps} />
          </Grid>
          <Divider />
          <Grid item xs={8}>
            <AppBar position="static">
              <Tabs value={value} onChange={this.handleChange}>
                <Tab label="用户" />
                <Tab label="菜单" />
                <Tab label="权限" />
              </Tabs>
            </AppBar>
            {value === 0 && <div>
              <CustomTable key={2} {...userTableProps} />
                            </div>}
            {value === 1 &&
            <Grid container>
              <Grid item xs={7}>
                <CustomTable {...menuTableProps} />
              </Grid>
              <Divider />
              <Grid item xs={5}>
                <CustomTable {...resourceTableProps} />
              </Grid>
            </Grid>
            }
            {value === 2 &&
            <Grid container>
              <Grid item xs={7}>
                <CustomTable {...permissionTableProps} />
              </Grid>
              <Divider />
              <Grid item xs={5}>
                <CustomTable {...resourceTableProps} />
              </Grid>
            </Grid>
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
