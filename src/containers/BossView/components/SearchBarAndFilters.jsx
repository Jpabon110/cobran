/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
/* eslint-disable no-useless-constructor */
/* eslint-disable react/prefer-stateless-function */
/* eslint-disable max-len */
import React, { Component, Fragment } from 'react';
import {
  Card, CardBody,
  Col, Input,
} from 'reactstrap';
import ModalHideColumn from '../../../shared/components/Modals/ModalHideColumn';
import ereaserIcon from '../../../shared/img/ereaser_icon.png';

class searchBarAndFilters extends Component {
  render() {
    const {
      search,
      justAdminOrManager,
      allMyCases,
      allCases,
      onChangeSearch,
      onSubmitSearch,
      onClickFilterCase,
      isOpenModalHideColumn,
      onClickHideColumn,
      toggleHidenColumn,
      onChangeHideColumn,
      hideId,
      hideRut,
      hideNombre,
      hideClasificacion,
      hideTramo,
      hideProvision,
      hideCuota,
      hideCuotasTotales,
      hideCuotasPagadas,
      hideCuotasMora,
      hideSaldo,
      hideDiasMora,
      hideIntensidad,
      hideEstadoCompromiso,
      hideFechaCompromiso,
      hideFechaGestion,
      hideSaldoHoy,
      hideSinGestion,
      pos,
    } = this.props;

    return (
      <Fragment>
        <ModalHideColumn
          title="Ocultar columnas"
          color="warning"
          message="¿Esta seguro que desea borrar este registro?"
          isOpen={isOpenModalHideColumn}
          toggle={toggleHidenColumn}
          onChangeHideColumn={onChangeHideColumn}
          hideId={hideId}
          hideRut={hideRut}
          hideNombre={hideNombre}
          hideClasificacion={hideClasificacion}
          hideTramo={hideTramo}
          hideProvision={hideProvision}
          hideCuota={hideCuota}
          hideCuotasTotales={hideCuotasTotales}
          hideCuotasPagadas={hideCuotasPagadas}
          hideCuotasMora={hideCuotasMora}
          hideSaldo={hideSaldo}
          hideDiasMora={hideDiasMora}
          hideIntensidad={hideIntensidad}
          hideEstadoCompromiso={hideEstadoCompromiso}
          hideFechaCompromiso={hideFechaCompromiso}
          hideFechaGestion={hideFechaGestion}
          hideSaldoHoy={hideSaldoHoy}
          hideSinGestion={hideSinGestion}
          pos={pos}
        />
        <Card style={{ paddingBottom: '10px' }}>
          <CardBody className="card_body_flex" style={{ padding: '5px 10px' }}>
            <Col md="8" style={{ display: 'flex', flexWrap: 'wrap' }}>
              <Col xs="auto" sm="auto" md="auto" style={{ padding: '0px' }}>
                <form
                  style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                  }}
                  onSubmit={onSubmitSearch}
                >
                  <Input className="find_of_bar" id="byFindIt" onChange={onChangeSearch} value={search} placeholder="Ingrese ID de caso o RUT" style={{ marginTop: '4%', marginLeft: '8px', paddingLeft: '25px' }} />
                  {/* <Input className="find_of_bar" id="byFindIt" onChange={this.onChangeSearch} value={this.state.search} placeholder="Nombre Cliente, Rut Cliente" style={{ marginTop: '3.5%', marginLeft: '8px', paddingLeft: '25px' }} /> */}
                  {
                    (search) && (
                      <button type="button" style={{ margin: '10px 0px 0px 10px' }} onClick={justAdminOrManager ? allCases : allMyCases} className="btn2 asignar2">
                        <img src={ereaserIcon} alt="" style={{ width: '15px' }} />
                      </button>
                    )
                  }
                </form>
              </Col>
            </Col>

            <Col md="4" style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <Col xs="auto" sm="auto" md="auto" style={{ padding: '0px' }}>
                <button type="button" style={{ margin: '10px 0px 0px 10px' }} onClick={onClickHideColumn} className="btn2 asignar2">
                  <span className="lnr lnr-chart-bars icon_standars" style={{ right: '25%' }} />
                  Columnas
                </button>
              </Col>
              <Col xs="auto" sm="auto" md="auto" style={{ padding: '0px' }}>
                <button type="button" style={{ margin: '10px 0px 0px 10px' }} onClick={onClickFilterCase} className="btn2 asignar2">
                  <span className="lnr lnr-funnel icon_standars" style={{ right: '25%' }} />
                  Filtrar
                </button>
              </Col>
            </Col>
          </CardBody>
        </Card>
      </Fragment>
    );
  }
}

export default searchBarAndFilters;
