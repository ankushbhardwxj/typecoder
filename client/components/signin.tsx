import {Button} from '@mui/material';
import * as React from 'react';
import styles from '../styles/signin.module.css';
import "../styles/signin.module.css";
import LoginIcon from '@mui/icons-material/Login';
import {useRouter} from 'next/router';

function SignIn(props: {toggleShowSignIn: any}): JSX.Element {
  const router = useRouter();
  const [email, setEmail] = React.useState<string>('');
  const [password, setPassword] = React.useState<string>('');

  const getUsername = async () => {
    const url = 'https://tranquil-shore-88871.herokuapp.com/api/v1/getUsername';
    const body = JSON.stringify({Email: email});
    let response: any = await fetch(url, {method: 'POST', body: body});
    response = await response.json();
    console.log(response);
    return response.UserName;
  };

  const handleSignIn = async () => {
    const url = `https://tranquil-shore-88871.herokuapp.com/api/v1/signin`;
    const body = JSON.stringify({Email: email, Password: password});
    const response = await fetch(url, {
      method: 'POST',
      body: body,
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
  };

  return (
    <div>
      <h3 className={styles.header}> login </h3>
      <div>
        <input
          className={styles.inputHolder}
          placeholder="email"
          type="email"
          onChange={(e) => setEmail(e.target.value)}/>
      </div>
      <div>
        <input
          className={styles.inputHolder}
          placeholder="password"
          type="password"
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <Button
        style={{
            marginTop: '10px',
            paddingLeft: '50px',
            paddingRight: '50px',
            fontFamily: 'Roboto Mono',
            color: '#ebdbb2',
            background: '#212121'
        }}
        className={styles.signInBtn}
        onClick={handleSignIn}
        variant="contained"
        startIcon={<LoginIcon />}>
        Sign In
      </Button>
      {/* <div>
        <p className={styles.header}> or </p>
      </div>
      <Button className={styles.signInBtn} variant="contained" startIcon={<GoogleIcon />}>
        Google sign in
      </Button>*/}
      <p className={styles.header}> Don't have an account ? <br/>
        <span onClick={() => props.toggleShowSignIn(false)}><u> Sign up </u></span> </p>
    </div>
  );
}

export default SignIn;
