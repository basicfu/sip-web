import React from 'react';
import ReactDOM from 'react-dom';
import CustomDialog from 'components/CustomDialog';

export default {
  /**
   * 传不同的key可显示多个
   * @param data
   */
  confirm(data) {
    const id = `dialog-${data.key || 1}`;
    if (document.getElementById(id) === null) {
      const div = document.createElement('div');
      div.setAttribute('id', id);
      document.getElementById('__next').appendChild(div);
    }
    ReactDOM.render(<CustomDialog data={data} />, document.querySelector(`#${id}`));
  },
  close(key) {
    const id = `dialog-${key || 1}`;
    const dialogElement = document.getElementById(id);
    if (dialogElement !== null) {
      ReactDOM.unmountComponentAtNode(document.querySelector(`#${id}`));
      document.getElementById('__next').removeChild(dialogElement);
    }
  },
};
