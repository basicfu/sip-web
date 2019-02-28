import Checkbox from '@material-ui/core/Checkbox/Checkbox';
import IndeterminateCheckBoxOutlined from '@material-ui/icons/IndeterminateCheckBoxOutlined';
import React from 'react';

function CollapseCheckBox(props) {
  const { onChange, checked } = props;
  // true显示-号，false显示+号
  return <Checkbox
    onChange={onChange}
    checked={checked}
    style={{ padding: '10px 12px 14px 12px', position: 'relative' }}
    icon={<svg
      fill="rgba(0, 0, 0, 0.65)"
      width="24"
      height="24"
      focusable="false"
      viewBox="0 0 24 24"
      aria-hidden="true"
      role="presentation">
      <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V5h14v14z" />
      <path d="M7 11h10v2H7z" />
      <rect
        stroke="null"
        id="svg_3"
        height="10.244086"
        width="2.030457"
        y="6.81121"
        x="10.984772"
        fillOpacity="null"
        strokeOpacity="null"
        strokeWidth="null"
        fill="null" />
          </svg>}
    checkedIcon={<IndeterminateCheckBoxOutlined />} />;
}
export default CollapseCheckBox;
