import React, {useState, useEffect} from 'react';
import { Step, Button as Btn, Header } from 'semantic-ui-react';

const Timer = props => {
  const [seconds, updateSeconds] = useState(0);
  const [minutes, updateMinutes] = useState(0);
  const [hours, updateHours] = useState(0);
  const [pause, togglePause] = useState(false);
  const [timeString, updateTimeString] = useState('');

  useEffect(() => {
    let id;
    if(!pause && props.totalTyped > 0){
      id = setTimeout(function() {
        if(minutes === 60) {
          updateMinutes(0);
          updateHours(hours + 1);
        }
        if(seconds === 60) {
          updateSeconds(0);
          updateMinutes(minutes + 1);
        }
        else updateSeconds(seconds + 1);
      }, 1000);
    } else {
      clearTimeout(id);
    }
    if(props.gameOver){
      clearTimeout(id);
    }
    const timeString = `${cDigits(hours)} : ${cDigits(minutes)} : ${cDigits(seconds)}`;
    updateTimeString(timeString);
  });

  const cDigits = num => {
    let numString = String(num).length;
    if(numString == 1) return '0'+num;
    else return num;
  }

  const handleBtnClick = () => {
    clearTimeout();
    togglePause(!pause);
  }

  return (
    <React.Fragment>
      <Step.Group>
        <Step style={{backgroundColor: 'black'}}>
          <Header id='timeString' as='h3' style={styles.timer}>
            {timeString}
          </Header>
        </Step>
        <Step>
          {pause && <Button btn='Resume' 
              action={handleBtnClick}/>}
          {!pause && <Button btn='Pause'
              action={handleBtnClick}/>}
        </Step>
      </Step.Group>
    </React.Fragment>
  )
}

const Button = props => {
  return (
    <Btn secondary size='tiny' onClick={props.action}>
      {props.btn} 
    </Btn> 
  )
}

const styles = {
  timer: {
    backgroundColor: 'black',
    color: '#c8f542',
    fontFamily: 'Stalinist One, cursive'
  }
}

export default Timer;
