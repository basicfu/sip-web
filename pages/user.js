import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'dva';
import CustomTable from 'components/CustomTable';
import { formatDateTime, formatFlag } from 'utils';
import styles from 'styles/user-template';
import Input from '@material-ui/core/Input/Input';
import Switch from '@material-ui/core/Switch/Switch';
import dialog from 'utils/dialog';

const namespace = 'user';

class UserTemplate extends React.Component {
  componentDidMount() {
    this.handleSearch();
  }

  handleSearch = () => {
    const search = this.props.search;
    this.props.dispatch({ type: `${namespace}/list`, payload: { data: search } });
    this.props.dispatch({ type: 'userTemplate/all' });
  };

  renderColumns=(text, id, table, item, key, onChange) => {
    const { classes } = this.props;
    const add = table.status === 'add' && item[key] === -1;
    const edit = table.status === 'edit' && item[key] === table.selected[0];
    switch (id) {
      case 'username':
        if (add || edit) {
          return <Input defaultValue={item[id]} className={classes.input} onChange={e => onChange(id, e.target.value)} />;
        }
        return text;
      case 'password':
        if (add || edit) {
          return <Input defaultValue={item[id]} className={classes.input} onChange={e => onChange(id, e.target.value)} />;
        }
        return text;
      default:
        break;
    }
  }

  render() {
    const { classes, data, userTemplate } = this.props;
    const onOk = () => {

    };
    if (typeof window !== 'undefined') {
      const children = (
        <div>hello</div>
      );
      // dialog.content({
      //   onOk,
      //   children,
      // });
    }
    const userTemplates = [...userTemplate.all];
    // 只读
    userTemplates.push({ name: '注册时间', enName: 'cdate', type: 'DATE', extra: '2~100', defaultValue: '', required: false, sort: 0,readonly:true });
    userTemplates.unshift({ name: '邮箱', enName: 'email', type: 'TEXT', extra: '2~100', defaultValue: '', required: false, sort: 0 });
    userTemplates.unshift({ name: '手机号', enName: 'mobile', type: 'TEXT', extra: '11~11', defaultValue: '', required: false, sort: 0 });
    userTemplates.unshift({ name: '用户名', enName: 'username', type: 'TEXT', extra: '2~32', defaultValue: '', required: true, sort: 0 });
    const tableProps = {
      model: 'modal',
      props: this.props,
      columns: userTemplates.map(it => {
        return {
          id: it.enName,
          label: it.name,
        };
      }),
    };
    return (
        <CustomTable {...tableProps} />
    );
  }
}
export default connect(state => ({
  data: state.user,
  userTemplate: state.userTemplate,
}))(withStyles(styles)(UserTemplate));
