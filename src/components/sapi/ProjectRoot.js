import React from 'react';
import {withStyles} from '@material-ui/core';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import ProjectSidebar from 'components/sapi/ProjectSidebar';
import Router from 'next/dist/client/router';
import SplitPane from 'react-split-pane';
import Setting from "components/sapi/Setting";
import Member from "components/sapi/Member";
import Interface from "components/sapi/Interface";

const styles = {
  tab: {
    minWidth: 100,
  },
  content: {
    height: '100%',
  },
};

function ProjectRoot({ classes, value }) {
  const handleTabChange = (event, value) => {
    Router.push(`/sapi/${value}`);
  };

  return (
    <div id="sip-cross" className={classes.root}>
      <SplitPane split="vertical" defaultSize={280} minSize={200} maxSize={400} className={classes.bodySplitPane}>
        <ProjectSidebar />
        <div className={classes.content}>
          <Tabs value={value} indicatorColor="primary" textColor="primary" onChange={handleTabChange}>
            <Tab value='interface' className={classes.tab} label="接口" />
            <Tab value='setting' className={classes.tab} label="设置" />
            <Tab value='members' className={classes.tab} label="成员" />
          </Tabs>
          {value === 'interface' && <Interface />}
          {value === 'setting' && <Setting />}
          {value === 'members' && <Member />}
        </div>
      </SplitPane>
    </div>
  );
}
export default (withStyles(styles)(ProjectRoot));
