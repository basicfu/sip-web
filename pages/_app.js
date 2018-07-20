import App from 'next/app';
import React from 'react';
import { Provider } from 'react-redux';
import withRedux from 'next-redux-wrapper';
import { getOrCreateStore } from '../src/utils/store';
import { withStyles, MuiThemeProvider } from '@material-ui/core/styles';
import compose from 'recompose/compose';
import find from 'lodash/find';
import PropTypes from 'prop-types';
import Tooltip from '@material-ui/core/Tooltip';
import getPageContext from '../src/utils/getPageContext';
import NProgressBar from '@material-ui/docs/NProgressBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import JssProvider from 'react-jss/lib/JssProvider';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import AppDrawer from '../src/components/AppDrawer';
import AppSearch from '../src/components/AppSearch';
import Typography from '@material-ui/core/Typography';
import Notifications from '../src/components/Notifications';
import GithubIcon from '@material-ui/docs/svgIcons/GitHub';
import { loadCSS } from 'fg-loadcss/src/loadCSS';
import NProgress from 'nprogress';
import Router from 'next/router';
import Button from '@material-ui/core/Button/Button';
// Inject the insertion-point-jss after docssearch
if (process.browser) {
  loadCSS(
    'https://fonts.googleapis.com/icon?family=Material+Icons',
    document.querySelector('#insertion-point-jss'),
  );
  loadCSS(
    'https://cdn.jsdelivr.net/docsearch.js/2/docsearch.min.css',
    document.querySelector('#insertion-point-jss'),
  );
}
Router.onRouteChangeStart = () => {
  NProgress.start();
};

Router.onRouteChangeComplete = () => {
  NProgress.done();
};

