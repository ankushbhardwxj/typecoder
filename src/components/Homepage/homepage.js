import React from 'react';
import { Button, Container, Grid } from 'semantic-ui-react';
import Typing from 'react-typing-animation';
import { BrowserRouter, Link, Switch, Route } from 'react-router-dom';
import Login from './login';
import Editor from '../Editor/editor';

const Cursor = () => {
  return (
    <span style={{
      fontWeight: '100',
      fontSize: '1em',
      paddingLeft: '2px',
    }}>|</span>
  )
}
const Header = props => {
  return (
    <div>
      <Typing
        loop={true}
        startDelay={title.delay}
        cursor={<Cursor />}
        speed={title.fontSpeed}
      >
        <p style={styles.header}>{props.title}☕</p>
        <Typing.Delay ms={1000} />
        <Typing.Backspace count={15} />
      </Typing>
      <img
        style={styles.image}
        src={`${process.env.PUBLIC_URL}/image.PNG`}
      />
      <h4 style={styles.subheader}>
        For
        <span style={styles.subheader.focus}>
          {" fast "}
        </span>
        programmers.
      </h4>
    </div>
  )
}

const Features = () => {
  const features = [
    'Improve your coding speed by typing actual code in your favorite languages',
    'Compete with fellow coders to become the fastest',
    '100% open source software designed for competitive programmers',
  ]
  return (
    <ul>
      {features.map(
        feature => (<li style={styles.li}>{feature}</li>)
      )}
    </ul>
  )
}


const HomePage = () => {
  return (
    <div style={styles.container}>
      <Header title="TypeCode" />
      {/* <Link to="/login">
        <Button secondary> Login</Button>
      </Link> */}
      <Features />
    </div>
  )
}

const title = {
  fontSpeed: 50,
  delay: 0,
}

const styles = {
  image: {
    width: '450px',
    height: '120px',
    display: 'block',
    marginLeft: 'auto',
    marginRight: 'auto'
  },
  header: {
    fontFamily: 'Source Code Pro',
    fontSize: '90px',
    textAlign: 'center',
    color: '#e8e8e8'
  },
  subheader: {
    fontFamily: 'Stalinist One, cursive',
    color: '#f05448',
    fontSize: '40px',
    textAlign: 'center',
    focus: {
      color: '#f0a967'
    }
  },
  li: {
    fontFamily: 'Acme, sans-serif',
    fontSize: '20px',
    color: '#e8e8e8',
    marginTop: '11px',
    borderBottom: '0.5px solid grey',
    marginLeft: '30%',
    marginRight: '30%',
    listStyleType: 'none',
    textAlign: 'center'
  }
}
export default HomePage;