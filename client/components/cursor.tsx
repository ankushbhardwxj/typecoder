import * as React from "react";

type CursorProps = {
  class?: string;
  activeKey: number;
  children: string;
}

const getDefinedStyle = (classType: string) => {
  if (classType === 'active') {
    return {
      color: 'white',
      backgroundColor: 'green'
    }
  }
  else if (classType === 'done') {
    return {}
  } 
  else if (classType === 'incorrect') {
    return {
      color: 'white',
      backgroundColor: 'red'
    }
  }
  else if (classType === 'active-arrow') {
    return {color: 'red'}
  }
  else if (classType === 'return') {
    return {
      backgroundColor: '#fc5203',
      paddingLeft: '7px',
      paddingRight: '3px',
      marginLeft: '3px',
      color: 'white',
      fontSize: '14px'
    }
  }
}

function Cursor(props: CursorProps): JSX.Element {
  if (props.class === undefined)
  return <span className={props.class} id={String(props.activeKey)}>
    {props.children}
  </span>
  return <span className={props.class} id={String(props.activeKey)} style={getDefinedStyle(props.class)}> 
    {props.children}
  </span>
}

export default Cursor;
