import {
  listPermission,
  allPermission,
  insertPermission,
  updatePermission,
  deletePermission,
} from 'api';
import dialog from 'utils/dialog';

const modal = {
  effects: {
    * list({ payload }, { call, put }) {
      const data = payload;
      dialog.close();
      yield put({ type: 'updateState', payload: { table: {} } });
      const response = yield call(listPermission, data);
      if (response.success) {
        yield put({ type: 'updateState', payload: { ...response } });
      }
    },
    * all(_, { call, put }) {
      const response = yield call(allPermission);
      if (response.success) {
        yield put({ type: 'updateState', payload: { all: response.data, rid: response.rid } });
      }
    },
    * insert({ payload }, { call, put }) {
      const { success } = yield call(insertPermission, payload);
      if (success) {
        yield put({ type: 'list' });
      }
    },
    * update({ payload }, { call, put }) {
      const { success } = yield call(updatePermission, payload);
      if (success) {
        yield put({ type: 'list' });
      }
    },
    * delete({ payload }, { call, put }) {
      const { success } = yield call(deletePermission, payload);
      if (success) {
        yield put({ type: 'list' });
      }
    },
  },
};
export default modal;
