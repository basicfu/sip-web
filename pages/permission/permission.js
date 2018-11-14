import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'dva';
import CustomTable from 'components/CustomTable';
import styles from 'styles/user-template';
import CustomSearch from 'components/CustomSearch';
import Input from 'components/Input';
import { FieldType } from 'enum';
import { formatDateTime } from 'utils';
import Component from 'components/Component';

const namespace = 'permissionPermission';

class Permission extends Component {
  componentDidMount() {
    this.handleSearch();
  }

  componentWillUnmount() {
    this.resetQuery(namespace);
    this.resetState(namespace);
  }

  handleSearch = (value) => {
    this.dispatch({ type: `${namespace}/queryState`, payload: { q: value } });
    this.dispatch({ type: `${namespace}/list` });
  };

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
    const { data } = this.props;
    const tableProps = {
      data,
      headerChild: { left: <CustomSearch placeholder="权限名或code" onSearch={(value) => this.handleSearch(value)} /> },
      columns: [
        { id: 'id', label: 'ID', visible: ['row', 'rowAdd', 'rowEdit'] },
        { id: 'name', label: '权限名', type: FieldType.TEXT, required: true, render: this.renderColumns },
        { id: 'code', label: 'CODE', type: FieldType.TEXT, required: true, render: this.renderColumns },
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
}))(withStyles(styles)(Permission));
