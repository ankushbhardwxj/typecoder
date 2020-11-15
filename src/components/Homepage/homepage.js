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
        For fast programmers.
      </h4>
    </div>
  )
}

const Features = () => {
  const features = [
    'Improve your coding speed by typing actual code in your favorite languages',
    'Compete with fellow coders to become the fastest',
    'Specially designed for competitive programmers',
  ]
  return (
    <ul>
      {features.map(
        feature => (<li style={styles.li}>{feature}</li>)
      )}
    </ul>
  )
}

const TryOut = () => {
  return (
    <Editor />
  )
}

const HomePage = () => {
  return (
    <div style={styles.container}>
      <Header title="TypeCode" />
      <Link to="/login">
        <Button primary> Login</Button>
      </Link>
      <Grid>
        <Grid.Row>
          <Features />
          <TryOut />
        </Grid.Row>
      </Grid>
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
    textAlign: 'center'
  },
  li: {
    fontFamily: 'Acme, sans-serif',
    fontSize: '20px'
  }
}
export default HomePage;