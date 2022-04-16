import * as React from 'react';
import styles from '../styles/header.module.css';
import "../styles/header.module.css";
// import Image from 'next/image';
import KeyboardIcon from '@mui/icons-material/Keyboard';
import PersonIcon from '@mui/icons-material/Person';
import LeaderboardIcon from '@mui/icons-material/Leaderboard';
import InfoIcon from '@mui/icons-material/Info';
import {Grid, IconButton, Button} from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import Link from 'next/link';
import {useRouter} from 'next/router';

function Header(): JSX.Element {
  const router = useRouter();
  const [userName, setUserName] = React.useState<string | null>('');

  const handleSignOut = () => {
    setUserName('');
    window.localStorage.removeItem('isSignedIn');
    window.localStorage.removeItem('username');
    router.push('/');
  };

  React.useEffect(() => {
    const isSignedIn = window.localStorage.getItem('isSignedIn');
    const username = window.localStorage.getItem('username');
    if (isSignedIn === 'true') {
      setUserName(username);
    }
  }, [userName]);

  return (
    <Grid container spacing={3}>
      <Grid item>
        <Link href="/">
          <h2 className={styles.mainHeading}> Typecoder </h2>
        </Link>
        <Link href="/">
          <p className={styles.subHeading}> For programmers </p>
        </Link>
      </Grid>
      <Grid item>
        <nav>
          <IconButton>
            <Link href="/">
              <KeyboardIcon className={styles.icon} />
            </Link>
          </IconButton>
          <IconButton>
            <Link href="/leaderboard">
              <LeaderboardIcon className={styles.icon} />
            </Link>
          </IconButton>
          <IconButton>
            <Link href="/about">
              <InfoIcon className={styles.icon} />
            </Link>
          </IconButton>
          <IconButton>
            <Link href="/login">
              <PersonIcon className={styles.icon} />
            </Link>
            {userName?.length !== undefined && userName?.length > 0 &&
              <p className={styles.userName}> {userName} </p>}
          </IconButton>
        </nav>
      </Grid>
      {userName?.length !== undefined && userName?.length > 0 &&
        <Grid item>
          <Button
            style={{ 
              marginTop: '41px',
              marginLeft: '55px', 
              paddingLeft: '50px',
              paddingRight: '50px',
              fontFamily: 'Roboto Mono',
              color: '#665c54',
            }}
            className={styles.signOutBtn}
            onClick={handleSignOut}
            startIcon={<LogoutIcon />}>
              Sign Out
          </Button>
        </Grid>
      }
    </Grid>
  );
}

export default Header;
