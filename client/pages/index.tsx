import * as React from "react";
import type {NextPage} from 'next'
import Editor from "../components/editor";

const codeStr = `func generateDigest(email string, password string) string {
  h := sha256.New()
  h.Write([]byte(email + password))
  return hex.EncodeToString(h.Sum(nil))
}
`

const Home: NextPage = () => {
  return (
    <React.Fragment>
      <Editor code={codeStr} language="Go" title="Go Crypto" />
    </React.Fragment>
  )
}

export default Home;
