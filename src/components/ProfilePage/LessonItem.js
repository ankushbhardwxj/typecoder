import React from 'react';
import { Link } from 'react-router-dom';
import { Item, Dropdown, Button, Card, Divider, Segment, Grid } from 'semantic-ui-react';
import axios from 'axios';
import { baseURI, port } from '../../config';

const LessonItem = (props) => {
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
    axios.delete(`${baseURI}:${port}/users/${props.user}/lesson/${props.id}`)
      .then(r => {
        console.log(`Successfully deleted ! ${r}`);
        props.onDelete();
      })
      .catch(err => console.log(err))
  }

  const handleEdit = e => {
    // Edit code of the lesson
    console.log(props.header)
  }

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
              <Card.Content description={props.description}></Card.Content>
            </Item.Content>
          </Card>
        </Grid.Column>
        <Grid.Column verticalAlign='middle' width='6'>
          <Button.Group floated='left' size='small' color='black'>
            <Button secondary >
              <Link to={`/app/users/${props.user}/lesson/${props.id}`}>
                <p style={{ color: 'white' }}>Code !</p>
              </Link>
            </Button>
            <Dropdown className='button icon'>
              <Dropdown.Menu>
                <Dropdown.Item onClick={handleDelete} text='Delete Lesson' icon='trash' />
                <Dropdown.Item onClick={handleEdit} text='Edit Lesson' icon='edit' />
              </Dropdown.Menu>
            </Dropdown>
          </Button.Group>
        </Grid.Column>
      </Grid>
    </Card>
  );
};

export default LessonItem;
