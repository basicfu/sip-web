import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import Button from '@material-ui/core/Button';
import Collapse from '@material-ui/core/Collapse';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import Link from './Link';

const styles = theme => ({
  item: {
    display: 'block',
    paddingTop: 0,
    paddingBottom: 0,
    // background: '#1890ff',
    color: '#fff',
    '&:hover': {
      backgroundColor: 'transparent',
    },
  },
  itemLeaf: {
    display: 'flex',
    paddingTop: 0,
    paddingBottom: 0,
  },
  noItem: {
    display: 'block',
    paddingTop: 0,
    paddingBottom: 0,
    background: 'transparent',
  },
  button: {
    justifyContent: 'flex-start',
    textTransform: 'none',
    backgroundColor: 'transparent',
    // width: '100%',
    '&:hover': {
      backgroundColor: 'transparent',
    },
  },
  buttonLeaf: {
    justifyContent: 'flex-start',
    textTransform: 'none',
    width: '100%',
    fontWeight: theme.typography.fontWeightRegular,
    '&.depth-0': {
      fontWeight: theme.typography.fontWeightMedium,
    },
  },
  active: {
    color: '#2196f3',
    fontWeight: theme.typography.fontWeightMedium,
    '&:hover': {
      backgroundColor: 'transparent',
    },
  },
  showButton: {
    paddingLeft: '16px',
    display: 'none',
    position: 'absolute',
    left: '58px',
    top: '-3px',
    '&:hover': {
      backgroundColor: 'transparent',
    },
  },
  hideButton: {
    paddingLeft: '16px',
    display: 'block',
    position: 'absolute',
    left: '58px',
    top: '-3px',
    '&:hover': {
      backgroundColor: 'transparent',
    },
  },
  showButtonSub: {
    display: 'none',
    '&:hover': {
      backgroundColor: 'transparent',
    },
  },
  hideButtonSub: {
    display: 'block',
    '&:hover': {
      backgroundColor: 'transparent',
    },
  },
  tooltip: {
    marginLeft: '30px',
  }
});

class AppDrawerNavItem extends React.Component {
  state = {
    open: this.props.openImmediately,
  };

  componentDidMount() {
    // So we only run this logic once.
    if (!this.props.openImmediately) {
      return;
    }

    // Center the selected item in the list container.
    const activeElement = document.querySelector(`.${this.props.classes.active}`);
    if (activeElement && activeElement.scrollIntoView) {
      activeElement.scrollIntoView({});
    }
  }

  handleClick = () => {
    this.setState(state => ({open: !state.open}));
  };

  render() {
    const {
      children,
      classes,
      depth,
      href,
      onClick,
      openImmediately,
      title,
      router,
      disablePermanent,
      ...other
    } = this.props;
    const style = {
      paddingLeft: 8 * (2 + 2 * depth),
    };
    const styleMargin = {
      marginLeft: '18px'
    }
    if (href) {
      return (

        <ListItem  className={router && router.pathname === href ? classes.item: classes.noItem} disableGutters {...other} button onClick={onClick} mode="vertical"
                  tooltip="Bases de dados">
          <Button
            className={classes.button}
            component={props => (
              <Link variant="button" activeClassName={classes.active}
                    href={href} {...props} router={router}/>
            )}
            disableRipple
            style={style}
          >
            <ListItemIcon>
              <InboxIcon style={styleMargin} />
            </ListItemIcon>
           <div className={disablePermanent ? classes.showButtonSub : classes.hideButtonSub}>{title}</div>
          </Button>
        </ListItem>
      );
    }

    return (
      <ListItem className={router && router.pathname === href ? classes.item: classes.noItem}  disableGutters {...other}
                onClick={this.handleClick}>
        <div>
          <ListItemIcon>
            <InboxIcon style={{marginLeft: '33px',marginTop: '5px'}}/>
          </ListItemIcon>
          <Button
            className={disablePermanent ? classes.showButton : classes.hideButton}
            >
            <div style={{float: 'right'}}>{title}</div>
          </Button>
        </div>
        <Collapse in={this.state.open}>
          {children}
        </Collapse>
      </ListItem>
    );
  }
}

AppDrawerNavItem.propTypes = {
  children: PropTypes.node,
  classes: PropTypes.object.isRequired,
  depth: PropTypes.number.isRequired,
  href: PropTypes.string,
  onClick: PropTypes.func,
  openImmediately: PropTypes.bool,
  title: PropTypes.string.isRequired,
};

AppDrawerNavItem.defaultProps = {
  openImmediately: false,
};

export default withStyles(styles)(AppDrawerNavItem);
