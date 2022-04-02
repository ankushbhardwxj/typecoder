import * as React from 'react';
import type {NextPage} from 'next';
import SignIn from '../components/signin';
import SignUp from '../components/signup';
import {Container} from '@mui/material';
import Profile from '../components/profile';

const Login: NextPage = () => {
  const [userName, setUserName] = React.useState<string>('');
  const [showSignIn, toggleShowSignIn] = React.useState<boolean>(true);
  const [showStayTuned, toggleShowStayTuned] = React.useState<boolean>(false);

  React.useEffect(() => {
    const isSignedIn = window.localStorage.getItem('isSignedIn');
    const username = window.localStorage.getItem('username');
    if (isSignedIn === 'true' && username !== null) {
      setUserName(username);
      toggleShowStayTuned(true);
    }
  }, []);

  return (
    <Container maxWidth="md" sx={{textAlign: 'center'}}>
      {showStayTuned && <Profile userName={userName} />}
      {!showStayTuned && showSignIn && <SignIn toggleShowSignIn={toggleShowSignIn}/>}
      {!showStayTuned && !showSignIn && <SignUp toggleShowSignIn={toggleShowSignIn} />}
    </Container>
  );
};

export default Login;

