import * as React from 'react';
import Box from '@mui/material/Box';
import { Container } from '@mui/material';
import styles from "../styles/lessonlist.module.css";

function LessonList(): JSX.Element {
  const [lessons, setLessons] = React.useState<string[]>([]);
  return (
    <Container maxWidth="md" className={styles.modalContainer}>
      {lessons.map(item => (
        <div className={styles.lessonItem}>
          <p> {item} </p>
        </div>
      ))}
    </Container>
  )
}

export default LessonList;
