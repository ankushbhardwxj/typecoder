import React, { useRef, useState } from "react";
import MonacoEditor from 'react-monaco-editor'
import Code from "./code";

function Display(){
  function onChange(newValue, e){
    console.log('onchange', e);
  }
  function editorDidMount(editor, monaco){
    editor.focus();
  }
  const [code] = useState(Code);
  const options = {
    selectOnLineNumbers: true,
    cursorStyle: 'block',
    fontFamily: 'Lucida Console',
    fontSize: 13,
    readOnly: true
  }
  return (
    <div>
      <>
      <h1>"Display"</h1>
      </>
     <MonacoEditor
        width="600"
        height="600"
        theme="vs-dark"
        value={code}
        options={options}
        onChange={onChange}
        editorDidMount={editorDidMount}
      />
    </div>
  );
}

export default Display;