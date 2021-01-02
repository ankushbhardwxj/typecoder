import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { Item, Dropdown, Button, Container, Header, Card, Modal, Segment, Divider } from 'semantic-ui-react';
import LessonModalForm from './LessonModalForm';
import LessonItem from './LessonItem';

const EmptyListFallback = props => {
  const username = 'ankingcodes';
  const [lessons, updateLessons] = useState([]);

  useEffect(() => {
    const uri = `${props.url}/users/${username}/lessons`;
    axios({
      method: 'GET',
      url: uri,
    }).then((res) => res.data)
      .then((res) => {
        updateLessons(res);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
      <LessonItem noLesson />
      {lessons.map((lesson, idx) =>
        <LessonItem
          key={idx}
          user={props.user}
          originUserName={username}
          header={lesson.title}
          id={lesson._id}
          description={lesson.description}
          language={lesson.language}
          date={lesson.date}
          code={lesson.code}
        />
      )}
    </>
  )
}

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
          style={styles.header}
          inverted
          color='red'>
          Lessons
        </Header>
        <LessonModalForm
          user={props.user}
          onAdd={onLessonAddition}
        />
        <Card.Group style={styles.card}>
          {lessonCount == 0 &&
            <EmptyListFallback
              user={props.user}
              url={props.url}
            />}
          {lessonCount > 0 && lessons.map((lesson, idx) =>
            <LessonItem
              key={idx}
              user={props.user}
              header={lesson.title}
              id={lesson._id}
              description={lesson.description}
              language={lesson.language}
              date={lesson.date}
              code={lesson.code}
              onDelete={onLessonDelete}
            />
          )}
        </Card.Group>
      </Container>
    </React.Fragment>
  );
};

const styles = {
  header: {
    fontFamily: 'Stalinist One, cursive',
    fontSize: '30px',
    textShadow: '4px 4px gray',
    WebkitTextStrokeWidth: '0.1px',
    WebkitTextStrokeColor: 'black'
  },
  card: {
    border: 'solid 2.1px #cfcfcf',
    borderRadius: '6px'
  }
}

export default LessonList;
