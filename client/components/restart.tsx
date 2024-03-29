import * as React from 'react';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import {IconButton, Tooltip} from '@mui/material';
import styles from '../styles/restart.module.css';

function Restart(props: {handleRestart: () => void}): JSX.Element {
  return (
    <div className={styles.restart}>
      <Tooltip title="Restart Lesson">
        <RestartAltIcon onClick={props.handleRestart} className={styles.restartbtn} />
      </Tooltip>
    </div>
  );
}

export default Restart;
