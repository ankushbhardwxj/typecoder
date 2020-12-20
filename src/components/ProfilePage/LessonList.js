import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Item, Button, Container, Header, Card } from 'semantic-ui-react';

const LessonItem = props => {
  return (
    <Card>
      <Item.Content>
        <Card.Header style={{ fontFamily: 'Source Code Pro' }}>
          {props.header}
        </Card.Header>
        <Card.Content description={props.description}></Card.Content>
      </Item.Content>
      <Button floated='right'>Code !</Button>
    </Card>
  )
}

const LessonList = props => {
  const [firstRender, toggleFirstRender] = useState(false);
  const [lessons, updateLessons] = useState([]);

  useEffect(() => {
    let uri = `${props.url}/users/${props.user}/lessons`;
    axios({
      method: 'GET',
      url: uri
    }).then(res => res.data)
      .then(res => {
        updateLessons(res);
      })
      .catch(err => console.log(err))
  }, [firstRender])

  return (
    <React.Fragment>
      <Container style={props.style}>
        <Header
          as='h2'
          style={{ fontFamily: 'Source Code Pro' }}
          inverted
          color='red'>
          Lessons
        </Header>
        <Card.Group>
          {lessons.map(lesson =>
            <LessonItem
              header={lesson.title}
              description={`Great coding tutorial for Greatest Coders`}
            />
          )}
        </Card.Group>
      </Container>
    </React.Fragment>
  )
}

export default LessonList;