import React from 'react';
import { Container, Label } from 'semantic-ui-react';
import Timer from './timer';

const Header = (props) => {
  return (
    <>
      <Container fluid style={{ paddingLeft: '20px' }}>
        <h2 style={styles.title}>
          {props.title + "   "}
          <Label tag color='black'>{props.language}</Label>
        </h2>
        <h3 style={styles.totalTyped}>Total Typed: {props.totalTyped}</h3>
        <Timer totalTyped={props.totalTyped} gameOver={props.gameOver}/>
      </Container>
    </>
  );
};

const styles = {
  title: {
    fontFamily: 'Goldman, cursive',
    fontSize: '38px',
    color: '#f05459',
    textShadow: '2px 2px black',
    textAlign: 'center'
  },
  totalTyped: {
    fontFamily: 'Goldman, cursive',
    fontSize: '20px',
    marginTop: '-20px',
    marginBottom: '-10px'
  }
}

export default Header;
