import React, { Fragment } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import { withStyles } from '@material-ui/core/styles';
import dialog from 'utils/dialog';
import DialogContentText from '../../node_modules/@material-ui/core/DialogContentText/DialogContentText';

const styles = {
  paper: {
    width: 400,
    top: -80,
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

/**
 * 如果需要动态控制width
 * 预先提供N种width的宽度，然后选择一种
 */
class CustomDialog extends React.Component {
  handleClose = () => {
    const { onClose } = this.props.data;
    if (onClose) {
      onClose();
    }
    dialog.close();
  };

  handleOk = () => {
    this.props.data.onOk();
  };

  renderChildren() {
    const { classes, data: { title, content } } = this.props;
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
    const { classes } = this.props;
    return (
      <Dialog
        classes={{ paper: classes.paper }}
        open
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

export default withStyles(styles)(CustomDialog);
