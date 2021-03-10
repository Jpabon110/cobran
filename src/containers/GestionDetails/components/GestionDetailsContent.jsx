/* eslint-disable consistent-return */
/* eslint-disable array-callback-return */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/no-unused-state */
/* eslint-disable no-unused-expressions */
/* eslint-disable no-else-return */
/* eslint-disable react/no-did-update-set-state */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react/jsx-no-target-blank */
/* eslint-disable react/no-access-state-in-setstate */
/* eslint-disable no-shadow */
/* eslint-disable prefer-destructuring */
/* eslint-disable no-param-reassign */
/* eslint-disable no-nested-ternary */
/* eslint-disable react/jsx-indent */
/* eslint-disable object-curly-newline */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable no-underscore-dangle */
/* eslint-disable max-len */
/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import {
  FormGroup,
  Col,
  Card,
  CardBody,
  Container,
  // Nav, NavItem, NavLink,
  // TabContent,
  // TabPane,
  Button,
  Row,
} from 'reactstrap';
import classnames from 'classnames';
import { connect } from 'react-redux';
import moment from 'moment';
import GestionDetailsClient from './GestionDetailsClient';
import GestionTabs from './GestionTabs';
import LastGestionTab from './LastGestionTab';
import GestionDetailsProduct from './GestionDetailsProduct';
import GestionDetailsVehicle from './GestionDetailsVehicle';
import SideModalNewGestion from './sideModalNewGestion';
import { changeTitleAction } from '../../../redux/actions/topbarActions';
import { isUserAllowed } from '../../../shared/utils';
import {
  getGestionById,
  getAllGestionsManagement,
  getAllGestions,
  getAllGestionsMe,
} from '../../../redux/actions/gestionsActions';

import {
  getContactsByRut,
  updateContact,
} from '../../../redux/actions/contactsActions';

class GestionDetails extends Component {
  constructor() {
    super();
    this.state = {
      activeTab: '1',
      crmInfo: undefined,
      nextCase: undefined,
      client: {
        rut: '',
        name: '',
        paternalSurname: '',
        email: '',
        phone: '',
      },
      product: {
        idCases: '',
        balanceToday: '',
        judicial: '',
        lastPaymentDate: '',
        paymentOfArrears: '',
        ranking: '',
      },
      executive: {
        firstName: '',
        lastName: '',
      },
      vehicle: {
        brand: '',
        model: '',
        vehicleYear: '',
        patent: '',
        vehicleStatus: '',
      },
      accrued: '',
      address: '',
      capital: '',
      ces: '',
      closingDate: '',
      commercialPhone: '',
      commune: '',
      contractDate: '',
      createdAt: '',
      dayInArreas: '',
      descriptionRedf2: '',
      feesPaid: '',
      guarantee: '',
      maternalSurname: '',
      outstandingFees: '',
      payment: '',
      paymentTotal: '',
      phoneRef1: '',
      phoneRef2: '',
      projectArreas: '',
      provision: '',
      provisionPercentage: '',
      region: '',
      section: '',
      stretch: '',
      updatedAt: '',
    };
  }

  componentDidMount(nextId) {
    let {
      id,
    } = this.props.match.params;

    if (nextId) {
      id = nextId;
    }
    this.props.getGestionById(id, (gestionInfoCase) => {
      let client = this.state.client;
      let product = this.state.product;
      let vehicle = this.state.vehicle;
      let executive = this.state.executive;
      client = {
        rut: gestionInfoCase.rut ? gestionInfoCase.rut.replace(/[^K0-9\s]/gi, '').trim() : 'Sin información',
        name: gestionInfoCase.name ? gestionInfoCase.name : 'Sin información',
        paternalSurname: gestionInfoCase.paternalSurname ? gestionInfoCase.paternalSurname : 'Sin información',
        email: gestionInfoCase.email ? gestionInfoCase.email : 'Sin información',
        phone: gestionInfoCase.phone ? gestionInfoCase.phone : 'Sin información',
      };
      product = {
        idCases: gestionInfoCase.idCases ? gestionInfoCase.idCases : 'Sin información',
        balanceToday: gestionInfoCase.balanceToday ? gestionInfoCase.balanceToday : 'Sin información',
        judicial: gestionInfoCase.judicial ? gestionInfoCase.judicial : 'Sin información',
        lastPaymentDate: gestionInfoCase.lastPaymentDate ? moment(gestionInfoCase.lastPaymentDate).format('DD/MM/YYYY HH:mm') : 'Sin información',
        paymentOfArrears: gestionInfoCase.paymentOfArrears ? gestionInfoCase.paymentOfArrears : 'Sin información',
        dayInArreas: gestionInfoCase.dayInArreas ? gestionInfoCase.dayInArreas : 'Sin información',
        product: gestionInfoCase.product ? gestionInfoCase.product : 'Sin información',
        expiration: gestionInfoCase.expiration ? moment(gestionInfoCase.expiration).format('DD/MM/YYYY HH:mm') : 'Sin información',
        stretch: gestionInfoCase.stretch ? gestionInfoCase.stretch : 'Sin información',
      };
      executive = gestionInfoCase.executive ? gestionInfoCase.executive : { firstName: '', lastName: '' };
      vehicle = {
        brand: gestionInfoCase.brand ? gestionInfoCase.brand : 'Sin información',
        model: gestionInfoCase.model ? gestionInfoCase.model : 'Sin información',
        vehicleYear: gestionInfoCase.vehicleYear ? gestionInfoCase.vehicleYear : 'Sin información',
        patent: gestionInfoCase.patent ? gestionInfoCase.patent : 'Sin información',
        vehicleStatus: gestionInfoCase.vehicleStatus ? gestionInfoCase.vehicleStatus : 'Sin información',
      };
      this.setState({
        client,
        vehicle,
        product,
        executive,
      });
      this.props.getContactsByRut(gestionInfoCase.rut.replace(/[^K0-9\s]/gi, '').trim(), (body) => {
        this.setState({ crmInfo: body });
      });
      this.props.setTitle(`Caso: # ${gestionInfoCase.idCases ? gestionInfoCase.idCases : ''}`);
    });
    this.props.getAllGestionsManagement(id);
    const isAdmin = isUserAllowed('admin');
    this.setState({ justAdminOrManager: isAdmin });

    if (!isAdmin) {
      this.props.getAllGestionsMe({ intensity: 0 }, (body) => {
        if (this.findNext(body.sort((a, b) => this.compare(a, b)), id)) {
          this.setState({ nextCase: body[this.findNext(body.sort((a, b) => this.compare(a, b)), id)]._id });
        } else {
          this.setState({ nextCase: undefined });
        }
      });
    } else {
      this.props.getAllGestions({ intensity: 0 }, (body) => {
        // console.log('compare', body.sort((a, b) => this.compare(a, b)));
        if (this.findNext(body.sort((a, b) => this.compare(a, b)), id)) {
          this.setState({ nextCase: body[this.findNext(body.sort((a, b) => this.compare(a, b)), id)]._id });
        } else {
          this.setState({ nextCase: undefined });
        }
      });
    }
  }

