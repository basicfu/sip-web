import React from 'react';
import dva from 'dva';
import model from '../modules/index';

const checkServer = () => Object.prototype.toString.call(global.process) === '[object process]';
// eslint-disable-next-line
const __NEXT_DVA_STORE__ = '__NEXT_DVA_STORE__'

export function createDvaStore(initialState) {
  let app;
  if (initialState) {
    app = dva({
      initialState,
    });
  } else {
    app = dva({});
  }
  const isArray = Array.isArray(model);
  if (isArray) {
    model.forEach((m) => {
      app.model(m);
    });
  } else {
    app.model(model);
  }
  app.router(() => {
  });
  app.start();
  // eslint-disable-next-line
  return app._store;
}

export function getOrCreateStore(initialState) {
  const isServer = checkServer();
  if (isServer) { // run in server
    // console.log('server');
    return createDvaStore(initialState);
  }
  // eslint-disable-next-line
  if (!window[__NEXT_DVA_STORE__]) {
    // console.log('client');
    // eslint-disable-next-line
    window[__NEXT_DVA_STORE__] = createDvaStore(initialState);
  }
  // eslint-disable-next-line
  return window[__NEXT_DVA_STORE__];
}
export function getState(namespace) {
  return getOrCreateStore().getState()[namespace];
}
