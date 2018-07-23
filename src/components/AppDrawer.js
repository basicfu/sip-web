import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import Drawer from '@material-ui/core/Drawer';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import AppDrawerNavItem from './AppDrawerNavItem';
import Link from './Link';
import {pageToTitle} from '../utils/helpers';

const styles = theme => ({
  paper: {
    width: 230,
    backgroundColor: theme.palette.background.paper,
  },
  title: {
    color: theme.palette.text.secondary,
    marginBottom: theme.spacing.unit / 2,
    '&:hover': {
      color: theme.palette.primary.main,
    },
  },
  // https://github.com/philipwalton/flexbugs#3-min-height-on-a-flex-container-wont-apply-to-its-flex-items
  toolbarIe11: {
    display: 'flex',
  },
  toolbar: {
    ...theme.mixins.toolbar,
    paddingLeft: theme.spacing.unit * 3,
    display: 'flex',
    flexGrow: 1,
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  anchor: {
    color: theme.palette.text.secondary,
  },
  button: {
    '&:hover': {
      backgroundColor: 'transparent',
    },
  },
  active: {
    color: theme.palette.primary.main,
    fontWeight: theme.typography.fontWeightMedium,
    '&:hover': {
      backgroundColor: 'transparent',
    },
    '&:avtive': {
      backgroundColor: 'transparent',
    },
    '@global': {
      '&.MuiButton:hover': {
        backgroundColor: 'transparent',
      }
    }
  },
});

// eslint-disable-next-line react/prop-types
function renderNavItems({pages, ...params}) {
  return (
    <List>
      {pages.reduce(
        /*// eslint-disable-next-line no-use-before-define*/
      (items, page) => reduceChildRoutes({ items, page, ...params }),
      [],
      )}
    </List>
  );
}
function reduceChildRoutes({props, activePage, items, page, depth}) {
  if (page.displayNav === false) {
    return items;
  }

  if (page.children && page.children.length > 1) {
    const title = pageToTitle(page);
    const openImmediately = page.pathname.indexOf(page.pathname) === 0;
    items.push(
      <AppDrawerNavItem button  depth={depth} key={title} openImmediately={openImmediately} title={title} router={props.props.router} disablePermanent={props.disablePermanent}>
        {renderNavItems({props, pages: page.children, activePage, depth: depth + 1})}
      </AppDrawerNavItem>,
    );
  } else {
    const title = pageToTitle(page);
    page = page.children && page.children.length === 1 ? page.children[0] : page;
    items.push(
      <AppDrawerNavItem
        router={props.props.router}
        disablePermanent={props.disablePermanent}
        depth={depth}
        key={title}
        title={title}
        href={page.pathname}
        onClick={props.onClose}
      />,
    );
  }

  return items;
}

// iOS is hosted on high-end devices. We can enable the backdrop transition without
// dropping frames. The performance will be good enough.
// So: <SwipeableDrawer disableBackdropTransition={false} />
const iOS = process.browser && /iPad|iPhone|iPod/.test(navigator.userAgent);

function AppDrawer(props, context) {
  const {classes, className, disablePermanent, mobileOpen, onClose, onOpen} = props;
  const drawer = (
    <div className={classes.nav}
         style={!mobileOpen ? {width: '230px', position: 'relative'} : {width: '70px', position: 'relative'}}>
      <div className={classes.toolbarIe11}>
        <div className={classes.toolbar}>
          <Link className={classes.title} href="/" onClick={onClose}>
            <Typography variant="title" color="inherit">
              Material-UI
            </Typography>
          </Link>
          {process.env.LIB_VERSION ? (
            <Link className={classes.anchor} href="/versions">
              <Typography variant="caption">{`v${process.env.LIB_VERSION}`}</Typography>
            </Link>
          ) : null}
        </div>
      </div>
      <Divider/>
      {renderNavItems({props, classes, className, pages: context.pages, activePage: context.activePage, depth: 0})}
    </div>
  );

  return (
    <div className={className}>
      <Drawer
        style={!mobileOpen ? {width: '230px', position: 'relative'} : {width: '70px', position: 'relative'}}
        variant="permanent"
        open
      >{drawer}</Drawer>
    </div>
  );
}

AppDrawer.propTypes = {
  classes: PropTypes.object.isRequired,
  className: PropTypes.string,
  // disablePermanent: PropTypes.bool.isRequired,
  mobileOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onOpen: PropTypes.func.isRequired,
};

AppDrawer.contextTypes = {
  // activePage: PropTypes.object.isRequired,
  pages: PropTypes.array.isRequired,
};

export default withStyles(styles)(AppDrawer);
