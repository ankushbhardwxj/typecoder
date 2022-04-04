import * as React from 'react';

function Leaderboard(): JSX.Element {
  const [leaderboard, setLeaderboard] = React.useState<any>([]);

  const getLesson = async (id: any) => {
    const url = `https://mighty-eyrie-60612.herokuapp.com/api/v1/lesson/${id}`;
    let response: any = await fetch(url);
    response = await response.json();
    setLeaderboard(response?.result?.leaderboard);
  };

  React.useEffect(() => {
    const lessonId = window.localStorage.getItem('activeLesson');
    getLesson(lessonId);
  }, []);


  return (
    <React.Fragment>
      <h2 style={{fontFamily: 'Roboto Mono', color: '#665c54'}}> LEADERBOARD </h2>
      <table style={{
        fontFamily: 'Roboto Mono',
        textAlign: 'left',
        borderSpacing: '20px',
        color: '#ebdbb2',
      }}>
        <tr>
          <th> id </th>
          <th> username </th>
          <th> wpm </th>
          <th> date </th>
        </tr>
        {leaderboard.map((item: any, idx: number) => (
          <tr key={idx}>
            <td> {idx+1} </td>
            <td> {item.name} </td>
            <td> {item.wpm} </td>
            <td> {item.date} </td>
          </tr>
        ))}
      </table>
    </React.Fragment>

  );
}

export default Leaderboard;
