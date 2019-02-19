import React from 'react';
import {MuiThemeProvider, withStyles} from '@material-ui/core/styles';
import {connect} from 'dva';
import CodeMirror from 'react-codemirror';
import styles from 'styles/user-template';
import NoSsr from '@material-ui/core/NoSsr';
import createMuiTheme from "@material-ui/core/styles/createMuiTheme";

class Test extends React.Component {
  render() {
    // https://github.com/JedWatson/react-codemirror/issues/21
    if (process.browser) {
      require('codemirror/mode/javascript/javascript');
    }
    var options = {
      mode: 'javascript',
      // lineWrapping:true,
      // foldGutter: true,
      // gutters:["CodeMirror-linenumbers", "CodeMirror-foldgutter"],
      lineNumbers: true,
      matchBrackets: true,
    };
    return (
      <NoSsr>
        <CodeMirror options={options} />
      </NoSsr>

    );
  }
}

export default connect(state => ({
  data: state.baseApp,
}))(withStyles(styles)(Test));


// {/*<MuiThemeProvider theme={theme}>*/}
// // {/*<div>*/}
// <CodeMirror options={options} />
// // </div>
// {/* </MuiThemeProvider> */}
