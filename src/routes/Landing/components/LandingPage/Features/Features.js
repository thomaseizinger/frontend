import React from "react";
import styles from "./Features.scss";
import Row from "react-bootstrap/lib/Row";
import Col from "react-bootstrap/lib/Col";
import Grid from "react-bootstrap/lib/Grid";

export default class Features extends React.Component {

  render = () => (
    <section className={styles.features} id={this.props.id}>
      <Grid>
        <Row>
          <Col sm={4}>
            <div className={styles.feature}>
              <div className={styles.icon}><i className="fa fa-dashboard"></i></div>
              <h3>Easy to Use</h3>
              <p>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam
                erat, sed diam voluptua. </p>
            </div>
          </Col>
          <Col sm={4}>
            <div className={styles.feature}>
              <div className={styles.icon}><i className="fa fa-cloud"></i></div>
              <h3>Available Everywhere</h3>
              <p>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et doloremagna aliquyam
                erat, sed diam voluptua. </p>
            </div>
          </Col>
          <Col sm={4}>
            <div className={styles.feature}>
              <div className={styles.icon}><i className="fa fa-github"></i></div>
              <h3>Open Source</h3>
              <p >Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam
                erat, sed diam voluptua. </p>
            </div>
          </Col>
        </Row>
      </Grid>
    </section>
  )
}
