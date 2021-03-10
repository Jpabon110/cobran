/* eslint-disable react/no-did-update-set-state */
/* eslint-disable no-useless-constructor */
/* eslint-disable react/no-will-update-set-state */
/* eslint-disable react/destructuring-assignment */
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
import { connect } from 'react-redux';
import QueryString from 'query-string';
import ResultsTable from './resultsTable';
import {
  getLastDateAssignment,
} from '../../../redux/actions/asignationActions';

class projectedPortfolio extends Component {
  constructor() {
    super();
  }

  componentDidMount() {
    const {
      search,
    } = this.props.location;

    const query = QueryString.parse(search);

    this.props.getLastDateAssignment({ stretch: query.streach });
  }

  render() {
    const { infoLastDate, loadLastDateAsigments } = this.props;
    const { search } = this.props.location;
    const query = QueryString.parse(search);

    return (
      <Col md={12}>
        <Card>
          <CardBody>
            <div className="profile_info col-md-12 mb-0 mt-3">
              <FormGroup className="details_profile_columned" style={{ margin: 0 }}>
                <h2 className="title_modal_contact mb-2">Asignaciones { (query.streach) ? query.streach : '' } </h2>
                <div className="top_linear_divaindo">___</div>
              </FormGroup>
            </div>
            <Row>
              <Col md={12}>
                <ResultsTable
                  title=""
                  executives={(infoLastDate) ? infoLastDate.executive : []}
                  buttonAsig={false}
                  loading={loadLastDateAsigments}
                  rowsPerPage={10}
                />
              </Col>
            </Row>
          </CardBody>
        </Card>
      </Col>
    );
  }
}

// export default projectedPortfolio;

const mapStateToProps = ({ asignation }) => ({
  infoLastDate: asignation.infoLastDate,
  loadLastDateAsigments: asignation.loadLastDateAsigments,
});


const mapDispatchToProps = {
  getLastDateAssignment,
};


export default connect(mapStateToProps, mapDispatchToProps, null, { forwardRef: true })(projectedPortfolio);
