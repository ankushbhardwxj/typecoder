import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Item, Dropdown, Button, Card, Divider, Segment, Grid, Header, Label } from 'semantic-ui-react';
import axios from 'axios';
import { baseURI, port } from '../../config';

const LessonItem = (props) => {
  const [cantDeleteNotification, toggleCantDelete] = useState(false);

  const getPostDate = (timestamp) => {
    const date = String(timestamp).split('T')[0];
    const dateString = new Date(date).toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
    return dateString;
  };

  const handleDelete = e => {
    // Delete that particular lesson
    console.log(props.user, props.originalUserName)
    if (props.user === props.originUserName || props.originUserName == undefined) {
      axios.delete(`${baseURI}:${port}/users/${props.user}/lesson/${props.id}`)
        .then(r => {
          console.log(`Successfully deleted ! ${r}`);
          props.onDelete();
        })
        .catch(err => console.log(err))
    }
  }

  const handleEdit = e => {
    // Edit code of the lesson
    console.log(props.header, props.description, props.code)
  }

  const getColor = () => {
    var color = ''
    switch (props.language) {
      case 'Python':
        color = 'teal'
        break
      case 'Chapel':
        color = 'teal'
        break
      case 'C/C++':
        color = 'red'
        break
      case 'Java':
        color = 'brown'
        break
      case 'Javascript':
        color = 'green'
        break
      default:
        color = 'black'
        break
    }
    return color
  }

  useState(() => {
    if (props.originUserName == undefined) toggleCantDelete(false);
    else if (props.user !== props.originUserName) {
      toggleCantDelete(true);
    } else {
      toggleCantDelete(false);
    }
  }, [])

  if (!props.noLesson)
    return (
      <Card fluid>
        <Grid columns={2} divided padded>
          <Grid.Column >
            <Card>
              <Item.Content>
                <Card.Header style={{ fontFamily: 'Source Code Pro' }}>
                  {props.header}
                </Card.Header>
                <Card.Meta>Posted on {getPostDate(props.date)}</Card.Meta>
                <Card.Content>
                  {props.description}
                  <Label tag color={getColor()} attached='bottom right'>
                    {props.language}
                  </Label>
                </Card.Content>
              </Item.Content>
            </Card>
          </Grid.Column>
          <Grid.Column verticalAlign='middle' width='6'>
            <Button.Group floated='left' size='small' color='black'>
              <Link to={`/app/users/${props.user}/lesson/${props.id}`}>
                <Button secondary >
                  <p style={{ color: 'white' }}>Code !</p>
                </Button>
              </Link>
              {!cantDeleteNotification &&
                <Dropdown className='button icon'>
                  <Dropdown.Menu>
                    <Dropdown.Item onClick={handleDelete} text='Delete Lesson' icon='trash' />
                    <Dropdown.Item onClick={handleEdit} text='Edit Lesson' icon='edit' />
                  </Dropdown.Menu>
                </Dropdown>}
            </Button.Group>
          </Grid.Column>
        </Grid>
      </Card>
    );
  else return (
    <Card fluid style={{ padding: '10px' }}>
      <Header size='large' style={{ fontFamily: 'Acme' }}>
        Hey Typecoder 👋 !
      </Header>
      <p style={{ fontFamily: 'Consolas' }}>
        <strong>
          Seems like you're new here since you don't have any personal
          lessons yet. But don't worry, we got you covered. Here are some favorites
          from <a target="_blank" href="https://github.com/ankingcodes">@ankingcodes's</a> lessons.
        </strong>
      </p>
    </Card>
  );
};

export default LessonItem;
