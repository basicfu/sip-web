import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'dva';
import Input from 'components/Input';
import { FieldType } from 'enum';
import Tab from '../../node_modules/@material-ui/core/Tab/Tab';
import Tabs from '../../node_modules/@material-ui/core/Tabs/Tabs';
import AppBar from '../../node_modules/@material-ui/core/AppBar/AppBar';
import Divider from '../../node_modules/@material-ui/core/Divider/Divider';
import Grid from '../../node_modules/@material-ui/core/Grid/Grid';
import createMuiTheme from '../../node_modules/@material-ui/core/styles/createMuiTheme';
import MuiThemeProvider from '../../node_modules/@material-ui/core/styles/MuiThemeProvider';
import Toolbar from '@material-ui/core/Toolbar';
import CustomSearch from 'components/CustomSearch';
import CustomTable from 'components/CustomTable';

const namespace = 'permissionRole';

const styles = theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
});
class Role extends React.Component {
  state = {
    value: 0,
  };

  componentDidMount() {
    this.handleSearch();
  }

  handleSearch = (value) => {
    this.props.dispatch({ type: `${namespace}/list`, payload: { q: value } });
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };

  render() {
    const { classes, data } = this.props;
    const { value } = this.state;
    const tableProps = {
      data,
      headerChild: <CustomSearch placeholder="应用名或code" onSearch={(v) => this.handleSearch(v)} />,
      showFooter: false,
      columns: [
        { id: 'name', label: '角色名', type: FieldType.TEXT, required: true, render: this.renderColumns },
        { id: 'code', label: 'CODE', type: FieldType.TEXT, required: true, render: this.renderColumns },
      ],
    };
    return (
        <Grid container>
          <Grid item xs={5}>
            <CustomTable {...tableProps} />
          </Grid>
          <Divider />
          <Grid item xs={7}>
            <AppBar position="static">
              <Tabs value={value} onChange={this.handleChange}>
                <Tab label="Item One" />
                <Tab label="Item Two" />
                <Tab label="Item Three" href="#basic-tabs" />
              </Tabs>
            </AppBar>
            {value === 0 && <div>123</div>}
            {value === 1 && <div>Item Two</div>}
            {value === 2 && <div>Item Three</div>}
          </Grid>
        </Grid>

    );
  }
}
export default connect(state => ({
  data: state[namespace],
}))(withStyles(styles)(Role));
