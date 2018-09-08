// import {} from 'api';

const modal = {
  namespace: 'roleTemplate',
  state: {
    namespace: 'roleTemplate',
    data: {},
    columnItem: {},
    modalType: '',
    loading: false,
    openVisible: false,
    item: {},
  },
  effects: {},
  reducers: {
    updateState(state, { payload }) {
      return { ...state, ...payload };
    },
  },
};
export default modal;
