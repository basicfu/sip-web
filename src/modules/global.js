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
  },
  subscriptions: {
    // setup({ dispatch }) {
    //
    // },
  },
  effects: {},
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
