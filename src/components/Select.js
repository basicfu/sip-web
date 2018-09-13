import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import MuiSelect from '../../node_modules/@material-ui/core/Select';
import MenuItem from '../../node_modules/@material-ui/core/MenuItem/MenuItem';
import { getOrCreateStore } from 'utils/store';
import MuiSwitch from '../../node_modules/@material-ui/core/Switch/Switch';
import FormControlLabel from '../../node_modules/@material-ui/core/FormControlLabel/FormControlLabel';
import FormControl from '../../node_modules/@material-ui/core/FormControl/FormControl';
import InputLabel from '../../node_modules/@material-ui/core/InputLabel/InputLabel';

const styles = {
  root: {
    fontSize: 14,
  },
};

class Select extends React.Component {
  state={
    value: '',
    option: [],
  };

  componentDidMount() {
    const { dict, defaultValue } = this.props;
    const data = getOrCreateStore().getState().global.dict;
    const defaultOption = this.props.default;
    const option = [...(data && data[dict] && data[dict].children) || []];
    let value = '';
    if (defaultOption) {
      option.unshift(defaultOption);
      value = defaultOption.value;
    }
    if (defaultValue) {
      value = defaultValue;
    }
    this.setState({ option, value });
  }

  handleChange=(e) => {
    const defaultOption = this.props.default;
    let value = e.target.value;
    this.setState({ value });
    // 过滤未选择下拉值
    if (defaultOption && value === defaultOption.value) {
      value = undefined;
    }
    this.props.onChange(value);
  }

  render() {
    const { classes, column: { label, required } } = this.props;
    const { option, value } = this.state;
    return (
      label === undefined || label === '' ? (
        <MuiSelect
          className={classes.root}
          displayEmpty
          value={value}
          onChange={this.handleChange}
        >
          {option.map(it =>
            <MenuItem key={it.value} value={it.value}>{it.name}</MenuItem>,
          )}
        </MuiSelect>
      ) : (
        <FormControl>
          <InputLabel>{`${label}${required ? '*' : ''}`}</InputLabel>
          <MuiSelect
            className={classes.root}
            displayEmpty
            value={value}
            onChange={this.handleChange}
          >
            {option.map(it =>
              <MenuItem key={it.value} value={it.value}>{it.name}</MenuItem>,
            )}
          </MuiSelect>
        </FormControl>
        )
    );
  }
}

export default withStyles(styles)(Select);
