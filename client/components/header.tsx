import * as React from 'react';
import styles from "../styles/header.module.css";

function Header(): JSX.Element {
  return (
    <div>
      <h2 className={styles.mainHeading}> Typecoder </h2>
      <p className={styles.subHeading}> For programmers </p>
    </div>
  );
}

export default Header;
