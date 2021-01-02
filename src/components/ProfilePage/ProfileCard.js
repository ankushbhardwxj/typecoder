import React from 'react';
import style from 'react-syntax-highlighter/dist/esm/styles/hljs/a11y-dark';
import { Container, Image, Card } from 'semantic-ui-react';
import Social from './Social';

const ProfileCard = (props) => {
  const getJoinDate = (timestamp) => {
    const date = String(timestamp).split('T')[0];
    const dateString = new Date(date).toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
    return dateString;
  };

  return (
    <Container style={props.style}>
      <Card color={'teal'} raised>
        <Image src={props.profilePic}
          size='small' wrapped ui={false}
          onMouseOver={() => { }} />
        <Card.Content>
          <Card.Header style={styles.name} >{props.fullName}</Card.Header>
          <Card.Meta>
            <span style={styles.username} className='username'><b>{props.username}</b></span>
          </Card.Meta>
          <Card.Meta>
            <span className='date'>
              <em>
                Joined on {getJoinDate(props.dateOfJoin)}
              </em>
            </span>
          </Card.Meta>
        </Card.Content>
        <Card.Content extra>
          <Social email={props.email} />
        </Card.Content>
      </Card>
    </Container>
  );
};

const styles = {
  name: {
    fontFamily: 'Source Code Pro',
    color: '#2d3e8a'
  },
  username: {
    fontFamily: 'Constantia',
    color: 'black'
  }
}
export default ProfileCard;
