import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import InputLabel from '../../node_modules/@material-ui/core/InputLabel/InputLabel';
import MuiInput from '../../node_modules/@material-ui/core/Input';
import FormControl from '../../node_modules/@material-ui/core/FormControl/FormControl';

const styles = {
  root: {
    position: 'relative',
    width: '100%',
  },
};

class Input extends React.Component {
  render() {
    const { classes, defaultValue, onChange, type, column, width } = this.props;
    const { label, required } = column || {};
    return (
      label === undefined || label === '' ? (
        <MuiInput
          classes={{ root: classes.root }}
          style={{ width }}
          onChange={onChange}
          defaultValue={defaultValue}
          type={type}
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
          />
        </FormControl>
      )
    );
  }
}

export default withStyles(styles)(Input);
