import React, { } from 'react';
import Editor from './components/Editor/editor';
import HomePage from './components/Homepage/homepage';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from 'react-router-dom';
import Login from './components/Homepage/login';
import { Container } from 'semantic-ui-react';

const routes = [
  {
    path: '/app/code',
    exact: true,
    main: () => <Editor />
  },
  {
    path: '/app/login',
    main: () => <Login />
  },
  {
    path: '/app',
    exact: true,
    main: () => <HomePage />,
  },
  {
    path: '/',
    main: () => <Redirect to='/app' />
  },
  {
    path: '*',
    main: () => <div>404 ! Not Found !</div>
  }
]

const App = () => {
  return (
    <div style={styles.container}>
      <Router>
        <Container fluid style={{ paddingTop: '60px' }}>
          <Switch>
            {routes.map((route, idx) => (
              <Route
                key={idx}
                path={`${route.path}`}
                children={route.main}
              />
            ))}
          </Switch>
        </Container>
      </Router>
    </div>
  )
}

const styles = {
  container: {
    minHeight: '100vh',
    background: '#222831'
  }
}

export default App;