import * as React from "react";
import Editor from "../components/editor";
import forge from 'node-forge';

function Home ({data}: {data: any}) {
  const [title, setTitle] = React.useState<string>('');
  const [language, setLanguage] = React.useState<string>('');
  const [content, setContent] = React.useState<string>('');

  const setCurrentLesson = () => {

  }

  React.useEffect(() => {
    let decodedContent = forge.util.decode64(data.results[0].content);
    setTitle(data.results[0].title);
    setLanguage(data.results[0].language);
    setContent(decodedContent);
  }, []);

  return (
    <React.Fragment>
      <Editor
        data={data} 
        code={content} 
        language={language} 
        title={title}
        setCurrentLesson={setCurrentLesson}
      />
    </React.Fragment>
  )
}

export async function getServerSideProps() {
  const response = await fetch(`http://localhost:8000/api/v1/lesson`);
  const data = await response.json();
  // const {_id, title, language, content } = data.results[0];
  // const lesson = { title: title, language: language, content: forge.util.decode64(content) };
  return { props: { data } };
}

export default Home;
