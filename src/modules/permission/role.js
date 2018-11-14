import {
  listRole,
  allRole,
  insertRole,
  updateRole,
  deleteRole, insertRoleUser, deleteRoleUser,
} from 'api';
import dialog from 'utils/dialog';

const modal = {
  effects: {
    * list({ payload }, { call, put }) {
      const data = payload;
      dialog.close();
      yield put({ type: 'updateState', payload: { table: {} } });
      const response = yield call(listRole, data);
      if (response.success) {
        yield put({ type: 'updateState', payload: { ...response } });
      }
    },
    * all(_, { call, put }) {
      const response = yield call(allRole);
      if (response.success) {
        yield put({ type: 'updateState', payload: { all: response.data } });
      }
    },
    * insert({ payload }, { call, put }) {
      const { success } = yield call(insertRole, payload);
      if (success) {
        yield put({ type: 'list' });
      }
    },
    * insertUser({ payload }, { call, put }) {
      const roleCode = payload.roleCode;
      delete payload.roleCode;
      const { success } = yield call(insertRoleUser, payload);
      if (success) {
        yield put({ type: 'baseUser/list', payload: { condition: JSON.stringify({ roleCode: { condition: 'EQUAL_TO', value: roleCode } }) } });
      }
    },
    * deleteUser({ payload }, { call, put }) {
      const roleCode = payload.roleCode;
      delete payload.roleCode;
      const { success } = yield call(deleteRoleUser, payload);
      if (success) {
        yield put({ type: 'baseUser/list', payload: { condition: JSON.stringify({ roleCode: { condition: 'EQUAL_TO', value: roleCode } }) } });
      }
    },
    * update({ payload }, { call, put }) {
      const { success } = yield call(updateRole, payload);
      if (success) {
        yield put({ type: 'list' });
      }
    },
    * delete({ payload }, { call, put }) {
      const { success } = yield call(deleteRole, payload);
      if (success) {
        yield put({ type: 'list' });
      }
    },
  },
};
export default modal;
