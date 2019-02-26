import React from 'react';
import {withStyles} from '@material-ui/core/styles';
import {connect} from 'dva';
import InterfaceRoot from 'components/sapi/InterfaceRoot';

const namespace = 'sapiSapi';
const styles = {};

class Run extends React.Component {
  render() {
    const {data: {interfaceList}} = this.props;
    return (
      <InterfaceRoot value="run" items={interfaceList}/>
    );
  }
}

export default connect(state => ({
  data: state[namespace],
}))(withStyles(styles)(Run));
