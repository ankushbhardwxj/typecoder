import * as React from "react";
import type {NextPage} from 'next'
import SignIn from "../components/signin";
import SignUp from "../components/signup";
import { Container } from "@mui/material";

const Login: NextPage = () => {
  const [showSignIn, toggleShowSignIn] = React.useState<boolean>(true);
  return (
    <Container maxWidth="md" sx={{ textAlign: 'center' }}>
      {showSignIn && <SignIn toggleShowSignIn={toggleShowSignIn}/>}
      {!showSignIn && <SignUp toggleShowSignIn={toggleShowSignIn} />}
    </Container>
  )
}

export default Login;

