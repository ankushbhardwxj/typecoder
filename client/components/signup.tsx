import * as React from 'react';
import styles from '../styles/signin.module.css';
import {Button} from '@mui/material';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import {useRouter} from 'next/router';


function SignUp(props: { toggleShowSignIn: any }): JSX.Element {
  const router = useRouter();
  const [username, setUsername] = React.useState<string>("");
  const [email, setEmail] = React.useState<string>("");
  const [password, setPassword] = React.useState<string> ("");
  const [confirmPassword, setConfirmPassword] = React.useState<string>("");
  const [showUsernameTaken, toggleShowUsernameTaken] = React.useState<boolean>(false);
  const [showPasswordMismatch, toggleShowPasswordMismatch] = React.useState<boolean>(false);
  const [failedRegister, toggleFailedRegister] = React.useState<boolean>(false);

  const handleSignUp = async () => {
    const url = `https://tranquil-shore-88871.herokuapp.com/api/v1/signup` ;
    let response: any = await fetch(url, {
      method: "POST",
      body: JSON.stringify({
        UserName: username,
        Email: email,
        Password: password
      })
    })
    if (response.status === 200) {
      // add status to local storage
      window.localStorage.setItem('isSignedIn', 'true');
      window.localStorage.setItem('email', email);
      window.localStorage.setItem('username', username);
      // modify icon
      // add sign out option
      router.reload();
    }
    response = await response.json();
    if (response?.error === "user already registered") {
      toggleFailedRegister(true);
    }
  }

  const checkUserNameTaken = async () => {
    const url = `https://tranquil-shore-88871.herokuapp.com/api/v1/checkUsernameTaken`;
    let response: any = await fetch(url, { method: "POST", body: JSON.stringify({ Username: username }) });
    response = await response.json();
    if (response?.Found === true) toggleShowUsernameTaken(true);
    else toggleShowUsernameTaken(false);
  }
  
  return (
    <div>
      <h3 className={styles.header}> register </h3>
      <div>
        <input 
          className={styles.inputHolder} 
          placeholder="username" 
          onChange={async e => {
              await checkUserNameTaken();
              setUsername(e.target.value)
            }
          }
          type="text"
        />
      </div>
      {showUsernameTaken && <div> <p style={{color: 'darkred'}}> Username already taken ! </p> </div>}
      <div>
        <input 
          className={styles.inputHolder} 
          placeholder="email" 
          onChange={e => setEmail(e.target.value)}
          type="email"
        />
      </div>
      <div>
        <input 
          className={styles.inputHolder}
          placeholder="password"
          onChange={e => setPassword(e.target.value)}
          type="password"
        />
      </div>
      <div>
        <input 
          className={styles.inputHolder} 
          placeholder="confirm password" 
          onChange={e => {
            if (e.target.value !== password) toggleShowPasswordMismatch(true);
            else toggleShowPasswordMismatch(false);
            setConfirmPassword(e.target.value)}
          }
          type="password"
        />
      </div>
      {showPasswordMismatch && <div> <p style={{color: 'darkred'}}> Passwords dont match ! </p> </div>}
      {failedRegister && <div> <p style={{color: 'darkred'}}> User registration failed ! </p> </div>}
      <Button onClick={handleSignUp} className={styles.signInBtn} variant="contained" startIcon={<PersonAddIcon />}>
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
