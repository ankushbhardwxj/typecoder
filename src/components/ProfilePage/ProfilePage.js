import React, { useEffect, useState } from "react";
import { useParams, useRouteMatch } from "react-router-dom";
import NavBar from "./NavBar";
import axios from "axios";
import { baseURI } from "../../config";
import Profile from "./MainProfilePage";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { Container } from "semantic-ui-react";
import Editor from "../Editor/editor";

const ProfilePage = (props) => {
  const { user } = useParams();
  const { url } = useRouteMatch();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState("");
  const [dateOfJoin, setDateOfJoin] = useState("");
  const [notFound, toggleNotFound] = useState(false);

  useEffect(() => {
    // TODO: fix multiple render issue here
    axios({
      method: "GET",
      url: `${baseURI}/users/${user}/info`,
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
      .catch((e) => {
        console.log(e);
        toggleNotFound(!notFound);
      });
  }, []);

  // TODO: make a NOT FOUND component
  const NotFoundDiv = (
    <Route>
      <div>404! Not Found !</div>
    </Route>
  );

  const RouteDiv = (
    <div>
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
    </div>
  );

  return (
    <React.Fragment>
      <NavBar />
      <Router>
        <Container fluid>
          <Switch>
            {notFound && NotFoundDiv}
            {!notFound && RouteDiv}
          </Switch>
        </Container>
      </Router>
    </React.Fragment>
  );
};

export default ProfilePage;
