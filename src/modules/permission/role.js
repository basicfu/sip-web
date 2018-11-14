import {
  listRole,
  allRole,
  insertRole,
  updateRole,
  deleteRole,
  insertRoleUser,
  deleteRoleUser,
  listRoleMenu,
  insertRoleMenu,
  deleteRoleMenu,
  insertRolePermission, deleteRolePermission, listRolePermission, listRoleUser,
} from 'api';
import dialog from 'utils/dialog';

const modal = {
  state: {
    roleUser: { list: [], page: {} },
    roleMenu: [],
    rolePermission: [],
  },
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
    * listUser({ payload }, { call, put }) {
      dialog.close();
      const response = yield call(listRoleUser, payload);
      if (response.success) {
        yield put({ type: 'updateState', payload: { roleUser: response.data } });
      }
    },
    * listMenu({ payload }, { call, put }) {
      const response = yield call(listRoleMenu, payload);
      if (response.success) {
        yield put({ type: 'updateState', payload: { roleMenu: response.data } });
      }
    },
    * listPermission({ payload }, { call, put }) {
      const response = yield call(listRolePermission, payload);
      if (response.success) {
        yield put({ type: 'updateState', payload: { rolePermission: response.data } });
      }
    },
    * all(_, { call, put }) {
      const response = yield call(allRole);
      if (response.success) {
        yield put({ type: 'updateState', payload: { all: response.data, rid: response.rid } });
      }
    },
    * insert({ payload }, { call, put }) {
      const { success } = yield call(insertRole, payload);
      if (success) {
        yield put({ type: 'list' });
      }
    },
    * insertUser({ payload }, { call, put }) {
      const { success } = yield call(insertRoleUser, payload);
      if (success) {
        yield put({ type: 'listUser', payload: { id: payload.id } });
      }
    },
    * insertMenu({ payload }, { call, put }) {
      const { success } = yield call(insertRoleMenu, payload);
      if (success) {
        yield put({ type: 'listMenu', payload: { id: payload.id } });
      }
    },

    * insertPermission({ payload }, { call, put }) {
      const { success } = yield call(insertRolePermission, payload);
      if (success) {
        yield put({ type: 'listPermission', payload: { id: payload.id } });
      }
    },
    * deleteUser({ payload }, { call, put }) {
      const { success } = yield call(deleteRoleUser, payload);
      if (success) {
        yield put({ type: 'listUser', payload: { id: payload.id } });
        // 由于关联的用户table需要重置用户的table为空
        yield put({ type: 'baseUser/updateState', payload: { table: {} } });
      }
    },
    * deleteMenu({ payload }, { call, put }) {
      const { success } = yield call(deleteRoleMenu, payload);
      if (success) {
        yield put({ type: 'listMenu', payload: { id: payload.id } });
      }
    },
    * deletePermission({ payload }, { call, put }) {
      const { success } = yield call(deleteRolePermission, payload);
      if (success) {
        yield put({ type: 'listPermission', payload: { id: payload.id } });
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
        yield put({ type: 'updateState', payload: { roleUser: { list: [], page: {} }, roleMenu: [], rolePermission: [] } });
      }
    },
  },
};
export default modal;
