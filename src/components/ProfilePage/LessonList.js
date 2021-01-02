import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { Item, Dropdown, Button, Container, Header, Card, Modal } from 'semantic-ui-react';
import LessonModalForm from './LessonModalForm';
import { Alert } from 'reactstrap';
import LessonItem from './LessonItem';

const LessonList = (props) => {
  const [lessons, updateLessons] = useState([]);
  const [lessonCount, updateCount] = useState(0);

  useEffect(() => {
    const uri = `${props.url}/users/${props.user}/lessons`;
    axios({
      method: 'GET',
      url: uri,
    }).then((res) => res.data)
      .then((res) => {
        updateLessons(res);
        updateCount(res.length)
      })
      .catch((err) => console.log(err));
  }, [lessonCount]);

  const onLessonDelete = () => {
    updateCount(lessonCount - 1);
  }

  const onLessonAddition = () => {
    updateCount(lessonCount + 1);
  }

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
        <LessonModalForm
          user={props.user}
          onAdd={onLessonAddition}
        />
        <Card.Group>
          {lessons.map((lesson, idx) =>
            <LessonItem
              key={idx}
              user={props.user}
              header={lesson.title}
              id={lesson._id}
              description={lesson.description}
              date={lesson.date}
              onDelete={onLessonDelete}
            />
          )}
        </Card.Group>
      </Container>
    </React.Fragment>
  );
};

export default LessonList;
