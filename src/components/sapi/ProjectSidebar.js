import React, { Fragment } from 'react';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import Folder from '@material-ui/icons/Folder';
import FolderOpen from '@material-ui/icons/FolderOpen';
import ListItem from '@material-ui/core/ListItem';
import classNames from 'classnames';
import Collapse from '@material-ui/core/Collapse';
import ExpandLess from '@material-ui/icons/ExpandLess';
import MoreHoriz from '@material-ui/icons/MoreHoriz';
import NextLink from 'next/link';
import Link from '@material-ui/core/Link';
import IconButton from '@material-ui/core/IconButton';
import Fab from '@material-ui/core/Fab';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Router from 'next/router';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import Divider from '@material-ui/core/Divider';
import SearchIcon from '@material-ui/icons/Search';
import CreateNewFolder from '@material-ui/icons/CreateNewFolderOutlined';
import Settings from '@material-ui/icons/SettingsOutlined';
import DirectionsIcon from '@material-ui/icons/Directions';
import InputAdornment from '@material-ui/core/InputAdornment';
import TextField from '@material-ui/core/TextField';

const drawerWidth = 230;
const styles = theme => ({
  drawer: {
    width: '100%',
    height: '100%',
    flexShrink: 0,
  },
  drawerPaper: {
    width: '100%',
    position: 'inherit',
  },
  item: {
    display: 'block',
    paddingTop: 0,
    paddingBottom: 0,
  },
  itemLeaf: {
    height: 48,
    display: 'flex',
    paddingTop: 0,
    paddingBottom: 0,
  },
  button: {
    height: 48,
    justifyContent: 'flex-start',
    textTransform: 'none',
    width: '100%',
    borderRadius: 0,
    color: 'rgba(0, 0, 0, 0.65)',
  },
  buttonLeaf: {
    color: 'rgba(0, 0, 0, 0.65)',
    justifyContent: 'flex-start',
    textTransform: 'none',
    width: '100%',
    height: '100%',
    borderRadius: 0,
    fontWeight: theme.typography.fontWeightRegular,
    '&.depth-0': {
      fontWeight: theme.typography.fontWeightMedium,
    },
  },
  active: {
    // color: theme.palette.primary.main,
    // backgroundColor: theme.palette.primary.main,
    fontWeight: theme.typography.fontWeightMedium,
    '&:hover': {
      backgroundColor: '#e6f7ff',
    },
    borderRight: '3px solid #1890ff',
    color: '#1890ff',
    backgroundColor: '#e6f7ff',
  },
  menuLabel: {
    marginLeft: 6,
    cursor: 'pointer',
  },
  a: {
    textDecoration: 'none',
    '&:hover': {
      textDecoration: 'inherit',
    },
  },
  moreOperation: {
    position: 'absolute',
    right: 0,
  },
  listIcon: {
    margin: '0',
  },
  listText: {
    padding: '0 6px',
    '& span': {
      color: 'rgba(0, 0, 0, 0.65)',
      fontSize: '0.875rem',
      letterSpacing: '0.02857em',
    },
  },
  list: {
    // '&:focus':{
    //   fontWeight: 400,
    //   borderRight: '3px solid #1890ff',
    //   color: '#1890ff',
    //   backgroundColor: '#e6f7ff',
    // }
  },
  input: {
    width: 'calc( 100% - 106px )',
    margin: '0 10px 0 0',
  },
});
const Directory = withStyles(styles)(({ classes, projectId, categoryId, depth, title, children, projectSelectd }) => {
  const [open, setOpen] = React.useState(false);
  const [hover, setHover] = React.useState(false);
  const style = {
    paddingLeft: 8 * (2 + 3 * depth),
  };
  const directoryChange = () => {
    setOpen(!open);
    const asUrl = depth === 0 ? `/sapi/project/${projectId}/interface` : `/sapi/project/${projectId}/interface/category/${categoryId}`;
    Router.push('/sapi/interface', asUrl);
  };
  return (
    <Fragment>
      <ListItem
        selected={projectSelectd}
        className={classes.list}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        // className={classes.item}
        onClick={() => directoryChange()}
        button
        style={style}
      >
        <ListItemIcon className={classes.listIcon}>
          {open ? <FolderOpen /> : <Folder />}
        </ListItemIcon>
        <ListItemText className={classes.listText} primary={title} />
        <IconButton
          style={{ display: depth === 0 && hover ? undefined : 'none' }}
          className={classes.moreOperation}
          onClick={(e) => e.stopPropagation()}
        >
          <MoreHoriz />
        </IconButton>
      </ListItem>
      <Collapse in={open} timeout="auto" unmountOnExit>
        {children}
      </Collapse>
    </Fragment>

  );
});
const Interface = withStyles(styles)(({ classes, projectId, interfaceId, depth, title }) => {
  const [hover, setHover] = React.useState(false);
  const style = {
    paddingLeft: 8 * (2 + 3 * depth),
  };
  const interfaceChange = () => {
    Router.push('/sapi/run', `/sapi/project/${projectId}/interface/${interfaceId}/run`);
  };
  return (
    <ListItem
      // selected={projectSelectd}
      className={classes.list}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      // className={classes.item}
      onClick={() => interfaceChange()}
      button
      style={style}
    >
      <ListItemText className={classes.listText} primary={title} />
      <IconButton
        style={{ display: depth === 0 && hover ? undefined : 'none' }}
        className={classes.moreOperation}
        onClick={(e) => e.stopPropagation()}
      >
        <MoreHoriz />
      </IconButton>
    </ListItem>
  );
});

// eslint-disable-next-line react/prop-types
function renderNavItems({ items, depth, projectId }) {
  // let projectId = 0;
  // if (process.browser && depth === 0) {
  //   const split = Router.asPath.split('/');
  //   if (split.length === 4) {
  //     projectId = parseInt(split[3], 10);
  //   }
  // }
  return (
    <List style={{ padding: 0 }}>
      {items.reduce((children, item) => {
          const realProjectId = depth === 0 ? item.id : projectId;
          const haveChildren = item.children && item.children.length > 0;
          if (depth === 0 || haveChildren) {
            children.push(
              <Directory
                key={item.id}
                projectId={realProjectId}
                categoryId={item.id}
                depth={depth}
                title={item.name}
                projectSelectd={item.id === projectId}
              >
                {haveChildren && renderNavItems({ items: item.children, depth: depth + 1, projectId: realProjectId })}
              </Directory>,
            );
          } else {
            children.push(
              <Interface
                key={item.id}
                projectId={realProjectId}
                interfaceId={item.id}
                depth={depth}
                title={item.name}
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

function ProjectSidebar({ classes, items }) {
  return (
    <Fragment>
      <Paper elevation={1}>
        <IconButton>
          <SearchIcon />
        </IconButton>
        <InputBase type="search" className={classes.input} />
        <IconButton>
          <CreateNewFolder />
        </IconButton>
      </Paper>
      <Divider />
      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        {renderNavItems({ items, depth: 0 })}
      </Drawer>
    </Fragment>
  );
}

export default withStyles(styles)(ProjectSidebar);


//
// <ListItem className={classes.itemLeaf} disableGutters>
//   <Button
//     component={props => (
//       <NextLink passHref href="/sapi/interface" as={`/sapi/interface/${id}`}>
//         <a className={classes.a} {...props}>
//           <label className={classes.menuLabel}>{title}</label>
//         </a>
//       </NextLink>
//     )}
//     className={classNames(classes.buttonLeaf, `depth-${depth}`)}
//     disableRipple
//     style={style}
//   >-
//   </Button>
// </ListItem>
