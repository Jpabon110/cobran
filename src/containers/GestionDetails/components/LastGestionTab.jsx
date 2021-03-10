/* eslint-disable react/no-will-update-set-state */
/* eslint-disable consistent-return */
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
import classnames from 'classnames';
import map from 'lodash/map';
import moment from 'moment';
import TableCell from '@material-ui/core/TableCell';
import { connect } from 'react-redux';
import MatTable from '../../../shared/components/MaterialTable';
import {
  getGestionById,
  getHistoricalManagement,
} from '../../../redux/actions/gestionsActions';

const headers = [
  {
    id: 'dateCommitment', disablePadding: false, label: 'Fecha',
  },
  {
    id: 'typeFotypeGestionllow', disablePadding: true, label: 'Tipo seguimiento',
  },
  {
    id: 'commitment', disablePadding: false, label: 'E° seguimiento',
  },
  {
    id: 'comments', disablePadding: false, label: 'Comentarios',
  },
  {
    id: 'executive', disablePadding: false, label: 'Gestionado por',
  },
];

const headers2 = [
  {
    id: 'caseId', disablePadding: false, label: 'ID',
  },
  {
    id: 'operationNumber', disablePadding: true, label: 'Número operación',
  },
  {
    id: 'dateTracking', disablePadding: false, label: 'Fecha seguimiento',
  },
  {
    id: 'nextDateTracking', disablePadding: false, label: 'Siguiente fecha seguimiento',
  },
  {
    id: 'commentTracking', disablePadding: false, label: 'Comentario seguimiento',
  },
  {
    id: 'user', disablePadding: true, label: 'Usuario',
  },
  {
    id: 'state', disablePadding: false, label: 'Estado',
  },
  {
    id: 'addressTracking', disablePadding: false, label: 'Dirección seguimiento',
  },
];


class GestionDetails extends Component {
  constructor() {
    super();
    this.state = {
      activeTab: '1',
      selected: [],
      client: {
        rut: '',
        name: '',
        paternalSurname: '',
        email: '',
        phone: '',
      },
      justOnes: true,
    };
  }

  componentDidMount() {

  }

  componentWillUpdate() {
    const { idCase } = this.props;
    if (idCase && this.state.justOnes) {
      this.props.getHistoricalManagement(idCase);
      this.setState({ justOnes: false });
    }
  }

  translatetypeGestion = (typeGestion) => {
    if (typeGestion === 'call') {
      return 'llamada';
    }
    if (typeGestion === 'email') {
      return 'correo';
    }
    return 'presencial';
  }

  translateCommitment = (commitment) => {
    if (commitment === 'with') {
      return 'Con compromiso';
    }
    if (commitment === 'out') {
      return 'Sin compromiso';
    }
  }

  toggle(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab,
      });
    }
  }

  render() {
    const { gestionsManagement, disable, caseHistorical } = this.props;
    const data = map(gestionsManagement, d => ({
      id: d._id,
      cells: (
        <Fragment>
          <TableCell className="material-table__cell" style={{ borderBottom: '0px' }} align="left">{moment(d.dateCommitment).format('DD/MM/YYYY HH:mm')}</TableCell>
          <TableCell className="material-table__cell" style={{ borderBottom: '0px' }} align="left">{this.translatetypeGestion(d.typeGestion)}</TableCell>
          <TableCell className="material-table__cell" style={{ borderBottom: '0px' }} align="left">{this.translateCommitment(d.commitment)}</TableCell>
          <TableCell className="material-table__cell" style={{ borderBottom: '0px' }} align="left">{d.gloss}</TableCell>
          <TableCell className="material-table__cell" style={{ borderBottom: '0px' }} align="left">{(d.executive) ? (d.executive.firstName) : ''} {(d.executive) ? (d.executive.lastName) : ''}</TableCell>
        </Fragment>
      ),
    }));
    const data2 = map(caseHistorical, d => ({
      id: d._id,
      cells: (
        <Fragment>
          <TableCell className="material-table__cell" style={{ borderBottom: '0px' }} align="left">{d.caseId}</TableCell>
          <TableCell className="material-table__cell" style={{ borderBottom: '0px' }} align="left">{d.operationNumber}</TableCell>
          <TableCell className="material-table__cell" style={{ borderBottom: '0px' }} align="left">{moment(d.dateTracking).format('DD/MM/YYYY HH:mm')}</TableCell>
          <TableCell className="material-table__cell" style={{ borderBottom: '0px' }} align="left">{moment(d.nextDateTracking).format('DD/MM/YYYY HH:mm')}</TableCell>
          <TableCell className="material-table__cell" style={{ borderBottom: '0px' }} align="left">{d.commentTracking}</TableCell>
          <TableCell className="material-table__cell" style={{ borderBottom: '0px' }} align="left">{d.user}</TableCell>
          <TableCell className="material-table__cell" style={{ borderBottom: '0px' }} align="left">{d.state}</TableCell>
          <TableCell className="material-table__cell" style={{ borderBottom: '0px' }} align="left">{d.addressTracking}</TableCell>
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
                          <strong>Ultimas Géstiones</strong>
                        </NavLink>
                      </NavItem>
                      <NavItem>
                        <NavLink
                          className={classnames({ active: this.state.activeTab === '2', the_wigth_casos: true })}
                          onClick={() => {
                            this.toggle('2');
                          }}
                        >
                          <strong>Géstion Historica</strong>
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
                            cargando={disable}
                            onChangeRowsPerPage={this.onChangeRowsPerPage}
                            onClickRow={this.onClickRow}
                            onClick={this.onClickCaseView}
                            selected={this.state.selected}
                            headers={headers}
                            data={data}
                            page={0}
                            rowsPerPage="10"
                            total="0"
                          />
                        </div>
                      </div>
                      </TabPane>
                      <TabPane tabId="2">
                      <div className="tabs tabs--bordered-bottom">
                        <div className="tabs__wrap">
                          <MatTable
                            onSelectAllClick={this.onSelectAllClick}
                            onChangePage={this.onChangePage}
                            cargando={disable}
                            onChangeRowsPerPage={this.onChangeRowsPerPage}
                            onClickRow={this.onClickRow}
                            onClick={this.onClickCaseView}
                            selected={this.state.selected}
                            headers={headers2}
                            data={data2}
                            page={0}
                            rowsPerPage="10"
                            total="0"
                          />
                        </div>
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

const mapStateToProps = ({ gestion }) => ({
  caseInfo: gestion.caseInfo,
  loadingInfoCase: gestion.loadingInfoCase,
  caseHistorical: gestion.caseHistorical,
});


const mapDispatchToProps = {
  getGestionById,
  getHistoricalManagement,
};
export default connect(mapStateToProps, mapDispatchToProps, null, { forwardRef: true })(GestionDetails);
