import * as React from 'react';
import styles from "../styles/header.module.css";
//import Image from 'next/image';
import KeyboardIcon from '@mui/icons-material/Keyboard';
import PersonIcon from '@mui/icons-material/Person';
import LeaderboardIcon from '@mui/icons-material/Leaderboard';
import InfoIcon from '@mui/icons-material/Info';
import {Grid, IconButton} from '@mui/material';
import Link from "next/link";

function Header(): JSX.Element {
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
            <LeaderboardIcon className={styles.icon} />
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
          </IconButton>
        </nav>
      </Grid>
    </Grid>
  );
}

export default Header;
