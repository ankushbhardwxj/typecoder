import * as React from 'react';

function Timer(props: any): JSX.Element {
  const [seconds, updateSeconds] = React.useState<number> (0);
  const [minutes, updateMinutes] = React.useState<number> (0);
  const [timeString, updateTimeString] = React.useState<string> ('');

  React.useEffect(() => {
    let id;
    if (props.totalTyped > 0) {
      id = setTimeout(() => {
        if (seconds === 60) {
          updateSeconds(0);
          updateMinutes(minutes + 1);
        } else updateSeconds(seconds + 1);
      }, 1000);
    } else {
      clearTimeout(id);
      updateSeconds(0);
      updateMinutes(0);
    }
    const timeStr = `${cDigits(minutes)} : ${cDigits(seconds)}`;
    updateTimeString(timeStr);
  });

  React.useEffect(() => {
    return () => {
      props.handleSetTimestring(timeString);
    }
  }, [timeString])

  const cDigits = (num: number) => {
    let numString = String(num).length;
    if(numString == 1) return '0'+num;
    else return num;
  }

  return (
    <h2 id="timeString" style={{textAlign: 'center', fontFamily: 'Roboto Mono', color: '#fabd2f'}}>
      {timeString}
    </h2>
  );
}

export default Timer;
