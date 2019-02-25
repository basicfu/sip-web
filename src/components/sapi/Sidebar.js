import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import Drawer from '@material-ui/core/Drawer';
import AppDrawerNavItem from 'components/AppDrawerNavItem';

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
function renderNavItems({ items, path, selectKey, depth, onClick }) {
  return (
    <List style={{ padding: 0 }}>
      {items.reduce(
        (children, item) => {
          if (item.display === false) {
            return children;
          }
          if (item.children && item.children.length > 0) {
            // 父层是否应该直接open
            const open = path[depth] === item.id;
            children.push(
              <AppDrawerNavItem
                depth={depth}
                key={item.id}
                open={open}
                title={item.name}
                // selectKey={selectKey}
                icon={item.icon}>
                {renderNavItems({ items: item.children, path, selectKey, depth: depth + 1, onClick })}
              </AppDrawerNavItem>,
            );
          } else {
            item = item.children && item.children.length === 1 ? item.children[0] : item;
            children.push(
              <AppDrawerNavItem
                depth={depth}
                key={item.path}
                title={item.name}
                href={item.path}
                icon={item.icon}
                // selectKey={selectKey}
                onClick={onClick}
              />,
            );
          }
          return children;
        },
        [],
      )}
    </List>
  );
}
function findPath(items, key) {
  const path = [];
  if (!items || items.length === 0) {
    return path;
  }
  for (let i = 0; i < items.length; i += 1) {
    const item = items[i];
    path.push(items.id);
    if (key === item.id && (!item.children || item.children.length === 0)) {
      return path;
    }
    if (item.children && item.children.length > 0) {
      const result = findPath(item.children, key);
      if (result.length !== 0) {
        path.push(...result);
        return result;
      }
    }
    path.pop();
  }
  return [];
}

function Sidebar(props) {
  const [selectKey, setSelectKey] = React.useState('');
  const { classes, items } = props;
  const path = findPath(items, selectKey);
  return (
    <Drawer variant="permanent" open classes={{ paper: classes.drawerPaper, docked: classes.drawerDocked }}>
      {renderNavItems({ items, path, selectKey, depth: 0, setSelectKey })}
    </Drawer>
  );
}
export default withStyles(styles)(Sidebar);
