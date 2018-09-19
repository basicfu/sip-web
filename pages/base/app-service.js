import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'dva';
import CustomTable from 'components/CustomTable';
import styles from 'styles/user-template';
import CustomSearch from 'components/CustomSearch';
import Input from 'components/Input';
import { formatDateTime, formatFlag } from 'utils';
import Switch from 'components/Switch';

const namespace = 'baseAppService';

class AppService extends React.Component {
  componentDidMount() {
    this.handleSearch();
  }

  handleSearch = (value) => {
    this.props.dispatch({ type: `${namespace}/list`, payload: { q: value } });
  };

  renderColumns=(text, column, add, edit, onChange) => {
    const { id } = column;
    switch (id) {
      case 'name':
      case 'path':
      case 'serverId':
      case 'url':
        if (add || edit) {
          return <Input key={id} defaultValue={text} onChange={e => onChange(id, e.target.value)} column={column} />;
        }
        return text;
      case 'stripPrefix':
      case 'retryable':
        if (add || edit) {
          return <Switch key={id} checked={text} onChange={checked => onChange(id, checked)} column={column} />;
        }
        return formatFlag(text);
      default:
        break;
    }
  }

  render() {
    const { data } = this.props;
    const tableProps = {
      data,
      headerChild: <CustomSearch placeholder="应用名或code" onSearch={(value) => this.handleSearch(value)} />,
      columns: [
        { id: 'name', label: '服务名', required: true, render: this.renderColumns },
        { id: 'path', label: 'PATH', required: true, render: this.renderColumns },
        { id: 'serverId', label: '注册名', required: false, render: this.renderColumns },
        { id: 'url', label: 'URL', required: false, render: this.renderColumns },
        { id: 'stripPrefix', label: '过滤前缀', required: true, addDefaultValue: false, render: this.renderColumns },
        { id: 'retryable', label: '重试', required: true, addDefaultValue: false, render: this.renderColumns },
        { id: 'sensitiveHeaders', label: '敏感头', required: false, render: this.renderColumns },
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
}))(withStyles(styles)(AppService));
