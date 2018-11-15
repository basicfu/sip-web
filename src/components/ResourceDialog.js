import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import ReactSelect from 'components/ReactSelect';
import { FieldType, SelectDefault } from 'enum';
import MuiThemeProvider from '../../node_modules/@material-ui/core/styles/MuiThemeProvider';
import CustomTable from 'components/CustomTable';
import { connect } from 'dva-no-router';
import createMuiTheme from '../../node_modules/@material-ui/core/styles/createMuiTheme';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import dialog from 'utils/dialog';
import { suggestResource } from 'api';
import CustomSearch from 'components/CustomSearch';
import Input from 'components/Input';
import Select from 'components/Select';
import { formatDateTime, formatOptions } from 'utils';
import Component from 'components/Component';

const menuNamespace = 'permissionMenu';
const permissionNamespace = 'permissionPermission';
const appServiceNamespace = 'baseAppService';
const tableName = 'resource';

const theme = createMuiTheme({
  typography: {
    useNextVariants: true,
  },
});
const styles = {
  paper: {
    maxWidth: 2400,
    width: 800,
    position: 'absolute',
    top: 0,
  },
  spacer: {
    flex: '1 1 100%',
  },
};

class ResourceDialog extends Component {
  state={
    dynamicNamespace: menuNamespace,
  };

  componentWillReceiveProps(nextProps, _) {
    const nextOpen = nextProps.open || false;
    const open = this.props.open || false;
    const { id } = nextProps;
    if (open === false && nextOpen === true) {
      this.setState({ dynamicNamespace: nextProps.namespace });
      this.props.dispatch({ type: `${appServiceNamespace}/all` });
      this.handleSearch(id, undefined, nextProps.namespace);
    } else if (open === true && nextOpen === false) {
      this.resetQuery(nextProps.namespace, 'resource');
    }
  }

  handleSuggestLoadOptions = (inputValue, callback) => {
    if (inputValue) {
      const promise = suggestResource({ q: inputValue });
      promise.then(response => {
        callback(response.data.map(it => ({ label: `${it.url}(${it.method})(${it.name})`, value: it.id })));
      });
    } else {
      callback([]);
    }
  };

  handleSuggestOnChange = value => {
    const { id } = this.props;
    const { dynamicNamespace } = this.state;
    this.props.dispatch({ type: `${dynamicNamespace}/insertResource`, payload: { id, resourceIds: [value] } });
  };

  handleDeleteResource=(id, selected) => {
    const { dispatch } = this.props;
    const { dynamicNamespace } = this.state;
    dialog.confirm({ title: '确定解除权限-资源关系吗？',
    onOk() {
      dispatch({ type: `${dynamicNamespace}/deleteResource`, payload: { id, resourceIds: selected } });
    } });
  };

  handleSearch(id, q, space) {
    const { dynamicNamespace } = this.state;
    this.props.dispatch({ type: `${space || dynamicNamespace}/queryState`, payload: { tableName: 'resource', id, q } });
    this.props.dispatch({ type: `${space || dynamicNamespace}/listResource` });
  }

  renderColumns = (text, column) => {
    const { type, extra } = column;
    switch (type) {
      case FieldType.SELECT:
        return formatOptions(text, extra);
      default:
        break;
    }
  };

  render() {
    const { classes, open, onClose, id, menuData, permissionData, appServiceData } = this.props;
    const { dynamicNamespace } = this.state;
    const appServiceAll = appServiceData.all.map(it => ({ name: it.name, value: it.id }));
    const resourceTableProps = {
      data: dynamicNamespace === menuNamespace ? { ...menuData, data: menuData.menuResource } : { ...permissionData, data: permissionData.permissionResource },
      mode: 'false',
      userPaper: false,
      tableName,
      listAction: 'listResource',
      onDelete: (selected) => { this.handleDeleteResource(id, selected); },
      headerChild: {
        left: (
          <div style={{ width: 300 }}>
            <ReactSelect
              defaultValue={[]}
              async
              placeholder="搜索资源URL/名并添加"
              loadOptions={this.handleSuggestLoadOptions}
              onChange={this.handleSuggestOnChange}
            />
          </div>),
        right: <CustomSearch placeholder="URL或名称" onSearch={(value) => this.handleSearch(id, value)} />,
      },
      columns: [
        { id: 'serviceId', label: '服务', type: FieldType.SELECT, required: false, extra: appServiceAll, render: this.renderColumns },
        { id: 'name', label: '名称', type: FieldType.TEXT, required: false },
        { id: 'url', label: 'URL', type: FieldType.TEXT, required: false },
        { id: 'method', label: '方法', type: FieldType.TEXT, required: false },
        { id: 'cdate', label: '绑定时间', type: FieldType.TEXT, required: false, render: formatDateTime },
      ],
    };
    return (
      <MuiThemeProvider theme={theme}>
        <Dialog
          classes={{ paper: classes.paper }}
          open={open}
          scroll="paper"
          onClose={onClose}
        >
          <DialogTitle>资源管理(权限：访客)</DialogTitle>
          <CustomTable {...resourceTableProps} />
        </Dialog>
      </MuiThemeProvider>
    );
  }
}
export default connect(state => ({
  menuData: state[menuNamespace],
  permissionData: state[permissionNamespace],
  appServiceData: state[appServiceNamespace],
}))(withStyles(styles)(ResourceDialog));
