import {Grid} from '@mui/material';
import * as React from 'react';
import styles from '../styles/gameOver.module.css';

function GameOver(props: any): JSX.Element {
  const timeDurationToFloatNumber = (minutes: number, seconds: number): number => {
    if (minutes === 0) return seconds / 60;
    else return ((60 * minutes) + seconds) / 60;
  };

  const addToLeaderboard = async (wpm: any) => {
    try {
      // lesson id, usernmae
      const lessonId = props.lessonId;
      const username = window.localStorage.getItem("username");
      console.log(username, wpm);
      if (username !== null) {
        let body = JSON.stringify({
          username: username,
          wpm: wpm
        });
        console.log(body);
        let url = `http://localhost:8000/api/v1/lesson/leaderboard/${lessonId}`;
        let response = await fetch(url, {
          method: "PATCH",
          headers: { 'Content-Type':'application/json' },
          body: body
        });
        let responseJSON = await response.json();
        console.log(responseJSON);
      }
    } catch (err) {
      console.log("Failed to fetch");
    }
  }

  const calculateWPM = () => {
    const time = props.timeString;
    if (time !== undefined) {
      const [minutes, seconds]: any = time?.split(':');
      const testDurationInMinutes: number = timeDurationToFloatNumber(parseInt(minutes), parseInt(seconds));
      const wpm = (props.correctLetters.length / 5) * (1 / testDurationInMinutes);
      addToLeaderboard(wpm.toFixed(2));
      return wpm.toFixed(2);
    }
  };

  const getPercent = (value: number, total: number) => {
    const ans = (value / total) * 100;
    return ans > 0 ? ans.toFixed(2) : 0;
  };

  const calculateAccuracy = () => {
    return getPercent(props.correctLetters.length, props.totalTyped);
  };

  const calculateUnproductiveKeystrokes = () => {
    return getPercent(props.incorrectLetters.length, props.totalTyped);
  };

  // React.useEffect(() => {
  //   return () => {
  //     const wpm = calculateWPM();
  //     addToLeaderboard(wpm);
  //   }
  // }, []);

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
  );
}

export default GameOver;
