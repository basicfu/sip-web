import React from 'react';
import ReactDOM from 'react-dom';
import CustomDialogDelete from 'components/CustomDialog';

export default {
  warning(data) {
    ReactDOM.render(<CustomDialogDelete data={data} />, document.querySelector('#dialog'));
  },
};
