import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Image } from 'semantic-ui-react';
import NavBar from './NavBar';
import axios from 'axios';
import { baseURI, port } from '../../config';

const ProfilePage = props => {
  let { user } = useParams();
  let [firstRender, toggleFirstRender] = useState(false);
  let [username, setUsername] = useState('');
  let [email, setEmail] = useState('');
  let [fullName, setFullName] = useState('');
  let [dateOfJoin, setDateOfJoin] = useState('');

  useEffect(() => {
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

  const getJoinDate = (timestamp) => {
    const date = String(timestamp).split('T')[0];
    const dateString = new Date(date).toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    })
    return dateString;
  }

  return (
    <React.Fragment>
      <NavBar />
      <Container style={styles.container}>
        <Image src='https://avatars1.githubusercontent.com/u/47313528?s=88&v=4'
          size='small' circular
          onMouseOver={() => { }} />
        <div>
          <h1>{username}</h1>
          <h2>{email}</h2>
          <h2>{fullName}</h2>
          <h2>{getJoinDate(dateOfJoin)}</h2>
        </div>
      </Container>
    </React.Fragment>
  )
}

const styles = {
  container: {
    display: 'block',
    marginLeft: 'auto',
    marginRight: 'auto'
  }
}

export default ProfilePage;