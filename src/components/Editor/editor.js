import React, { useEffect, useState } from 'react';
import data from '../../code';
import "./editor.css";
import { findDOMNode } from 'react-dom';
import { Container } from 'semantic-ui-react';


// TODO: Improve this cursor to be like that of Google DOCS
// also this needs a popping animation resembling to VIM
const Cursor = props => {
  useEffect(() => {
  })
  return (
    <span 
      className={props.class} 
      id={props.activeKey}>
        {props.children}
    </span>
  )
}

class Editor extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      idx: 0,
      code: '',
      pause: false,
      delete: false,
      totalTyped: 0,
      pressedKey: '',
      gameOver: false,
      returnActive: false,
    }
    this.codeRef = React.createRef();
    this.textInput = React.createRef();
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handlePauseClick = this.handlePauseClick.bind(this);
    this.handleUnpauseClick = this.handleUnpauseClick.bind(this);
  }

  componentDidMount() {
    document.addEventListener('keydown', this.handleKeyDown)
    this.codeRef.current.addEventListener('click', this.handleClick);
    this.setState({code: data, size: [...data].length - 1});
  }

  handleClick(evt) {
    this.codeRef.current.focus();
    this.codeRef.current.addEventListener('keypress', this.handleKeyDown);
  }

  handleKeyDown(e){
    if(e.keyCode == 9 && e.shiftKey == false){
      e.preventDefault();
      this.setState({
        idx: this.state.idx + 1 
      })
    }
    let activeKey = e.key;
    let ele = document.getElementById(this.state.idx).innerText;
    if(activeKey != "Tab" || activeKey != "Shift"){
      if(ele == activeKey) console.log("Correct")
      else console.log("typo")
    }
    if(activeKey == "Enter"){
      this.setState({returnActive: !this.state.returnActive});
    }
    if(this.state.idx >= this.state.size-1){
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

  handlePauseClick(){
    if(this.state.pause) 
      this.setState({pause: !this.state.pause});
  }
  
  handleUnpauseClick(){
    if(!this.state.pause) 
      this.setState({pause: !this.state.pause});
  }

  render() {
    return (
      <div
        className="code-container" 
        onClick={this.handleUnpauseClick}
        style={{background: 'gray'}}
      >
        <Header 
          totalTyped={this.state.totalTyped}
          pause={this.props.pause}
        />
        {!this.state.gameOver && 
          <pre 
            onClick={this.handlePauseClick}
            style={{background:'white',fontWeight:'bold',paddingLeft: '20px'}}>
            <code 
              ref={this.codeRef} 
              className={'javascript'} 
            >
              {[...this.state.code].map((chr, idx) => {
                // give certain classnames for different entities
                let chrCode = chr.charCodeAt(chr.length - 1);
                if(idx == this.state.idx){
                  if (chrCode == 10) {
                    return (
                      <Cursor
                      key={idx}
                      class={'return'}
                      activeKey={idx}
                      pressedKey={this.state.pressedKey}
                      currentChar={chr}
                    > 
                         ↵
                        {chr}
                      </Cursor>
                    )
                  } else return (
                    <Cursor
                      key={idx}
                      class={'active'}
                      activeKey={idx}
                      pressedKey={this.state.pressedKey}
                      currentChar={chr}
                    >
                      {chr}
                    </Cursor>
                  ) 
                } else {
                   return(
                      <Cursor
                        key={idx}
                        class={'inactive'}
                        pressedKey={this.state.pressedKey}
                        activeKey={idx}
                        currentChar={chr}
                       >
                        {chr}
                      </Cursor>
                    )   
                }}
              )}
            </code>
        </pre>}
        {this.state.gameOver && <GameOverComponent />}
      </div>
    )
  }
}

const GameOverComponent = () => (
  <div style={{background: 'white', fontWeight: 'bold'}}>
    <h3>GAME OVER</h3>
    <img src="https://i.ytimg.com/vi/XdBrFPqSMpo/hqdefault.jpg"/>
  </div>
)

const Header = props => {
 return (
   <>
     <h1 style={{paddingLeft: '20px'}}>Total Typed: {props.totalTyped}</h1>
     {props.pause && <div style={{paddingLeft:'20px'}}>Paused</div>}
     {!props.pause && <div style={{paddingLeft:'20px'}}>Typing</div>}
   </>
 )
}

export default Editor;

