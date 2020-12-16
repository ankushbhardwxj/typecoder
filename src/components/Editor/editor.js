import React, { useEffect, useState } from 'react';
import data from '../../code';
import "./editor.css";
import { findDOMNode } from 'react-dom';
import { Container } from 'semantic-ui-react';


// TODO: Improve this cursor to be like that of Google DOCS
// also this needs a popping animation resembling to VIM
const Cursor = props => {
  useEffect(() => {
    /*
    if(props.active >= 0 && props.active <= props.size){
      if(props.active >= 1){
        let prevStyle, cursorStyle;
        if(document.getElementById(String(props.active)) !== null){
          console.log(document.getElementById(props.active).value);
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
    } */
    console.log(props)
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
    this.handlePauseClick = this.handlePauseClick.bind(this);
    this.handleUnpauseClick = this.handleUnpauseClick.bind(this);
  }

  componentDidMount() {
    document.addEventListener('keyup', this.handleKeyDown)
    this.codeRef.current.addEventListener('click', this.handleClick);
    this.setState({size: [...data].length - 1});
  }

  handleClick(evt) {
    this.codeRef.current.focus();
    this.codeRef.current.addEventListener('keyup', this.handleKeyDown);
    console.log('clicked');
  }

  handleKeyDown(e){
    let activeKey = e.key;
    console.log(activeKey)
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
      this.setState({pause: !this.state.pause})
  }
  
  handleUnpauseClick(){
    if(!this.state.pause) 
      this.setState({pause: !this.state.pause})
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
              onKeyPress={this.handleKeyDown}>
              {[...data].map((chr, idx) => {
                // give certain classnames for different entities
                let chrCode = chr.charCodeAt(chr.length - 1);
                if(idx == 0){
                  return (
                    <Cursor
                      key={idx}
                      class={'active'}
                      activeKey={idx}
                    >
                      {chr}
                    </Cursor>
                  ) 
                } else {
                   return(
                      <Cursor
                        key={idx}
                        class={'inactive'}
                        activeKey={idx}
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

