/* eslint-disable react/destructuring-assignment */
import React, { Component } from 'react';
import { Container, Row } from 'reactstrap';
import ProjectedPortfolio from './components/projectedPortfolio';
import CalculatedAsignation from './components/calculatedAsignation';
import PreAsignation from './components/preAsignation';

class Asignation extends Component {
  state = {
    executives: [],
  };

  onSignValueToTable = (e) => {
    this.setState({ executives: e });
  }

  render() {
    return (
      <Container className="dashboard">
        <Row>
          <ProjectedPortfolio {...this.props} />
          <CalculatedAsignation {...this.props} onSignValueToTable={this.onSignValueToTable} />
          <PreAsignation {...this.props} executives={this.state.executives} />
        </Row>
      </Container>
    );
  }
}

export default Asignation;
