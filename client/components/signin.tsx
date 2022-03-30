import {Button} from '@mui/material';
import * as React from 'react';
import styles from "../styles/signin.module.css";
import LoginIcon from '@mui/icons-material/Login';
import GoogleIcon from '@mui/icons-material/Google';

function SignIn(props: {toggleShowSignIn: any}): JSX.Element {
  return (
    <div>
      <h3 className={styles.header}> login </h3>  
      <div>
        <input className={styles.inputHolder} placeholder="email" type="email"/>
      </div>
      <div>
        <input className={styles.inputHolder} placeholder="password" type="password"/>
      </div>
      <Button className={styles.signInBtn} variant="contained" startIcon={<LoginIcon />}>
        Sign In
      </Button>
      <div>
        <p className={styles.header}> or </p>
      </div>
      <Button className={styles.signInBtn} variant="contained" startIcon={<GoogleIcon />}>
        Google sign in
      </Button>
      <p className={styles.header}> Don't have an account ? <br/>
        <span onClick={() => props.toggleShowSignIn(false)}><u> Sign up </u></span> </p>
    </div>
  )
}

export default SignIn;
