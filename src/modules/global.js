import { allDict, user } from 'api';
import Router from 'next/router';

const model = {
  state: {
    notify: {
      key: 1,
      visible: false,
      message: '',
      type: 'success',
      duration: 2000,
    },
    user: {
      menus: [],
    },
    dict: {},
    auth: {},
  },
  subscriptions: {
    setup({ dispatch }) {
      if (typeof window !== 'undefined') {
        const auth = window.localStorage.getItem('auth');
        if (auth) {
          // 异步防止客户端和服务端渲染不一致
          new Promise((resolve) => {
            resolve();
          }).then(() => {
            dispatch({ type: 'updateState', payload: { auth: JSON.parse(auth) || {} } });
          });
          dispatch({ type: 'user' });
          dispatch({ type: 'dict' });
        } else if (Router.pathname !== '/login') {
          Router.push('/login');
        }
      }
    },
  },
  effects: {
    * user({ _ }, { call, put }) {
      const response = yield call(user);
      if (response.success) {
        yield put({ type: 'updateState', payload: { user: { ...response.data } } });
      }
    },
    * dict(_, { call, put }) {
      const response = yield call(allDict);
      if (response.success) {
        const dicts = response.data.children;
        const dict = {};
        dicts.forEach(it => {
          dict[it.value] = it;
        });
        yield put({ type: 'updateState', payload: { dict } });
      }
    },
  },
  reducers: {
    closeNotify(state) {
      return { ...state, notify: { ...state.notify, visible: false } };
    },
    openNotify(state, { payload }) {
      const key = state.notify.key + 1;
      return { ...state, notify: { ...state.notify, visible: true, key, ...payload } };
    },
  },

};

export default model;
