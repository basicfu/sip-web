import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'dva';
import CustomTable from 'components/CustomTable';
import styles from 'styles/user-template';
import CustomSearch from 'components/CustomSearch';
import Input from 'components/Input';
import { formatDateTime, formatDict, formatFlag } from 'utils';
import Switch from 'components/Switch';
import { Dict, FieldType, SelectDefault } from 'enum';
import InputNumber from 'components/InputNumber';
import Select from 'components/Select';
import ReactSelect from 'components/ReactSelect';

const namespace = 'baseUser';

class User extends React.Component {
  componentDidMount() {
    this.props.dispatch({ type: 'baseUserTemplate/all' });
    this.props.dispatch({ type: 'permissionRole/all' });
    this.handleSearch();
  }

  handleSearch = (value) => {
    this.props.dispatch({ type: `${namespace}/list`, payload: { q: value } });
  };

  renderColumns=(text, column, add, edit, onChange) => {
    const { id, type, extra } = column;
    switch (type) {
      case FieldType.TEXT:
        if (add || edit) {
          return <Input key={id} defaultValue={text} onChange={e => onChange(id, e.target.value)} column={column} />;
        }
        return text;
      case FieldType.NUMBER:
        if (add || edit) {
          return <InputNumber key={id} defaultValue={text} onChange={e => onChange(id, e.target.value)} column={column} />;
        }
        return text;
      case FieldType.PASSWORD:
        if (add || edit) {
          return <Input key={id} type="password" defaultValue={text} onChange={e => onChange(id, e.target.value)} column={column} />;
        }
        return text;
      case FieldType.SELECT:
        if (add || edit) {
          return <Select key={id} dict={extra} default={SelectDefault.CHOOSE} defaultValue={text} onChange={value => onChange(id, value)} column={column} />;
        }
        return formatDict(text, extra);
      case FieldType.MULTI_SELECT:
        if (add || edit) {
          return <ReactSelect key={id} options={extra} defaultValue={text} onChange={value => onChange(id, value)} column={column} />;
        }
        return formatDict(text, extra);
      // case 'DATE':
      //   columns.push({ id, label, required, render: this.renderColumns });
      //   break;
      default:
        break;
    }
  }

  render() {
    const { data, userTemplate, role } = this.props;
    const validator = (value, item) => {
      if (value !== item.password) {
        return '两次密码不一致';
      }
    };
    const roleData = role.map(it => ({ label: it.name, value: it.id }));
    const columns = [];
    columns.push({ id: 'username', label: '用户名', type: FieldType.TEXT, required: true, render: this.renderColumns });
    columns.push({ id: 'roleIds', label: '用户角色', type: FieldType.MULTI_SELECT, required: false, extra: roleData, render: this.renderColumns });
    columns.push({ id: 'mobile', label: '手机号', type: FieldType.TEXT, required: false, render: this.renderColumns });
    columns.push({ id: 'email', label: '邮箱', type: FieldType.TEXT, required: false, render: this.renderColumns });
    columns.push({ id: 'password', label: '密码', type: FieldType.PASSWORD, required: true, addRequired: true, editRequired: false, visible: false, render: this.renderColumns });
    columns.push({ id: 'repassword', label: '确认密码', type: FieldType.PASSWORD, required: true, addRequired: true, editRequired: false, visible: false, validator, render: this.renderColumns });
    userTemplate.forEach(it => {
      columns.push({ id: it.enName, label: it.name, type: it.type, required: it.required, addDefaultValue: it.defaultValue, extra: it.extra, render: this.renderColumns });
    });
    columns.push({ id: 'cdate', label: '创建时间', required: false, dialogVisible: false, render: formatDateTime });
    columns.push({ id: 'udate', label: '更新时间', required: false, dialogVisible: false, render: formatDateTime });
    columns.push({ id: 'ldate', label: '最后登录时间', required: false, dialogVisible: false, render: formatDateTime });

    const tableProps = {
      data,
      editMode: 'modal',
      headerChild: <CustomSearch placeholder="用户名" onSearch={(value) => this.handleSearch(value)} />,
      columns,
    };
    return (
      <CustomTable {...tableProps} />
    );
  }
}
export default connect(state => ({
  data: state[namespace],
  userTemplate: state.baseUserTemplate.all,
  role: state.permissionRole.all,
}))(withStyles(styles)(User));
