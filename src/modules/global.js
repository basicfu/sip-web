const model = {
  namespace: 'global',
  state: {
    name: '',
  },
  subscriptions: {
    // setup({ dispatch }) {
    //
    // },
  },
  effects: {},
  reducers: {
    updateState(state, { payload }) {
      return { ...state, ...payload };
    },
  },

};

export default model;
