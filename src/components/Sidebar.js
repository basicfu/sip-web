import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import Drawer from '@material-ui/core/Drawer';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Hidden from '@material-ui/core/Hidden';
import AppDrawerNavItem from './AppDrawerNavItem';
import Link from './Link';
import { pageToTitle } from '../utils/helpers';
import { connect } from 'dva';

const drawerWidth = 260;
const styles = theme => ({
    drawerDocked: {
      width: drawerWidth,
      height: '100%',
    },
  drawerPaper: {
    top: 'auto',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    color: '#08a',
    backgroundColor: '#f2f2f2',
    // backgroundImage: 'url("https://demos.creative-tim.com/material-dashboard-pro-react/static/media/sidebar-2.d30c9e30.jpg")',
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
  title: {
    color: theme.palette.text.secondary,
    marginBottom: theme.spacing.unit / 2,
    '&:hover': {
      color: theme.palette.primary.main,
      textDecoration: 'none',
    },
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
});

// eslint-disable-next-line react/prop-types
function renderNavItems({ pages, ...params }) {
  return (
    <List>
      {pages.reduce(
        // eslint-disable-next-line no-use-before-define
        (items, page) => reduceChildRoutes({ items, page, ...params }),
        [],
      )}
    </List>
  );
}

function reduceChildRoutes({ props, activePage, items, page, depth, router }) {
  if (page.displayNav === false) {
    return items;
  }
  const title = page.name;
  const key = page.name + page.path;
  if (page.children && page.children.length > 0) {
    const openImmediately = activePage.pathname && activePage.pathname.indexOf(page.path) === 0;

    items.push(
      <AppDrawerNavItem depth={depth} key={key} openImmediately={openImmediately} title={title} activePage={activePage}>
        {renderNavItems({ props, pages: page.children, activePage, depth: depth + 1 })}
      </AppDrawerNavItem>,
    );
  } else {
    page = page.children && page.children.length === 1 ? page.children[0] : page;

    items.push(
      <AppDrawerNavItem
        depth={depth}
        key={key}
        title={title}
        href={page.path}
        onClick={props.onClose}
        activePage={activePage}
      />,
    );
  }

  return items;
}

class Sidebar extends React.Component {
  componentDidMount() {

  }

  render() {
    const { classes, activePage, data, router } = this.props;
    const menus = data.menus || [];
    return (
      <Drawer variant="permanent" open classes={{ paper: classes.drawerPaper, docked: classes.drawerDocked }}>
        {renderNavItems({ props: this.props, pages: menus, activePage, depth: 0 })}
      </Drawer>
    );
  }
}

export default connect(state => ({
  data: state.global.user,
}))(withStyles(styles)(Sidebar));