Router.onRouteChangeError = () => {
  NProgress.done();
};
if (process.browser && !global.__INSERTION_POINT__) {
  global.__INSERTION_POINT__ = true;
  const styleNode = document.createComment('insertion-point-jss');
  const docsearchStylesSheet = document.querySelector('#insertion-point-jss');

  if (document.head && docsearchStylesSheet) {
    document.head.insertBefore(styleNode, docsearchStylesSheet.nextSibling);
  }
}
const drawerWidth = 230;
const styles = theme => ({
  root: {
    flexGrow: 1,
    zIndex: 1,
    overflow: 'hidden',
    position: 'relative',
    display: 'flex',
    width: '100%',
  },
  grow: {
    flex: '1 1 auto',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  drawerPaper: {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    marginRight: '72px',
    width: '72px',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  menuButton: {
    marginLeft: 12,
    marginRight: 36,
  },
  hide: {
    display: 'none',
  },
  drawer: {
    [theme.breakpoints.up('lg')]: {
      width: 250,
    },
  },
  navIconHide: {
    [theme.breakpoints.up('lg')]: {
      display: 'none',
    },
  },
  content: {
    flexGrow: 1,
    // backgroundColor: theme.palette.background.default,
    padding: theme.spacing.unit * 3,

  },
});
const pages = [
  {
    pathname: '/test',
    title: '测试1',
  },
  {
    pathname: '/user-template',
    title: '模版1',
  },
];

function findActivePage(currentPages, router) {
  const activePage = find(currentPages, page => {
    if (page.children) {
      return router.pathname.indexOf(page.pathname) === 0;
    }
    // Should be an exact match if no children
    return router.pathname === page.pathname;
  });
  if (!activePage) {
    return null;
  }
  // We need to drill down
  if (activePage.pathname !== router.pathname) {
    return findActivePage(activePage.children, router);
  }
  return activePage;
}

class MyApp extends App {
  static childContextTypes: { pages: *, activePage: * };

  static propTypes: { pageContext: *, router: * };

  constructor(props) {
    super(props);
    this.pageContext = getPageContext();
  }

  state = {
    mobileOpen: false,
    disablePermanent: false,
  };

  handleDrawerOpen = () => {
    this.setState({ mobileOpen: true, disablePermanent: true });
  };

  handleDrawerClose = () => {
    this.setState({
      mobileOpen: false,
      disablePermanent: false,
    });
  };

  // pageContext = null;

  componentDidMount() {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles && jssStyles.parentNode) {
      jssStyles.parentNode.removeChild(jssStyles);
    }
    if (
      'serviceWorker' in navigator &&
      process.env.NODE_ENV === 'production' &&
      window.location.host === 'material-ui.com'
    ) {
      navigator.serviceWorker.register('/sw.js');
    }
  }


  getChildContext() {
    const { router } = this.props;
    let pathname = router.pathname;
    if (pathname !== '/') {
      // The leading / is only added to support static hosting (resolve /index.html).
      // We remove it to normalize the pathname.pages
      pathname = pathname.replace(/\/$/, '');
    }
    findActivePage(pages, {
      ...router,
      pathname,
    });
    return {
      pages,
      activePage: findActivePage(pages, {
        ...router,
        pathname,
      }),
    };
  }

  render() {
    const { children, Component, pageProps, store, router, classes } = this.props;
    return (
      <div>
        <Provider store={store}>
          {/* Wrap every page in Jss and Theme providers */}
          <JssProvider
            jss={this.pageContext.jss}
            registry={this.pageContext.sheetsRegistry}
            generateClassName={this.pageContext.generateClassName}
          >
            {/* MuiThemeProvider makes the theme available down the React
              tree thanks to React context. */}
            <MuiThemeProvider
              theme={this.pageContext.theme}
              sheetsManager={this.pageContext.sheetsManager}
            >
              {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
              <CssBaseline />
              {/* Pass pageContext to the _document though the renderPage enhancer
                to render collected styles on server side. */}
              <div
                className={classes.root}
                style={{
                  flexGrow: 1,
                  zIndex: 1,
                  position: 'relative',
                  display: 'flex',
                }}>
                {/* 头部 */}
                <NProgressBar />
                <AppBar
                  position="absolute"
                  style={this.state.mobileOpen ?
                    {
                      width: 'calc(100% - 230px)',
                      transition: 'width 225ms cubic-bezier(0.4, 0, 0.6, 1) 0ms,margin 225ms cubic-bezier(0.4, 0, 0.6, 1) 0ms',
                      marginLeft: '230px',
                    }
                    : { width: '100%', zIndex: 1201 }}
                  className={this.state.mobileOpen ? classes.appBarShift : classes.appBar}
                >
                  <Toolbar disableGutters={!this.state.mobileOpen}>
                    <IconButton
                      color="inherit"
                      aria-label="open drawer"
                      onClick={this.handleDrawerOpen}>
                      <MenuIcon />
                    </IconButton>
                    <div className={classes.grow} />
                    <AppSearch />
                    <Tooltip id="appbar-github" title="GitHub repository" enterDelay={300}>
                      <IconButton component="a" color="inherit">
                        <GithubIcon />
                      </IconButton>
                    </Tooltip>
                  </Toolbar>
                </AppBar>
                <div style={this.state.mobileOpen ?
                  {
                    width: '230px',
                    position: 'relative',
                  }
                  : { width: '40px', position: 'relative' }}>
                  <AppDrawer
                    classes={this.state.disablePermanent ?
                      { paper: classes.drawerPaper } : { paper: classes.drawerPaperClose }
                    }
                    disablePermanent={this.state.disablePermanent}
                    onClose={this.handleDrawerClose}
                    onOpen={this.handleDrawerOpen}
                    variant="permanent"
                    mobileOpen={this.state.mobileOpen}
                  />
                </div>
                <Notifications />
                <main
                  className={classes.content}
                  style={this.state.mobileOpen ?
                    {
                      marginLeft: '20px 0 0 50px',
                      position: 'relative',
                    }
                    : { margin: '20px 0 0 100px', position: 'relative' }}>
                  <div className={classes.toolbar} style={{ minHeight: '68px' }} />
                  <Typography>{children}</Typography>
                  <Component pageContext={this.pageContext} {...pageProps} />
                </main>
              </div>
            </MuiThemeProvider>
          </JssProvider>
        </Provider>
      </div>
    );
  }
}

MyApp.propTypes = {
  pageContext: PropTypes.object,
  router: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
  // children: PropTypes.node.isRequired,
};

MyApp.childContextTypes = {
  pages: PropTypes.array,
  activePage: PropTypes.object,
};
MyApp.contextTypes = {
  // pathname: PropTypes.string.isRequired,
};
export default compose(
  withStyles(styles),
  withRedux(getOrCreateStore),
)(MyApp);
// export default withRedux(getOrCreateStore)(withStyles(styles)(MyApp));
