/* eslint-disable react/no-will-update-set-state */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable no-nested-ternary */
/* eslint-disable no-param-reassign */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable no-undef */
/* eslint-disable no-script-url */
/* eslint-disable react/no-unused-state */
/* eslint-disable no-underscore-dangle */
/* eslint-disable react/no-access-state-in-setstate */
/* eslint-disable react/prop-types */
/* eslint-disable max-len */
import React,
{
  PureComponent,
  Fragment,
} from 'react';
import {
  Nav, NavItem, NavLink,
  TabContent,
  TabPane,
} from 'reactstrap';
import QueryString from 'query-string';
import { connect } from 'react-redux';
import Skeleton from 'react-loading-skeleton';
import TableCell from '@material-ui/core/TableCell';
import map from 'lodash/map';
import moment from 'moment';
import NumberFormat from 'react-currency-format';
import classnames from 'classnames';
import { isUserAllowed } from '../../../shared/utils';
import MatTable from '../../../shared/components/MaterialTable';
import {
  getAllGestions,
  getAllGestionsMe,
} from '../../../redux/actions/gestionsActions';
// import ModalHideColumn from '../../../shared/components/Modals/ModalHideColumn';
import SearchBarAndFilters from './SearchBarAndFilters';
import { setRUTFormat } from '../../../helpers/functions';
import { changeTitleAction } from '../../../redux/actions/topbarActions';


class GestionsList extends PureComponent {
  state = {
    activeTab: '1',
    justAdminOrManager: false,
    selected: [],
    rowsPerPage: 10,
    page: 0,
    isOpenModalHideColumn: false,
    search: null,
    dataToTable: [],
    hideId: false,
    hideRut: false,
    hideNombre: false,
    hideClasificacion: false,
    hideTramo: false,
    hideProvision: false,
    hideCuota: false,
    hideCuotasTotales: false,
    hideCuotasPagadas: false,
    hideCuotasMora: false,
    hideSaldo: false,
    hideDiasMora: false,
    hideIntensidad: false,
    hideEstadoCompromiso: false,
    hideFechaCompromiso: false,
    hideFechaGestion: false,
    hideSaldoHoy: false,
    hideSinGestion: false,
  };

  componentDidMount() {
    const isAdmin = isUserAllowed('admin');
    this.setState({ justAdminOrManager: isAdmin });
    const {
      search,
    } = this.props.location;

    const query = QueryString.parse(search);
    if (!isAdmin) {
      this.props.getAllGestionsMe((search) ? { ...query, intensity: 0 } : { intensity: 0 }, (body) => {
        this.getCharge(body);
      });
    } else {
      this.props.getAllGestions((search) ? { ...query, intensity: 0 } : { intensity: 0 }, (body) => {
        this.getCharge(body);
      });
    }
    this.props.setTitle('');
  }

  handleChangePage = (event, page) => {
    this.setState({ page });
  };

  handleChangeRowsPerPage = (event) => {
    this.setState({ rowsPerPage: event.target.value });
  };

  handleSelectAllClick = (event, checked) => {
    if (checked) {
      this.setState(state => ({ selected: state.data.map(n => n.id) }));
      return;
    }
    this.setState({ selected: [] });
  };

  onClickModalAssignCase = () => {
    this.setState({
      isOpenModalAC: true,
      hideFind: false,
      disabledIt: false,
      hideNewContact: true,
      rut: '',
    });
  }

  onClickModalNewCase = () => {
    this.setState({
      _id: null,
      isOpenModalNC: true,
      origen: '',
      tipo: '',
      tipify: '',
      description: '',
      appointment: '',
      assign: '',
    });
  }

  onClickCaseView = e => () => {
    this.props.history.push(`gestionDetail/${e}`);
  }

  isSelected = (id) => {
    const { selected } = this.state;
    return selected.indexOf(id) !== -1;
  };

  onSelectAllClick = (checked) => {
    if (checked) {
      const { contacts } = this.props;
      this.setState({ selected: contacts.map(contact => contact._id) });
      return;
    }
    this.setState({ selected: [] });
  }

