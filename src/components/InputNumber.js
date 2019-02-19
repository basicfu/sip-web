import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel/InputLabel';
import MuiInput from '@material-ui/core/Input';
import FormControl from '@material-ui/core/FormControl/FormControl';

const styles = {
  root: {
    position: 'relative',
    width: '100%',
  },
};

class InputNumber extends React.Component {
  render() {
    const { classes, defaultValue, onChange, column } = this.props;
    const { label, required } = column || {};
    return (
      label === undefined || label === '' ? (
        <MuiInput
          classes={{ root: classes.root }}
          onChange={onChange}
          defaultValue={defaultValue}
          type="number"
        />
      ) : (
        <FormControl
        >
          <InputLabel>{`${label}${required ? '*' : ''}`}</InputLabel>
          <MuiInput
            classes={{ root: classes.root }}
            onChange={onChange}
            defaultValue={defaultValue}
            type="number"
          />
        </FormControl>
      )
    );
  }
}

export default withStyles(styles)(InputNumber);
