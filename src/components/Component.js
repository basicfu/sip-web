/* eslint-disable class-methods-use-this */
import React from 'react';
import { getOrCreateStore } from 'utils/store';

class Component extends React.Component {
  resetQuery(namespace) {
    getOrCreateStore().dispatch({ type: `${namespace}/resetQuery` });
  }

  resetState(namespace) {
    getOrCreateStore().dispatch({ type: `${namespace}/resetState` });
  }

  dispatch(json) {
    this.props.dispatch(json);
  }
}

export default Component;
