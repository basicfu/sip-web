import React from 'react';
import {withStyles} from '@material-ui/core';
import Sidebar from "components/sapi/Sidebar";
import Router from "next/dist/client/router";
import SplitPane from "react-split-pane";

const styles = {
  root: {
    width: '100%',
    height: '100%',
  },
  content: {
    height: 'calc( 100% - 48px )',
  },
  mainContent: {
    width: '100%',
    height: '100%',
  },
  bodySplitPane: {
    position: 'inherit!important',
    flex: 1,
  },
};
function ProjectRoot({classes,value,items}) {

  const handleTabChange = (event, value) => {
    Router.push(`/sapi/${value}`);
  };

  return (
    <div id="sip-cross" className={classes.root}>
      <SplitPane split="vertical" defaultSize={280} minSize={200} maxSize={400} className={classes.bodySplitPane}>
        <Sidebar items={items} />
        {/*<Interface />*/}
      </SplitPane>
    </div>
  );
}

export default (withStyles(styles)(ProjectRoot));
