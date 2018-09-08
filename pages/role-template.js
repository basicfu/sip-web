/* eslint-disable jsx-a11y/anchor-is-valid,react/sort-comp */
import React from 'react';
import {withStyles} from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import {connect} from 'dva';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import styles from 'styles/role-template';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import AccountCircle from '@material-ui/icons/AccountCircle';
import SearchIcon from '@material-ui/icons/Search';
import AddIcon from '@material-ui/icons/Add';
import Tree, {TreeNode} from '../src/tree/index';
import CustomTable from 'components/CustomTable';
import {formatDateTime, formatFlag} from 'utils';
import notify from 'utils/notify';

const namespace = 'roleTemplate';

function TabContainer(props) {
  return (
    <Typography component="div">
      {props.children}
    </Typography>
  );
}

TabContainer.propTypes = {
  children: PropTypes.node.isRequired,
};

class RoleTemplate extends React.Component {
  state = {
    value: 'one',
  };

  componentDidMount() {
    this.handleSearch();
  }

  handleSearch = () => {
    const search = this.props.search;
    this.props.dispatch({type: `${namespace}/list`, payload: {data: search}});
  };

  handleChange = (event, value) => {
    this.setState({value});
  };


  handleMenuClick = (modalType) => {
    const {dispatch, selectedRowKeys, columnItem} = this.props;
    switch (modalType) {
      case 'insert':
        notify.info('值不能为空');
        // dispatch({ type: `${namespace}/updateState`, payload: { loading: true,message:Math.random().toString() } });
        dispatch({type: `${namespace}/updateState`, payload: {openVisible: true, modalType, columnItem: {}}});
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
      payload: {openVisible: false},
    });
  };
  renderColumns = (text, id, table, item, key, onChange) => {
    const {classes} = this.props;
    const add = table.status === 'add' && item[key] === -1;
    const edit = table.status === 'edit' && item[key] === table.selected[0];
    switch (id) {
      case 'id':
      case 'name':
        return text;
      default:
        break;
    }
  }

  render() {
    const {classes} = this.props;
    const {value} = this.state;
    const tableProps = {
      props: this.props,
      handleMenuClick: mt => this.handleMenuClick(mt),
      handleCancel: mt => this.handleCancel(mt),
      columns: [
        {id: 'id', label: 'id', render: this.renderColumns},
        {id: 'name', label: '角色名', render: this.renderColumns}
      ],
    };
    const tabLists =
      [
        {key: 'one', label: '用户', data: 123},
        {key: 'two', label: '菜单', data: 456},
        {key: 'three', label: '权限', data: 567},
      ];
    return (
      <div className={classes.root}>
        <Grid className={classes.container}>
          <Grid item sm={4} className={classes.conntainLeft}>
            <div className={classes.leftTable}>
              <CustomTable {...tableProps} />
            </div>
          </Grid>
          <div className={classes.line}/>
          <Grid item xs={12} sm={8} className={classes.conntainRight}>
            <div className={classes.margin}>
              <AppBar position="static">
                <Tabs value={value} onChange={this.handleChange}>
                  {tabLists.map(item => (
                    <Tab key={item.key} value={item.key} label={item.label}></Tab>
                  ))}
                </Tabs>
              </AppBar>
              {value === 'one' && <TabContainer>
                <div className={classes.rightTabsOne}>
                  <div className={classes.search}>
                    <Input
                      fullWidth
                      endAdornment={
                        <InputAdornment position="end">
                          <SearchIcon/>
                        </InputAdornment>
                      }
                    />
                  </div>
                  <CustomTable {...tableProps} />
                </div>
              </TabContainer>}
              {value === 'two' && <TabContainer>
                <Grid className={classes.container}>
                  <Grid item xs={12} sm={4}>
                    <div style={{width: '70%'}}>
                      <Tree
                        className="myCls"
                        showLine
                        checkable
                        defaultExpandAll
                        defaultExpandedKeys={this.state.defaultExpandedKeys}
                        defaultSelectedKeys={this.state.defaultSelectedKeys}
                        defaultCheckedKeys={this.state.defaultCheckedKeys}
                      >
                        <TreeNode title="parent 1" key="0-0">
                          <Button/>
                          <TreeNode title="parent 1-2" key="0-0-2">
                            <TreeNode title="parent 1-2-0" key="0-0-2-0"/>
                            <TreeNode title="parent 1-2-1" key="0-0-2-1"/>
                          </TreeNode>
                        </TreeNode>
                      </Tree>
                    </div>
                  </Grid>
                  <div className={classes.line} />
                  <Grid item xs={12} sm={7}>
                    <div className={classes.padding}>
                      234
                    </div>
                  </Grid>
                </Grid>
              </TabContainer>}
              {value === 'three' && <TabContainer>
                <Grid className={classes.container}>
                  <Grid item xs={12} sm={5}>
                    1
                  </Grid>
                  <div className={classes.line} />
                  <Grid item xs={12} sm={6}>
                    2
                  </Grid>
                </Grid>
              </TabContainer>
              }
            </div>
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default connect(state => ({
  data: state.roleTemplate,
}))(withStyles(styles)(RoleTemplate));
