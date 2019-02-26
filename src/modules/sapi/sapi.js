import {
  listMenu,
  allMenu,
  insertMenu,
  updateMenu,
  deleteMenu,
} from 'api';
import dialog from 'utils/dialog';

const modal = {
  state:{
    interfaceList: [
      {
        id: 1,
        name: 'SLG1',
      },
      {
        id: 2,
        name: '梧桐招聘',
        children: [
          {
            id: 3,
            name: '登录模块',
            type: 'DIRECTORY',
            children: [
              {
                id: 4,
                name: 'cesh接口1',
                type: 'INTERFACE',
              },
            ],
          },
        ],
      },
      {
        id: 5,
        name: '测试服务',
        children: [
          {
            id: 6,
            name: '登录模块',
            type: 'DIRECTORY',
            children: [
              {
                id: 7,
                name: 'cesh接口1',
                type: 'INTERFACE',
              },
            ],
          },
        ],
      },
    ],
  },
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
