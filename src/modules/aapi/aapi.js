import {
  listMenu,
  allMenu,
  insertMenu,
  updateMenu,
  deleteMenu,
} from 'api';
import dialog from 'utils/dialog';

const modal = {
  effects: {
    * all(_, { call, put }) {
      const response = yield call(allMenu);
      if (response.success) {
        yield put({ type: 'updateState', payload: { all: response.data } });
      }
    },
    * insert({ payload }, { call, put }) {
      const { success } = yield call(insertMenu, payload);
      if (success) {
        yield put({ type: 'list' });
      }
    },
    * update({ payload }, { call, put }) {
      const { success } = yield call(updateMenu, payload);
      if (success) {
        yield put({ type: 'list' });
      }
    },
    * delete({ payload }, { call, put }) {
      const { success } = yield call(deleteMenu, payload);
      if (success) {
        yield put({ type: 'list' });
      }
    },
  },
};
export default modal;
