import React, { useEffect, useState } from 'react';
import data from '../../code';
import "./editor.css";
import highlight from 'highlight.js';
import { findDOMNode } from 'react-dom';
import { Container } from 'semantic-ui-react';


// TODO: Improve this cursor to be like that of Google DOCS
// also this needs a popping animation resembling to VIM
const Cursor = props => {
  useEffect(() => {
    console.log(props)
    if(props.active >= 0 && props.active <= props.size){
      if(props.active >= 1){
        let prevStyle, cursorStyle;
        if(document.getElementById(String(props.active)) !== null){
          cursorStyle = document.getElementById(String(props.active)).style;
          cursorStyle.background = 'green'
          cursorStyle.color = "white"
        }
        if(document.getElementById(String(props.active - 1)) !== null){
          if(props.delete == false)
            prevStyle = document.getElementById(String(props.active - 1)).style;
          else prevStyle = document.getElementById(String(props.active + 1)).style;
          prevStyle.background = "white";
          prevStyle.color = "black";
        }
      } else {
        const cursorStyle = document.getElementById(String(props.active)).style;
        cursorStyle.background = 'green'
        cursorStyle.color = "white"
        let prevStyle = document.getElementById(String(props.active+1)).style;
        prevStyle.background = "white";
        prevStyle.color = "black";
      }
    } 
  })

  return (
    <span id={props.id}>{props.children}</span>
  )
}

class Editor extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      totalTyped: 0,
      idx: 0,
      pause: false,
      pressedKey: '',
      delete: false,
      size: 0,
      gameOver: false
    }
    this.codeRef = React.createRef();
    this.textInput = React.createRef();
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    document.addEventListener('keyup', this.handleKeyDown)
    this.codeRef.current.addEventListener('click', this.handleClick);
    this.setState({size: [...data].length});
  }

  componentDidUpdate() {
  }

  handleClick(evt) {
    this.codeRef.current.focus();
    this.codeRef.current.addEventListener('keyup', this.handleKeyDown);
    this.setState({pause: !this.state.pause});
    console.log('clicked');
  }

  handleKeyDown(e){
    let activeKey = e.key;
    console.log(activeKey)
    if(this.state.totalTyped > this.state.size){
      this.setState({gameOver: true}) 
    }
    if(!this.state.gameOver){
      if(activeKey == 'Backspace'){
        this.setState({
          idx: this.state.idx - 1,
          pressedKey: activeKey,
          totalTyped: this.state.totalTyped + 1,
          delete: true
        })    
      } 
      else if(activeKey != 'Shift') {
        this.setState({
          idx: this.state.idx + 1,
          pressedKey: activeKey,
          totalTyped: this.state.totalTyped + 1,
          delete: false
        });
      }
    }
  }

  render() {
    return (
      <div
        className="code-container" 
        style={{background: 'gray'}}
      >
        <h1>Total Typed: {this.state.totalTyped}</h1>
        {this.state.pause ? <div>Paused</div>: <div>Typing</div>}
        {!this.state.gameOver && <pre 
          style={{background:'white', fontWeight:'bold'}}>
            <code 
              ref={this.codeRef} 
              className={'javascript'} 
              onKeyPress={this.handleKeyDown}>
              {[...data].map((chr, idx) => 
                <Cursor 
                  key={idx} 
                  active={this.state.idx} 
                  delete={this.state.delete}
                  size={[...data].length}
                  id={idx}>
                    {chr}
                </Cursor>
              )}
            </code>
        </pre>}
        {this.state.gameOver && 
          <div style={{background: 'white', fontWeight: 'bold'}}>
            <h3>GAME OVER</h3>
          </div>
        }
      </div>
    )
  }
}

export default Editor;
