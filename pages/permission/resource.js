import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'dva';
import CustomTable from 'components/CustomTable';
import CustomSearch from 'components/CustomSearch';
import Input from 'components/Input';
import { FieldType, SelectDefault } from 'enum';
import Select from 'components/Select';
import IconButton from '@material-ui/core/IconButton';
import Sync from '../../node_modules/@material-ui/icons/Sync';
import Tooltip from '@material-ui/core/Tooltip';
import dialog from 'utils/dialog';
import Component from 'components/Component';
import {formatDateTime, formatOptions} from 'utils';
import notify from 'utils/notify';
import Table from '@material-ui/core/Table/Table';
import TableHead from '@material-ui/core/TableHead/TableHead';
import TableRow from '@material-ui/core/TableRow/TableRow';
import TableCell from '@material-ui/core/TableCell/TableCell';
import TableBody from '@material-ui/core/TableBody/TableBody';

const styles = {
  appServiceSelect: {
    width: 150,
    marginRight: 10,
  },
  a: {
    color: '#2196f3',
    ':visited': {
      color: '#2196f3',
    },
  },
};

const namespace = 'permissionResource';
const appServiceNamespace = 'baseAppService';

class Resource extends Component {
  componentDidMount() {
    this.dispatch({ type: 'baseAppService/all' });
    this.handleSearch();
  }

  componentWillUpdate(nextProps, _) {
    const sync = nextProps.data.sync;
    if (sync.length > 0) {
      this.handleSyncDialog(sync);
    }
  }

  componentWillUnmount() {
    this.resetState(namespace);
    this.resetState(appServiceNamespace);
  }

  handleSearch = (value) => {
    this.dispatch({ type: `${namespace}/queryState`, payload: { q: value } });
    this.dispatch({ type: `${namespace}/list` });
  };

  handleAppServiceChange = (value) => {
    this.dispatch({ type: `${namespace}/queryState`, payload: { serviceId: value } });
    this.dispatch({ type: `${namespace}/list` });
  };

  handleSyncResource = () => {
    const { serviceId } = this.props.data.table.search;
    const appServiceData = this.props.appServiceData;
    if (appServiceData.all.length === 0) {
      notify.error('还没有应用服务,请先添加服务后再次操作');
      return;
    }
    notify.info('正在获取变更详情,请稍后...');
    this.props.dispatch({ type: `${namespace}/sync`, payload: { serviceId, type: 1 } });
  };

  handleSyncDetail=(detail, type) => {
    const id = 2;
    dialog.confirm({
      id,
      title: `${type === 1 ? '添加' : '删除'}明细`,
      width: 600,
      content: <Table>
        <TableHead>
          <TableRow>
            <TableCell>URL</TableCell>
            <TableCell>方法</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {detail.map((item, index) => {
            return (
              <TableRow key={index}>
                <TableCell>{item.url}</TableCell>
                <TableCell>{item.method}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
               </Table>,
      onOk() {
                 dialog.close(id);
      },
    });
  }

  handleSyncDialog=(sync) => {
    const { classes, dispatch } = this.props;
    dispatch({ type: `${namespace}/updateState`, payload: { sync: [] } });
    dialog.confirm({
      title: '即将执行以下变更操作,请确认操作',
      width: 700,
      content: <div>
        <p>实时获取拥有的接口地址和现有界面中的数据同步保持一致，如果删除的将会自动解除菜单/权限的资源关系</p>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>服务</TableCell>
              <TableCell>状态</TableCell>
              <TableCell>添加数</TableCell>
              <TableCell>删除数</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sync.map((item, index) => {
              return (
                <TableRow key={index}>
                  <TableCell>{item.name}</TableCell>
                  <TableCell>{item.available ? '可用' : '不可用'}</TableCell>
                  <TableCell><a href="#" className={classes.a} onClick={this.handleSyncDetail.bind(this, item.insertDetail, 1)}>{item.insertCount}</a></TableCell>
                  <TableCell><a href="#" className={classes.a} onClick={this.handleSyncDetail.bind(this, item.deleteDetail, 2)}>{item.deleteCount}</a></TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>,
      onOk() {
        dispatch({ type: `${namespace}/sync`, payload: { type: 2, serviceId: sync.length > 1 ? undefined : sync[0].serviceId } });
      },
    });
  }

  renderColumns = (text, column, addOrEdit, item, onChange) => {
    const { id, type, extra } = column;
    switch (type) {
      case FieldType.TEXT:
        if (addOrEdit) {
          return <Input key={id} defaultValue={text} onChange={e => onChange(id, e.target.value)} column={column} />;
        }
        return text;
      case FieldType.SELECT:
        if (addOrEdit) {
          return <Select key={id} options={extra} default={SelectDefault.CHOOSE} defaultValue={text} onChange={value => onChange(id, value)} column={column} />;
        }
        return formatOptions(text, extra);
      default:
        break;
    }
  };

  render() {
    const { classes, data, appServiceData } = this.props;
    const appServiceAll = appServiceData.all.map(it => ({ name: it.name, value: it.id }));
    const tableProps = {
      data,
      headerChild: {
        left: <div>
          {appServiceAll.length > 0 &&
          <Select
            className={classes.appServiceSelect}
            options={appServiceAll}
            default={SelectDefault.ALL}
            onChange={value => this.handleAppServiceChange(value)}
            column={{ label: '应用服务' }}
          />}
          <CustomSearch placeholder="URL或名称" onSearch={(value) => this.handleSearch(value)} />
              </div>,
        right: <div>
          <Tooltip title="同步应用中所有接口">
            <IconButton color={'primary'} onClick={this.handleSyncResource}>
              <Sync />
            </IconButton>
          </Tooltip>
               </div>,
      },
      columns: [
        { id: 'id', label: 'ID', visible: ['row', 'rowAdd', 'rowEdit'] },
        { id: 'serviceId', label: '服务', type: FieldType.SELECT, required: true, extra: appServiceAll, render: this.renderColumns },
        { id: 'name', label: '名称', type: FieldType.TEXT, required: false, render: this.renderColumns },
        { id: 'url', label: 'URL', type: FieldType.TEXT, required: true, render: this.renderColumns },
        { id: 'method', label: '方法', type: FieldType.TEXT, required: true, render: this.renderColumns },
        { id: 'cdate', label: '创建时间', required: false, visible: ['row', 'rowAdd', 'rowEdit'], render: formatDateTime },
        { id: 'udate', label: '更新时间', required: false, visible: ['row', 'rowAdd', 'rowEdit'], render: formatDateTime },
      ],
    };
    return (
      <CustomTable {...tableProps} />
    );
  }
}

export default connect(state => ({
  data: state[namespace],
  appServiceData: state[appServiceNamespace],
}))(withStyles(styles)(Resource));
