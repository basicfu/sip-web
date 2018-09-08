import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'dva';
import styles from 'styles/login';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Input from '@material-ui/core/Input';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import Grid from '@material-ui/core/Grid';

class Login extends React.Component {
  state = {
    username: '',
    password: '',
    showPassword: false,
  };

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };

  handleChangeCheck = name => event => {
    this.setState({ [name]: event.target.checked });
  };

  handleLogin = () => {
    const { username, password } = this.state;
    this.props.dispatch({ type: 'user/login', payload: { username, password } });
  };

  handleMouseDownPassword = event => {
    event.preventDefault();
  };

  handleClickShowPassword = () => {
    this.setState(state => ({ showPassword: !state.showPassword }));
  };

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.box}>
        <Grid className={classes.container}>
          <div className={classes.main}>
            <div className={classes.logo}>
              <h1 className={classes.logoTitle}>登陆</h1>
            </div>
            <div className={classes.conPadding}>
              <Grid item xs={12} style={{ marginBottom: '40px', marginTop: '20px' }}>
                <TextField
                  fullWidth
                  id="name"
                  label="Username"
                  className={classes.textField}
                  value={this.state.name}
                  onChange={this.handleChange('username')}
                />
              </Grid>
              <Grid item xs={12} style={{ marginBottom: '40px' }}>
                <FormControl fullWidth>
                  <InputLabel htmlFor="adornment-password">Password</InputLabel>
                  <Input
                    id="adornment-password"
                    type={this.state.showPassword ? 'text' : 'password'}
                    value={this.state.password}
                    onChange={this.handleChange('password')}
                    onKeyDown={e => { if (e.keyCode === 13) { this.handleLogin(); } }}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="Toggle password visibility"
                          onClick={this.handleClickShowPassword}
                          onMouseDown={this.handleMouseDownPassword}
                        >
                          {this.state.showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    }
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12} className={classes.buttonCon}>
                <Button
                variant="contained"
                color="primary"
                onClick={this.handleLogin}
                        className={classes.button}>登录
                </Button>
              </Grid>
            </div>
          </div>
          <div className={classes.pwdCon}>
            <div className={classes.pwdLeft}>
              <a href="javascript:;">忘记密码</a>
            </div>
            <div className={classes.pwdRight}>
              <a href="javascript:;">创建帐号</a>
            </div>
          </div>
        </Grid>
        {/* </div> */}
      </div>
    );
  }
}

export default connect(state => ({
  data: state.global,
}))(withStyles(styles)(Login));
