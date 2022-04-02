import * as React from "react";

type CursorProps = {
  class?: string;
  activeKey: number;
  children: string;
}

const getDefinedStyle = (classType: string) => {
  if (classType === 'active') {
    return {
      color: '#ebdbb2',
      backgroundColor: 'green'
    }
  }
  else if (classType === 'done') {
    return {color: '#ebdbb2'}
  } 
  else if (classType === 'incorrect') {
    return {
      color: '#ebdbb2',
      backgroundColor: '#cc241d'
    }
  }
  else if (classType === 'active-arrow') {
    return {color: '#cc241d'}
  }
  else if (classType === 'return') {
    return {
      backgroundColor: '#cc241d',
      paddingLeft: '7px',
      paddingRight: '3px',
      marginLeft: '3px',
      color: '#ebdbb2',
      fontSize: '14px'
    }
  }
  else return {
    color: '#ebdbb2'
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
