/* eslint-disable class-methods-use-this */
import React from 'react';
import { getOrCreateStore } from 'utils/store';

class Component extends React.Component {
  /**
   * 只是重置查询条件
   * @param namespace
   * @param tableName
   */
  resetQuery(namespace, tableName) {
    getOrCreateStore().dispatch({ type: `${namespace}/resetQuery`, payload: { tableName } });
  }

  /**
   * 在卸载组件时候重置所有state
   * @param namespace
   */
  resetState(namespace) {
    getOrCreateStore().dispatch({ type: `${namespace}/resetState` });
  }

  dispatch(json) {
    this.props.dispatch(json);
  }
}

export default Component;
