import React from 'react';
import {withStyles} from '@material-ui/core/styles';
import {connect} from 'dva';
import styles from 'styles/user-template';

class EntryManageCust extends React.Component {
  render() {
    return (
      <div>
        helloword
      </div>
    );
  }
}

export default connect(state => ({
  data: state.userTemplate,
}))(withStyles(styles)(EntryManageCust));
