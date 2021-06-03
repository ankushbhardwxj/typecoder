import React, { useEffect } from "react";
import { baseURI, port } from "../../config";
import ProfileCard from "./ProfileCard";
import LessonList from "./LessonList";
import { Grid, Container } from "semantic-ui-react";
import RecentActivity from "./RecentActivity";

const Profile = (props) => {
  // user has logged in, set in localstorage
  const toggleLocalStorage = (username) => {
    let storage = window.localStorage;
    console.log(username);
    if (
      storage.getItem("username") !== username &&
      storage.getItem("loggedItem") !== true
    ) {
      storage.setItem("username", username);
      storage.setItem("loggedIn", true);
    }
  };

  useEffect(() => {
    return () => {
      console.log(props.username);
      toggleLocalStorage(props.username);
    };
  });

  return (
    <Container>
      <Grid columns={2} divided>
        <Grid.Row>
          <Grid.Column>
            <Grid.Row>
              <ProfileCard
                style={styles.container}
                profilePic="https://avatars0.githubusercontent.com/u/40923324?s=460&u=ec2ab2c495c1f5ea6b3c9ba1a3717a351236c92e&v=4"
                fullName={props.fullName}
                username={props.username}
                dateOfJoin={props.dateOfJoin}
                email={props.email}
              />
            </Grid.Row>
            {/*<Grid.Row>
              <RecentActivity />
            </Grid.Row>*/}
          </Grid.Column>
          <Grid.Column>
            <LessonList
              url={`${baseURI}:${port}`}
              style={styles.container}
              username={props.username}
              user={props.userParam}
            />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Container>
  );
};

const styles = {
  container: {
    paddingTop: "20px",
  },
};

export default Profile;
