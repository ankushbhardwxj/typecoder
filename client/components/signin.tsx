import {Button} from '@mui/material';
import * as React from 'react';
import styles from "../styles/signin.module.css";
import LoginIcon from '@mui/icons-material/Login';
import GoogleIcon from '@mui/icons-material/Google';
import {useRouter} from 'next/router';

function SignIn(props: {toggleShowSignIn: any}): JSX.Element {
  const router = useRouter();
  const [email, setEmail] = React.useState<string>("");
  const [password, setPassword] = React.useState<string>("");

  const getUsername = async () => {
    let url = "http://localhost:8001/api/v1/getUsername";
    let body = JSON.stringify({ Email: email });
    let response: any = await fetch(url, { method: "POST", body: body });
    response = await response.json();
    console.log(response);
    return response.userName;
  }

  const handleSignIn = async () => {
    let url = `http://localhost:8001/api/v1/signin`;
    let body = JSON.stringify({ Email: email, Password: password });
    let response = await fetch(url, {
      method: "POST",
      body: body
    });
    if (response.status === 200) {
      // add status to local storage
      window.localStorage.setItem('isSignedIn', 'true');
      window.localStorage.setItem('email', email);
      const username = await getUsername();
      window.localStorage.setItem('username', username);
      // modify icon
      // add sign out option
      router.reload();
    }
  }

  return (
    <div>
      <h3 className={styles.header}> login </h3>  
      <div>
        <input 
          className={styles.inputHolder} 
          placeholder="email" 
          type="email" 
          onChange={e => setEmail(e.target.value)}/>
      </div>
      <div>
        <input 
          className={styles.inputHolder} 
          placeholder="password" 
          type="password"
          onChange={e => setPassword(e.target.value)}
        />
      </div>
      <Button
        className={styles.signInBtn}
        onClick={handleSignIn}
        variant="contained"
        startIcon={<LoginIcon />}>
        Sign In
      </Button>
    {/*<div>
        <p className={styles.header}> or </p>
      </div>
      <Button className={styles.signInBtn} variant="contained" startIcon={<GoogleIcon />}>
        Google sign in
      </Button>*/}
      <p className={styles.header}> Don't have an account ? <br/>
        <span onClick={() => props.toggleShowSignIn(false)}><u> Sign up </u></span> </p>
    </div>
  )
}

export default SignIn;
