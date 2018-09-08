/* eslint-disable */
import {
  listUser,
  login,
  logout,
} from 'api';
import Router from 'next/router';

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
    * list({ payload }, { call, put }) {
      const data = payload;
      // delete data.total;
      // 暂时写死清空默认table
      yield put({
        type: 'updateState',
        payload: { loading: true, modalVisible: false, table: {} },
      });
      const response = yield call(listUser, data);
      yield put({ type: 'updateState', payload: { loading: false } });
      if (response.success) {
        yield put({ type: 'updateState', payload: { ...response } });
      }
    },
    * logout(_, { call, put }) {
      const { success } = yield call(logout);
      if (success) {
        window.localStorage.removeItem('auth');
        // noinspection JSUnresolvedFunction
        Router.push('/login');
      }
    },
  },
};
export default modal;
