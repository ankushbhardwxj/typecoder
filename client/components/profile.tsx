import * as React from "react";

function Profile({ userName }: { userName: string }): JSX.Element {
  return (
    <React.Fragment>
      <h2 style={{fontFamily: 'Roboto Mono', color: '#665c54'}}> PROFILE </h2>
      <p style={{fontFamily: 'Roboto Mono', color: '#ebdbb2'}}>
        Hi {userName}, thanks for joining typecoder. 
        <br/> <br/>
        Stay tuned for the next release, an amazing profile page is in progress.
        <br/> <br />
        Typecoder is targeted towards developers, feel free to check out github.com/ankushbhardwxj/typecoder. Feel free to tell us about a feature you'd like, or maybe contribute a PR for it yourself !
      </p>
    </React.Fragment>
  );
}

export default Profile;
