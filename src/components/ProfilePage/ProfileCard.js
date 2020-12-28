import React from 'react';
import {Container, Image, Card} from 'semantic-ui-react';

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
          <Card.Header>{props.fullName}</Card.Header>
          <Card.Meta>
            <span className='username'><b>{props.username}</b></span>
          </Card.Meta>
          <Card.Meta>
            <span className='date'>Joined in {getJoinDate(props.dateOfJoin)}</span>
          </Card.Meta>
        </Card.Content>
      </Card>
    </Container>
  );
};

export default ProfileCard;
