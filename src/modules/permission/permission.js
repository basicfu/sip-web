import {
  allPermission,
  deletePermission, deletePermissionResource, exportPermission, importPermission,
  insertPermission, insertPermissionResource,
  listPermission,
  listPermissionResource,
  updatePermission,
} from 'api';
import dialog from 'utils/dialog';
import { getState } from 'utils/store';
import React from 'react';

const modal = {
  state: {
    permissionResource: { list: [], page: {} },
  },
  effects: {
    * list(_, { call, put }) {
      const search = getState('permissionPermission').table.search;
      dialog.close();
      yield put({ type: 'updateState', payload: { table: { search } } });
      const response = yield call(listPermission, search);
      if (response.success) {
        yield put({ type: 'updateState', payload: { ...response } });
      }
    },
    * listResource(_, { call, put }) {
      const { id, resource } = getState('permissionPermission');
      const search = (resource || {}).search || {};
      dialog.close();
      yield put({ type: 'updateState', payload: { id, resource: { search } } });
      const response = yield call(listPermissionResource, search);
      if (response.success) {
        yield put({ type: 'updateState', payload: { permissionResource: response.data } });
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
    * insertResource({ payload }, { call, put }) {
      const { success } = yield call(insertPermissionResource, payload);
      if (success) {
        yield put({ type: 'listResource', payload: { id: payload.id } });
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
    * deleteResource({ payload }, { call, put }) {
      const { success } = yield call(deletePermissionResource, payload);
      if (success) {
        yield put({ type: 'listResource', payload: { id: payload.id } });
      }
    },
    * import({ payload }, { call, put }) {
      const { success } = yield call(importPermission, payload);
      if (success) {
        yield put({ type: 'list' });
      }
    },
    * export({ payload }, { call, put }) {
      const { success, data } = yield call(exportPermission, payload);
      if (success) {
        const html = data.split('\r\n').join('<br/>').replace(/ /g, '&nbsp;');
        dialog.confirm({ title: '导出结果', content: <span dangerouslySetInnerHTML={{ __html: html }} />, width: 600, onOk() { dialog.close(); } });
      }
    },
  },
};
export default modal;
