import React from 'react';
import {withStyles} from '@material-ui/core/styles';
import {connect} from 'dva';
import InterfaceRoot from 'components/sapi/InterfaceRoot';
import ProjectRoot from "components/sapi/ProjectRoot";

const namespace = 'sapiSapi';
const styles = {};

class Interface extends React.Component {
  render() {
    const {data: {interfaceList}} = this.props;
    return (
      <ProjectRoot value="interface" items={interfaceList}/>
    );
  }
}

export default connect(state => ({
  data: state[namespace],
}))(withStyles(styles)(Interface));
