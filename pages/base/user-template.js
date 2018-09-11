import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'dva';
import CustomTable from 'components/CustomTable';
import { formatDateTime, formatDict, formatFlag } from 'utils';
import styles from 'styles/user-template';
import Input from '@material-ui/core/Input/Input';
import CustomSearch from 'components/CustomSearch';
import Select from 'components/Select';
import { Dict, SelectDefault } from 'enum';
import Switch from 'components/Switch';

const namespace = 'userTemplate';

class UserTemplate extends React.Component {
  componentDidMount() {
    this.handleSearch();
  }

  handleSearch = (value) => {
    this.props.dispatch({ type: `${namespace}/list`, payload: { q: value } });
  };

  renderColumns=(text, id, table, item, key, onChange) => {
    const { classes } = this.props;
    const add = table.status === 'add' && item[key] === -1;
    const edit = table.status === 'edit' && item[key] === table.selected[0];
    switch (id) {
      case 'name':
      case 'enName':
      case 'extra':
      case 'defaultValue':
      case 'sort':
        if (add || edit) {
          return <Input key={id} defaultValue={text} className={classes.input} onChange={e => onChange(id, e.target.value)} error={false} label="Required" />;
        }
        return text;
      case 'type':
        if (add || edit) {
          return <Select key={id} dict={Dict.USER_TEMPLATE_FIELD_TYPE} default={SelectDefault.CHOOSE} defaultValue={text} onChange={value => onChange(id, value)} />;
        }
        return formatDict(text, Dict.USER_TEMPLATE_FIELD_TYPE);
      case 'required':
        if (add || edit) {
          return <Switch key={id} checked={text} onChange={checked => onChange(id, checked)} />;
        }
        return formatFlag(text);
      default:
        break;
    }
  }

  render() {
    const { data } = this.props;
    const tableProps = {
      // edit: 'false',
      data,
      headerChild: <CustomSearch onSearch={(value) => this.handleSearch(value)} />,
      columns: [
        { id: 'name', label: '字段名', required: true, render: this.renderColumns },
        { id: 'enName', label: '字段英文名', required: true, render: this.renderColumns },
        { id: 'type', label: '字段类型', required: true, render: this.renderColumns },
        { id: 'extra', label: '扩展信息', required: true, render: this.renderColumns },
        { id: 'defaultValue', label: '默认值', required: false, render: this.renderColumns },
        { id: 'required', label: '是否必填', required: true, addDefaultValue: false, render: this.renderColumns },
        { id: 'sort', label: '顺序', required: false, addDefaultValue: 0, render: this.renderColumns },
        { id: 'cdate', label: '创建时间', required: false, render: formatDateTime },
        { id: 'udate', label: '更新时间', required: false, render: formatDateTime },
      ],
    };
    return (
      <CustomTable {...tableProps} />
    );
  }
}
export default connect(state => ({
  data: state.userTemplate,
}))(withStyles(styles)(UserTemplate));
