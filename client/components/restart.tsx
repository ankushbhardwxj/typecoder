import * as React from 'react';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import {IconButton, Tooltip} from '@mui/material';

function Restart(props: {handleRestart: () => void}): JSX.Element {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', marginTop: '25px' }}>
      <Tooltip title="Restart Lesson">
        <IconButton>
          <RestartAltIcon onClick={props.handleRestart} sx={{color: '#fabd2f'}}/>
        </IconButton>
      </Tooltip>
    </div>
  )
}

export default Restart;
