import React from 'react';


const Header = (props) => {
  return (
    <>
      <h1 style={{ paddingLeft: '20px' }}>Total Typed: {props.totalTyped}</h1>
      {props.pause && <div style={{ paddingLeft: '20px' }}>Paused</div>}
      {!props.pause && <div style={{ paddingLeft: '20px' }}>Typing</div>}
    </>
  );
};

export default Header;
