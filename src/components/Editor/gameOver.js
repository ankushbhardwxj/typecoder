import React, {useRef, useState, useEffect} from 'react';
import {Header, Grid, Table} from 'semantic-ui-react';

const GameOverComponent = props => {
  const details = useRef(null);

  useEffect(() => {
    details.current.scrollIntoView({behavior: 'smooth'}) 
  })

  const getPercent = (value, total) => {
    let ans = (value/total)*100;
    return ans>0 ? ans : 0;
  }

  return (
    <div style={styles.container}>
      <Header as='h2' style={styles.gameOver}>GAME OVER !</Header>
      <img style={styles.img} alt="Naruto" src="https://i.ytimg.com/vi/XdBrFPqSMpo/hqdefault.jpg" />
      <Header as='h4' style={styles.summary}>Lesson Summary</Header>
      <div ref={details} style={styles.table}>
        <Table 
          basic='very' 
          collapsing 
          textAlign='center'
          style={styles.table}
        >
          <TableRow 
            text="Total Typed Characters"
            value={props.totalTyped}
          />
          <TableRow 
            text="Correctly Typed Characters"
            value={[...props.correctKeys].length}
          />
          <TableRow
            text="Unproductive Keystrokes"
            value={getPercent([...props.incorrectKeys].length, props.totalTyped)}
            percent
          />
          <TableRow
            text="WPM"
          />
        </Table>
      </div>  
    </div>
  );
}

const TableRow = props => {
  return (
    <Table.Row >
      <Table.Cell style={styles.border}>
        <Header style={styles.tableText} as='h4'>
          {props.text}
        </Header>
      </Table.Cell> 
      <Table.Cell style={styles.border}>
        <Header style={styles.tableText} as='h4'>
          {props.value} {props.percent ? "%" : ""} 
        </Header>
      </Table.Cell>
    </Table.Row> 
  )
}
  

const styles = {
  container: {
    marginTop: '10px',
    background: '#2b2a28',
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
  },
  tableText: {
    fontFamily: 'Goldman, cursive',
    textAlign: 'center',
    color: '#e8e8e8'
  },
  table: {
    backgroundColor: '#1a1919',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  border: {
    borderBottom: '2px solid #636363'
  }
};

export default GameOverComponent;

