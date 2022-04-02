import * as React from 'react';
import styles from "../styles/header.module.css";
//import Image from 'next/image';
import KeyboardIcon from '@mui/icons-material/Keyboard';
import PersonIcon from '@mui/icons-material/Person';
import LeaderboardIcon from '@mui/icons-material/Leaderboard';
import InfoIcon from '@mui/icons-material/Info';
import {Grid, IconButton, Button} from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import Link from "next/link";

function Header(): JSX.Element {
  const [userName, setUserName] = React.useState<string | null> ("");

  const handleSignOut = () => {
    setUserName('');
    window.localStorage.removeItem('isSignedIn');
    window.localStorage.removeItem('username');
  }

  React.useEffect(() => {
    let isSignedIn = window.localStorage.getItem('isSignedIn');
    let username = window.localStorage.getItem('username');
    if (isSignedIn === "true") {
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
