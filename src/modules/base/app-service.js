import {
  listAppService,
  allAppService,
  insertAppService,
  updateAppService,
  deleteAppService,
} from 'api';
import dialog from 'utils/dialog';

const modal = {
  effects: {
    * list({ payload }, { call, put }) {
      const data = payload;
      dialog.close();
      yield put({ type: 'updateState', payload: { table: {} } });
      const response = yield call(listAppService, data);
      if (response.success) {
        yield put({ type: 'updateState', payload: { ...response } });
      }
    },
    * all(_, { call, put }) {
      const response = yield call(allAppService);
      if (response.success) {
        yield put({ type: 'updateState', payload: { all: response.data } });
      }
    },
    * insert({ payload }, { call, put }) {
      const { success } = yield call(insertAppService, payload);
      if (success) {
        yield put({ type: 'list' });
      }
    },
    * update({ payload }, { call, put }) {
      const { success } = yield call(updateAppService, payload);
      if (success) {
        yield put({ type: 'list' });
      }
    },
    * delete({ payload }, { call, put }) {
      const { success } = yield call(deleteAppService, payload);
      if (success) {
        yield put({ type: 'list' });
      }
    },
  },
};
export default modal;
