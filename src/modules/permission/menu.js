import {
  listMenu,
  allMenu,
  insertMenu,
  updateMenu,
  updateDisplayMenu,
  updateSortMenu,
  deleteMenu,
} from 'api';
import dialog from 'utils/dialog';

const modal = {
  effects: {
    * all(_, { call, put }) {
      dialog.close();
      const response = yield call(allMenu);
      if (response.success) {
        yield put({ type: 'updateState', payload: { all: response.data, rid: response.rid } });
      }
    },
    * insert({ payload }, { call, put }) {
      const { success } = yield call(insertMenu, payload);
      if (success) {
        yield put({ type: 'all' });
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
  },
};
export default modal;
