import {
  listResource,
  allResource,
  syncResource,
  insertResource,
  updateResource,
  deleteResource,
} from 'api';
import { getState } from 'utils/store';
import dialog from 'utils/dialog';

const modal = {
  state: {
    sync: [],
  },
  effects: {
    * list(_, { call, put }) {
      const search = getState('permissionResource').table.search;
      dialog.close();
      yield put({ type: 'updateState', payload: { table: { search } } });
      const response = yield call(listResource, search);
      if (response.success) {
        yield put({ type: 'updateState', payload: { ...response } });
      }
    },
    * all(_, { call, put }) {
      const response = yield call(allResource);
      if (response.success) {
        yield put({ type: 'updateState', payload: { all: response.data } });
      }
    },
    * sync({ payload }, { call, put }) {
      const response = yield call(syncResource, payload);
      if (response.success) {
        if (response.data === null) {
          // 确认之后操作
          yield put({ type: 'list' });
        } else {
          // 预览之后操作
          yield put({ type: 'updateState', payload: { sync: response.data } });
        }
      }
    },
    * insert({ payload }, { call, put }) {
      const { success } = yield call(insertResource, payload);
      if (success) {
        yield put({ type: 'list' });
      }
    },
    * update({ payload }, { call, put }) {
      const { success } = yield call(updateResource, payload);
      if (success) {
        yield put({ type: 'list' });
      }
    },
    * delete({ payload }, { call, put }) {
      const { success } = yield call(deleteResource, payload);
      if (success) {
        yield put({ type: 'list' });
      }
    },
  },
};
export default modal;
