import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Switch from '@material-ui/core/Switch';
import { connect } from 'dva';

const styles = theme => ({
  root: {
    height: 180,
  },
  container: {
    display: 'flex',
  },
  paper: {
    margin: theme.spacing.unit,
  },
  svg: {
    width: 100,
    height: 100,
  },
  polygon: {
    fill: theme.palette.common.white,
    stroke: theme.palette.divider,
    strokeWidth: 1,
  }
});

class SimpleCollapse extends React.Component {
  state = {
    checked: false,
  };

  handleChange = () => {
    this.setState(state => ({ checked: !state.checked }));
    this.props.dispatch({ type: 'test/init' });
  };

  render() {
    const { classes, test } = this.props;
    const { checked } = this.state;
    console.log(test.data);
    return (
      <div className={classes.root}>
        <Switch checked={checked} onChange={this.handleChange} aria-label="collapse" />
        <div className={classes.container}>
          <h1>index</h1>
          <p>{JSON.stringify(test.data)}</p>
        </div>
      </div>
    );
  }
}

SimpleCollapse.propTypes = {
  classes: PropTypes.object.isRequired,
};
//
// export default withStyles(styles)(SimpleCollapse);
export default connect(state => {
  return { test: state.test };
})(withStyles(styles)(SimpleCollapse));
// export default withStyles(styles)(SimpleCollapse);
