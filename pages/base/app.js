import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'dva';
import CustomTable from 'components/CustomTable';
import styles from 'styles/user-template';
import CustomSearch from 'components/CustomSearch';
import Input from 'components/Input';

const namespace = 'baseApp';

class App extends React.Component {
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
      case 'code':
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
      headerChild: <CustomSearch placeholder="应用名或code" onSearch={(value) => this.handleSearch(value)} />,
      columns: [
        { id: 'name', label: '应用名', required: true, render: this.renderColumns },
        { id: 'code', label: '应用code', required: true, render: this.renderColumns },
      ],
    };
    return (
      <CustomTable {...tableProps} />
    );
  }
}
export default connect(state => ({
  data: state[namespace],
}))(withStyles(styles)(App));
