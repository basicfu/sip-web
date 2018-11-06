/* eslint-disable class-methods-use-this */
import React from 'react';
import { getOrCreateStore } from 'utils/store';

class Component extends React.Component {
  dispatch(json) {
    this.props.dispatch(json);
  }

  resetQuery(namespace) {
    getOrCreateStore().dispatch({ type: `${namespace}/resetQuery` });
  }
}

export default Component;
