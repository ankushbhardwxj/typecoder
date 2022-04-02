import * as React from 'react';
import type {NextPage} from 'next';

const About: NextPage = () => {
  return (
    <React.Fragment>
      <h2 style={{fontFamily: 'Roboto Mono', color: '#665c54'}}> ABOUT </h2>
      <p style={{fontFamily: 'Roboto Mono', color: '#ebdbb2'}}>
        Typecoder is a typing practice platform specifically for programmers. There are many great typing test websites out there, where you type english words. However, a programmer deals with a combination of english alphabets, numbers and symbols.
        <br/> <br/>
        Therefore, the typing performance of a programmer can only be measured when they type "code" with speed and accuracy.
        <br/> <br />
        On Typecoder, you can test yourself in a wide variety of "open source" code typing tests, across many popular languages. You can get detailed information about your typing speed and accuracy. Additionally, you can also compete with friends together in a session.

      </p>
    </React.Fragment>
  );
};

export default About;

