import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'dva';
import CustomTable from 'components/CustomTable';
import styles from 'styles/user-template';
import CustomSearch from 'components/CustomSearch';
import Input from 'components/Input';
import { FieldType } from 'enum';
import Switch from 'components/Switch';
import { formatFlag } from 'utils';

const namespace = 'permissionPermission';

class Permission extends React.Component {
  componentDidMount() {
    this.handleSearch();
  }

  handleSearch = (value) => {
    this.props.dispatch({ type: `${namespace}/list`, payload: { q: value } });
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
      headerChild: <CustomSearch placeholder="应用名或code" onSearch={(value) => this.handleSearch(value)} />,
      columns: [
        { id: 'name', label: '权限名', type: FieldType.TEXT, required: true, render: this.renderColumns },
        { id: 'code', label: '权限Code', type: FieldType.TEXT, required: true, render: this.renderColumns },
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
