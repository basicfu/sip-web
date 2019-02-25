import React, { Fragment } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import { withStyles } from '@material-ui/core/styles';
import dialog from 'utils/dialog';
import classNames from 'classnames';
import DialogContentText from '@material-ui/core/DialogContentText';

const styles = {
  paper: {
    maxWidth: 2400,
  },
  width100: {
    width: 100,
  },
  width200: {
    width: 200,
  },
  width300: {
    width: 300,
  },
  width400: {
    width: 400,
  },
  width500: {
    width: 500,
  },
  width600: {
    width: 600,
  },
  width700: {
    width: 700,
  },
  width800: {
    width: 800,
  },
  width900: {
    width: 900,
  },
  width1000: {
    width: 1000,
  },
  top100: {
    position: 'absolute',
    top: 100,
  },
  top200: {
    position: 'absolute',
    top: 200,
  },
  top300: {
    position: 'absolute',
    top: 300,
  },
  top400: {
    position: 'absolute',
    top: 400,
  },
  top500: {
    position: 'absolute',
    top: 500,
  },
  warning: {
    verticalAlign: 'bottom',
    marginRight: '10px',
    color: '#faad14',
  },
  content: {
    margin: '0 20px',
    display: 'grid',
  },
};

class CustomDialog extends React.Component {
  handleClose = () => {
    const { id, onClose } = this.props;
    if (onClose) {
      onClose();
    }
    dialog.close(id);
  };

  handleOk = () => {
    this.props.onOk();
  };

  renderChildren() {
    const { classes, title, content } = this.props;
    const isString = typeof content === 'string' || typeof content === 'undefined';
    return (
      <Fragment>
        <DialogTitle>
          {title || '提示'}
        </DialogTitle>
        <div className={classes.content}>
          {isString ?
            <DialogContentText id="alert-dialog-description">
              {content}
            </DialogContentText>
            :
            content
          }
        </div>
      </Fragment>);
  }

  render() {
    const { classes, width, top } = this.props;
    return (
      <Dialog
        classes={{ paper: classNames(classes.paper, classes[`width${width}`], classes[`top${top}`]) }}
        open
        scroll="paper"
        onClose={this.handleClose}
      >
        {this.renderChildren()}
        <DialogActions>
          <Button onClick={this.handleClose} color="primary">
            取消
          </Button>
          <Button onClick={this.handleOk} color="primary">
            确定
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}
CustomDialog.defaultProps = {
  width: 400,
};
export default withStyles(styles)(CustomDialog);
