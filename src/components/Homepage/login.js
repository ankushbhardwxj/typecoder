import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub, faGoogle } from '@fortawesome/free-brands-svg-icons';
import { Button, Card, Container, Divider, Form, Grid } from 'semantic-ui-react';
import axios from 'axios';
import { Link, Redirect, BrowserRouter } from 'react-router-dom';

const SignInWith = props => {
  return (
    <div
      style={styles.icon}>
      <FontAwesomeIcon
        icon={props.icon}
        size='2x'
      />
    </div>
  )
}

const SignInForm = () => {
  const [login, toggleLogin] = useState(true);
  const [signIn, toggleSignIn] = useState(false);

  const handleSubmit = () => {
    const email = document.getElementById('Email').value;
    const fullName = document.getElementById('FullName').value;
    const userName = document.getElementById('Username').value;
    const password = document.getElementById('Password').value;
    axios({
      method: 'POST',
      url: 'http://localhost:8080/user/signup',
      data: {
        email: email,
        fullName: fullName,
        username: userName,
        password: password
      }
    })
      .then(r => console.log('POST METHOD DONE !'))
      .catch(err => console.log('ERROR !' + err))
  }

  const handleSignIn = () => {
    const userName = document.getElementById('Username').value;
    const password = document.getElementById('Password').value;
    axios({
      method: 'POST',
      url: 'http://localhost:8080/user/signin',
      data: {
        username: userName,
        password: password
      }
    })
      .then(() => {
        console.log('POST (Sign in) Done !');
        toggleSignIn(!signIn);
      })
      .catch(err => console.log(err))
  }

  if (signIn) {
    return (
      <Redirect to='/app/code' />
    )
  }

  return (
    <Card style={styles.container}>
      <Card.Content>
        <Card.Header>
          <h2 style={styles.header}>TypeCode</h2>
        </Card.Header>
        <Divider />
        <Form>
          {!login && (
            <>
              <Form.Field>
                <input id='Email' placeholder='Email' />
              </Form.Field>
              <Form.Field>
                <input id='FullName' placeholder='Full Name' />
              </Form.Field>
            </>
          )}
          <Form.Field>
            <input id='Username' placeholder='Username' />
          </Form.Field>
          <Form.Field>
            <input id='Password' type='password' placeholder='Password' />
          </Form.Field>
          {!login ? (
            <Button onClick={handleSubmit} secondary>Sign Up</Button>
          ) : (
              <Button onClick={handleSignIn} secondary>Log In</Button>
            )}
        </Form>
      </Card.Content>
      <Divider horizontal>OR</Divider>
      <Card.Content extra>
        <p style={styles.subAuth}>Log in with</p>
        <Grid>
          <Grid.Row style={styles.icons}>
            <SignInWith icon={faGithub} AuthName="Github" />
            <SignInWith icon={faGoogle} AuthName="Google" />
          </Grid.Row>
        </Grid>
      </Card.Content>
      <Card.Content extra>
        {
          login ? (
            <p style={{ color: 'black' }}>
              Don't have an account ?
              <span
                style={styles.link}
                onClick={() => toggleLogin(false)}>{" Sign up"}</span>
            </p>
          ) : (
              <p style={{ color: 'black' }}>
                Have an account ?
                <span
                  style={styles.link}
                  onClick={() => toggleLogin(true)}>{" Log in"}</span>
              </p>
            )
        }
        <a
          style={{ color: '#1f6f8b', cursor: 'pointer', fontSize: '12px' }}>
          Forgot password ?
        </a>
      </Card.Content>
    </Card>
  )
}

const Login = () => {
  return (
    <Container textAlign="center">
      <SignInForm />
    </Container>
  )
}

const styles = {
  link: { color: '#1f6f8b', cursor: 'pointer' },
  icon: {
    color: 'black',
    paddingLeft: '20px',
    cursor: 'pointer'
  },
  icons: {
    marginLeft: '30%',
    marginRight: 'auto'
  },
  header: {
    fontFamily: 'Goldman, cursive',
    color: '#f05459',
    fontSize: '35px',
    paddingBottom: '15px',
    paddingTop: '10px',
    textShadow: '2px 2px black'
  },
  subHeader: {
    color: '#222831',
    fontFamily: 'Goldman, cursive',
    fontSize: '20px'
  },
  subAuth: {
    color: '#222831',
    fontFamily: 'Goldman, cursive',
    fontSize: '15px'
  },
  container: {
    display: 'block',
    marginLeft: 'auto',
    marginRight: 'auto',
    background: '#e8e8e8'
  },
  cardLogin: {
    fontFamily: 'Constantine',
    color: 'black'
  }
}
export default Login;