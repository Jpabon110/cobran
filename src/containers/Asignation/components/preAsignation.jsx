/* eslint-disable react/prop-types */
/* eslint-disable react/prefer-stateless-function */
/* eslint-disable max-len */
import React, { Component } from 'react';
import {
  Card,
  CardBody,
  FormGroup,
  Col,
  Row,
} from 'reactstrap';
import ResultsTable from './resultsTable';
// import PrejudicialPortfolio from './prejudicialPortfolio';

class projectedPortfolio extends Component {
  render() {
    const { executives } = this.props;

    return (
      <Col md={12}>
        <Card>
          <CardBody>
            <div className="profile_info col-md-12 mb-0 mt-3">
              <FormGroup className="details_profile_columned" style={{ margin: 0 }}>
                <h2 className="title_modal_contact mb-2">Pre asignación</h2>
                <div className="top_linear_divaindo">___</div>
              </FormGroup>
            </div>
            <Row>
              <Col md={12}>
                <ResultsTable
                  title=""
                  executives={executives}
                />
              </Col>
            </Row>
          </CardBody>
        </Card>
      </Col>
    );
  }
}

export default projectedPortfolio;
