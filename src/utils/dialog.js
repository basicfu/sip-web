import React from 'react';
import ReactDOM from 'react-dom';
import CustomDialog from 'components/CustomDialog';

export default {
  warning(data) {
    ReactDOM.render(<CustomDialog data={data} type="warning" />, document.querySelector('#dialog'));
  },
  content(data) {
    ReactDOM.render(<CustomDialog data={data} type="content" />, document.querySelector('#dialog'));
  },
  close() {
    ReactDOM.unmountComponentAtNode(document.querySelector('#dialog'));
  },
};
