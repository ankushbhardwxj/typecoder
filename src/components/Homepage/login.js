import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub, faGoogle } from '@fortawesome/free-brands-svg-icons';
import { Card, Container, Form } from 'semantic-ui-react';

const SignInWith = props => {
  return (
    <div>
      <h2>Sign in with {props.AuthName}</h2>
      <FontAwesomeIcon
        style={styles.icons}
        icon={props.icon}
      />
    </div>
  )
}

const SignInForm = () => {
  return (
    <Card style={styles.container}>
      <Card.Content>
        <Card.Header>
          <h2>TypeCode</h2>
          <Card.Meta>
            Login
        </Card.Meta>
        </Card.Header>
        <Form>
          <Form.Field>
            <input placeholder='username/email' />
          </Form.Field>
          <Form.Field>
            <input type='password' placeholder='password' />
          </Form.Field>
        </Form>
      </Card.Content>
      <Card.Content extra>
        <SignInWith icon={faGithub} AuthName="Github" />
        <SignInWith icon={faGoogle} AuthName="Google" />
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
  icons: {
    color: 'black'
  },
  container: {
    display: 'block',
    marginLeft: 'auto',
    marginRight: 'auto'
  }
}
export default Login;