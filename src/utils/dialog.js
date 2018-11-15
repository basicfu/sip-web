import React from 'react';
import ReactDOM from 'react-dom';
import CustomDialog from 'components/CustomDialog';

export default {
  /**
   * 传不同的key可显示多个
   * @param data
   */
  confirm(data) {
    const idStr = `dialog-${data.id || 1}`;
    if (document.getElementById(idStr) === null) {
      const div = document.createElement('div');
      div.setAttribute('id', idStr);
      document.getElementById('__next').appendChild(div);
    }
    ReactDOM.render(<CustomDialog {...data} />, document.querySelector(`#${idStr}`));
  },
  close(id) {
    const idStr = `dialog-${id || 1}`;
    const dialogElement = document.getElementById(idStr);
    if (dialogElement !== null) {
      ReactDOM.unmountComponentAtNode(document.querySelector(`#${idStr}`));
      document.getElementById('__next').removeChild(dialogElement);
    }
  },
};
