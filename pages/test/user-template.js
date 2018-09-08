import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'dva';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import {ArrowDropDown} from '@material-ui/icons';

// import Tree, { TreeNode } from 'rc-tree';
import Tree, { TreeNode } from '../../src/tree/index';
import Button from "@material-ui/core/Button/Button";
import {ListItem} from "@material-ui/core";

const styles = {
  button: {
    width: '100%'
  },
};

const treeData = [
  { key: '0-0',
title: 'parent 1',
children:
      [
        { key: '0-0-0',
title: 'parent 1-1',
children:
            [
              { key: '0-0-0-0', title: 'parent 1-1-0' },
            ],
        },
        { key: '0-0-1',
title: 'parent 1-2',
children:
            [
              { key: '0-0-1-0', title: 'parent 1-2-0', disableCheckbox: true },
              { key: '0-0-1-1', title: 'parent 1-2-1' },
            ],
        },
      ],
  },
];
class EntryManageCust extends React.Component {
  static propTypes = {
    keys: PropTypes.array,
  };

  static defaultProps = {
    keys: ['0-0-0-0'],
  };

  constructor(props) {
    super(props);
    const keys = props.keys;
    this.state = {
      defaultExpandedKeys: keys,
      defaultSelectedKeys: keys,
      defaultCheckedKeys: keys,
    };
  }

  onExpand = (expandedKeys) => {
    console.log('onExpand', expandedKeys, arguments);
  };

  onSelect = (selectedKeys, info) => {
    console.log('selected', selectedKeys, info);
    this.selKey = info.node.props.eventKey;
  };

  onCheck = (checkedKeys, info) => {
    console.log('onCheck', checkedKeys, info);
  };

  render() {

    const { classes } = this.props;
    return (
      <div style={{ margin: '0 20px' }}>
        <h2>simple</h2>
        <div style={{width: '70%'}}>
          <Tree
            className="myCls"
            showLine
            checkable
            defaultExpandAll
            defaultExpandedKeys={this.state.defaultExpandedKeys}
            onExpand={this.onExpand}
            defaultSelectedKeys={this.state.defaultSelectedKeys}
            defaultCheckedKeys={this.state.defaultCheckedKeys}
            onSelect={this.onSelect}
            onCheck={this.onCheck}
          >
            <TreeNode title="parent 1" key="0-0">
              <TreeNode title="parent 1-2" key="0-0-2">
                <TreeNode title="parent 1-2-0" key="0-0-2-0" />
                <TreeNode title="parent 1-2-1" key="0-0-2-1" />
              </TreeNode>
            </TreeNode>
          </Tree>
        </div>

        {/* <h2>Check on Click TreeNode</h2> */}
        {/*<Tree*/}
          {/*className="myCls"*/}
          {/*showLine*/}
          {/*checkable*/}
          {/*selectable={false}*/}
          {/*defaultExpandAll*/}
          {/*onExpand={this.onExpand}*/}
          {/*defaultSelectedKeys={this.state.defaultSelectedKeys}*/}
          {/*defaultCheckedKeys={this.state.defaultCheckedKeys}*/}
          {/*onSelect={this.onSelect}*/}
          {/*onCheck={this.onCheck}*/}
          {/*treeData={treeData}*/}
        {/*/>*/}
      </div>
    );
  }
}

export default connect(state => ({
  data: state.userTemplate,
}))(withStyles(styles)(EntryManageCust));
