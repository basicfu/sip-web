import React from 'react';
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { withStyles, createMuiTheme } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import purple from '@material-ui/core/colors/purple';
import green from '@material-ui/core/colors/green';

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200,
  },
  margin: {
    margin: theme.spacing.unit,
  },
  cssLabel: {
    '&$cssFocused': {
      color: purple[500],
    },
  },
  cssFocused: {},
  cssUnderline: {
    '&:after': {
      borderBottomColor: purple[500],
    },
  },
  bootstrapRoot: {
    padding: 0,
    'label + &': {
      marginTop: theme.spacing.unit * 3,
    },
  },
  bootstrapInput: {
    borderRadius: 4,
    backgroundColor: theme.palette.common.white,
    border: '1px solid #ced4da',
    fontSize: 16,
    padding: '10px 12px',
    width: 'calc(100% - 24px)',
    transition: theme.transitions.create(['border-color', 'box-shadow']),
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    '&:focus': {
      borderColor: '#80bdff',
      boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
    },
  },
  bootstrapFormLabel: {
    fontSize: 18,
  },
});

class ModalTemplate extends React.Component {
  state = {
    name: '',
    enName: '',
    type: '',
    extra: '',
    defaultValue: '',
    required: '',
  };
  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };
  okSubmit = () => {
    const { props: { dispatch, modalType, columnItem }, namespace } = this.props;
    const newState = this.state;
    switch (modalType) {
      case 'insert':
        if (newState.name === '' || newState.name === undefined) {
          return alert('请输入字段名');
        }
        else if (newState.enName === '' || newState.enName === undefined) {
          return alert('请输入英文字段名');
        }
        else if (newState.type === '' || newState.type === undefined) {
          return alert('请输入字段类型');
        }
        else if (newState.extra === '' || newState.extra === undefined) {
          return alert('请输入扩展信息');
        }
        dispatch({
          type: `${namespace}/insert`,
          payload: {
            data: newState,
          },
        });
        break;
      case 'update':
        if (columnItem.name === '' || columnItem.name === undefined) {
          return alert('请输入字段名');
        }
        else if (columnItem.enName === '' || columnItem.enName === undefined) {
          return alert('请输入英文字段名');
        }
        else if (columnItem.type === '' || columnItem.type === undefined) {
          return alert('请输入字段类型');
        }
        else if (columnItem.extra === '' || columnItem.extra === undefined) {
          return alert('请输入扩展信息');
        }
        for (let i in newState) {
          if (!newState[i] && newState[i] !== 0) {
            delete newState[i];
          }
        }
        dispatch({
          type: `${namespace}/update`,
          payload: {
            data: { ...columnItem, ...newState },
          }
        });
        break;
      default:
        break;
    }
  };

  render() {
    const { props: { openVisible, modalType, columnItem }, classes } = this.props;
    const { name, enName, type, extra, defaultValue, required, sort } = this.state;
    return (
      <div className={classes.container}>
        <Dialog
          open={openVisible}
          onClose={() => this.props.handleCancel()}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">新建</DialogTitle>
          <DialogContent>
            <DialogContentText style={{ width: '600px' }}>
            </DialogContentText>
            <form className={classes.container}>
              <TextField
                required
                id="required"
                label="字段名"
                fullWidth
                error={(modalType === 'insert' && name === ''
                  || modalType === 'update' && columnItem.name === '') ? true : false}
                defaultValue={modalType === 'insert' ? name : columnItem.name}
                onChange={this.handleChange('name')}
              />
              <TextField
                id="enName"
                label="字段英文名"
                fullWidth
                error={(modalType === 'insert' && enName === ''
                  || modalType === 'update' && columnItem.enName === '') ? true : false}
                defaultValue={modalType === 'insert' ? enName : columnItem.enName}
                onChange={this.handleChange('enName')}
              />
              <TextField
                id="type"
                label="字段类型"
                fullWidth
                error={(modalType === 'insert' && type === ''
                  || modalType === 'update' && columnItem.type === '') ? true : false}
                defaultValue={modalType === 'insert' ? type : columnItem.type}
                onChange={this.handleChange('type')}
              />
              <TextField
                id="extra"
                label="扩展信息"
                fullWidth
                error={(modalType === 'insert' && extra === ''
                  || modalType === 'update' && columnItem.extra === '') ? true : false}
                defaultValue={modalType === 'insert' ? extra : columnItem.extra}
                onChange={this.handleChange('extra')}
              />
              <TextField
                id="defaultValueInput"
                label="默认值"
                fullWidth
                // defaultValue={modalType === 'insert' ? defaultValue : columnItem.defaultValue}
                onChange={this.handleChange('defaultValue')}
              />
              <TextField
                id="requiredInput"
                label="是否必填"
                fullWidth
                // defaultValue={modalType === 'insert' ? required : columnItem.required}
                onChange={this.handleChange('required')}
              />
              <TextField
                id="sort"
                label="顺序"
                fullWidth
                defaultValue={modalType === 'insert' ? sort : columnItem.sort}
                onChange={this.handleChange('sort')}
              />
            </form>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => this.props.handleCancel()} color="primary">
              关闭
            </Button>
            <Button onClick={this.okSubmit.bind(this)} color="primary">
              确认
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

ModalTemplate.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ModalTemplate);
