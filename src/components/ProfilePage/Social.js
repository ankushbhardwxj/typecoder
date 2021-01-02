import React, { useState } from 'react';
import { Button, Icon } from 'semantic-ui-react';

const Social = props => {
  const [email, setEmail] = useState('');
  const [github, setGithub] = useState('');
  const [linkedIn, setLinkedIn] = useState('');
  const [website, setWebsite] = useState('');

  const handleEditBtnClick = () => {
    // TODO: Add UPDATE operation on profile details
  }

  useState(() => {
    setEmail(props.email);
  }, []);

  return (
    <>
      <a href={`mailto:${email}`}>
        <Icon size='large' name='mail' />
      </a>
      <a href={`${github}`}>
        <Icon size='large' name='github' />
      </a>
      <a href={`${linkedIn}`}>
        <Icon size='large' name='linkedin' />
      </a>
      <a href={`${website}`}>
        <Icon size='large' name='globe' />
      </a>
      <Button size='tiny' floated='right' onClick={() => handleEditBtnClick()}>
        Edit Profile
      </Button>
    </>
  )
}

export default Social;