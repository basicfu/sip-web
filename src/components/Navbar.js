import React from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import MenuIcon from '@material-ui/icons/Menu';
import GithubIcon from '@material-ui/icons/Grade';
import Notifications from './Notifications';
import Typography from '@material-ui/core/Typography';
import Menu from '@material-ui/core/Menu/Menu';
import MenuItem from '@material-ui/core/MenuItem/MenuItem';
import Popper from '@material-ui/core/Popper/Popper';
import Grow from '@material-ui/core/Grow/Grow';
import Paper from '@material-ui/core/Paper/Paper';
import ClickAwayListener from '@material-ui/core/ClickAwayListener/ClickAwayListener';
import MenuList from '@material-ui/core/MenuList/MenuList';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import createMuiTheme from '@material-ui/core/styles/createMuiTheme';
import Select from 'components/Select';
import config from 'config';

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
  rightButton: {
    position: 'absolute',
    right: 10,
  },
  appSelect: {
    marginRight: 60,
    width: 100,
  },
});
const theme = createMuiTheme({
  typography: {
    // Tell Material-UI what the font-size on the html element is.
    htmlFontSize: 10,
    useNextVariants: true,
  },
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
    this.props.dispatch({ type: 'baseUser/logout' });
  };

  handleAppChange=(appCode) => {
    if (typeof window !== 'undefined') {
      window.localStorage.setItem('appCode', appCode);
      window.location.reload();
    }
  };

  render() {
    const { classes, data, app } = this.props;
    const { open } = this.state;
    const appAll = app.map(it => ({ name: it.name, value: it.code }));
    let defaultApp = config.app;
    if (typeof window !== 'undefined') {
      defaultApp = window.localStorage.getItem('appCode') || config.app;
    }
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
            <MuiThemeProvider theme={theme}>
              <Typography color="inherit">
                Service Integration Platform
              </Typography>
            </MuiThemeProvider>
            <div className={classes.grow} />
            {(data.user.type === 'SYSTEM_SUPER_ADMIN' || data.user.type === 'SYSTEM_ADMIN') && typeof window !== 'undefined' && appAll.length > 0 && <Select className={classes.appSelect} options={appAll} defaultValue={defaultApp} onChange={value => this.handleAppChange(value)} />}
            {data.auth.username &&
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
  app: state.baseApp.all,
}))(withStyles(styles)(Navbar));