  onChangeSearch = (e) => {
    this.setState({ search: e.target.value });
  }

  onChangeHideColumn = (key, pos) => () => {
    const aux = this.state[key];
    console.log('en function', pos);
    if (aux === false) {
      this.setState({ [key]: true });
    } else {
      this.setState({ [key]: false });
    }
  }

  onSubmitSearch = (e) => {
    e.preventDefault();

    const {
      search,
    } = this.state;


    const query = {};

    Object.assign(query, { search });
    const isAdmin = isUserAllowed('admin') || isUserAllowed('manager');
    if (isAdmin) {
      this.props.getAllGestions(query, () => {
        this.props.history.push(`/pages/gestions?${QueryString.stringify(query)}`);
      });
    } else {
      this.props.getAllGestionsMe(query, () => {
        this.props.history.push(`/pages/gestions?${QueryString.stringify(query)}`);
      });
    }
  }

  onChangeRowsPerPage = (rowsPerPage) => {
    this.setState({ rowsPerPage });
    const query = QueryString.parse(this.props.location.search);
    this.props.history.push(`/pages/gestions?${QueryString.stringify({ ...query, limit: rowsPerPage })}`);
    this.props.getAllGestions({ ...query, limit: rowsPerPage });
  }

  onChangePage = (page) => {
    this.setState({ page });
    const query = QueryString.parse(this.props.location.search);
    this.props.history.push(`/pages/gestions?${QueryString.stringify({ ...query, page: page + 1 })}`);
    this.props.getAllGestions({ ...query, page: page + 1 });
  }

  allCases = () => {
    this.props.getAllGestions({}, () => {
      this.setState({ search: '' });
    });
  }

  allMyCases = () => {
    this.props.getAllGestionsMe({}, () => {
      this.setState({ search: '' });
    });
  }

  translate = (value) => {
    if (value === 'with') {
      return 'Con compromiso';
    }

    return 'Sin compromiso';
  }

  onClickHideColumn = () => {
    this.setState({
      isOpenModalHideColumn: true,
    });
  }

  toggleHidenColumn = isOk => () => {
    if (isOk) {
      this.toFilter();
    } else {
      this.setState({ isOpenModalHideColumn: false });
    }
  }

