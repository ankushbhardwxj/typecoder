import * as React from 'react';
import styles from '../styles/signin.module.css';
import {Button} from '@mui/material';
import PersonAddIcon from '@mui/icons-material/PersonAdd';


function SignUp(props: { toggleShowSignIn: any }): JSX.Element {
  return (
    <div>
      <h3 className={styles.header}> register </h3>
      <div>
        <input className={styles.inputHolder} placeholder="username" type="text"/>
      </div>
      <div>
        <input className={styles.inputHolder} placeholder="email" type="email"/>
      </div>
      <div>
        <input className={styles.inputHolder} placeholder="password" type="password"/>
      </div>
      <div>
        <input className={styles.inputHolder} placeholder="confirm password" type="password"/>
      </div>
      <Button className={styles.signInBtn} variant="contained" startIcon={<PersonAddIcon />}>
        Sign Up
      </Button>
      <p className={styles.header}> Already have an account ? <br/>
        <span onClick={() => props.toggleShowSignIn(true)}><u> Sign in </u></span> </p>
      {/* <Button className={styles.signInBtn} variant="contained" startIcon={<GoogleIcon />}>
        Google sign in
      </Button>*/}

    </div>
  );
}

export default SignUp;
