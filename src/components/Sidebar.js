import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import Drawer from '@material-ui/core/Drawer';
import AppDrawerNavItem from './AppDrawerNavItem';
import { connect } from 'dva';

const drawerWidth = 230;
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
    backgroundColor: '#fff',
    // backgroundImage: 'url("https://demos.creative-tim.com/material-dashboard-pro-react/static/media/sidebar-2.d30c9e30.jpg")',
    // backgroundSize: 'cover',
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
    <List style={{ padding: 0 }}>
      {pages.reduce(
        // eslint-disable-next-line no-use-before-define
        (items, page) => reduceChildRoutes({ items, page, ...params }),
        [],
      )}
    </List>
  );
}

function reduceChildRoutes({ props, activePage, items, page, depth }) {
  if (page.displayNav === false) {
    return items;
  }
  if (page.children && page.children.length > 0) {
    const openImmediately = activePage.path && page.children.map(item => item.path).indexOf(activePage.path) !== -1;
    items.push(
      <AppDrawerNavItem
        depth={depth}
        key={page.path}
        openImmediately={openImmediately}
        title={page.name}
        activePage={activePage}
        icon={page.icon}>
        {renderNavItems({ props, pages: page.children, activePage, depth: depth + 1 })}
      </AppDrawerNavItem>,
    );
  } else {
    page = page.children && page.children.length === 1 ? page.children[0] : page;
    items.push(
      <AppDrawerNavItem
        depth={depth}
        key={page.path}
        title={page.name}
        href={page.path}
        icon={page.icon}
        onClick={props.onClose}
        activePage={activePage}
      />,
    );
  }
  return items;
}

class Sidebar extends React.Component {
  render() {
    const { classes, activePage, data } = this.props;
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
