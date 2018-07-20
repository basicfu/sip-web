import { getOrCreateStore } from 'utils/store';

const global = 'global';

export default {
  success(message) {
    getOrCreateStore().dispatch({
      type: `${global}/openNotify`,
      payload: { type: 'success', message },
    });
  },
  error(message) {
    getOrCreateStore().dispatch({
      type: `${global}/openNotify`,
      payload: { type: 'error', message },
    });
  },
  info(message) {
    getOrCreateStore().dispatch({
      type: `${global}/openNotify`,
      payload: { type: 'info', message },
    });
  },
  warning(message) {
    getOrCreateStore().dispatch({
      type: `${global}/openNotify`,
      payload: { type: 'warning', message },
    });
  },
};
