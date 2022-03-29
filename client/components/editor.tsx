import * as React from "react";
import Cursor from "./cursor";

const codeStr = `() => console.log("hello")`;

function Editor(): JSX.Element {
  const [code, setCode] = React.useState<string>(codeStr);
  const [index, setIndex] = React.useState<number>(0);
  const [incorrect, setIncorrect] = React.useState<boolean>(false);

  const handleKeyPress = (e: KeyboardEvent) => {
    e.preventDefault();
    const element = document.getElementById(String(index))?.innerText;
    const activeKey = e.key;
    if (element === activeKey) {
      console.log(activeKey, element, index);
      setIndex(index + 1);
    }
  }

  React.useEffect(() => {
    window.addEventListener('keydown', handleKeyPress)
  })

  return (
    <pre>
      <code>
        {[...code].map((chr, idx) => {
          const chrCode = chr.charCodeAt(chr.length - 1);
            return <Cursor key={idx} activeKey={idx} children={chr} />
          // if (index === idx) {
          //   if (chrCode === 10) {
          //     return <Cursor key={idx} activeKey={idx} children={`↵ ${chr}`} />
          //   }
          //   if (!incorrect) {
          //     return <Cursor key={idx} activeKey={idx} children={chr} class="active" />
          //   } else {
          //     return <Cursor key={idx} activeKey={idx} children={"<="} class="active-arrow" />
          //   }
          // } else if (index >= idx) {
          //   return <Cursor key={idx} activeKey={idx} children={chr} />
          // }
        })}
      </code>
    </pre>
  )
}

export default Editor;
