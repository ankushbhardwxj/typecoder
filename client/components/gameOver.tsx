import {Grid} from "@mui/material";
import * as React from "react";
import styles from "../styles/gameOver.module.css";

function GameOver(props: any): JSX.Element {
  const timeDurationToFloatNumber = (minutes: number, seconds: number): number => {
    if (minutes === 0) return seconds / 60;
    else return ((60 * minutes) + seconds) / 60;
  }
  
  const calculateWPM = () => {
    let time = props.timeString;
    if (time !== undefined) {
      let [minutes, seconds]: any = time?.split(":");
      let testDurationInMinutes: number = timeDurationToFloatNumber(parseInt(minutes), parseInt(seconds));
      let wpm = (props.correctLetters.length / 5) * (1 / testDurationInMinutes);
      return wpm.toFixed(2);
    }
  };

  const getPercent = (value: number, total: number) => {
    let ans = (value / total) * 100;
    return ans > 0 ? ans.toFixed(2) : 0;
  };

  const calculateAccuracy = () => {
    return getPercent(props.correctLetters.length, props.totalTyped);
  }

  const calculateUnproductiveKeystrokes = () => {
    return getPercent(props.incorrectLetters.length, props.totalTyped);
  }

  return (
    <div className={styles.container}>
      <Grid container spacing={8}>
        <Grid item>
          <p className={styles.header}> lesson </p> 
          <p className={styles.value}> {props.title}</p> 
          <p className={styles.header}> wpm </p> 
          <p className={styles.value}> {calculateWPM()}</p> 
          <p className={styles.header}> accuracy </p> 
          <p className={styles.value}> {calculateAccuracy()}% </p> 
        </Grid>
        <Grid item>
          <p className={styles.header}> time </p> 
          <p className={styles.value}> {props.timeString} </p> 
          <p className={styles.header}> unproductive keystrokes </p> 
          <p className={styles.value}> {calculateUnproductiveKeystrokes()}% </p> 
          <p className={styles.header}> characters </p> 
          <p className={styles.value2}> correct: {props.correctLetters.length}  </p> 
          <p className={styles.value2}> incorrect: {props.incorrectLetters.length}  </p> 
        </Grid>
      </Grid>
    </div>
  )
}

export default GameOver;
