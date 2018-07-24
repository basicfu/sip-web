import {
  login,
} from 'api';
import Router from 'next/router';

const modal = {
  namespace: 'user',
  state: {
    data: {},
    modalType: '',
    loading: false,
    selectedRowKeys: [],
    modalVisible: false,
    item: {},
  },
  effects: {
    * login({ payload }, { call, put }) {
      const { success, data } = yield call(login, payload);
      if (success) {
        window.localStorage.setItem('auth', JSON.stringify(data));
        yield put({ type: 'global/user' });
        yield put({ type: 'updateState', payload: { auth: data } });
        Router.push('/');
      }
    },
    // * register({ payload }, { call, put }) {
    //   const { success } = yield call(login, payload.ids);
    //   if (success) {
    //     message.success("注册成功");
    //     yield put(routerRedux.push('/user/login'));
    //   }
    // },
    // * logout(_, { call, put }) {
    //   const { success } = yield call(logout);
    //   if (success) {
    //     window.localStorage.removeItem('auth');
    //     yield put(routerRedux.push('/login'));
    //     yield put({ type: 'updateState', payload: { auth: {} } });
    //   }
    // },
  },
  reducers: {
    updateState(state, { payload }) {
      return { ...state, ...payload };
    },
  },
};
export default modal;
