import React, { useState } from 'react';
import { Header, Card, Feed } from 'semantic-ui-react';

const RecentActivity = props => {
  const [activity, setActivity] = useState([]);

  return (
    <React.Fragment>
      <Header
        as='h2'
        style={styles.header}
        inverted
        color='red'>
        Recent Activity
        </Header>
      <Card>
        <Card.Content>
          <Feed>
            <Feed.Event>
              <Feed.Label icon='code' />
              <Feed.Content>
                <Feed.Date content='1 day ago' />
                <Feed.Summary>
                  Practiced that program
            </Feed.Summary>
              </Feed.Content>
            </Feed.Event>
          </Feed>
        </Card.Content>
      </Card>
    </React.Fragment>
  )
}
const styles = {
  header: {
    fontFamily: 'Stalinist One, cursive',
    fontSize: '18px',
    marginTop: '20px',
    textShadow: '4px 4px #4d4e52',
    WebkitTextStrokeWidth: '0.1px',
    WebkitTextStrokeColor: 'black'
  },
}
export default RecentActivity;