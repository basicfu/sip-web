import {
  listApp,
  insertApp,
  updateApp,
  deleteApp,
} from 'api';
import dialog from 'utils/dialog';

const modal = {
  effects: {
    * list({ payload }, { call, put }) {
      const data = payload;
      dialog.close();
      yield put({ type: 'updateState', payload: { table: {} } });
      const response = yield call(listApp, data);
      if (response.success) {
        yield put({ type: 'updateState', payload: { ...response } });
      }
    },
    * insert({ payload }, { call, put }) {
      const { success } = yield call(insertApp, payload);
      if (success) {
        yield put({ type: 'list' });
      }
    },
    * update({ payload }, { call, put }) {
      const { success } = yield call(updateApp, payload);
      if (success) {
        yield put({ type: 'list' });
      }
    },
    * delete({ payload }, { call, put }) {
      const { success } = yield call(deleteApp, payload);
      if (success) {
        yield put({ type: 'list' });
      }
    },
  },
};
export default modal;
