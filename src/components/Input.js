import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import InputLabel from '../../node_modules/@material-ui/core/InputLabel/InputLabel';
import MuiInput from '../../node_modules/@material-ui/core/Input';
import FormControl from '../../node_modules/@material-ui/core/FormControl/FormControl';

const styles = {
  input: {
    '& input': {
      width: '100%',
    },
  },
};

class Input extends React.Component {
  render() {
    const { classes, defaultValue, onChange, column: { label, required } } = this.props;
    return (
      label === undefined || label === '' ? (
        <MuiInput
          className={classes.input}
          onChange={onChange}
          defaultValue={defaultValue}
        />
      ) : (
        <FormControl
        >
          <InputLabel>{`${label}${required ? '*' : ''}`}</InputLabel>
          <MuiInput
            className={classes.input}
            onChange={onChange}
            defaultValue={defaultValue}
          />
        </FormControl>
      )
    );
  }
}

export default withStyles(styles)(Input);
