import React from 'react';
import {withStyles} from '@material-ui/core/styles';
import {connect} from 'dva';
import ProjectRoot from "components/sapi/ProjectRoot";
import Component from "components/Component";

const namespace = 'sapiSapi';
const styles = {};

class Interface extends Component {
  render() {
    return (
      <ProjectRoot value="interface"/>
    );
  }
}

export default connect(state => ({
  data: state[namespace],
}))(withStyles(styles)(Interface));
