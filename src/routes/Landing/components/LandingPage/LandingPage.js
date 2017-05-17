import React from "react";
import Header from "./Header"
import About from "./About"

import styles from "./LandingPage.scss";

export default class LandingPage extends React.Component {
  render = () => (
    <div className={styles.container}>
      <Header/>
      <About/>
    </div>
  )
}
