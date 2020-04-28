import React, { useRef, useState } from "react";
import './CodeDisplay.css'
import MonacoEditor from 'react-monaco-editor'
import Code from './code'

function CodeDisplay(){
  let lines = []
    let j=0;
    let i = 0;
  function onChange(v, e){
    try{
      if(v.charCodeAt(v.length - 1) == 10){
        i++;
        j=0;
      }
      let line = lines[i][j];
      console.log(line.charCodeAt(0))
      j++;
    }catch(e){
      console.log("Error! Code Something")
    }
    
  }
  function breakCode(Code){
    let x = Code.split("\n")
    x.map(r => lines.push(r))
  }

  function editorDidMount(editor, monaco){
    breakCode(Code);
    console.log(Code)
    editor.focus();
  }
  const options = {
    selectOnLineNumbers: true,
    cursorStyle: 'block',
    fontFamily: 'Lucida Console',
    fontSize: 13,
    // readOnly: true,
  }
  const [isMatch] = useState(true);
  const ref = useRef("monaco")
  return (
    <div>
      <div>
        <h1>{isMatch?"yes":"no"}</h1>
      </div>
      <MonacoEditor
        ref={ref}
        width="600"
        height="600"
        theme="vs-dark"
        options={options}
        onChange={onChange}
        editorDidMount={editorDidMount}
        />
    </div>
  );
}

export default CodeDisplay;