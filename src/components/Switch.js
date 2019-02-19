import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import MuiSwitch from '@material-ui/core/Switch/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel/FormControlLabel';

const styles = {
  paper: {
    width: 400,
    top: 150,
    position: 'absolute',
  },
  warning: {
    verticalAlign: 'bottom',
    marginRight: '10px',
    color: '#faad14',
  },
};

class Switch extends React.Component {
  state = {
    checked: false,
  };

  componentDidMount() {
    const { checked } = this.props;
    this.setState({ checked: checked === true });
  }

  handleChange = (e) => {
    const checked = e.target.checked;
    this.setState({ checked });
    this.props.onChange(checked);
  };

  render() {
    const { checked } = this.state;
    const { column } = this.props;
    const { label, required } = column || {};
    return (
      label === undefined || label === '' ? (
        <MuiSwitch
          checked={checked}
          onChange={this.handleChange}
        />
      ) : (
        <FormControlLabel
          control={
            <MuiSwitch
              checked={checked}
              onChange={this.handleChange}
            />
          }
          label={`${label}${required ? '*' : ''}`}
        />
      )
    );
  }
}

export default withStyles(styles)(Switch);
