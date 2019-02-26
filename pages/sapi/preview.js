import React from 'react';
import {withStyles} from '@material-ui/core/styles';
import {connect} from 'dva';
import InterfaceRoot from 'components/sapi/InterfaceRoot';

const namespace = 'sapiSapi';
const styles = {};

class Preview extends React.Component {
  render() {
    const {data: {interfaceList}} = this.props;
    return (
      <InterfaceRoot value="preview" items={interfaceList}/>
    );
  }
}

export default connect(state => ({
  data: state[namespace],
}))(withStyles(styles)(Preview));