  getCharge = (info) => {
    const data = map(info, d => ({
      id: d._id,
      gestionDate: ((d.managements) && (d.managements.length > 0)) ? d.managements[d.managements.length - 1].createdAt : '',
      commitmentDate: d.commitmentDate ? d.commitmentDate : '',
      cells: (
        <Fragment>
          <TableCell className="material-table__cell" style={{ borderBottom: '0px' }} align="left">{d.idCases}</TableCell>
          <TableCell className="material-table__cell" style={{ borderBottom: '0px' }} align="left">{setRUTFormat(d.rut)}</TableCell>
          <TableCell className="material-table__cell" style={{ borderBottom: '0px' }} align="left">{`${d.name} ${d.paternalSurname}`}</TableCell>
          <TableCell className="material-table__cell" style={{ borderBottom: '0px' }} align="left">{d.ranking}</TableCell>
          <TableCell className="material-table__cell" style={{ borderBottom: '0px' }} align="left">{d.section}</TableCell>
          <TableCell className="material-table__cell" style={{ borderBottom: '0px' }} align="left">
            <NumberFormat
              displayType="text"
              style={{ fontSize: '14px' }}
              decimalSeparator=","
              thousandSeparator="."
              value={d.provision}
            />
          </TableCell>
          <TableCell className="material-table__cell" style={{ borderBottom: '0px' }} align="left">
            <NumberFormat
              displayType="text"
              style={{ fontSize: '14px' }}
              decimalSeparator=","
              thousandSeparator="."
              value={d.payment}
            />
          </TableCell>
          <TableCell className="material-table__cell" style={{ borderBottom: '0px' }} align="left">
            <NumberFormat
              displayType="text"
              style={{ fontSize: '14px' }}
              decimalSeparator=","
              thousandSeparator="."
              value={d.paymentTotal}
            />
          </TableCell>
          <TableCell className="material-table__cell" style={{ borderBottom: '0px' }} align="left">
            <NumberFormat
              displayType="text"
              style={{ fontSize: '14px' }}
              decimalSeparator=","
              thousandSeparator="."
              value={d.feesPaid}
            />
          </TableCell>
          <TableCell className="material-table__cell" style={{ borderBottom: '0px' }} align="left">
            <NumberFormat
              displayType="text"
              style={{ fontSize: '14px' }}
              decimalSeparator=","
              thousandSeparator="."
              value={d.paymentOfArrears}
            />
          </TableCell>
          <TableCell className="material-table__cell" style={{ borderBottom: '0px' }} align="left">
            <NumberFormat
              displayType="text"
              style={{ fontSize: '14px' }}
              decimalSeparator=","
              thousandSeparator="."
              value={d.capital}
            />
          </TableCell>
          <TableCell className="material-table__cell" style={{ borderBottom: '0px' }} align="left">
            <NumberFormat
              displayType="text"
              style={{ fontSize: '14px' }}
              decimalSeparator=","
              thousandSeparator="."
              value={d.dayInArreas}
            />
          </TableCell>
          <TableCell className="material-table__cell" style={{ borderBottom: '0px' }} align="left">{ d.intensity }</TableCell>
          <TableCell className="material-table__cell" style={{ borderBottom: '0px' }} align="left">{ this.translate(d.commitment) }</TableCell>
          <TableCell className="material-table__cell" style={{ borderBottom: '0px' }} align="left">{moment(d.commitmentDate).format('DD/MM/YYYY')}</TableCell>
          <TableCell className="material-table__cell" style={{ borderBottom: '0px' }} align="left">{moment(d.createdAt).format('DD/MM/YYYY')}</TableCell>
          <TableCell className="material-table__cell" style={{ borderBottom: '0px' }} align="left">
            <NumberFormat
              displayType="text"
              style={{ fontSize: '14px' }}
              decimalSeparator=","
              thousandSeparator="."
              value={d.balanceToday}
            />
          </TableCell>
          <TableCell className="material-table__cell" style={{ borderBottom: '0px' }} align="left">13 días</TableCell>
        </Fragment>
      ),
    }));
    this.setState({ dataToTable: data });
  }

