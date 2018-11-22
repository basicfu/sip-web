/* eslint-disable react/no-array-index-key */
import React, { Fragment } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import DeleteOutlinedIcon from '@material-ui/icons/DeleteOutlined';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import ClearIcon from '@material-ui/icons/Clear';
import DoneIcon from '@material-ui/icons/Done';
import { lighten } from '@material-ui/core/styles/colorManipulator';
import SpeedDial from '@material-ui/lab/SpeedDial/SpeedDial';
import SpeedDialIcon from '@material-ui/lab/SpeedDialIcon/SpeedDialIcon';
import SpeedDialAction from '@material-ui/lab/SpeedDialAction/SpeedDialAction';
import Assignment from '@material-ui/icons/Assignment';

const toolbarStyles = theme => ({
  root: {
    paddingRight: theme.spacing.unit,
  },
  highlight:
    theme.palette.type === 'light'
      ? {
        color: theme.palette.secondary.main,
        backgroundColor: lighten(theme.palette.secondary.light, 0.90),
      }
      : {
        color: theme.palette.text.primary,
        backgroundColor: theme.palette.secondary.dark,
      },
  spacer: {
    flex: '1 1 100%',
  },
  right: {
    flex: '0 0 auto',
    color: theme.palette.text.secondary,
    marginRight: 60,
    display: 'inline-flex',
  },
  left: {
    flex: '0 0 auto',
    paddingTop: 6,
  },
  iconGroup: {
    display: 'flex',
  },
  rowDoneIcon: {
    color: '#4caf50',
  },
  rowClearIcon: {
    color: '#ba68c8',
  },
  modalIcon: {
    color: '#ba8448',
  },
  speedDial: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
  speedActions: {
    margin: '0!important',
    padding: '0!important',
    width: 46,
    '& button': {
      margin: '10px auto',
    },
  },
  fab: {
    backgroundColor: '#d23f31',
    width: 46,
    height: 46,
    margin: '0 auto',
  },
  customActions: {
    marginRight: 60,
  },
});

class TableHeader extends React.Component {
  state = {
    open: false,
  };

  handleAdd = (edit) => {
    this.handleClose();
    this.props.onAdd(edit);
  }

  handleOpen = () => {
    if (!this.state.hidden) {
      this.setState({
        open: true,
      });
    }
  };

  handleClose = () => {
    this.setState({
      open: false,
    });
  };

  renderEdit = () => {
    const { classes, mode, onEdit } = this.props;
    if (mode === 'all') {
      return (<Fragment>
        <Tooltip title="弹窗修改">
          <IconButton color={'primary'} className={classes.modalIcon} onClick={() => onEdit('modal')}>
            <Assignment />
          </IconButton>
        </Tooltip>
        <Tooltip title="修改">
          <IconButton color={'primary'} onClick={() => onEdit('row')}>
            <EditOutlinedIcon />
          </IconButton>
        </Tooltip>
              </Fragment>);
    }
    if (mode === 'row' || mode === 'modal') {
      return (<Tooltip title="修改">
        <IconButton color={'primary'} onClick={() => onEdit('row')}>
          <EditOutlinedIcon />
        </IconButton>
              </Tooltip>);
    }
  }

  render() {
    const { numSelected, classes, tableStatus, onDelete, onDone, onClear, headerChild, mode } = this.props;
    const { open } = this.state;
    return (
      <Toolbar
        className={classNames(classes.root, {
          [classes.highlight]: numSelected > 0,
        })}
      >
        <div className={classes.left} style={{ display: numSelected > 0 ? 'inherit' : 'none' }}>
          <Typography color="inherit">
            {numSelected} selected
          </Typography>
        </div>
        <div className={classes.left} style={{ display: numSelected > 0 ? 'none' : 'inherit' }}>
          {headerChild.left}
        </div>
        <div className={classes.spacer} />
        <div className={classes.actions}>
          {numSelected > 0 ? (
            <div className={classes.iconGroup}>
              {(tableStatus === 'add' || tableStatus === 'edit') &&
              <Fragment>
                <Tooltip title="确定">
                  <IconButton color={'primary'} className={classes.rowDoneIcon} onClick={() => onDone()}>
                    <DoneIcon />
                  </IconButton>
                </Tooltip>
                <Tooltip title="取消">
                  <IconButton color={'secondary'} className={classes.rowClearIcon} onClick={() => onClear()}>
                    <ClearIcon />
                  </IconButton>
                </Tooltip>
              </Fragment>
              }
              {tableStatus !== 'add' &&
              <Fragment>
                {numSelected === 1 && this.renderEdit()}
                <Tooltip title="删除">
                  <IconButton color={'secondary'} onClick={() => onDelete()}>
                    <DeleteOutlinedIcon />
                  </IconButton>
                </Tooltip>
              </Fragment>
              }
            </div>
          ) : (
            <Fragment>
              <div className={classes.right}>
                {headerChild.right}
              </div>
              {mode !== 'false' && <SpeedDial
                direction="down"
                ariaLabel="SpeedDial"
                className={classes.speedDial}
                classes={{ fab: classes.fab, actions: classes.speedActions }}
                hidden={false}
                icon={<SpeedDialIcon openIcon={<EditOutlinedIcon />} />}
                onBlur={this.handleClose}
                onClick={() => this.handleAdd('row')}
                onClose={this.handleClose}
                onFocus={this.handleOpen}
                onMouseEnter={this.handleOpen}
                onMouseLeave={this.handleClose}
                open={open}
              >
                {mode === 'all' ?
                  <SpeedDialAction
                    key="1"
                    icon={<Assignment />}
                    tooltipTitle="弹窗添加"
                    onClick={() => this.handleAdd('modal')}
                  />
                  :
                  'tip'
                }
                                   </SpeedDial>}
            </Fragment>
          )}
        </div>
      </Toolbar>
    );
  }
}

TableHeader.propTypes = {
  numSelected: PropTypes.number.isRequired,
};
export default withStyles(toolbarStyles)(TableHeader);
