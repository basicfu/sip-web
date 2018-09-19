import {
  listAppSecret,
  allAppSecret,
  insertAppSecret,
  updateAppSecret,
  deleteAppSecret,
} from 'api';
import dialog from 'utils/dialog';

const modal = {
  effects: {
    * list({ payload }, { call, put }) {
      const data = payload;
      dialog.close();
      yield put({ type: 'updateState', payload: { table: {} } });
      const response = yield call(listAppSecret, data);
      if (response.success) {
        yield put({ type: 'updateState', payload: { ...response } });
      }
    },
    * all(_, { call, put }) {
      const response = yield call(allAppSecret);
      if (response.success) {
        yield put({ type: 'updateState', payload: { all: response.data } });
      }
    },
    * insert({ payload }, { call, put }) {
      const { success } = yield call(insertAppSecret, payload);
      if (success) {
        yield put({ type: 'list' });
      }
    },
    * update({ payload }, { call, put }) {
      const { success } = yield call(updateAppSecret, payload);
      if (success) {
        yield put({ type: 'list' });
      }
    },
    * delete({ payload }, { call, put }) {
      const { success } = yield call(deleteAppSecret, payload);
      if (success) {
        yield put({ type: 'list' });
      }
    },
  },
};
export default modal;
