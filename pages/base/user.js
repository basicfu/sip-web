import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'dva';
import CustomTable from 'components/CustomTable';
import styles from 'styles/user-template';
import CustomSearch from 'components/CustomSearch';
import Input from 'components/Input';
import { formatDateTime, formatFlag } from 'utils';
import Switch from 'components/Switch';
import { FieldType } from 'enum';
import InputNumber from 'components/InputNumber';

const namespace = 'baseUser';

class User extends React.Component {
  componentDidMount() {
    this.props.dispatch({ type: 'baseUserTemplate/all' });
    this.handleSearch();
  }

  handleSearch = (value) => {
    this.props.dispatch({ type: `${namespace}/list`, payload: { q: value } });
  };

  renderColumns=(text, column, add, edit, onChange) => {
    const { id, type } = column;
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
      // case 'CHECK':
      //   columns.push({ id, label, required, render: this.renderColumns });
      //   break;
      // case 'RADIO':
      //   columns.push({ id, label, required, render: this.renderColumns });
      //   break;
      // case 'SELECT':
      //   columns.push({ id, label, required, render: this.renderColumns });
      //   break;
      // case 'DATE':
      //   columns.push({ id, label, required, render: this.renderColumns });
      //   break;
      default:
        break;
    }
  }

  render() {
    const { data, userTemplate } = this.props;
    const columns = [];
    columns.push({ id: 'username', label: '用户名', type: FieldType.TEXT, required: true, render: this.renderColumns });
    columns.push({ id: 'mobile', label: '手机号', type: FieldType.TEXT, required: false, render: this.renderColumns });
    columns.push({ id: 'email', label: '邮箱', type: FieldType.TEXT, required: false, render: this.renderColumns });
    userTemplate.forEach(it => {
      columns.push({ id: it.enName, label: it.name, type: it.type, required: it.required, addDefaultValue: it.defaultValue, render: this.renderColumns });
    });
    columns.push({ id: 'cdate', label: '创建时间', required: false, dialogVisible: false, render: formatDateTime });
    columns.push({ id: 'udate', label: '更新时间', required: false, dialogVisible: false, render: formatDateTime });
    columns.push({ id: 'ldate', label: '最后登录时间', required: false, dialogVisible: false, render: formatDateTime });

    const tableProps = {
      data,
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
}))(withStyles(styles)(User));
