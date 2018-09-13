import React, { Fragment } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import Warning from '@material-ui/icons/Warning';
import { withStyles } from '@material-ui/core/styles';
import dialog from 'utils/dialog';

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
    const { classes, type, data: { title, children } } = this.props;
    if (type === 'warning') {
      return (<DialogTitle>
        <Warning className={classes.warning} />
        {title || '确定要删除吗?'}
              </DialogTitle>);
    }
    if (type === 'content') {
      return (<Fragment>
        <DialogTitle>
          {title || '提示'}
        </DialogTitle>
        <div className={classes.content}>{children}</div>
              </Fragment>);
    }
    return '';
  }

  render() {
    const { classes, type, data: { title } } = this.props;
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
