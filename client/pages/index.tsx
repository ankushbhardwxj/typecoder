import * as React from "react";
import Editor from "../components/editor";

function Home ({data}: {data: any}) {
  const [activeLesson, setActiveLesson] = React.useState<object>({});

  React.useEffect(() => {
    setActiveLesson(data.results[0]);
  }, []);

  const handleLessonClick = (item: any) => {
    setActiveLesson(item);
  }

  return (
    <React.Fragment>
      <Editor
        data={data} 
        activeLesson={activeLesson}
        handleLessonClick={handleLessonClick}
      />
    </React.Fragment>
  )
}

export async function getServerSideProps() {
  const response = await fetch(`http://localhost:8000/api/v1/lesson`);
  const data = await response.json();
  return { props: { data } };
}

export default Home;
