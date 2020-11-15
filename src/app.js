import React, { } from 'react';
import Editor from './components/Editor/editor';
import HomePage from './components/Homepage/homepage';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import Login from './components/Homepage/login';
import { Container } from 'semantic-ui-react';

const routes = [
  {
    path: '/app',
    exact: true,
    main: () => <HomePage />
  },
  {
    path: '/login',
    main: () => <Login />
  },
  {
    path: '*',
    main: () => <div>404 ! Not Found !</div>
  }
]

const App = () => {
  return (
    <Router>
      <Container fluid style={styles.container}>
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
  )
}

const styles = {
  container: {
    height: '400px',
    background: '#222831'
  }
}
export default App;