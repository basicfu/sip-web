import React from 'react';
import ReactDOM from 'react-dom';
import CustomDialog from 'components/CustomDialog';

export default {
  confirm(data) {
    ReactDOM.render(<CustomDialog data={data} />, document.querySelector('#dialog'));
  },
  close() {
    ReactDOM.unmountComponentAtNode(document.querySelector('#dialog'));
  },
};
