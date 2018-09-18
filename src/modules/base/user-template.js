import {
  allUserTemplate,
  listUserTemplate,
  insertUserTemplate,
  updateUserTemplate,
  deleteUserTemplate,
} from 'api';
import dialog from 'utils/dialog';

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
      dialog.close();
      yield put({ type: 'updateState', payload: { table: {} } });
      const response = yield call(listUserTemplate, data);
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
