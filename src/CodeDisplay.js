import React, { useRef, useState } from "react";
import './CodeDisplay.css'
import defCode from './code'
import MonacoEditor from 'react-monaco-editor'

function CodeDisplay(){
  function onChange(newValue, e){
    console.log('onchange', e);
  }
  function editorDidMount(editor, monaco){
    console.log("MOUNTED");
    editor.focus();
  }
  const [code] = useState(defCode);
  const options = {
    selectOnLineNumbers: true,
    cursorStyle: 'block',
    fontFamily: 'Lucida Console',
    fontSize: 13,
    readOnly: true,
    setModelLanguage: "cpp"
  }
  return (
    <div>
     <MonacoEditor
        width="800"
        height="600"
        language="cpp"
        theme="vs-dark"
        value={code}
        options={options}
        onChange={onChange}
        editorDidMount={editorDidMount}
      />
    </div>
  );
}

export default CodeDisplay;