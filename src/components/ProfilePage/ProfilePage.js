import React, { useEffect, useState } from 'react';
import { useParams, useRouteMatch } from 'react-router-dom';
import NavBar from './NavBar';
import axios from 'axios';
import { baseURI, port } from '../../config';
import Profile from './MainProfilePage';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from 'react-router-dom';
import { Container } from 'semantic-ui-react';
import Editor from '../Editor/editor';

const ProfilePage = props => {
  const { user } = useParams();
  const { url } = useRouteMatch();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [fullName, setFullName] = useState('');
  const [dateOfJoin, setDateOfJoin] = useState('');

  useEffect(() => {
    // TODO: fix multiple render issue here
    axios({
      method: 'GET',
      url: `${baseURI}:${port}/users/${user}/info`,
    })
      .then((res) => res.data)
      .then((res) => res[res.length - 1])
      .then((res) => {
        const { date, email, fullName, username } = res;
        setUsername(username);
        setEmail(email);
        setDateOfJoin(date);
        setFullName(fullName);
      })
      .catch((e) => console.log(e));
  }, []);

  return (
    <React.Fragment>
      <NavBar />
      <Router>
        <Container fluid>
          <Switch>
            <Route exact path={`${url}/profile`}>
              <Profile
                userParam={user}
                fullName={fullName}
                username={username}
                email={email}
                dateOfJoin={dateOfJoin}
              />
            </Route>
            <Route exact path={`${url}/lesson/:lessonTitle`}>
              <Editor />
            </Route>
          </Switch>
        </Container>
      </Router>
    </React.Fragment>
  );
};


export default ProfilePage;
