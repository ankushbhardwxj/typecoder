import * as React from 'react';
import Box from '@mui/material/Box';
import {Container} from '@mui/material';
import styles from '../styles/lessonlist.module.css';

function LessonList({data, setCurrentLesson}: {data: any; setCurrentLesson: any}): JSX.Element {
  return (
    <div>
      <Container maxWidth="md" className={styles.modalContainer}>
        {data?.results.map((item: any, idx: number) => (
          <div key={idx} className={styles.lessonItem}>
            <p> {item.title} [{item.language}] </p>
          </div>
        ))}
      </Container>
    </div>
  );
}

export default LessonList;