  compare = (a, b) => {
    let comparison = 0;
    if (a.idCases > b.idCases) {
      comparison = 1;
    } else if (a.idCases < b.idCases) {
      comparison = -1;
    }
    return comparison;
  }

  findNext = (body, id) => {
    let findIt;
    body.map((record, index) => {
      if ((record._id === id) && (index < (body.length - 1))) {
        findIt = (index + 1);
      }
    });
    return findIt;
  }

  onClickNextCase = e => () => {
    this.props.history.push(`${e}`);
    this.componentDidMount(e);
  }

  onClickBackCases = () => () => {
    this.props.history.push('/pages/gestions?page=1');
  }

  resetGetContactByRut = (rut) => {
    this.props.getContactsByRut(rut.replace(/[^K0-9\s]/gi, '').trim(), (body) => {
      // console.log('info', body);
      this.setState({ crmInfo: body });
    });
  }

  handleOpen = () => {
    this.setState(prevState => ({ open: !prevState.open }));
  };

  toggle(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab,
      });
    }
  }

  render() {
    const { open, nextCase } = this.state;
    const { disable } = this.props;
    const customizerClass = classnames({
      customizer__wrap: true,
      'customizer__wrap--open': open,
    });

    // const { gestions } = this.props;
    // console.log('gestions', gestions);

    return (
      <Container className="dashboard">
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2%' }}>
          <Button className="navegation_detail_case_buttons" onClick={this.onClickBackCases()}> <span className="lnr lnr-chevron-left" style={{ fontWeight: 'bold' }} /> {' '} Volver a casos</Button>
          {(nextCase) && (
          <Button className="navegation_detail_case_buttons" disabled={disable} onClick={this.onClickNextCase(nextCase)}>Siguiente caso {' '} <span className="lnr lnr-chevron-right" style={{ fontWeight: 'bold' }} /></Button>
          )}
        </div>
        <Card>
          <CardBody style={{ padding: '5px 20px' }}>
            <Row>
              <Col md={12}>
                <FormGroup style={{ margin: 0 }}>
                  <Row style={{ justifyContent: 'space-between' }}>
                    <GestionDetailsClient
                      value={this.state.client}
                      crmInfo={this.state.crmInfo}
                      updateContact={this.props.updateContact}
                      resetGetContactByRut={this.resetGetContactByRut}
                    />
                    <GestionDetailsProduct value={this.state.product} executive={this.state.executive} />
                    <GestionDetailsVehicle value={this.state.vehicle} />
                  </Row>
                </FormGroup>
              </Col>
            </Row>
            <Row style={{ justifyContent: 'flex-end' }}>
            <button type="button" onClick={this.handleOpen} className="btn2 greys">
              <span className="lnr lnr-file-add icon_standars" />
              Nueva géstion
            </button>
            <SideModalNewGestion
              customizerClass={customizerClass}
              handleOpen={this.handleOpen}
              match={this.props.match}
              history={this.props.history}
              phone={this.state.client.phone}
              email={this.state.client.email}
            />
            </Row>
          </CardBody>
        </Card>
        <LastGestionTab
          gestionsManagement={this.props.gestionsManagement}
          disable={this.props.disable}
          match={this.props.match}
          idCase={this.state.product.idCases}
        />
        <br />
        <br />
        <GestionTabs rut={this.state.client.rut} />
        <br />
      </Container>
    );
  }
}

const mapStateToProps = ({ gestion, contact }) => ({
  caseInfo: gestion.caseInfo,
  loadingInfoCase: gestion.loadingInfoCase,
  gestionsManagement: gestion.gestionsManagement,
  contact: contact.contacts,
  disable: gestion.disable,
  gestions: gestion.gestions,
});


const mapDispatchToProps = {
  getGestionById,
  getAllGestionsManagement,
  getContactsByRut,
  updateContact,
  setTitle: changeTitleAction,
  getAllGestions,
  getAllGestionsMe,
};
export default connect(mapStateToProps, mapDispatchToProps, null, { forwardRef: true })(GestionDetails);
