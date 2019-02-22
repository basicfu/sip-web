const drawerWidth = 230;
export default theme => ({
  // '@global': {
  //   'html,body': {
  //     height: '100%',
  //     overflow: 'hidden',
  //   },
  //   '#__next': {
  //     height: '100%',
  //     overflow: 'hidden',
  //   },
  // },
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
