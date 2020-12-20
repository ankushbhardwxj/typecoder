import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import NavBar from './NavBar';
import axios from 'axios';
import { baseURI, port } from '../../config';
import ProfileCard from './ProfileCard';
import LessonList from './LessonList';
import { Grid, Container } from 'semantic-ui-react';

const ProfilePage = props => {
  let { user } = useParams();
  let [firstRender, toggleFirstRender] = useState(false);
  let [username, setUsername] = useState('');
  let [email, setEmail] = useState('');
  let [fullName, setFullName] = useState('');
  let [dateOfJoin, setDateOfJoin] = useState('');

  useEffect(() => {
    // TODO: fix multiple render issue here
    axios({
      method: 'GET',
      url: `${baseURI}:${port}/users/${user}/info`,
    })
      .then(res => res.data)
      .then(res => res[res.length - 1])
      .then(res => {
        let { date, email, fullName, username } = res;
        setUsername(username);
        setEmail(email);
        setDateOfJoin(date);
        setFullName(fullName);
      })
      .catch(e => console.log(e));
  }, [firstRender])

  return (
    <React.Fragment>
      <NavBar />
      <Container>
        <Grid columns={2} divided>
          <Grid.Row>
            <Grid.Column>
              <ProfileCard
                style={styles.container}
                profilePic='https://avatars0.githubusercontent.com/u/40923324?s=460&u=ec2ab2c495c1f5ea6b3c9ba1a3717a351236c92e&v=4'
                fullName={fullName}
                username={username}
                dateOfJoin={dateOfJoin}
              />
            </Grid.Column>
            <Grid.Column>
              <LessonList
                user={user}
                url={`${baseURI}:${port}`}
                style={styles.container}
              />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Container>
    </React.Fragment>
  )
}

const styles = {
  container: {
    paddingTop: '20px'
  }
}

export default ProfilePage;