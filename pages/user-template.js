import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Grid, Snackbar } from '@material-ui/core';
import classNames from 'classnames';
import { connect } from 'dva';
import TableTemlate from '../src/components/TableTemlate';
import ModalTemplate from '../src/components/ModalTemplate';
import Button from '@material-ui/core/Button';
import SearchIcon from '@material-ui/icons/Search';
import styles from '../src/styles/user-template';

const namespace = 'userTemplate';

class UserTemplate extends React.Component {
  componentDidMount() {
    this.handleSearch();
    console.log(this.props.data);
  }

  handleSearch = () => {
    const search = this.props.search;
    this.props.dispatch({ type: `${namespace}/list`, payload: { data: search } });
  };

  handleMenuClick = (modalType) => {
    const { dispatch, selectedRowKeys, columnItem } = this.props;
    switch (modalType) {
      case 'insert':
        dispatch({ type: `${namespace}/updateState`, payload: { openVisible: true, modalType, columnItem: {} } });
        break;
      case 'update':
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
      namespace,
      props: this.props,
      handleMenuClick: mt => this.handleMenuClick(mt),
      handleCancel: mt => this.handleCancel(mt),
      columns: [
        { id: 'tenantId', disablePadding: true, align: 'left', label: '模版id' },
        { id: 'name', disablePadding: true, align: 'center', label: '字段名' },
        {
          id: 'enName',
          disablePadding: true,
          label: '字段英文名',
        },
        {
          id: 'type',
          disablePadding: true,
          label: '字段类型',
        },
        {
          id: 'extra',
          disablePadding: true,
          label: '扩展信息',
        },
        {
          id: 'defaultValue',
          disablePadding: true,
          label: '默认值',
        },
        {
          id: 'required',
          disablePadding: true,
          label: '是否必填',
        },
        {
          id: 'sort',
          disablePadding: true,
          label: '顺序',
        },
        {
          id: 'cdate',
          disablePadding: true,
          label: '创建时间',
        },
        {
          id: 'udate',
          disablePadding: true,
          label: '更新时间',
        },
      ],
    };
    const modalProps = {
      namespace,
      props: this.props,
      handleCancel: this.handleCancel.bind(this),
    };
    return (
      <div className={classes.root}>
        <Snackbar
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
          open={true}
          // onClose={this.handleClose}
          ContentProps={{
            'aria-describedby': 'message-id',
          }}
          message={<span id="message-id">I love snacks</span>}
        />
        <div className={classes.container}>
          <Grid container spacing={24}>
            <Grid item xs={3} style={{ height: '3px' }}>
              <Button
                variant="contained"
                color="secondary"
                className={classes.button}
                onClick={() => this.handleMenuClick('insert')}>添加
              </Button>
              <Button
                variant="contained"
                className={classNames(classes.margin, classes.cssRoot)}
                color="primary"
                onClick={() => this.handleMenuClick('update')}>修改
              </Button>
              <Button
                variant="contained"
                color="primary"
                className={classes.button}
                onClick={() => this.handleMenuClick('delete')}>删除
              </Button>
            </Grid>
            <Grid item xs={3} style={{ position: 'relative', height: '3px' }}>
              <input
                id="name"
                ref={node => {
                  this.input = node;
                }}
                onChange={this.handleInput('name')}
                className={classes.input}
              />
              <Button
                variant="fab"
                color="secondary"
                className={classes.search}
                onClick={() => this.handleSearch()}>
                <SearchIcon />
              </Button>
            </Grid>
            <Grid item xs={11}>
              {/*<TableTemlate {...tableProps} />*/}
            </Grid>
            <div>
              {openVisible ? <ModalTemplate {...modalProps} /> : null}
            </div>
          </Grid>
        </div>
      </div>
    );
  }
}

// page: state.data.page,
//   loading: state.loading,
//   search: state.search,
//   selectedRowKeys: state.selectedRowKeys,
//   openVisible: state.openVisible,
//   columnItem: state.columnItem,
//   modalType: state.modalType,

export default connect(state => ({
  data: state.userTemplate,
}))(withStyles(styles)(UserTemplate));
