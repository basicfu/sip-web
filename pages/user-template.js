import React from 'react';
import {withStyles} from '@material-ui/core/styles';
import {connect} from 'dva';
import CustomTable from 'components/CustomTable';
import styles from 'styles/user-template';
import notify from 'notify';

const namespace = 'userTemplate';

class UserTemplate extends React.Component {
  componentDidMount() {
    this.handleSearch();
  }

  handleSearch = () => {
    const search = this.props.search;
    this.props.dispatch({ type: `${namespace}/list`, payload: { data: search } });
  };

  handleMenuClick = (modalType) => {
    const { dispatch, selectedRowKeys, columnItem } = this.props;
    switch (modalType) {
      case 'insert':
        // Notifications.shello()
        notify.info('值不能为空');
        // dispatch({ type: `${namespace}/updateState`, payload: { loading: true,message:Math.random().toString() } });
        dispatch({ type: `${namespace}/updateState`, payload: { openVisible: true, modalType, columnItem: {} } });
        break;
      case 'update':
        notify.warning('手机号不能为空');
        if (selectedRowKeys.length !== 1) {
          alert('请选择一条数据');
          return;
        }
        dispatch({
          type: `${namespace}/updateState`,
          payload: {
            openVisible: true,
            modalType,
            columnItem,
          },
        });
        break;
      case 'delete':
        if (selectedRowKeys.length === 0) return;
        dispatch({
          type: `${namespace}/delete`,
          payload: {
            ids: selectedRowKeys,
          },
        });
        break;
      default:
        break;
    }
  };

  // 关闭
  handleCancel = () => {
    this.props.dispatch({
      type: `${namespace}/updateState`,
      payload: { openVisible: false },
    });
  };

  handleInput = name => event => {
    this.props.dispatch({
      type: `${namespace}/updateState`,
      payload: {
        search: { name: event.target.value },
      },
    });
  };

  render() {
    const { classes, data, openVisible } = this.props;
    const tableProps = {
      props: this.props,
      handleMenuClick: mt => this.handleMenuClick(mt),
      handleCancel: mt => this.handleCancel(mt),
      columns: [
        { id: 'name', label: '字段名' },
        { id: 'enName', label: '字段英文名' },
        { id: 'type', label: '字段类型' },
        { id: 'extra', label: '扩展信息' },
        { id: 'defaultValue', label: '默认值' },
        { id: 'required', label: '是否必填' },
        { id: 'sort', label: '顺序' },
        { id: 'cdate', label: '创建时间' },
        { id: 'udate', label: '更新时间' },
      ],
    };
    return (
      <div>
        <CustomTable {...tableProps} />
        {/*<CustomDialog />*/}
      </div>
    );
  }
}
export default connect(state => ({
  data: state.userTemplate,
}))(withStyles(styles)(UserTemplate));
