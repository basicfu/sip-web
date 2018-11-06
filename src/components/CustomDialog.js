import React, { Fragment } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import { withStyles } from '@material-ui/core/styles';
import dialog from 'utils/dialog';
import classNames from 'classnames';
import DialogContentText from '../../node_modules/@material-ui/core/DialogContentText/DialogContentText';

const styles = {
  paper: {
    width: 400,
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
    const { key, onClose } = this.props.data;
    if (onClose) {
      onClose();
    }
    dialog.close(key);
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
    const { classes, data: { width } } = this.props;
    return (
      <Dialog
        classes={{ paper: classNames(classes.paper, classes[`width${width}`]) }}
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

export default withStyles(styles)(CustomDialog);
