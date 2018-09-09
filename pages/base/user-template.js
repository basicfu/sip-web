import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'dva';
import CustomTable from 'components/CustomTable';
import { formatDateTime, formatFlag } from 'utils';
import styles from 'styles/user-template';
import Input from '@material-ui/core/Input/Input';
import Switch from '@material-ui/core/Switch/Switch';

const namespace = 'userTemplate';

class UserTemplate extends React.Component {
  componentDidMount() {
    this.handleSearch();
  }

  handleSearch = () => {
    const search = this.props.search;
    this.props.dispatch({ type: `${namespace}/list`, payload: { data: search } });
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
          return <Input defaultValue={item[id]} className={classes.input} onChange={e => onChange(id, e.target.value)} />;
        }
        return text;
      case 'required':
        if (add || edit) {
          return <Switch
style={{ width: '100%' }}
            checked
            value="checkedB"
            color="primary"
          />;
        }
        return formatFlag(text);
      default:
        break;
    }
  }

  render() {
    const { classes, data } = this.props;
    const tableProps = {
      edit: 'false',
      data,
      columns: [
        { id: 'name', label: '字段名', render: this.renderColumns },
        { id: 'enName', label: '字段英文名', render: this.renderColumns },
        { id: 'type', label: '字段类型' },
        { id: 'extra', label: '扩展信息', render: this.renderColumns },
        { id: 'defaultValue', label: '默认值', render: this.renderColumns },
        { id: 'required', label: '是否必填', render: this.renderColumns },
        { id: 'sort', label: '顺序', render: this.renderColumns },
        { id: 'cdate', label: '创建时间', render: formatDateTime },
        { id: 'udate', label: '更新时间', render: formatDateTime },
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
