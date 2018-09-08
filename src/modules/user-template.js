import {
  allUserTemplate,
  listUserTemplate,
  insertUserTemplate,
  updateUserTemplate,
  deleteUserTemplate,
} from 'api';

const modal = {
  effects: {
    * all(_, { call, put }) {
      const response = yield call(allUserTemplate);
      if (response.success) {
        yield put({ type: 'updateState', payload: { all: response.data } });
      }
    },
    * list({ payload }, { call, put }) {
      const data = payload;
      // delete data.total;
      // 暂时写死清空默认table
      yield put({
        type: 'updateState',
        payload: { loading: true, modalVisible: false, table: {} },
      });
      const response = yield call(listUserTemplate, data);
      yield put({ type: 'updateState', payload: { loading: false } });
      if (response.success) {
        yield put({ type: 'updateState', payload: { ...response } });
      }
    },
    * insert({ payload }, { call, put }) {
      const { success } = yield call(insertUserTemplate, payload);
      if (success) {
        yield put({ type: 'list' });
      }
    },
    * update({ payload }, { call, put }) {
      const { success } = yield call(updateUserTemplate, payload);
      if (success) {
        yield put({ type: 'list' });
      }
    },
    * delete({ payload }, { call, put }) {
      const { success } = yield call(deleteUserTemplate, payload);
      if (success) {
        yield put({ type: 'list' });
      }
    },
  },
};
export default modal;
