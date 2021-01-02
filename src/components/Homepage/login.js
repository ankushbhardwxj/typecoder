import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub, faGoogle } from '@fortawesome/free-brands-svg-icons';
import { Button, Card, Container, Divider, Form, Grid } from 'semantic-ui-react';
import axios from 'axios';
import { Link, Redirect, BrowserRouter } from 'react-router-dom';
import { baseURI, port } from '../../config';

const SignInWith = (props) => {
  return (
    <div
      style={styles.icon}>
      <FontAwesomeIcon
        icon={props.icon}
        size='2x'
      />
    </div>
  );
};

const SignInForm = () => {
  const [login, toggleLogin] = useState(true);
  const [signIn, toggleSignIn] = useState(false);
  const [email, setEmail] = useState('');
  const [fullname, setfullname] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleUserInput = (key, value) => {
    if (key == 'username') {
      setUsername(value);
    }
    if (key == 'password') {
      setPassword(value);
    }
    if (!login && key == 'fullName') {
      setfullname(value);
    }
    if (!login && key == 'email') {
      setEmail(value);
    }
  };

  const handleSubmit = () => {
    axios({
      method: 'POST',
      url: `${baseURI}:${port}/user/signup`,
      data: {
        email: email,
        fullName: fullname,
        username: username,
        password: password,
      },
    })
      .then((r) => {
        console.log('POST METHOD DONE !')
        toggleSignIn(!signIn);
      })
      .catch((err) => console.log('ERROR !' + err));
  };

  const handleSignIn = async () => {
    const axiosRequest = await axios({
      method: 'POST',
      url: `${baseURI}:${port}/user/signin`,
      data: {
        username: username,
        password: password,
      },
    })
      .then(() => {
        console.log('POST (Sign in) Done !');
        toggleSignIn(!signIn);
      })
      .catch((err) => console.log(err));
  };

  if (signIn) {
    return (
      <Redirect to={`/app/users/${username}/profile`} />
    );
  }

  return (
    <Card style={styles.container}>
      <Card.Content>
        <Card.Header>
          <h2 style={styles.header}>TypeCode ☕</h2>
        </Card.Header>
        <Divider />
        <Form>
          {!login && (
            <>
              <Form.Field>
                <input onChange={(e) => handleUserInput('email', e.target.value)}
                  id='Email'
                  placeholder='Email' />
              </Form.Field>
              <Form.Field>
                <input onChange={(e) => handleUserInput('fullName', e.target.value)}
                  id='FullName' placeholder='Full Name' />
              </Form.Field>
            </>
          )}
          <Form.Field>
            <input onChange={(e) => handleUserInput('username', e.target.value)}
              id='Username' placeholder='Username' />
          </Form.Field>
          <Form.Field>
            <input onChange={(e) => handleUserInput('password', e.target.value)}
              id='Password' type='password' placeholder='Password' />
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
                onClick={() => toggleLogin(false)}>{' Sign up'}</span>
            </p>
          ) : (
              <p style={{ color: 'black' }}>
                Have an account ?
                <span
                  style={styles.link}
                  onClick={() => toggleLogin(true)}>{' Log in'}</span>
              </p>
            )
        }
        <a
          style={{ color: '#1f6f8b', cursor: 'pointer', fontSize: '12px' }}>
          Forgot password ?
        </a>
      </Card.Content>
    </Card>
  );
};

const Login = () => {
  return (
    <Container textAlign="center" style={{ paddingTop: '60px' }}>
      <SignInForm />
    </Container>
  );
};

const styles = {
  link: { color: '#1f6f8b', cursor: 'pointer' },
  icon: {
    color: 'black',
    paddingLeft: '20px',
    cursor: 'pointer',
  },
  icons: {
    marginLeft: '30%',
    marginRight: 'auto',
  },
  header: {
    fontFamily: 'Goldman, cursive',
    color: '#f05459',
    fontSize: '35px',
    paddingBottom: '15px',
    paddingTop: '10px',
    textShadow: '2px 2px black',
  },
  subHeader: {
    color: '#222831',
    fontFamily: 'Goldman, cursive',
    fontSize: '20px',
  },
  subAuth: {
    color: '#222831',
    fontFamily: 'Goldman, cursive',
    fontSize: '15px',
  },
  container: {
    display: 'block',
    marginLeft: 'auto',
    marginRight: 'auto',
    background: '#e8e8e8',
  },
  cardLogin: {
    fontFamily: 'Constantine',
    color: 'black',
  },
};
export default Login;
