import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'dva';
import CustomTable from 'components/CustomTable';
import { formatDateTime, formatDict, formatFlag } from 'utils';
import styles from 'styles/user-template';
import CustomSearch from 'components/CustomSearch';
import Select from 'components/Select';
import { Dict, FieldType, SelectDefault } from 'enum';
import Switch from 'components/Switch';
import Input from 'components/Input';
import InputNumber from 'components/InputNumber';
import ReactSelect from 'components/ReactSelect';

const namespace = 'baseUserTemplate';

class UserTemplate extends React.Component {
  componentDidMount() {
    this.handleSearch();
  }

  handleSearch = (value) => {
    this.props.dispatch({ type: `${namespace}/list`, payload: { q: value } });
  };

  renderColumns=(text, column, addOrEdit, item, onChange) => {
    const { id, type, extra } = column;
    switch (type) {
      case FieldType.TEXT:
        if (addOrEdit) {
          return <Input key={id} defaultValue={text} onChange={e => onChange(id, e.target.value)} column={column} />;
        }
        return text;
      case FieldType.NUMBER:
        if (addOrEdit) {
          return <InputNumber key={id} defaultValue={text} onChange={e => onChange(id, e.target.value)} column={column} />;
        }
        return text;
      case FieldType.SWITCH:
        if (addOrEdit) {
          return <Switch key={id} checked={text} onChange={checked => onChange(id, checked)} column={column} />;
        }
        return formatFlag(text);
      case FieldType.SELECT:
        if (addOrEdit) {
          return <Select key={id} dict={extra} default={SelectDefault.CHOOSE} defaultValue={text} onChange={value => onChange(id, value)} column={column} />;
        }
        return formatDict(text, extra);
      default:
        break;
    }
  }

  render() {
    const { data } = this.props;
    const tableProps = {
      // edit: 'false',
      data,
      headerChild: <CustomSearch placeholder="字段名或英文名" onSearch={(value) => this.handleSearch(value)} />,
      columns: [
        { id: 'name', label: '字段名', type: FieldType.TEXT, required: true, render: this.renderColumns },
        { id: 'enName', label: '字段英文名', type: FieldType.TEXT, required: true, render: this.renderColumns },
        { id: 'type', label: '字段类型', type: FieldType.SELECT, extra: Dict.USER_TEMPLATE_FIELD_TYPE, required: true, render: this.renderColumns },
        { id: 'extra', label: '扩展信息', type: FieldType.TEXT, required: true, render: this.renderColumns },
        { id: 'defaultValue', label: '默认值', type: FieldType.TEXT, required: false, render: this.renderColumns },
        { id: 'required', label: '是否必填', type: FieldType.SWITCH, required: true, addDefaultValue: false, render: this.renderColumns },
        { id: 'sort', label: '顺序', required: false, type: FieldType.NUMBER, addDefaultValue: 0, render: this.renderColumns },
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
}))(withStyles(styles)(UserTemplate));
