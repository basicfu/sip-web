import React from 'react';
import {withStyles} from '@material-ui/core/styles';
import MuiSelect from '../../node_modules/@material-ui/core/Select';
import MenuItem from '../../node_modules/@material-ui/core/MenuItem/MenuItem';
import {getOrCreateStore} from 'utils/store';

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
    const option = [...(data && data[dict] && data[dict].children)] || [];
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
    const { classes } = this.props;
    const { option, value } = this.state;
    return (
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
    );
  }
}

export default withStyles(styles)(Select);
