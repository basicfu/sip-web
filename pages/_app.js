import App from 'next/app';
import React from 'react';
import { Provider } from 'react-redux';
import withRedux from 'next-redux-wrapper';
import { getOrCreateStore } from '../src/utils/store';
import { MuiThemeProvider, withStyles } from '@material-ui/core/styles';
import compose from 'recompose/compose';
import find from 'lodash/find';
import getPageContext from '../src/utils/getPageContext';
import CssBaseline from '@material-ui/core/CssBaseline';
import JssProvider from 'react-jss/lib/JssProvider';
import Notifications from '../src/components/Notifications';
import { loadCSS } from 'fg-loadcss/src/loadCSS';
import NProgress from 'nprogress';
import Navbar from 'components/Navbar';
import Router from 'next/router';
import Sidebar from 'components/Sidebar';
import { getActivePage } from 'utils/utils';

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
  loadCSS(
    '/static/assets/index.css',
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
// Inject the insertion-point-jss after docssearch
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
  rootr: {
    flexGrow: 1,
  },
  flex: {
    flexGrow: 1,
  },
  root: {
    // flexGrow: 1,
    // zIndex: 1,
    // overflow: 'hidden',
    // position: 'relative',
    display: 'flex',
    // width: '100%',
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
    marginLeft: -12,
    marginRight: 20,
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
    display: 'flex',
    backgroundColor: theme.palette.background.default,
    // padding: theme.spacing.unit * 3,
    flexGrow: 1,
    marginTop: 64,
  },
});
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
    open: true,
  };

  handleClick = () => {
    this.setState(state => ({ open: !state.open }));
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


  render() {
    const { Component, pageProps, store, router } = this.props;
    const activePage = getActivePage(router.pathname, getOrCreateStore().getState().global.user.menus);
    return (
        <Provider store={store}>
          <JssProvider
            jss={this.pageContext.jss}
            registry={this.pageContext.sheetsRegistry}
            generateClassName={this.pageContext.generateClassName}
          >
            <MuiThemeProvider
              theme={this.pageContext.theme}
              sheetsManager={this.pageContext.sheetsManager}
            >
              <CssBaseline />
              <Notifications />
               <Navbar />
               {/* <span dangerouslySetInnerHTML={{__html:'<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="24px"\n' +*/}
                   {/* '\t height="24px" viewBox="0 0 24 24" enable-background="new 0 0 24 24" xml:space="preserve">\n' +*/}
                   {/* '<g id="Bounding_Boxes">\n' +*/}
                   {/* '\t<path fill="none" d="M0,0h24v24H0V0z"/>\n' +*/}
                   {/* '</g>\n' +*/}
                   {/* '<g id="Outline">\n' +*/}
                   {/* '\t<g id="ui_x5F_spec_x5F_header">\n' +*/}
                   {/* '\t</g>\n' +*/}
                   {/* '\t<path fill="#ff0000" d="M17.27,6.73l-4.24,10.13l-1.32-3.42l-0.32-0.83l-0.82-0.32l-3.43-1.33L17.27,6.73 M21,3L3,10.53v0.98l6.84,2.65L12.48,21\n' +*/}
                   {/* '\t\th0.98L21,3L21,3z"/>\n' +*/}
                   {/* '</g>\n' +*/}
                   {/* '</svg>\n'}}> */}
               {/* </span> */}
              <main style={{ marginTop: 64 }}>
                <Sidebar
                  router={router}
                  activePage={activePage}
                  onClose={this.handleDrawerClose}
                  onOpen={this.handleDrawerOpen}
                  variant="permanent"
                  mobileOpen
                />
                <div style={{ position: 'fixed', left: 260 }}>
                  <Component pageContext={this.pageContext} {...pageProps} />
                </div>
              </main>
            </MuiThemeProvider>
          </JssProvider>
        </Provider>
    );
  }
}
export default compose(
  withStyles(styles),
  withRedux(getOrCreateStore),
)(MyApp);
// export default withRedux(getOrCreateStore)(withStyles(styles)(MyApp));
