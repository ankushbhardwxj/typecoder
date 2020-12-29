import React from 'react';


const Cursor = (props) => {
  return (
    <span
      className={props.class}
      id={props.activeKey}>
      {props.children}
    </span>
  );
};

export default Cursor;