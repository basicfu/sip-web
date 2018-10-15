/* eslint-disable */
import {
  login,
  logout,
  listUser,
  insertUser,
  updateUser,
  deleteUser,
} from 'api';
import Router from 'next/router';
import dialog from "utils/dialog";

const modal = {
  effects: {
    * login({ payload }, { call, put }) {
      const { success, data } = yield call(login, payload);
      if (success) {
        window.localStorage.setItem('auth', JSON.stringify(data));
        yield put({ type: 'global/user' });
        yield put({ type: 'global/updateState', payload: { auth: data } });
        // noinspection JSUnresolvedFunction
        Router.push('/');
      }
    },
    * logout(_, { call, put }) {
      const { success } = yield call(logout);
      if (success) {
        window.localStorage.removeItem('auth');
        window.localStorage.removeItem('appCode');
        // noinspection JSUnresolvedFunction
        Router.push('/login');
      }
    },
    * list({ payload }, { call, put }) {
      const data = payload;
      dialog.close();
      yield put({ type: 'updateState', payload: { table: {} } });
      const response = yield call(listUser, data);
      yield put({ type: 'updateState', payload: { loading: false } });
      if (response.success) {
        yield put({ type: 'updateState', payload: { ...response } });
      }
    },
    * insert({ payload }, { call, put }) {
      const { success } = yield call(insertUser, payload);
      if (success) {
        yield put({ type: 'list' });
      }
    },
    * update({ payload }, { call, put }) {
      const { success } = yield call(updateUser, payload);
      if (success) {
        yield put({ type: 'list' });
      }
    },
    * delete({ payload }, { call, put }) {
      const { success } = yield call(deleteUser, payload);
      if (success) {
        yield put({ type: 'list' });
      }
    },
  },
};
export default modal;
