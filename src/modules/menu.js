import {allMenu} from 'api';

const modal = {
  effects: {
    * all(_, { call, put }) {
      const response = yield call(allMenu());
      if (response.success) {
        yield put({ type: 'updateState', payload: { all: response.data } });
      }
    },
  },
};
export default modal;
