import React from 'react';
import {withStyles} from '@material-ui/core';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import ProjectSidebar from 'components/sapi/ProjectSidebar';
import Router from 'next/dist/client/router';
import SplitPane from 'react-split-pane';
import Run from 'components/sapi/Run';
import Preview from 'components/sapi/Preview';

const styles = {
  tab: {
    minWidth: 100,
  },
  content: {
    height: '100%',
  },
};

function InterfaceRoot({ classes, value, items }) {
  const handleTabChange = (event, value) => {
    Router.push(`/sapi/${value}`);
  };

  return (
    <div id="sip-cross" className={classes.root}>
      <SplitPane split="vertical" defaultSize={280} minSize={200} maxSize={400} className={classes.bodySplitPane}>
        <ProjectSidebar items={items} />
        <div className={classes.content}>
          <Tabs value={value} indicatorColor="primary" textColor="primary" onChange={handleTabChange}>
            <Tab value='run' className={classes.tab} label="运行" />
            <Tab value='preview' className={classes.tab} label="预览" />
            <Tab value='version' className={classes.tab} label="版本" />
            <Tab value='history' className={classes.tab} label="历史" />
          </Tabs>
          {value === 'run' && <Run />}
          {value === 'preview' && <Preview />}
        </div>
      </SplitPane>
    </div>
  );
}

export default (withStyles(styles)(InterfaceRoot));

//
// <div>
//   <AppBar position="static" color="default">
//     <Tabs
//       value={value}
//       onChange={handleTabChange}
//       indicatorColor="primary"
//       textColor="primary"
//       scrollButtons="auto"
//     >
//       <Tab value="interface" label="接口" />
//       <Tab value="setting" label="设置" />
//       <Tab value="members" label="成员" />
//     </Tabs>
//   </AppBar>
//   <div className={classes.content}>
//     <div className={classes.mainContent}>
//       {value === 'interface' && <Interface />}
//       {value === 'setting' && <Setting />}
//       {value === 'members' && <Member />}
//     </div>
//   </div>
// </div>
