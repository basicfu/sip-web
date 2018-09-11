import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import MuiSwitch from '../../node_modules/@material-ui/core/Switch/Switch';

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
  state={
    checked: false,
  };

  componentDidMount() {
    const { checked } = this.props;
    this.setState({ checked: checked === true });
  }

  handleChange=(e) => {
    const checked = e.target.checked;
    this.setState({ checked });
    this.props.onChange(checked);
  };

  render() {
    const { checked } = this.state;

    return (
      <MuiSwitch
        checked={checked}
        onChange={this.handleChange}
      />
    );
  }
}

export default withStyles(styles)(Switch);