  toggle(tab, opt) {
    const { justAdminOrManager } = this.state;
    const {
      search,
    } = this.props.location;

    const query = QueryString.parse(search);
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab,
      });
    }

    if (!justAdminOrManager) {
      this.props.getAllGestionsMe({ ...query, ...opt }, (body) => {
        this.getCharge(body);
      });
    } else {
      this.props.getAllGestions({ ...query, ...opt }, (body) => {
        this.getCharge(body);
      });
    }
  }

  render() {
    const headers = [
      {
        id: 'id', disablePadding: this.state.hideId, label: 'ID',
      },
      {
        id: 'RUT', disablePadding: this.state.hideRut, label: 'RUT',
      },
      {
        id: 'nombre', disablePadding: this.state.hideNombre, label: 'Nombre',
      },
      {
        id: 'Clasificación', disablePadding: this.state.hideClasificacion, label: 'Clasificación',
      },
      {
        id: 'Tramo', disablePadding: this.state.hideTramo, label: 'Tramo',
      },
      {
        id: 'provisión', disablePadding: this.state.hideProvision, label: 'provisión',
      },
      {
        id: 'cuota', disablePadding: this.state.hideCuota, label: 'cuota',
      },
      {
        id: 'Cuotas Totales', disablePadding: this.state.hideCuotasTotales, label: 'Cuotas Totales',
      },
      {
        id: 'Cuotas Pagadas', disablePadding: this.state.hideCuotasPagadas, label: 'Cuotas Pagadas',
      },
      {
        id: 'cuotas mora', disablePadding: this.state.hideCuotasMora, label: 'cuotas mora',
      },
      {
        id: 'Saldo', disablePadding: this.state.hideSaldo, label: 'Saldo',
      },
      {
        id: 'Días Mora', disablePadding: this.state.hideDiasMora, label: 'Días Mora',
      },
      {
        id: 'Intensidad', disablePadding: this.state.hideIntensidad, label: 'Intensidad',
      },
      {
        id: 'Estado compromiso', disablePadding: this.state.hideEstadoCompromiso, label: 'Estado compromiso',
      },
      {
        id: 'commitmentDate', disablePadding: this.state.hideFechaCompromiso, label: 'Fecha compromiso',
      },
      {
        id: 'createdAt', disablePadding: this.state.hideFechaGestion, label: 'Fecha gestion',
      },
      {
        id: 'Saldo hoy', disablePadding: this.state.hideSaldoHoy, label: 'Saldo hoy',
      },
      {
        id: 'Sin Gestión', disablePadding: this.state.hideSinGestion, label: 'Sin Gestión',
      },
    ];

    const {
      rowsPerPage,
      page,
      selected,
    } = this.state;

    const { disable, countCases, gestions } = this.props;

    const data = map(gestions, d => ({
      id: d._id,
      gestionDate: ((d.managements) && (d.managements.length > 0)) ? d.managements[d.managements.length - 1].createdAt : '',
      commitmentDate: d.commitmentDate ? d.commitmentDate : '',
      cells: (
        <Fragment>
          <TableCell className="material-table__cell" style={{ borderBottom: '0px' }} hidden={this.state.hideId} align="left">{d.idCases}</TableCell>
          <TableCell className="material-table__cell" style={{ borderBottom: '0px' }} hidden={this.state.hideRut} align="left">{setRUTFormat(d.rut)}</TableCell>
          <TableCell className="material-table__cell" style={{ borderBottom: '0px' }} hidden={this.state.hideNombre} align="left">{`${d.name} ${d.paternalSurname}`}</TableCell>
          <TableCell className="material-table__cell" style={{ borderBottom: '0px' }} hidden={this.state.hideClasificacion} align="left">{d.ranking}</TableCell>
          <TableCell className="material-table__cell" style={{ borderBottom: '0px' }} hidden={this.state.hideTramo} align="left">{d.section}</TableCell>
          <TableCell className="material-table__cell" style={{ borderBottom: '0px' }} hidden={this.state.hideProvision} align="left">
            <NumberFormat
              displayType="text"
              style={{ fontSize: '14px' }}
              decimalSeparator=","
              thousandSeparator="."
              value={d.provision}
            />
          </TableCell>
          <TableCell className="material-table__cell" hidden={this.state.hideCuota} style={{ borderBottom: '0px' }} align="left">
            <NumberFormat
              displayType="text"
              style={{ fontSize: '14px' }}
              decimalSeparator=","
              thousandSeparator="."
              value={d.payment}
            />
          </TableCell>
          <TableCell className="material-table__cell" hidden={this.state.hideCuotasTotales} style={{ borderBottom: '0px' }} align="left">
            <NumberFormat
              displayType="text"
              style={{ fontSize: '14px' }}
              decimalSeparator=","
              thousandSeparator="."
              value={d.paymentTotal}
            />
          </TableCell>
          <TableCell className="material-table__cell" hidden={this.state.hideCuotasPagadas} style={{ borderBottom: '0px' }} align="left">
            <NumberFormat
              displayType="text"
              style={{ fontSize: '14px' }}
              decimalSeparator=","
              thousandSeparator="."
              value={d.feesPaid}
            />
          </TableCell>
          <TableCell className="material-table__cell" hidden={this.state.hideCuotasMora} style={{ borderBottom: '0px' }} align="left">
            <NumberFormat
              displayType="text"
              style={{ fontSize: '14px' }}
              decimalSeparator=","
              thousandSeparator="."
              value={d.paymentOfArrears}
            />
          </TableCell>
          <TableCell className="material-table__cell" hidden={this.state.hideSaldo} style={{ borderBottom: '0px' }} align="left">
            <NumberFormat
              displayType="text"
              style={{ fontSize: '14px' }}
              decimalSeparator=","
              thousandSeparator="."
              value={d.capital}
            />
          </TableCell>
          <TableCell className="material-table__cell" hidden={this.state.hideDiasMora} style={{ borderBottom: '0px' }} align="left">
            <NumberFormat
              displayType="text"
              style={{ fontSize: '14px' }}
              decimalSeparator=","
              thousandSeparator="."
              value={d.dayInArreas}
            />
          </TableCell>
          <TableCell className="material-table__cell" hidden={this.state.hideIntensidad} style={{ borderBottom: '0px' }} align="left">{ d.intensity }</TableCell>
          <TableCell className="material-table__cell" hidden={this.state.hideEstadoCompromiso} style={{ borderBottom: '0px' }} align="left">{ this.translate(d.commitment) }</TableCell>
          <TableCell className="material-table__cell" hidden={this.state.hideFechaCompromiso} style={{ borderBottom: '0px' }} align="left">{ d.commitmentDate ? moment(d.commitmentDate).format('DD/MM/YYYY') : ''}</TableCell>
          <TableCell className="material-table__cell" hidden={this.state.hideFechaGestion} style={{ borderBottom: '0px' }} align="left">
            {/* {moment().format('DD/MM/YYYY')} */}
            {
              ((d.managements) && (d.managements.length > 0))
                ? (moment(d.managements[d.managements.length - 1].createdAt).format('DD/MM/YYYY') === moment().format('DD/MM/YYYY')) ? <strong> Gestion hoy</strong> : moment(d.managements[d.managements.length - 1].createdAt).format('DD/MM/YYYY')
                : ''
            }
          </TableCell>
          <TableCell className="material-table__cell" hidden={this.state.hideSaldoHoy} style={{ borderBottom: '0px' }} align="left">
            <NumberFormat
              displayType="text"
              style={{ fontSize: '14px' }}
              decimalSeparator=","
              thousandSeparator="."
              value={d.balanceToday}
            />
          </TableCell>
          <TableCell className="material-table__cell" hidden={this.state.hideSinGestion} style={{ borderBottom: '0px' }} align="left">{d.lastManagementDate ? moment().diff(d.lastManagementDate, 'days') : 'Sin gestión'}</TableCell>
        </Fragment>
      ),
    }));

    return (
      <div>
        <div className="tabs tabs--bordered-bottom">
          <div className="tabs__wrap flex_separate">
            <Nav tabs className="w_o_border">
              <NavItem>
                <NavLink
                  className={classnames({ active: this.state.activeTab === '1', the_wigth_casos: true })}
                  onClick={() => {
                    this.toggle('1', { intensity: 0 });
                  }}
                >
                  <strong style={{ fontSize: '16px' }}>No gestionadas</strong>
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  className={classnames({ active: this.state.activeTab === '2', the_wigth_casos: true })}
                  onClick={() => {
                    this.toggle('2', { commitment: 'with' });
                  }}
                >
                  <strong style={{ fontSize: '16px' }}>Con compromiso futuro</strong>
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  className={classnames({ active: this.state.activeTab === '3', the_wigth_casos: true })}
                  onClick={() => {
                    this.toggle('3', { commitment: 'out' });
                  }}
                >
                  <strong style={{ fontSize: '16px' }}>Sin compromiso</strong>
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  className={classnames({ active: this.state.activeTab === '4', the_wigth_casos: true })}
                  onClick={() => {
                    this.toggle('4', { commitmentToday: true });
                  }}
                >
                  <strong style={{ fontSize: '16px' }}>Compromisos hoy</strong>
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  className={classnames({ active: this.state.activeTab === '5', the_wigth_casos: true })}
                  onClick={() => {
                    this.toggle('5', {});
                  }}
                >
                  <strong style={{ fontSize: '16px' }}>Todos</strong>
                </NavLink>
              </NavItem>
            </Nav>
          </div>
          <TabContent activeTab={this.state.activeTab} style={{ backgroundColor: '#fff' }}>
            <TabPane tabId="1">
              <SearchBarAndFilters
                search={this.state.search}
                justAdminOrManager={this.state.justAdminOrManager}
                allMyCases={this.allMyCases}
                allCases={this.allCases}
                onChangeSearch={this.onChangeSearch}
                onSubmitSearch={this.onSubmitSearch}
                onClickFilterCase={this.onClickFilterCase}
                isOpenModalHideColumn={this.state.isOpenModalHideColumn}
                onClickHideColumn={this.onClickHideColumn}
                toggleHidenColumn={this.toggleHidenColumn}
                onChangeHideColumn={this.onChangeHideColumn}
                pos={0}
                hideId={this.state.hideId}
                hideRut={this.state.hideRut}
                hideNombre={this.state.hideNombre}
                hideClasificacion={this.state.hideClasificacion}
                hideTramo={this.state.hideTramo}
                hideProvision={this.state.hideProvision}
                hideCuota={this.state.hideCuota}
                hideCuotasTotales={this.state.hideCuotasTotales}
                hideCuotasPagadas={this.state.hideCuotasPagadas}
                hideCuotasMora={this.state.hideCuotasMora}
                hideSaldo={this.state.hideSaldo}
                hideDiasMora={this.state.hideDiasMora}
                hideIntensidad={this.state.hideIntensidad}
                hideEstadoCompromiso={this.state.hideEstadoCompromiso}
                hideFechaCompromiso={this.state.hideFechaCompromiso}
                hideFechaGestion={this.state.hideFechaGestion}
                hideSaldoHoy={this.state.hideSaldoHoy}
                hideSinGestion={this.state.hideSinGestion}
              />
              <div className="tabs tabs--bordered-bottom">
                <div className="tabs__wrap">
                  {
                    disable && (
                      <Skeleton count={rowsPerPage + 1} height={40} />
                    )
                  }
                  {
                    !disable && (
                      <MatTable
                        onSelectAllClick={this.onSelectAllClick}
                        onChangePage={this.onChangePage}
                        cargando={disable}
                        onChangeRowsPerPage={this.onChangeRowsPerPage}
                        onClickRow={this.onClickRow}
                        onClick={this.onClickCaseView}
                        selected={selected}
                        headers={headers}
                        data={data}
                        page={page}
                        rowsPerPage={rowsPerPage}
                        total={countCases || 0}
                      />
                    )
                  }
                </div>
              </div>
            </TabPane>
            <TabPane tabId="2">
              <SearchBarAndFilters
                search={this.state.search}
                justAdminOrManager={this.state.justAdminOrManager}
                allMyCases={this.allMyCases}
                allCases={this.allCases}
                onChangeSearch={this.onChangeSearch}
                onSubmitSearch={this.onSubmitSearch}
                onClickFilterCase={this.onClickFilterCase}
                isOpenModalHideColumn={this.state.isOpenModalHideColumn}
                onClickHideColumn={this.onClickHideColumn}
                toggleHidenColumn={this.toggleHidenColumn}
                onChangeHideColumn={this.onChangeHideColumn}
                pos={1}
                hideId={this.state.hideId}
                hideRut={this.state.hideRut}
                hideNombre={this.state.hideNombre}
                hideClasificacion={this.state.hideClasificacion}
                hideTramo={this.state.hideTramo}
                hideProvision={this.state.hideProvision}
                hideCuota={this.state.hideCuota}
                hideCuotasTotales={this.state.hideCuotasTotales}
                hideCuotasPagadas={this.state.hideCuotasPagadas}
                hideCuotasMora={this.state.hideCuotasMora}
                hideSaldo={this.state.hideSaldo}
                hideDiasMora={this.state.hideDiasMora}
                hideIntensidad={this.state.hideIntensidad}
                hideEstadoCompromiso={this.state.hideEstadoCompromiso}
                hideFechaCompromiso={this.state.hideFechaCompromiso}
                hideFechaGestion={this.state.hideFechaGestion}
                hideSaldoHoy={this.state.hideSaldoHoy}
                hideSinGestion={this.state.hideSinGestion}
              />
              <div className="tabs tabs--bordered-bottom">
                <div className="tabs__wrap">
                  {
                    disable && (
                      <Skeleton count={rowsPerPage + 1} height={40} />
                    )
                  }
                  {
                    !disable && (
                      <MatTable
                        onSelectAllClick={this.onSelectAllClick}
                        onChangePage={this.onChangePage}
                        cargando={disable}
                        onChangeRowsPerPage={this.onChangeRowsPerPage}
                        onClickRow={this.onClickRow}
                        onClick={this.onClickCaseView}
                        selected={selected}
                        headers={headers}
                        data={data}
                        page={page}
                        rowsPerPage={rowsPerPage}
                        total={countCases || 0}
                      />
                    )
                  }
                </div>
              </div>
            </TabPane>
            <TabPane tabId="3">
              <SearchBarAndFilters
                search={this.state.search}
                justAdminOrManager={this.state.justAdminOrManager}
                allMyCases={this.allMyCases}
                allCases={this.allCases}
                onChangeSearch={this.onChangeSearch}
                onSubmitSearch={this.onSubmitSearch}
                onClickFilterCase={this.onClickFilterCase}
                isOpenModalHideColumn={this.state.isOpenModalHideColumn}
                onClickHideColumn={this.onClickHideColumn}
                toggleHidenColumn={this.toggleHidenColumn}
                onChangeHideColumn={this.onChangeHideColumn}
                pos={2}
                hideId={this.state.hideId}
                hideRut={this.state.hideRut}
                hideNombre={this.state.hideNombre}
                hideClasificacion={this.state.hideClasificacion}
                hideTramo={this.state.hideTramo}
                hideProvision={this.state.hideProvision}
                hideCuota={this.state.hideCuota}
                hideCuotasTotales={this.state.hideCuotasTotales}
                hideCuotasPagadas={this.state.hideCuotasPagadas}
                hideCuotasMora={this.state.hideCuotasMora}
                hideSaldo={this.state.hideSaldo}
                hideDiasMora={this.state.hideDiasMora}
                hideIntensidad={this.state.hideIntensidad}
                hideEstadoCompromiso={this.state.hideEstadoCompromiso}
                hideFechaCompromiso={this.state.hideFechaCompromiso}
                hideFechaGestion={this.state.hideFechaGestion}
                hideSaldoHoy={this.state.hideSaldoHoy}
                hideSinGestion={this.state.hideSinGestion}
              />
              <div className="tabs tabs--bordered-bottom">
                <div className="tabs__wrap">
                  {
                    disable && (
                      <Skeleton count={rowsPerPage + 1} height={40} />
                    )
                  }
                  {
                    !disable && (
                      <MatTable
                        onSelectAllClick={this.onSelectAllClick}
                        onChangePage={this.onChangePage}
                        cargando={disable}
                        onChangeRowsPerPage={this.onChangeRowsPerPage}
                        onClickRow={this.onClickRow}
                        onClick={this.onClickCaseView}
                        selected={selected}
                        headers={headers}
                        data={data}
                        page={page}
                        rowsPerPage={rowsPerPage}
                        total={countCases || 0}
                      />
                    )
                  }
                </div>
              </div>
            </TabPane>
            <TabPane tabId="4">
              <SearchBarAndFilters
                search={this.state.search}
                justAdminOrManager={this.state.justAdminOrManager}
                allMyCases={this.allMyCases}
                allCases={this.allCases}
                onChangeSearch={this.onChangeSearch}
                onSubmitSearch={this.onSubmitSearch}
                onClickFilterCase={this.onClickFilterCase}
                isOpenModalHideColumn={this.state.isOpenModalHideColumn}
                onClickHideColumn={this.onClickHideColumn}
                toggleHidenColumn={this.toggleHidenColumn}
                onChangeHideColumn={this.onChangeHideColumn}
                pos={3}
                hideId={this.state.hideId}
                hideRut={this.state.hideRut}
                hideNombre={this.state.hideNombre}
                hideClasificacion={this.state.hideClasificacion}
                hideTramo={this.state.hideTramo}
                hideProvision={this.state.hideProvision}
                hideCuota={this.state.hideCuota}
                hideCuotasTotales={this.state.hideCuotasTotales}
                hideCuotasPagadas={this.state.hideCuotasPagadas}
                hideCuotasMora={this.state.hideCuotasMora}
                hideSaldo={this.state.hideSaldo}
                hideDiasMora={this.state.hideDiasMora}
                hideIntensidad={this.state.hideIntensidad}
                hideEstadoCompromiso={this.state.hideEstadoCompromiso}
                hideFechaCompromiso={this.state.hideFechaCompromiso}
                hideFechaGestion={this.state.hideFechaGestion}
                hideSaldoHoy={this.state.hideSaldoHoy}
                hideSinGestion={this.state.hideSinGestion}
              />
              <div className="tabs tabs--bordered-bottom">
                <div className="tabs__wrap">
                  {
                    disable && (
                      <Skeleton count={rowsPerPage + 1} height={40} />
                    )
                  }
                  {
                    !disable && (
                      <MatTable
                        onSelectAllClick={this.onSelectAllClick}
                        onChangePage={this.onChangePage}
                        cargando={disable}
                        onChangeRowsPerPage={this.onChangeRowsPerPage}
                        onClickRow={this.onClickRow}
                        onClick={this.onClickCaseView}
                        selected={selected}
                        headers={headers}
                        data={data}
                        page={page}
                        rowsPerPage={rowsPerPage}
                        total={countCases || 0}
                      />
                    )
                  }
                </div>
              </div>
            </TabPane>
            <TabPane tabId="5">
              <SearchBarAndFilters
                search={this.state.search}
                justAdminOrManager={this.state.justAdminOrManager}
                allMyCases={this.allMyCases}
                allCases={this.allCases}
                onChangeSearch={this.onChangeSearch}
                onSubmitSearch={this.onSubmitSearch}
                onClickFilterCase={this.onClickFilterCase}
                isOpenModalHideColumn={this.state.isOpenModalHideColumn}
                onClickHideColumn={this.onClickHideColumn}
                toggleHidenColumn={this.toggleHidenColumn}
                onChangeHideColumn={this.onChangeHideColumn}
                pos={4}
                hideId={this.state.hideId}
                hideRut={this.state.hideRut}
                hideNombre={this.state.hideNombre}
                hideClasificacion={this.state.hideClasificacion}
                hideTramo={this.state.hideTramo}
                hideProvision={this.state.hideProvision}
                hideCuota={this.state.hideCuota}
                hideCuotasTotales={this.state.hideCuotasTotales}
                hideCuotasPagadas={this.state.hideCuotasPagadas}
                hideCuotasMora={this.state.hideCuotasMora}
                hideSaldo={this.state.hideSaldo}
                hideDiasMora={this.state.hideDiasMora}
                hideIntensidad={this.state.hideIntensidad}
                hideEstadoCompromiso={this.state.hideEstadoCompromiso}
                hideFechaCompromiso={this.state.hideFechaCompromiso}
                hideFechaGestion={this.state.hideFechaGestion}
                hideSaldoHoy={this.state.hideSaldoHoy}
                hideSinGestion={this.state.hideSinGestion}
              />
              <div className="tabs tabs--bordered-bottom">
                <div className="tabs__wrap">
                  {
                    disable && (
                      <Skeleton count={rowsPerPage + 1} height={40} />
                    )
                  }
                  {
                    !disable && (
                      <MatTable
                        onSelectAllClick={this.onSelectAllClick}
                        onChangePage={this.onChangePage}
                        cargando={disable}
                        onChangeRowsPerPage={this.onChangeRowsPerPage}
                        onClickRow={this.onClickRow}
                        onClick={this.onClickCaseView}
                        selected={selected}
                        headers={headers}
                        data={data}
                        page={page}
                        rowsPerPage={rowsPerPage}
                        total={countCases || 0}
                      />
                    )
                  }
                </div>
              </div>
            </TabPane>
          </TabContent>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ gestion }) => ({
  gestions: gestion.gestions,
  disable: gestion.disable,
  countCases: gestion.countCases,
  limitCases: gestion.limitCases,
});


const mapDispatchToProps = {
  getAllGestions,
  getAllGestionsMe,
  setTitle: changeTitleAction,
};


export default connect(mapStateToProps, mapDispatchToProps, null, { forwardRef: true })(GestionsList);
