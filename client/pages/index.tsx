import * as React from "react";
import type {NextPage} from 'next'
import Editor from "../components/editor";

const Home: NextPage = () => {
  return (
    <React.Fragment>
      <Editor />
    </React.Fragment>
  )
}

export default Home
