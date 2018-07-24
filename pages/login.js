import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'dva';
import styles from 'styles/user-template';
import { Button, TextField } from '@material-ui/core';

const namespace = 'user';

class Login extends React.Component {
  state = {
    username: '',
    password: '',
  };

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };

  handleLogin = () => {
    const { username, password } = this.state;
    this.props.dispatch({ type: 'user/login', payload: { username, password } });
  };

  render() {
    const { classes } = this.props;
    return (
      <div>
        <TextField
          id="name"
          label="Name"
          className={classes.textField}
          value={this.state.name}
          onChange={this.handleChange('username')}
          margin="normal"
        />
        <TextField
          id="uncontrolled"
          label="Uncontrolled"
          type="password"
          onChange={this.handleChange('password')}
          className={classes.textField}
          margin="normal"
        />
        <Button onClick={this.handleLogin} className={classes.button}>登录</Button>
      </div>
    );
  }
}

export default connect(state => ({
  data: state.global,
}))(withStyles(styles)(Login));
