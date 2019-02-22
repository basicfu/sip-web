import React, {Fragment} from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Preview from 'components/api/Preview';
import Run from 'components/api/Run';

const styles = {
  tab: {
    minWidth: 100,
  },
  content:{
    height: 'calc( 100% - 48px )',
  }
};

function Interface(props) {
  const [value, setValue] = React.useState(1);

  const { classes } = props;
  return (
    <Fragment>
      <Tabs value={value} indicatorColor="primary" textColor="primary" onChange={(e, v) => setValue(v)}>
        <Tab className={classes.tab} label="预览" />
        <Tab className={classes.tab} label="运行" />
      </Tabs>
      <div className={classes.content}>
        {value === 0 && <Preview {...props} />}
        {value === 1 && <Run />}
      </div>
    </Fragment>
  );
}

export default withStyles(styles)(Interface);

//
// <TabContainer
//   props={{ ...this.props, ...this.state, tabValue }}
//   onHandleChange={this.handleTabChange}
//   onHandleSelectChange={this.handleSelectChange}
//   onHandleInputChange={(event, value) => this.handleInputChange(event, value)}
//   onDeleteParam={id => this.handleDeleteParam(id)}
//   onDeleteInlineParam={id => this.handleDeleteInlineParam(id)}
//   onRowSelectChange={(id, event, checked) => this.handleRowSelectChange(id, event, checked)}
//   onEditableChange={(id, key, event, flag) => this.handleEditableChange(id, key, event, flag)}
//   onBulkEdit={(flag, isEdit) => this.handleBulkEdit(flag, isEdit)}
//   onBulkEditChange={(event, flag) => this.handleBulkEditChange(event, flag)}
//   onRadioChange={(flag, value) => this.handleRadioChange(flag, value)}
//   onHeadChange={(value, flag) => this.handleHeadChange(value, flag)}
// >
