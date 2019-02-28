import {
  allProject,
  insertProject,
  insertProjectCategory,
  getProjectCategory,
  deleteProject,
  updateMenu,
  deleteMenu,
} from 'api';
import dialog from 'utils/dialog';

const modal = {
  state: {
    projectList: [],
  },
  effects: {
    * all(_, { call, put }) {
      dialog.close();
      const response = yield call(allProject);
      if (response.success) {
        yield put({ type: 'updateState', payload: { projectList: response.data } });
      }
    },
    * getCategory({ payload }, { call, put, select }) {
      const { success, data } = yield call(getProjectCategory, payload);
      if (success) {
        const projectList = yield select(state => state[modal.namespace].projectList);
        for (const key in projectList) {
          if (projectList[key].id === payload.projectId) {
            projectList[key].children = data;
            break;
          }
        }
        yield put({ type: 'updateState', payload: { projectList } });
      }
    },
    * insert({ payload }, { call, put }) {
      const { success } = yield call(insertProject, payload);
      if (success) {
        yield put({ type: 'all' });
      }
    },
    * insertCategory({ payload }, { call, put }) {
      dialog.close();
      const { success } = yield call(insertProjectCategory, payload);
      if (success) {
        yield put({ type: 'all' });
      }
    },
    * update({ payload }, { call, put }) {
      const { success } = yield call(updateMenu, payload);
      if (success) {
        yield put({ type: 'list' });
      }
    },
    * delete({ payload }, { call, put }) {
      const { success } = yield call(deleteProject, payload);
      if (success) {
        yield put({ type: 'all' });
      }
    },
  },
};
export default modal;
