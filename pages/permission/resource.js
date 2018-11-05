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

const styles = {
  appServiceSelect: {
    width: 150,
    marginRight: 10,
  },
};

const namespace = 'permissionResource';
const appServiceNamespace = 'baseAppService';

class Resource extends React.Component {
  componentDidMount() {
    this.props.dispatch({ type: 'baseAppService/all' });
    this.handleSearch();
  }

  handleSearch = (value) => {
    this.props.dispatch({ type: `${namespace}/queryState`, payload: { q: value } });
    this.props.dispatch({ type: `${namespace}/list` });
  };

  handleAppServiceChange = (value) => {
    this.props.dispatch({ type: `${namespace}/queryState`, payload: { serviceId: value } });
    this.props.dispatch({ type: `${namespace}/list` });
  };

  handleSyncResource = () => {
    const dispatch = this.props.dispatch;
    const { serviceId } = this.props.data.table.search;
    let serviceName = '全部';
    if (serviceId !== undefined) {
      const appServiceData = this.props.appServiceData;
      serviceName = appServiceData.all.filter(it => it.id === serviceId)[0].name;
    }
    dialog.confirm({
      title: `确定要同步${serviceName}服务接口地址吗？`,
      content: `将在${serviceName}服务中实时获取拥有的接口地址和现有界面中的数据同步保持一致，如果删除的将会自动解除菜单/权限的资源关系，添加的将不会有任何关联，不变动的的资源不会解除菜单/权限的资源关系`,
      onOk() {
        dispatch({ type: `${namespace}/sync`, payload: { serviceId } });
      },
    });
  }

  renderColumns = (text, column, addOrEdit, item, onChange) => {
    const { id, type } = column;
    switch (type) {
      case FieldType.TEXT:
        if (addOrEdit) {
          return <Input key={id} defaultValue={text} onChange={e => onChange(id, e.target.value)} column={column} />;
        }
        return text;
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
        { id: 'service', label: '服务', type: FieldType.TEXT, required: true, render: this.renderColumns },
        { id: 'url', label: 'URL', type: FieldType.TEXT, required: true, render: this.renderColumns },
        { id: 'method', label: '方法', type: FieldType.TEXT, required: true, render: this.renderColumns },
        { id: 'name', label: '名称', type: FieldType.TEXT, required: true, render: this.renderColumns },
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
