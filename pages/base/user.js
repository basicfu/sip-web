import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'dva';
import CustomTable from 'components/CustomTable';
import styles from 'styles/user-template';
import CustomSearch from 'components/CustomSearch';
import Input from 'components/Input';
import { formatDateTime, formatDict, formatFlag, formatOptions } from 'utils';
import { Dict, FieldType, SelectDefault } from 'enum';
import InputNumber from 'components/InputNumber';
import Select from 'components/Select';
import ReactSelect from 'components/ReactSelect';

const namespace = 'baseUser';

class User extends React.Component {
  componentDidMount() {
    this.props.dispatch({ type: 'baseUserTemplate/all' });
    this.props.dispatch({ type: 'permissionRole/all' });
    // 其他应用的管理员要请求自己字典
    const appCode = window.localStorage.getItem('appCode') || 'sip';
    if (appCode !== 'sip') {
      this.props.dispatch({ type: 'global/dict', payload: { app: appCode } });
    }
    this.handleSearch();
  }

  handleSearch = (value) => {
    this.props.dispatch({ type: `${namespace}/list`, payload: { q: value } });
  };

  renderColumns=(text, column, addOrEdit, item, onChange) => {
    const { id, type, extra } = column;
    switch (type) {
      case FieldType.TEXT:
        if (addOrEdit) {
          return <Input key={id} defaultValue={text} onChange={e => onChange(id, e.target.value)} column={column} />;
        }
        return text;
      case FieldType.NUMBER:
        if (addOrEdit) {
          return <InputNumber key={id} defaultValue={text} onChange={e => onChange(id, e.target.value)} column={column} />;
        }
        return text;
      case FieldType.PASSWORD:
        if (addOrEdit) {
          return <Input key={id} type="password" defaultValue={text} onChange={e => onChange(id, e.target.value)} column={column} />;
        }
        return text;
      case FieldType.SELECT:
        if (addOrEdit) {
          return <Select key={id} options={extra} default={SelectDefault.CHOOSE} defaultValue={text} onChange={value => onChange(id, value)} column={column} />;
        }
        return formatOptions(text, extra);
      case FieldType.MULTI_SELECT:
        if (addOrEdit) {
          return <ReactSelect key={id} options={extra} defaultValue={item.roles && item.roles.map(it => it.id)} onChange={value => onChange(id, value)} column={column} />;
        }
        return item.roles && item.roles.map(it => it.name).join(',');
      default:
        break;
    }
  }

  render() {
    const { global, data, userTemplate, role } = this.props;
    const validator = (value, item) => {
      if (value !== item.password) {
        return '两次密码不一致';
      }
    };
    const roleData = role.map(it => ({ label: it.name, value: it.id }));
    const dictData = global.dict;
    let otherDictData = global.otherDict;
    const userTypeDictData = [...(dictData && dictData[Dict.USER_TYPE] && dictData[Dict.USER_TYPE].children) || []];
    if (typeof window !== 'undefined' && (window.localStorage.getItem('appCode') || 'sip') === 'sip') {
      otherDictData = dictData;
    }
    const columns = [];
    columns.push({ id: 'username', label: '用户名', type: FieldType.TEXT, required: true, visible: ['row', 'rowAdd', 'rowEdit', 'dialogAdd'], render: this.renderColumns });
    columns.push({ id: 'type', label: '用户类型', type: FieldType.SELECT, required: true, extra: userTypeDictData, visible: ['row', 'dialogAdd', 'dialogEdit'], render: this.renderColumns });
    columns.push({ id: 'roleIds', label: '用户角色', type: FieldType.MULTI_SELECT, required: false, extra: roleData, visible: ['row', 'dialogAdd', 'dialogEdit'], render: this.renderColumns });
    columns.push({ id: 'mobile', label: '手机号', type: FieldType.TEXT, required: false, render: this.renderColumns });
    columns.push({ id: 'email', label: '邮箱', type: FieldType.TEXT, required: false, render: this.renderColumns });
    columns.push({ id: 'password', label: '密码', type: FieldType.PASSWORD, required: true, addRequired: true, editRequired: false, visible: ['dialogAdd', 'dialogEdit'], render: this.renderColumns });
    columns.push({ id: 'repassword', label: '确认密码', type: FieldType.PASSWORD, required: true, addRequired: true, editRequired: false, visible: ['dialogAdd', 'dialogEdit'], validator, render: this.renderColumns });
    userTemplate.forEach(it => {
      let extra = it.extra;
      if (it.type === FieldType.SELECT) {
        extra = [...(otherDictData && otherDictData[extra] && otherDictData[extra].children) || []];
      }
      columns.push({ id: it.enName, label: it.name, type: it.type, required: it.required, addDefaultValue: it.defaultValue, extra, render: this.renderColumns });
    });
    columns.push({ id: 'cdate', label: '创建时间', required: false, visible: ['row', 'rowAdd', 'rowEdit'], render: formatDateTime });
    columns.push({ id: 'udate', label: '更新时间', required: false, visible: ['row', 'rowAdd', 'rowEdit'], render: formatDateTime });
    columns.push({ id: 'ldate', label: '最后登录时间', required: false, visible: ['row', 'rowAdd', 'rowEdit'], render: formatDateTime });

    const tableProps = {
      data,
      mode: 'modal',
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
  global: state.global,
}))(withStyles(styles)(User));
