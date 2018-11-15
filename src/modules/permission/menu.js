import {
  allMenu,
  deleteMenu,
  deleteMenuResource,
  insertMenu,
  insertMenuResource,
  listMenuResource,
  updateDisplayMenu,
  updateMenu,
  updateSortMenu,
} from 'api';
import dialog from 'utils/dialog';
import { getState } from 'utils/store';

const modal = {
  state: {
    menuResource: { list: [], page: {} },
  },
  effects: {
    * all(_, { call, put }) {
      dialog.close();
      const response = yield call(allMenu);
      if (response.success) {
        yield put({ type: 'updateState', payload: { all: response.data, rid: response.rid } });
      }
    },
    * listResource(_, { call, put }) {
      const { id, resource } = getState('permissionMenu');
      const search = (resource || {}).search || {};
      dialog.close();
      yield put({ type: 'updateState', payload: { id, resource: { search } } });
      const response = yield call(listMenuResource, search);
      if (response.success) {
        yield put({ type: 'updateState', payload: { menuResource: response.data } });
      }
    },
    * insert({ payload }, { call, put }) {
      const { success } = yield call(insertMenu, payload);
      if (success) {
        yield put({ type: 'all' });
      }
    },
    * insertResource({ payload }, { call, put }) {
      const { success } = yield call(insertMenuResource, payload);
      if (success) {
        yield put({ type: 'listResource', payload: { id: payload.id } });
      }
    },
    * update({ payload }, { call, put }) {
      const { success } = yield call(updateMenu, payload);
      if (success) {
        yield put({ type: 'all' });
      }
    },
    * updateDisplay({ payload }, { call, put }) {
      const { success } = yield call(updateDisplayMenu, payload);
      if (success) {
        yield put({ type: 'all' });
      }
    },
    * updateSort({ payload }, { call, put }) {
      const { success } = yield call(updateSortMenu, payload);
      if (success) {
        yield put({ type: 'all' });
      }
    },
    * delete({ payload }, { call, put }) {
      const { success } = yield call(deleteMenu, payload);
      if (success) {
        yield put({ type: 'all' });
      }
    },
    * deleteResource({ payload }, { call, put }) {
      const { success } = yield call(deleteMenuResource, payload);
      if (success) {
        yield put({ type: 'listResource', payload: { id: payload.id } });
      }
    },
  },
};
export default modal;
