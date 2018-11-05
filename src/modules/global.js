import { allDict, user } from 'api';
import Router from 'next/router';

const model = {
  state: {
    notify: {
      key: 1,
      visible: false,
      message: '',
      type: 'success',
      duration: 2000,
    },
    user: {
      menus: [],
    },
    dict: {},
    otherDict: {},
    auth: {},
  },
  subscriptions: {
    setup({ dispatch }) {
      if (typeof window !== 'undefined') {
        const auth = window.localStorage.getItem('auth');
        if (auth) {
          // 异步防止客户端和服务端渲染不一致
          new Promise((resolve) => {
            resolve();
          }).then(() => {
            dispatch({ type: 'updateState', payload: { auth: JSON.parse(auth) || {} } });
          });
          dispatch({ type: 'user' });
          dispatch({ type: 'dict' });
        } else if (Router.pathname !== '/login') {
          Router.push('/login');
        }
      }
    },
  },
  effects: {
    * user({ _ }, { call, put }) {
      // 登录成功和第一次进入页面必走
      const response = yield call(user);
      if (response.success) {
        // 此应用没有访客页面，未登录跳转条件
        // 1.如果/user接口中roles为空或者roles中只包含guest则为未登录用户
        // 2.如果任意api接口中响应code=1表示未登录
        const roles = response.data.roles;
        // 如果是超管获取所有应用以便切换
        if (response.data.type === 'SYSTEM_SUPER_ADMIN' || response.data.user === 'SYSTEM_ADMIN') {
          yield put({ type: 'baseApp/all' });
        }
        //TODO 不能找到indexoof
        console.log(roles);
        if (roles === null || roles === undefined || (roles.indexOf('GUEST') !== -1 && roles.length === 1)) {
          Router.push('/login');
        } else {
          yield put({ type: 'updateState', payload: { user: { ...response.data } } });
        }
      }
    },
    * dict({ payload }, { call, put }) {
      const response = yield call(allDict, {...payload});
      if (response.success) {
        const dicts = response.data.children;
        const dict = {};
        dicts.forEach(it => {
          dict[it.value] = it;
        });
        // 有可能会用到其他应用字典，所以此处区分
        if (payload && payload.app && payload.app !== 'sip') {
          yield put({ type: 'updateState', payload: { otherDict: dict } });
        } else {
          yield put({ type: 'updateState', payload: { dict } });
        }
      }
    },
  },
  reducers: {
    closeNotify(state) {
      return { ...state, notify: { ...state.notify, visible: false } };
    },
    openNotify(state, { payload }) {
      const key = state.notify.key + 1;
      return { ...state, notify: { ...state.notify, visible: true, key, ...payload } };
    },
  },

};

export default model;
