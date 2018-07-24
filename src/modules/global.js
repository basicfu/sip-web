import { user } from 'api';

const model = {
  namespace: 'global',
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
  },
  subscriptions: {
    setup({ dispatch }) {
      if (typeof window !== 'undefined') {
        dispatch({ type: 'user' });
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
  },
  reducers: {
    closeNotify(state) {
      return { ...state, notify: { ...state.notify, visible: false } };
    },
    openNotify(state, { payload }) {
      const key = state.notify.key + 1;
      return { ...state, notify: { ...state.notify, visible: true, key, ...payload } };
    },
    updateState(state, { payload }) {
      return { ...state, ...payload };
    },
  },

};

export default model;
