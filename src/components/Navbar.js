import React from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import MenuIcon from '@material-ui/icons/Menu';
import GithubIcon from '@material-ui/docs/svgIcons/GitHub';
import Notifications from './Notifications';
import {Typography} from "@material-ui/core";

const styles = theme => ({
  root: {
    display: 'flex',
  },
  grow: {
    flex: '1 1 auto',
  },
  appBar: {
    transition: theme.transitions.create('width'),
    '@media print': {
      position: 'absolute',
    },
  },
});

class Navbar extends React.Component {
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <AppBar className={classes.appBar}>
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={this.handleDrawerOpen}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="title" color="inherit" noWrap>
              Service Integration Platform
            </Typography>
            <div className={classes.grow} />
            <Tooltip id="appbar-github" title="GitHub repository" enterDelay={300}>
              <IconButton
                component="a"
                color="inherit"
                aria-labelledby="appbar-github"
              >
                <GithubIcon />
              </IconButton>
            </Tooltip>
          </Toolbar>
        </AppBar>
        <Notifications />
      </div>
    );
  }
}

export default connect(state => ({
  data: state.global,
}))(withStyles(styles)(Navbar));
