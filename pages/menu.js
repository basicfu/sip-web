import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'dva';
import CustomTable from 'components/CustomTable';
import { formatDateTime, formatFlag } from 'utils';
import styles from 'styles/user-template';
import Input from '@material-ui/core/Input/Input';
import Switch from '@material-ui/core/Switch/Switch';

const namespace = 'menu';

class UserTemplate extends React.Component {
  componentDidMount() {
    this.handleSearch();
  }

  handleSearch = () => {
    const search = this.props.search;
    this.props.dispatch({ type: `${namespace}/all`, payload: { data: search } });
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
    const { data } = this.props;
    const tableProps = {
      keyName: 'id',
      edit: 'false',
      actionName: 'all',
      showFooter: false,
      props: this.props,
      columns: [
        { id: 'name', label: '菜单名', render: this.renderColumns },
        { id: 'path', label: '路径', render: this.renderColumns },
        { id: 'sort', label: '顺序' },
        { id: 'icon', label: '图标', render: this.renderColumns },
        { id: 'type', label: '类型', render: this.renderColumns },
        { id: 'display', label: '是否显示', render: this.renderColumns },
      ],
    };
    return (
      <div>
        <CustomTable {...tableProps} />
      </div>
    );
  }
}
export default connect(state => ({
  data: state.menu,
}))(withStyles(styles)(UserTemplate));
