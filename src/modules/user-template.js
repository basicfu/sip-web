import {
  allUserTemplate,
  listUserTemplate,
  insertUserTemplate,
  updateUserTemplate,
  deleteUserTemplate,
} from 'api';

const modal = {
  namespace: 'userTemplate',
  state: {
    data: {},
    modalType: '',
    loading: false,
    selectedRowKeys: [],
    modalVisible: false,
    item: {},
    message:'Material-UI v1.4.0 is out 🎉. <a style=\\"color: white;\\" target=\\"_blank\\" href=\\"https://github.com/mui-org/material-ui/releases/tag/v1.4.0\\">the release note</a>.',
  },
  effects: {
    * all(_, { call, put }) {
      const response = yield call(allUserTemplate);
      if (response.success) {
        yield put({
          type: 'updateState',
          payload: { all: JSON.parse(JSON.stringify(response.data)) },
        });
      }
    },
    * list({ payload }, { call, put }) {
      const data = payload;
      delete data.total;
      yield put({
        type: 'updateState',
        payload: { loading: true, modalVisible: false, selectedRowKeys: [] },
      });
      const response = yield call(listUserTemplate, data);
      yield put({ type: 'updateState', payload: { loading: false } });
      if (response.success) {
        yield put({ type: 'updateState', payload: { ...response } });
      }
    },
    * insert({ payload }, { call, put }) {
      const { success } = yield call(insertUserTemplate, payload.data);
      if (success) {
        yield put({ type: 'list', payload: payload.page });
      }
    },
    * update({ payload }, { call, put }) {
      const { success } = yield call(updateUserTemplate, payload.data);
      if (success) {
        yield put({ type: 'list', payload: payload.page });
      }
    },
    * delete({ payload }, { call, put }) {
      const { success } = yield call(deleteUserTemplate, payload.ids);
      if (success) {
        yield put({ type: 'list', payload: payload.page });
      }
    },
  },
  reducers: {
    updateState(state, { payload }) {
      return { ...state, ...payload };
    },
  },
};
export default modal;
