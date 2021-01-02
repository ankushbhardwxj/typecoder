import React from 'react';
import style from 'react-syntax-highlighter/dist/esm/styles/hljs/a11y-dark';
import { Container } from 'semantic-ui-react';

const Header = (props) => {
  return (
    <>
      <Container fluid style={{ paddingLeft: '20px' }}>
        <h2 style={styles.title}>{props.title}</h2>
        <h3 style={styles.totalTyped}>Total Typed: {props.totalTyped}</h3>
      </Container>
    </>
  );
};

const styles = {
  title: {
    fontFamily: 'Goldman, cursive',
    fontsize: '20px',
    color: '#f05459',
    textShadow: '2px 2px black',
  },
  totalTyped: {
    fontFamily: 'Goldman, cursive',
    fontsize: '10px',
    marginTop: '-10px'
  }
}

export default Header;
