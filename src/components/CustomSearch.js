/* eslint-disable */
import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import InputAdornment from '@material-ui/core/InputAdornment/InputAdornment';
import Search from '@material-ui/icons/Search';
import TextField from '@material-ui/core/TextField/TextField';

const styles = {
  search: {
    width: 230,
    '& input': {
      fontSize: '14px',
    },
  },
  icon:{
    cursor: 'pointer'
  }
};

class CustomSearch extends React.Component {
  state={
    value: '',
  };

  handleChange=(e) => {
    this.setState({ value: e.target.value });
  };

  render() {
    const { classes,placeholder, onSearch } = this.props;
    const { value } = this.state;
    return (
      <TextField
        onChange={this.handleChange}
        onKeyDown={e => { if (e.keyCode === 13) { onSearch && onSearch(value); } }}
        className={classes.search}
        id="search"
        type="search"
        margin="normal"
        placeholder={placeholder}
        InputProps={{
          startAdornment: (
            <InputAdornment className={classes.icon} position="start">
              <Search onClick={e=>onSearch && onSearch(value)}/>
            </InputAdornment>
          ),
        }}
      />
    );
  }
}
export default withStyles(styles)(CustomSearch);
