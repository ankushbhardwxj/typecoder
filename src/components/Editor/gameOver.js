import React, {useRef, useState, useEffect} from 'react';
import {Header} from 'semantic-ui-react';

const GameOverComponent = props => {
  const details = useRef(null);

  useEffect(() => {
    details.current.scrollIntoView({behavior: 'smooth'}) 
  })

  return (
    <div style={styles.container}>
      <Header as='h2' style={styles.gameOver}>GAME OVER !</Header>
      <img style={styles.img} alt="Naruto" src="https://i.ytimg.com/vi/XdBrFPqSMpo/hqdefault.jpg" />
      <Header as='h4' style={styles.summary}>Lesson Summary</Header>
      <div ref={details}>
         DETAILS   
      </div>  
    </div>
  );
}
  

const styles = {
  container: {
    marginTop: '10px',
    background: '#2b2a28'
  },
  gameOver: {
    fontFamily: 'Stalinist One, cursive',
    paddingTop: '20px',
    color: '#c8f542',
    textAlign: 'center'
  },
  summary: {
    fontFamily: 'Stalinist One, cursive',
    color: 'white',
    textAlign: 'center'
  },
  img: {
    display: 'block',
    marginLeft: 'auto',
    marginRight: 'auto',
    height: '400px'
  }
};

export default GameOverComponent;

