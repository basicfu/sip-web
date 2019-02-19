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

class Input extends React.Component {
  render() {
    const { classes, defaultValue, onChange, type, column, width, multi } = this.props;
    const { label, required } = column || {};
    return (
      label === undefined || label === '' ? (
        <MuiInput
          classes={{ root: classes.root }}
          style={{ width }}
          onChange={onChange}
          defaultValue={defaultValue}
          type={type}
          multiline={multi}
        />
      ) : (
        <FormControl
        >
          <InputLabel>{`${label}${required ? '*' : ''}`}</InputLabel>
          <MuiInput
            classes={{ root: classes.root }}
            style={{ width }}
            onChange={onChange}
            defaultValue={defaultValue}
            type={type}
            multiline={multi}
          />
        </FormControl>
      )
    );
  }
}
Input.defaultProps = {
  multi: false,
};
export default withStyles(styles)(Input);
