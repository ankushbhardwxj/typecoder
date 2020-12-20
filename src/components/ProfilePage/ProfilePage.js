import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Image } from 'semantic-ui-react';
import NavBar from './NavBar';
import axios from 'axios';

const ProfilePage = props => {
  let { user } = useParams();
  let [changeAvatar, toggleChangeAvatar] = useState(false);

  useEffect(() => {
    axios({
      method: 'GET',

    })
      .then(() => console.log("Fetched User Information"))
      .catch(e => console.log(e));
  })

  return (
    <React.Fragment>
      <NavBar />
      <Container style={styles.container}>
        <Image src='https://avatars1.githubusercontent.com/u/47313528?s=88&v=4'
          size='small' circular
          onMouseOver={() => { }} />
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