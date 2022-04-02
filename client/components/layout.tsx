import {Container} from '@mui/material';
import * as React from 'react';
import Footer from './footer';
import Header from './header';

function Layout({children}: {children: React.ReactNode}): JSX.Element {
  return (
    <Container maxWidth="md">
      <title> Typecoder </title>
      <Header />
      {children}
      <Footer />
    </Container>
  );
}

export default Layout;
