import * as React from 'react';
import Cursor from './cursor';
import styles from '../styles/editor.module.css';
import Restart from './restart';
import {Modal, Container} from '@mui/material';
// import LessonList from "./lessonlist";
import forge from 'node-forge';
import stylesModal from '../styles/lessonlist.module.css';
import Timer from './timer';
import GameOver from './gameOver';

type EditorProps = {
  data: any;
  activeLesson: any;
  handleLessonClick: any;
}

type EditorState = {
  idx: number;
  size: number;
  code: string;
  title: string;
  open: boolean;
  pause: boolean;
  delete: boolean;
  totalTyped: number;
  username: string;
  description: string;
  language: string;
  pressedKey: string;
  timeString: string;
  gameOver: boolean;
  incorrect: boolean;
  incorrectSpanIdx: any;
  incorrectLetters: string;
  correctLetters: string[];
  allIncorrect: string[];
}

class Editor extends React.Component<EditorProps, EditorState> {
  codeRef: any;
  textInput: any;
  constructor(props: EditorProps) {
    super(props);
    this.state = {
      idx: 0,
      size: 0,
      code: '',
      title: '',
      open: false,
      pause: false,
      delete: false,
      totalTyped: 0,
      username: '',
      description: '',
      language: '',
      pressedKey: '',
      timeString: '',
      gameOver: false, // change this to false
      incorrect: false,
      incorrectSpanIdx: null,
      incorrectLetters: '',
      correctLetters: [],
      allIncorrect: [],
    };
    this.codeRef = React.createRef();
    this.textInput = React.createRef();
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handlePauseClick = this.handlePauseClick.bind(this);
    this.handleUnpauseClick = this.handleUnpauseClick.bind(this);
    this.handleRestart = this.handleRestart.bind(this);
    this.handleOpen = this.handleOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  handleKeyDown(e: KeyboardEvent) {
    let activeKey; let ele;
    if (!this.state.gameOver && this.state.idx != null) {
      activeKey = e.key;
      const element = document.getElementById(String(this.state.idx));
      if (element != null) ele = element.innerText;
    }
    // Keep focus on document after hitting tab, extra +1 for cursor to move 2 step
    if (e.keyCode == 9 && e.shiftKey == false) {
      e.preventDefault();
      const tabbedChr = document.getElementById(String(this.state.idx))?.innerText;
      const tabbedChrCode = tabbedChr?.charCodeAt(tabbedChr.length - 1);
      if (tabbedChrCode == 32) {
        this.setState({
          idx: this.state.idx + 2,
        });
      }
    }
    // GAME OVER: When cursor reaches last character
    if (this.state.idx >= this.state.size - 1 && !this.state.incorrect) {
      this.setState({gameOver: true});
    }

    if (!this.state.gameOver) {
      // on hitting backspace move cursor back
      if (activeKey == 'Backspace') {
        if (this.state.idx > 0) {
          this.setState({
            idx: this.state.idx - 1,
            pressedKey: activeKey,
            totalTyped: this.state.totalTyped + 1,
            delete: true,
          });
        }
      } else if (activeKey != 'Shift' && activeKey != 'Tab') {
        // on hitting anything else other than shift, move cursor forward
        if (activeKey !== undefined) {
          this.setState({
            idx: this.state.idx + 1,
            pressedKey: activeKey,
            totalTyped: this.state.totalTyped + 1,
            delete: false,
          });
        }
      }
    }
    // if user hits backspace and comes back to wrong pos, make it right
    if (
      this.state.incorrect &&
      this.state.incorrectSpanIdx != null &&
      this.state.incorrectLetters.length > 0 &&
      this.state.incorrectSpanIdx == this.state.idx
    ) {
      this.setState({
        incorrect: false,
        incorrectSpanIdx: null,
        incorrectLetters: '',
      });
    }
    // Correct and Incorrect Mechanism
    if (
      activeKey != 'Backspace' &&
      activeKey != 'Shift' &&
      activeKey != 'Enter' &&
      activeKey != 'Tab'
    ) {
      // check for incorrect
      if (
        ele != activeKey &&
        !this.state.incorrect &&
        this.state.incorrectSpanIdx == null &&
        this.state.incorrectLetters == ''
      ) {
        if (ele !== undefined && activeKey !== undefined) {
          this.setState({
            incorrect: true,
            incorrectSpanIdx: this.state.idx - 1,
            incorrectLetters: activeKey,
            allIncorrect: [...this.state.allIncorrect, ele],
          });
        }
      } else {
        if (activeKey !== undefined) {
          this.setState({
            correctLetters: [...this.state.correctLetters, activeKey],
          });
        }
      }
    }
  }

  handleClick() {
    this.codeRef?.current.focus();
    this.codeRef?.current.addEventListener('keypress', this.handleKeyDown);
  }

  handlePauseClick() {
    if (this.state.pause) {
      this.setState({pause: !this.state.pause});
    }
  }

  handleUnpauseClick() {
    if (!this.state.pause) {
      this.setState({pause: !this.state.pause});
    }
  }

  handleRestart() {
    const username = window.localStorage.getItem('username') || "";
    this.setState({
      idx: 0,
      size: 0,
      code: '',
      title: '',
      pause: false,
      delete: false,
      totalTyped: 0,
      username: username,
      description: '',
      language: '',
      pressedKey: '',
      gameOver: false, // change this to false
      incorrect: false,
      incorrectSpanIdx: null,
      incorrectLetters: '',
      correctLetters: [],
      allIncorrect: [],
    });
  }

  handleOpen() {
    this.setState({open: true});
  }

  handleClose() {
    this.setState({open: false});
  }

  componentDidMount() {
    const content = forge.util.decode64(this.props.activeLesson?.content || '');
    const username = window.localStorage.getItem('username') || "";
    this.setState({
      size: content.length,
      code: content,
      language: this.props.activeLesson.language,
      title: this.props.activeLesson.title,
      username: username
    });
    document.addEventListener('keydown', this.handleKeyDown);
    if (this.codeRef.current !== null)
    // get rid of this
    {
      this.codeRef.current.addEventListener('click', this.handleClick);
    }
  }

  componentDidUpdate() {
    if (this.state.title !== this.props.activeLesson.title) {
      const content = forge.util.decode64(this.props.activeLesson?.content || '');
      window.localStorage.setItem('activeLesson', this.props.activeLesson?._id);
      this.handleRestart();
      this.setState({
        size: content.length,
        code: content,
        language: this.props.activeLesson.language,
        title: this.props.activeLesson.title,
      });
    }
  }


  render() {
    return (
      <div style={{marginTop: '145px'}}>
        {!this.state.gameOver &&
        <Timer
          gameOver={this.state.gameOver}
          totalTyped={this.state.totalTyped}
          handleSetTimestring={(time: string) => {
            this.setState({timeString: time});
          }}
        />}
        {!this.state.gameOver && <p
          className={styles.editorHeader}
          onClick={this.handleOpen}
        >
          {this.props.activeLesson.title} [{this.props.activeLesson.language}]
        </p>}
        {!this.state.gameOver &&
        <Modal open={this.state.open} onClose={this.handleClose}>
          <Container maxWidth="md" className={stylesModal.modalContainer}>
            {this.props.data?.results.map((item: any, idx: number) => (
              <div key={idx} className={stylesModal.lessonItem}
                onClick={() => {
                  this.props.handleLessonClick(item);
                  this.handleClose();
                }}>
                <p> {item.title} [{item.language}] </p>
              </div>
            ))}
          </Container>
        </Modal>
        }
        {!this.state.gameOver && <pre className={styles.editorContainer}>
          <code ref={this.codeRef} className={styles.code}>
            {[...this.state.code].map((chr, idx) => {
              // give certain classnames for different entities
              const chrCode = chr.charCodeAt(chr.length - 1);
              if (idx < 600) {
                if (idx == this.state.idx) {
                  // render component for Enter
                  if (chrCode == 10) {
                    return (
                      <Cursor
                        key={idx}
                        class={'return'}
                        activeKey={idx}
                        children={`↵ ${chr}`}
                      />
                    );
                  }
                  // render component for current cursor position
                  if (!this.state.incorrect) {
                    return (
                      <Cursor
                        key={idx}
                        class={`active`}
                        activeKey={idx}
                        children={chr}
                      />
                    );
                  } else {
                    return (
                      <Cursor
                        key={idx}
                        class={`active-arrow`}
                        activeKey={idx}
                        children={'<='}
                      />
                    );
                  }
                } else {
                  // render component for all other char except cursor
                  if (this.state.idx >= idx) {
                    if (
                      this.state.incorrect &&
                      idx == this.state.incorrectSpanIdx
                    ) {
                      return (
                        <Cursor
                          key={idx}
                          class={`incorrect`}
                          activeKey={idx}
                          children={chr}
                        />
                      );
                    } else if (this.state.incorrect && idx >= this.state.incorrectSpanIdx) {
                      return (
                        <Cursor
                          key={idx}
                          class={`incorrect`}
                          activeKey={idx}
                          children={chr}
                        />
                      );
                    } else {
                      return (
                        <Cursor
                          key={idx}
                          class={`done`}
                          activeKey={idx}
                          children={chr}
                        />
                      );
                    }
                  } else {
                    return (
                      <Cursor key={idx} activeKey={idx} children={chr} />
                    );
                  }
                }
              }
            })}
          </code>
        </pre>}
        {this.state.gameOver &&
        <GameOver
          lessonId={this.props.activeLesson._id}
          timeString={this.state.timeString}
          title={this.props.activeLesson.title}
          typableLetters={this.state.size}
          language={this.props.activeLesson.language}
          totalTyped={this.state.totalTyped}
          correctLetters={this.state.correctLetters}
          incorrectLetters={this.state.allIncorrect}
        />
        }
        <Restart handleRestart={this.handleRestart}/>
      </div>
    );
  }
}

export default Editor;
