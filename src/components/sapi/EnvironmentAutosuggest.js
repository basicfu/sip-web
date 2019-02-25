import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import deburr from 'lodash/deburr';
import Autosuggest from 'react-autosuggest';
import match from 'autosuggest-highlight/match';
import parse from 'autosuggest-highlight/parse';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import MenuItem from '@material-ui/core/MenuItem';
import { withStyles } from '@material-ui/core/styles';

function renderInputComponent(inputProps) {
  const {
    classes, inputRef = () => {
    }, ref, ...other
  } = inputProps;

  return (
    <TextField
      fullWidth
      InputProps={{
        inputRef: node => {
          ref(node);
          inputRef(node);
        },
        classes: {
          input: classes.input,
        },
      }}
      {...other}
    />
  );
}

function renderSuggestion(suggestion, { query, isHighlighted }) {
  const matches = match(suggestion.host, query);
  const parts = parse(suggestion.host, matches);
  return (
    <MenuItem selected={isHighlighted} component="div">
      <div>
        [{suggestion.label}]
        {parts.map((part, index) => {
          return part.highlight ? (
            <span key={String(index)} style={{ fontWeight: 400, color: '#f00' }}>
              {part.text}
            </span>
          ) : (
            <strong key={String(index)} style={{ fontWeight: 400 }}>
              {part.text}
            </strong>
          );
        })}
      </div>
    </MenuItem>
  );
}


function getSuggestionValue(suggestion) {
  return suggestion.host;
}

const styles = theme => ({
  root: {
    height: 250,
    flexGrow: 1,
  },
  container: {
    position: 'relative',
  },
  suggestionsContainerOpen: {
    position: 'absolute',
    zIndex: 1500,
    marginTop: theme.spacing.unit,
    left: 0,
    right: 0,
  },
  suggestion: {
    display: 'block',
  },
  suggestionsList: {
    margin: 0,
    padding: 0,
    listStyleType: 'none',
  },
  divider: {
    height: theme.spacing.unit * 2,
  },
});

class EnvironmentAutosuggest extends React.Component {
  state = {
    suggestions: [],
  };

  handleSuggestionsFetchRequested = ({ value }) => {
    const { list } = this.props;
    const inputValue = deburr(value.trim()).toLowerCase();
    const inputLength = inputValue.length;
    let count = 0;
    const suggestions = inputLength === 0
      ? list
      : list.filter(suggestion => {
        const keep = count < 5 && suggestion.host.slice(0, inputLength).toLowerCase() === inputValue;
        if (keep) {
          count += 1;
        }
        return true;
      });
    this.setState({ suggestions });
  };

  handleSuggestionsClearRequested = () => {
    this.setState({ suggestions: [] });
  };

  render() {
    const { classes, value, onChange, placeholder } = this.props;
    const { suggestions } = this.state;
    return (
      <Autosuggest
        suggestions={suggestions}
        onSuggestionsFetchRequested={this.handleSuggestionsFetchRequested}
        onSuggestionsClearRequested={this.handleSuggestionsClearRequested}
        getSuggestionValue={getSuggestionValue}
        renderSuggestion={renderSuggestion}
        renderInputComponent={renderInputComponent}
        focusInputOnSuggestionClick
        shouldRenderSuggestions={() => true}
        inputProps={{
          classes,
          placeholder,
          value,
          onChange: (e, { newValue }) => onChange(newValue),
        }}
        theme={{
          container: classes.container,
          suggestionsContainerOpen: classes.suggestionsContainerOpen,
          suggestionsList: classes.suggestionsList,
          suggestion: classes.suggestion,
        }}
        renderSuggestionsContainer={options => (
          <Paper {...options.containerProps} square>
            {options.children}
          </Paper>
        )
        }
      />
    );
  }
}
export default withStyles(styles)(EnvironmentAutosuggest);
