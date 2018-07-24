import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { MuiThemeProvider, withStyles } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import Button from '@material-ui/core/Button';
import Collapse from '@material-ui/core/Collapse';
import DeleteIcon from '@material-ui/icons/Delete';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import Link from './Link';
import { ListItemIcon, ListItemText } from '@material-ui/core';

const styles = theme => ({
  item: {
    display: 'block',
    paddingTop: 0,
    paddingBottom: 0,
  },
  itemLeaf: {
    display: 'flex',
    paddingTop: 0,
    paddingBottom: 0,
  },
  button: {
    justifyContent: 'flex-start',
    textTransform: 'none',
    width: '100%',
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
    // color: theme.palette.primary.main,
    backgroundColor: theme.palette.primary.main,
    fontWeight: theme.typography.fontWeightMedium,
    '&:hover': {
      backgroundColor: theme.palette.primary.main,
    },
  },
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
    this.setState(state => ({ open: !state.open }));
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
                  {/* <span dangerouslySetInnerHTML={{__html:'<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="24px"\n' +*/}
                  {/* '\t height="24px" viewBox="0 0 24 24" enable-background="new 0 0 24 24" xml:space="preserve">\n' +*/}
                  {/* '<g id="Bounding_Boxes">\n' +*/}
                  {/* '\t<path fill="none" d="M0,0h24v24H0V0z"/>\n' +*/}
                  {/* '</g>\n' +*/}
                  {/* '<g id="Outline">\n' +*/}
                  {/* '\t<g id="ui_x5F_spec_x5F_header">\n' +*/}
                  {/* '\t</g>\n' +*/}
                  {/* '\t<path d="M17.27,6.73l-4.24,10.13l-1.32-3.42l-0.32-0.83l-0.82-0.32l-3.43-1.33L17.27,6.73 M21,3L3,10.53v0.98l6.84,2.65L12.48,21\n' +*/}
                  {/* '\t\th0.98L21,3L21,3z"/>\n' +*/}
                  {/* '</g>\n' +*/}
                  {/* '</svg>\n'}}> */}
                  {/* </span> */}
                  <span style={{ width: 24, height: 24 }}><DeleteIcon /></span>
                  <label style={{ marginLeft: 6 }}>{title}</label>
                </Link>
            )}
            className={classNames(classes.buttonLeaf, `depth-${depth}`)}
            disableRipple
            onClick={onClick}
            style={style}
          >-</Button>
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
          <span style={{ width: 24, height: 24 }}><DeleteIcon /></span>
          <label style={{ marginLeft: 6 }}>{title}</label>
          <span style={{ width: 24, height: 24,position: 'absolute',right: 16 }}>{this.state.open ? <ExpandLess /> : <ExpandMore />}</span>
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
  openImmediately: PropTypes.bool,
  title: PropTypes.string.isRequired,
};

AppDrawerNavItem.defaultProps = {
  openImmediately: false,
};

export default withStyles(styles)(AppDrawerNavItem);
