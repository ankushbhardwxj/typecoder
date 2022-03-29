import * as React from "react";

type CursorProps = {
  class?: string;
  activeKey: number;
  children: string;
}

function Cursor(props: CursorProps): JSX.Element {
  return <span className={props.class} id={String(props.activeKey)}> 
    {props.children}
  </span>
}

export default Cursor;
