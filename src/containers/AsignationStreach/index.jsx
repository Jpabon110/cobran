/* eslint-disable react/destructuring-assignment */
import React, { Component } from 'react';
import { Container, Row } from 'reactstrap';
import AsignationStreachComponent from './components/AsignationStreachComponent';

class AsignationStreach extends Component {
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
          <AsignationStreachComponent {...this.props} executives={this.state.executives} />
        </Row>
      </Container>
    );
  }
}

export default AsignationStreach;
