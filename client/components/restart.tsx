import * as React from 'react';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import {IconButton, Tooltip} from '@mui/material';
import styles from "../styles/restart.module.css";

function Restart(props: {handleRestart: () => void}): JSX.Element {
  return (
    <div className={styles.restart}>
      <Tooltip title="Restart Lesson">
        <IconButton onClick={props.handleRestart}>
          <RestartAltIcon className={styles.restartbtn} />
        </IconButton>
      </Tooltip>
    </div>
  )
}

export default Restart;
