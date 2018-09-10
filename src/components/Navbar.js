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
import { Typography } from '@material-ui/core';
import Menu from '@material-ui/core/Menu/Menu';
import MenuItem from '@material-ui/core/MenuItem/MenuItem';
import Popper from '@material-ui/core/Popper/Popper';
import Grow from '@material-ui/core/Grow/Grow';
import Paper from '@material-ui/core/Paper/Paper';
import ClickAwayListener from '@material-ui/core/ClickAwayListener/ClickAwayListener';
import MenuList from '@material-ui/core/MenuList/MenuList';

const styles = theme => ({
  root: {
    display: 'flex',
    height: 64,
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
  rightButton:{
    position: 'absolute',
    right: 10,
  }
});

class Navbar extends React.Component {
  state = {
    open: false,
  };


  handleOpen = () => {
    this.setState({ open: true });
  }

  handleClose = () => {
    this.setState({ open: false });
  };

  handleLogout = () => {
    this.props.dispatch({ type: 'user/logout' });
  };

  render() {
    const { classes, data } = this.props;
    const { open } = this.state;
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
             {data.auth.username&&
            <IconButton
              aria-owns={open ? 'menu-appbar' : null}
              color="inherit"
              buttonRef={node => {
                this.anchorEl = node;
              }}
              onMouseOver={this.handleOpen}
              onMouseOut={this.handleClose}
              aria-labelledby="appbar-github"
              className={classes.rightButton}
            >
              <GithubIcon />
            </IconButton>
             }
              <Popper
                open={open}
                anchorEl={this.anchorEl}
                transition
                disablePortal
                onMouseOver={this.handleOpen}
                onMouseOut={this.handleClose}>
                {({ TransitionProps, placement }) => (
                  <Grow
                    {...TransitionProps}
                    id="menu-list-grow"
                    style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
                  >
                    <Paper>
                      <ClickAwayListener onClickAway={this.handleClose}>
                        <MenuList>
                          {data.auth.username && <MenuItem disabled>basicfu</MenuItem>}
                          <MenuItem onClick={this.handleClose}>修改密码</MenuItem>
                          <MenuItem onClick={this.handleLogout}>退出</MenuItem>
                        </MenuList>
                      </ClickAwayListener>
                    </Paper>
                  </Grow>
                )}
              </Popper>
            {/* //写div有警告 */}
            {/* {data.auth.username && <div className={classes.grow}> */}

                                   {/* </div>} */}
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
