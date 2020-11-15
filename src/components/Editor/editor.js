import React, { useEffect } from 'react';
import CodeMirror from 'codemirror';
import data from '../../code';
import "./editor.css";


const Editor = () => {
  useEffect(() => {
    let codeMirror = CodeMirror(document.getElementById('codemirror'), {
      value: data,
      mode: { name: "javascript" },
      lineNumbers: true,
      autofocus: true,
      readOnly: true,
      theme: 'monokai'
    });
    codeMirror.setSize("100%", "100%");
    document.getElementById('codemirror').addEventListener("keypress", handlePress)
  })

  const handlePress = () => {
    console.log('keypress')
  }

  return (
    <div id="codemirror">
      Codemirror
    </div>
  )
}

export default Editor;