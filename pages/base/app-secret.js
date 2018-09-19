import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'dva';
import CustomTable from 'components/CustomTable';
import styles from 'styles/user-template';
import CustomSearch from 'components/CustomSearch';
import Input from 'components/Input';
import { formatDateTime } from 'utils';

const namespace = 'baseAppSecret';

class AppSecret extends React.Component {
  componentDidMount() {
    this.handleSearch();
  }

  handleSearch = (value) => {
    this.props.dispatch({ type: `${namespace}/list`, payload: { q: value } });
  };

  renderColumns = (text, column, add, edit, onChange) => {
    const { id } = column;
    switch (id) {
      case 'secret':
        return text;
      case 'description':
        if (add || edit) {
          return <Input key={id} defaultValue={text} onChange={e => onChange(id, e.target.value)} column={column} />;
        }
        return text;
      default:
        break;
    }
  }

  render() {
    const { data } = this.props;
    const tableProps = {
      data,
      deleteContent: '删除后正在使用当前Secret的应用将无法使用！',
      headerChild: <CustomSearch placeholder="Secret或描述" onSearch={(value) => this.handleSearch(value)} />,
      columns: [
        { id: 'secret', label: 'Secret', required: false, dialogVisible: false, render: this.renderColumns },
        { id: 'description', label: '描述', required: false, render: this.renderColumns },
        { id: 'cdate', label: '创建时间', required: false, dialogVisible: false, render: formatDateTime },
        { id: 'udate', label: '更新时间', required: false, dialogVisible: false, render: formatDateTime },
      ],
    };
    return (
      <CustomTable {...tableProps} />
    );
  }
}

export default connect(state => ({
  data: state[namespace],
}))(withStyles(styles)(AppSecret));
