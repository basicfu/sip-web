/* eslint-disable react/no-danger */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import Button from '@material-ui/core/Button';
import Collapse from '@material-ui/core/Collapse';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import Link from './Link';

const styles = theme => ({
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
  menuLabel:{
    marginLeft: 6,
    cursor: 'pointer',
  }
});

class AppDrawerNavItem extends React.Component {
  state = {
    open: this.props.open,
  };

  componentDidMount() {
    // So we only run this logic once.
    if (!this.props.open) {
      return;
    }
    // Center the selected item in the list container.
    const activeElement = document.querySelector(`.${this.props.classes.active}`);
    if (activeElement && activeElement.scrollIntoView) {
      activeElement.scrollIntoView({});
    }
  }

  handleClick = () => {
    this.setState(state => ({ open: !state.open }));
  };

  render() {
    const {
      children,
      classes,
      depth,
      href,
      onClick,
      title,
      icon,
      activePage,
      ...other
    } = this.props;

    const style = {
      paddingLeft: 8 * (2 + 3 * depth),
    };
    if (href) {
      return (
        <ListItem className={classes.itemLeaf} disableGutters {...other}>
          <Button
            component={props => (
                <Link variant="button" title={title} activeClassName={classes.active} href={href} {...props} activePage={activePage}>
                   <span style={{ width: 24, height: 24 }} dangerouslySetInnerHTML={{ __html: icon }} />
                  <label className={classes.menuLabel}>{title}</label>
                </Link>
            )}
            className={classNames(classes.buttonLeaf, `depth-${depth}`)}
            disableRipple
            onClick={onClick}
            style={style}
          >-
          </Button>
        </ListItem>
      );
    }

    return (
      <ListItem className={classes.item} disableGutters {...other}>
        <Button
          classes={{
            root: classes.button,
          }}
          onClick={this.handleClick}
          style={style}
        >
          <span style={{ width: 24, height: 24 }} dangerouslySetInnerHTML={{ __html: icon }} />
          <label className={classes.menuLabel}>{title}</label>
          <span style={{ width: 24, height: 24, position: 'absolute', right: 16 }}>{this.state.open ? <ExpandLess /> : <ExpandMore />}</span>
        </Button>
        <Collapse in={this.state.open} timeout="auto" unmountOnExit>
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
  open: PropTypes.bool,
  title: PropTypes.string.isRequired,
};

AppDrawerNavItem.defaultProps = {
  open: false,
};

export default withStyles(styles)(AppDrawerNavItem);
