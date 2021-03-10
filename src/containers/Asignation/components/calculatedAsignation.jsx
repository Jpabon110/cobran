/* eslint-disable radix */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
/* eslint-disable no-useless-constructor */
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
import moment from 'moment';
import CalculatedCreadits from './calculatedCreadits';
import {
  getPortfolio,
  getAsignation,
  getLastDateAssignment,
} from '../../../redux/actions/asignationActions';
import showNotification from '../../../helpers/notification';
import CalculatedTable from './calculatedTable';
import { changeTitleAction } from '../../../redux/actions/topbarActions';

class projectedPortfolio extends Component {
  constructor() {
    super();
  }

  state = {
    stretch: '',
    mediumHigh: '',
    mediumLow: '',
    media: 0,
    summary: [],
    lastDateAssignment: undefined,
  };

  componentDidMount() {
    this.props.getPortfolio();
    this.props.setTitle('');
  }

  onChangeInput = key => (e) => {
    if ((key === 'mediumHigh') || (key === 'mediumLow')) {
      this.setState({ [key]: e.target.value });
    } else if ((key === 'stretch')) {
      this.setState({ [key]: e, media: e.averageDebt });
      const data = {
        stretch: e.label,
      };
      this.props.getLastDateAssignment(data, (body) => {
        if (body) {
          this.setState({ lastDateAssignment: moment(body.date).format('DD/MM/YYYY,HH:mm:ss') });
        } else {
          this.setState({ lastDateAssignment: undefined });
        }
      });
    } else {
      this.setState({ [key]: e, media: e.averageDebt });
    }
  }

  toUploadFileResume = () => {
    this.props.history.push('/pages/upload-file-mora');
  }

  onSubmitCalulate = (e) => {
    if (e) {
      e.preventDefault();
    }
    const {
      stretch,
      mediumHigh,
      mediumLow,
    } = this.state;

    if (stretch === '') {
      showNotification({
        text: 'Seleccione un tramo.',
        color: 'danger',
        title: 'Advertencia',
      });
      return;
    }

    // if ((mediumHigh === 0) || (mediumHigh === '') || (mediumHigh === undefined)) {
    if ((mediumHigh === '') || (mediumHigh === undefined)) {
      showNotification({
        text: 'Ingrese media alta.',
        color: 'danger',
        title: 'Advertencia',
      });
      return;
    }

    if ((mediumLow === '') || (mediumLow === undefined)) {
      showNotification({
        text: 'Ingrese media baja.',
        color: 'danger',
        title: 'Advertencia',
      });
      return;
    }
    // console.log('mediumHigh', parseInt(mediumHigh.replace(/[^,0-9\s]/gi, '').trim()));
    // console.log('mediumLow', parseInt(mediumLow.replace(/[^,0-9\s]/gi, '').trim()));

    if (parseInt(mediumHigh.replace(/[^,0-9\s]/gi, '').trim()) < parseInt(mediumLow.replace(/[^,0-9\s]/gi, '').trim())) {
      showNotification({
        text: 'La media alta debe ser mayor a la media baja.',
        color: 'danger',
        title: 'Advertencia',
      });
      return;
    }

    this.props.getAsignation({ stretch: stretch.value, mediumHigh: mediumHigh.toString().replace(/[^,0-9\s]/gi, '').trim(), mediumLow: mediumLow.toString().replace(/[^,0-9\s]/gi, '').trim() }, (body) => {
      this.setState({ summary: body.summary });
      this.props.onSignValueToTable(body.exec);
    });
  }

  render() {
    const {
      ranking,
    } = this.props.portfolios;

    return (
      <Col md={12}>
        <Card>
          <CardBody>
            <Row>
              <div className="profile_info col-md-10 mb-0 mt-3">
                <FormGroup className="details_profile_columned" style={{ margin: 0 }}>
                  <h2 className="title_modal_contact mb-2">Calcular asignación</h2>
                  <div className="top_linear_divaindo">___</div>
                </FormGroup>
              </div>
              {/* <button
                type="button"
                style={{ width: '7rem', height: '34px', marginTop: '1%' }}
                onClick={this.toUploadFileResume}
                className="asignar2 new_contact_button"
              >
                Cargar mora
              </button> */}
            </Row>
            <Row>
              <Col md={12}>
                <CalculatedCreadits
                  ranking={ranking || {}}
                  onSubmitCalulate={this.onSubmitCalulate}
                  stretch={this.state.stretch}
                  mediumHigh={this.state.mediumHigh}
                  mediumLow={this.state.mediumLow}
                  media={this.state.media}
                  onChangeInput={this.onChangeInput}
                  lastDateAssignment={this.state.lastDateAssignment}
                />
              </Col>
              <Col md={12}>
                <CalculatedTable
                  title="Resultados"
                  summary={this.state.summary}
                />
              </Col>
            </Row>
          </CardBody>
        </Card>
      </Col>
    );
  }
}

const mapStateToProps = ({ asignation }) => ({
  portfolios: asignation.portfolios,
  loadingPortfolio: asignation.loadingPortfolio,
  asignation: asignation.asignation,
  loadAsigments: asignation.loadAsigments,
  infoLastDate: asignation.infoLastDate,
  loadLastDateAsigments: asignation.loadLastDateAsigments,
});


const mapDispatchToProps = {
  getPortfolio,
  getAsignation,
  getLastDateAssignment,
  setTitle: changeTitleAction,
};


export default connect(mapStateToProps, mapDispatchToProps, null, { forwardRef: true })(projectedPortfolio);
