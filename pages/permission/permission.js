import React, { Fragment } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'dva';
import CustomTable from 'components/CustomTable';
import CustomSearch from 'components/CustomSearch';
import Input from 'components/Input';
import { FieldType } from 'enum';
import { formatDateTime, formatOptions } from 'utils';
import Component from 'components/Component';
import ResourceDialog from 'components/ResourceDialog';


const styles = {
  resourceManage: {
    color: '#ef6c00',
  },
  a: {
    color: '#2196f3',
    ':visited': {
      color: '#2196f3',
    },
  },
};
const namespace = 'permissionPermission';
const resourceNamespace = 'permissionResource';
const appServiceNamespace = 'baseAppService';

class Permission extends Component {
  state={
    open: false,
    id: 0,
  };

  componentDidMount() {
    this.handleSearch();
  }

  componentWillUnmount() {
    this.resetState(namespace);
    this.resetState(resourceNamespace);
    this.resetState(appServiceNamespace);
  }

  handleSearch = (value) => {
    this.dispatch({ type: `${namespace}/queryState`, payload: { q: value } });
    this.dispatch({ type: `${namespace}/list` });
  };

  handleOpen=(id) => {
    this.setState({ id, open: true });
  };

  handleClose=() => {
    this.dispatch({ type: `${namespace}/list` });
    this.setState({ open: false });
  };

  renderColumns = (text, column, addOrEdit, item, onChange) => {
    const { id, type, extra } = column;
    switch (type) {
      case FieldType.TEXT:
        if (addOrEdit) {
          return <Input key={id} defaultValue={text} onChange={e => onChange(id, e.target.value)} column={column} />;
        }
        return text;
      case FieldType.SELECT:
        return formatOptions(text, extra);
      default:
        break;
    }
  };

  renderResource = (text, column, addOrEdit, item) => {
    const { classes } = this.props;
    return <a href="#" className={classes.a} onClick={e => this.handleOpen(item.id)}>{text}</a>;
  };

  render() {
    const { data } = this.props;
    const { id, open } = this.state;
    const tableProps = {
      data,
      headerChild: { left: <CustomSearch placeholder="权限名或code" onSearch={(value) => this.handleSearch(value)} /> },
      columns: [
        { id: 'id', label: 'ID', visible: ['row', 'rowAdd', 'rowEdit'] },
        { id: 'name', label: '权限名', type: FieldType.TEXT, required: true, render: this.renderColumns },
        { id: 'code', label: 'CODE', type: FieldType.TEXT, required: true, render: this.renderColumns },
        { id: 'resourceCount', label: '资源数', required: false, render: this.renderResource },
        { id: 'cdate', label: '创建时间', required: false, visible: ['row', 'rowAdd', 'rowEdit'], render: formatDateTime },
        { id: 'udate', label: '更新时间', required: false, visible: ['row', 'rowAdd', 'rowEdit'], render: formatDateTime },
      ],
    };
    return (
      <Fragment>
        <CustomTable {...tableProps} />
        <ResourceDialog id={id} open={open} namespace={namespace} onClose={this.handleClose} />
      </Fragment>
    );
  }
}

export default connect(state => ({
  data: state[namespace],
  resourceData: state[resourceNamespace],
  appServiceData: state[appServiceNamespace],
}))(withStyles(styles)(Permission));
