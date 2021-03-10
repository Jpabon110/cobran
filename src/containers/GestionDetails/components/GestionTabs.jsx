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
import React, { Component, Fragment } from 'react';
import {
  FormGroup,
  Col,
  // Card,
  // CardBody,
  // Container,
  Nav, NavItem, NavLink,
  TabContent,
  TabPane,
  Row,
} from 'reactstrap';
import map from 'lodash/map';
import moment from 'moment';
import classnames from 'classnames';
import { connect } from 'react-redux';
import TableCell from '@material-ui/core/TableCell';
import MatTable from '../../../shared/components/MaterialTable';
import {
  getGestionById,
} from '../../../redux/actions/gestionsActions';
import {
  getContracts,
} from '../../../redux/actions/contactsActions';


const headers = [
  {
    id: 'idCases', disablePadding: false, label: 'ID',
  },
  {
    id: 'product', disablePadding: true, label: 'Producto',
  },
  {
    id: 'asignedTo', disablePadding: false, label: 'Asignado a',
  },
  {
    id: 'team', disablePadding: false, label: 'Equipo',
  },
  {
    id: 'creditNow', disablePadding: false, label: 'Saldo hoy',
  },
  {
    id: 'judicial', disablePadding: false, label: 'Judicial',
  },
  {
    id: 'daysPastDue', disablePadding: false, label: 'Días mora',
  },
  {
    id: 'dueTotal', disablePadding: false, label: 'Cuotas mora',
  },
  {
    id: 'expiret', disablePadding: false, label: 'Vencimiento',
  },
  {
    id: 'lastPayDate', disablePadding: false, label: 'Fecha ultimo pago',
  },
];

class GestionDetails extends Component {
  constructor() {
    super();
    this.state = {
      activeTab: '1',
      justOne: false,
      theFees: [],
      selected: '',
      client: {
        rut: '',
        name: '',
        paternalSurname: '',
        email: '',
        phone: '',
      },
      products: [],
    };
  }

  componentDidMount() {

  }

  componentDidUpdate() {
    const { rut } = this.props;
    if (rut && (!this.state.justOne)) {
      this.props.getContracts(rut, (body) => {
        // console.log('body', body);
        this.setState({ products: body });
      });
      this.setState({ justOne: true });
    }
  }

  onClickProductView = (fees, index) => () => {
    this.setState({ theFees: fees, selected: index });
  }

  toggle(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab,
      });
    }
  }

  render() {
    const data = map(this.state.products, d => ({
      id: d.fees,
      cells: (
        <Fragment>
          <TableCell className="material-table__cell" style={{ borderBottom: '0px' }} align="left">{d.idCases}</TableCell>
          <TableCell className="material-table__cell" style={{ borderBottom: '0px' }} align="left">{d.typeProduct}</TableCell>
          <TableCell className="material-table__cell" style={{ borderBottom: '0px' }} align="left">-</TableCell>
          <TableCell className="material-table__cell" style={{ borderBottom: '0px' }} align="left">{(d.executive) ? (d.executive.firstName) : ''} {(d.executive) ? (d.executive.lastName) : ''}</TableCell>
          <TableCell className="material-table__cell" style={{ borderBottom: '0px' }} align="left">{(d.executive) ? (d.executive.firstName) : ''} {(d.executive) ? (d.executive.lastName) : ''}</TableCell>
          <TableCell className="material-table__cell" style={{ borderBottom: '0px' }} align="left">{(d.executive) ? (d.executive.firstName) : ''} {(d.executive) ? (d.executive.lastName) : ''}</TableCell>
          <TableCell className="material-table__cell" style={{ borderBottom: '0px' }} align="left">{(d.executive) ? (d.executive.firstName) : ''} {(d.executive) ? (d.executive.lastName) : ''}</TableCell>
          <TableCell className="material-table__cell" style={{ borderBottom: '0px' }} align="left">{(d.executive) ? (d.executive.firstName) : ''} {(d.executive) ? (d.executive.lastName) : ''}</TableCell>
          <TableCell className="material-table__cell" style={{ borderBottom: '0px' }} align="left">{(d.executive) ? (d.executive.firstName) : ''} {(d.executive) ? (d.executive.lastName) : ''}</TableCell>
          <TableCell className="material-table__cell" style={{ borderBottom: '0px' }} align="left">{moment(d.date).format('DD/MM/YYYY HH:mm')}</TableCell>
        </Fragment>
      ),
    }));
    return (
          <Row>
            <Col md={12}>
              <FormGroup style={{ margin: 0 }}>
                <div className="tabs tabs--bordered-bottom">
                  <div className="tabs__wrap flex_separate">
                    <Nav tabs className="w_o_border">
                      <NavItem>
                        <NavLink
                          className={classnames({ active: this.state.activeTab === '1', the_wigth_casos: true })}
                          onClick={() => {
                            this.toggle('1');
                          }}
                        >
                          <strong>Productos</strong>
                        </NavLink>
                      </NavItem>
                      <NavItem>
                        <NavLink
                          className={classnames({ active: this.state.activeTab === '2', the_wigth_casos: true })}
                          onClick={() => {
                            this.toggle('2');
                          }}
                        >
                          <strong>Información General</strong>
                        </NavLink>
                      </NavItem>
                      <NavItem>
                        <NavLink
                          className={classnames({ active: this.state.activeTab === '3', the_wigth_casos: true })}
                          onClick={() => {
                            this.toggle('3');
                          }}
                        >
                          <strong>Descuento</strong>
                        </NavLink>
                      </NavItem>
                    </Nav>
                  </div>
                  <TabContent activeTab={this.state.activeTab} style={{ backgroundColor: '#fff' }}>
                      <TabPane tabId="1">
                        <div className="tabs tabs--bordered-bottom">
                          <div className="tabs__wrap">
                            <MatTable
                              onSelectAllClick={this.onSelectAllClick}
                              onChangePage={this.onChangePage}
                              cargando={this.props.loadingContracts}
                              onChangeRowsPerPage={this.onChangeRowsPerPage}
                              onClickRow={this.onClickRow}
                              onClick={this.onClickProductView}
                              selected={this.state.selected}
                              headers={headers}
                              fees={this.state.theFees}
                              data={data}
                              page={0}
                              rowsPerPage="10"
                              total="0"
                            />
                          </div>
                        </div>
                      </TabPane>
                      <TabPane tabId="2">
                        <div style={{ display: 'flex', justifyContent: 'center', padding: '1%' }}>
                          <strong>
                            Sin Información
                          </strong>
                        </div>
                      </TabPane>
                      <TabPane tabId="3">
                        <div style={{ display: 'flex', justifyContent: 'center', padding: '1%' }}>
                          <strong>
                            Sin Información
                          </strong>
                        </div>
                      </TabPane>
                  </TabContent>
                </div>
              </FormGroup>
            </Col>
          </Row>
    );
  }
}

const mapStateToProps = ({ gestion, contact }) => ({
  caseInfo: gestion.caseInfo,
  loadingInfoCase: gestion.loadingInfoCase,
  contracts: contact.contracts,
  loadingContracts: contact.loadingContracts,
});


const mapDispatchToProps = {
  getGestionById,
  getContracts,
};
export default connect(mapStateToProps, mapDispatchToProps, null, { forwardRef: true })(GestionDetails);
