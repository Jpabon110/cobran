/* eslint-disable max-len */
/* eslint-disable no-underscore-dangle */
/* eslint-disable react/prop-types */
import React, { PureComponent } from 'react';
import {
  // Button, ButtonToolbar,
  Modal, Label,
  Col, FormGroup,
  // Input,
} from 'reactstrap';
// import Select from 'react-select';
// import map from 'lodash/map';
// import DatePicker from 'react-datepicker';
import Checkbox from '@material-ui/core/Checkbox';
import classNames from 'classnames';
// import ereaserIcon from '../../img/ereaser_icon.png';

export default class ModalComponent extends PureComponent {
  render() {
    const {
      color, title,
      // message,
      colored, header, isOpen, toggle,
      onChangeHideColumn,
      pos,
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
    } = this.props;

    const modalClass = classNames({
      'modal-dialog--colored': colored,
      'modal-dialog--header': header,
    });


    return (
      <Modal
        isOpen={isOpen}
        toggle={toggle()}
        className={`modal-dialog--${color} ${modalClass}`}
      >
        <div className="modal__header">
          <button className="lnr lnr-cross modal__close-btn" type="button" onClick={toggle()} />
          {/* {header ? '' : Icon} */}
          {header}
          <h4 className="bold-text  modal__title" style={{ textAlign: 'left', padding: '0px 15px' }}>{title}</h4>
        </div>
        <div className="modal__body" style={{ overflowY: 'scroll', height: '500px' }}>
          {/* {message}
         */}
          <Col md="12" style={{ textAlign: 'left' }}>
            <FormGroup>
              <Label className="label_autofin" for="executive">ID:</Label>
              <Checkbox
                className="material-table__checkbox"
                // style={{ color: hideId ? '#C7AC43' : 'rgba(0, 0, 0, 0.54)' }}
                style={{ color: '#C7AC43' }}
                value={hideId}
                // style={{ color: isSelected ? '#C7AC43' : 'rgba(0, 0, 0, 0.54)' }}
                onChange={onChangeHideColumn('hideId', pos)}
                // onClick={onClickRow ? onClickRow(d.id) : ''}
                checked={hideId}
              />
            </FormGroup>
          </Col>

          <Col md="12" style={{ textAlign: 'left' }}>
            <FormGroup>
              <Label className="label_autofin" for="executive">RUT:</Label>
              <Checkbox
                className="material-table__checkbox"
                style={{ color: '#C7AC43' }}
                // style={{ color: isSelected ? '#C7AC43' : 'rgba(0, 0, 0, 0.54)' }}
                onChange={onChangeHideColumn('hideRut', pos)}
                // onClick={onClickRow ? onClickRow(d.id) : ''}
                checked={hideRut}
              />
            </FormGroup>
          </Col>

          <Col md="12" style={{ textAlign: 'left' }}>
            <FormGroup>
              <Label className="label_autofin" for="executive">Nombre:</Label>
              <Checkbox
                className="material-table__checkbox"
                style={{ color: '#C7AC43' }}
                // style={{ color: isSelected ? '#C7AC43' : 'rgba(0, 0, 0, 0.54)' }}
                onChange={onChangeHideColumn('hideNombre', pos)}
                // onClick={onClickRow ? onClickRow(d.id) : ''}
                checked={hideNombre}
              />
            </FormGroup>
          </Col>

          <Col md="12" style={{ textAlign: 'left' }}>
            <FormGroup>
              <Label className="label_autofin" for="executive">Clasificacón:</Label>
              <Checkbox
                className="material-table__checkbox"
                style={{ color: '#C7AC43' }}
                // style={{ color: isSelected ? '#C7AC43' : 'rgba(0, 0, 0, 0.54)' }}
                onChange={onChangeHideColumn('hideClasificacion', pos)}
                // onClick={onClickRow ? onClickRow(d.id) : ''}
                checked={hideClasificacion}
              />
            </FormGroup>
          </Col>

          <Col md="12" style={{ textAlign: 'left' }}>
            <FormGroup>
              <Label className="label_autofin" for="executive">Tramo:</Label>
              <Checkbox
                className="material-table__checkbox"
                style={{ color: '#C7AC43' }}
                // style={{ color: isSelected ? '#C7AC43' : 'rgba(0, 0, 0, 0.54)' }}
                onChange={onChangeHideColumn('hideTramo', pos)}
                // onClick={onClickRow ? onClickRow(d.id) : ''}
                checked={hideTramo}
              />
            </FormGroup>
          </Col>

          <Col md="12" style={{ textAlign: 'left' }}>
            <FormGroup>
              <Label className="label_autofin" for="executive">Provisión:</Label>
              <Checkbox
                className="material-table__checkbox"
                style={{ color: '#C7AC43' }}
                // style={{ color: isSelected ? '#C7AC43' : 'rgba(0, 0, 0, 0.54)' }}
                onChange={onChangeHideColumn('hideProvision', pos)}
                // onClick={onClickRow ? onClickRow(d.id) : ''}
                checked={hideProvision}
              />
            </FormGroup>
          </Col>

          <Col md="12" style={{ textAlign: 'left' }}>
            <FormGroup>
              <Label className="label_autofin" for="executive">Cuota:</Label>
              <Checkbox
                className="material-table__checkbox"
                style={{ color: '#C7AC43' }}
                // style={{ color: isSelected ? '#C7AC43' : 'rgba(0, 0, 0, 0.54)' }}
                onChange={onChangeHideColumn('hideCuota', pos)}
                // onClick={onClickRow ? onClickRow(d.id) : ''}
                checked={hideCuota}
              />
            </FormGroup>
          </Col>

          <Col md="12" style={{ textAlign: 'left' }}>
            <FormGroup>
              <Label className="label_autofin" for="executive">Cuotas Totales:</Label>
              <Checkbox
                className="material-table__checkbox"
                style={{ color: '#C7AC43' }}
                // style={{ color: isSelected ? '#C7AC43' : 'rgba(0, 0, 0, 0.54)' }}
                onChange={onChangeHideColumn('hideCuotasTotales', pos)}
                // onClick={onClickRow ? onClickRow(d.id) : ''}
                checked={hideCuotasTotales}
              />
            </FormGroup>
          </Col>

          <Col md="12" style={{ textAlign: 'left' }}>
            <FormGroup>
              <Label className="label_autofin" for="executive">Cuotas Pagadas:</Label>
              <Checkbox
                className="material-table__checkbox"
                style={{ color: '#C7AC43' }}
                // style={{ color: isSelected ? '#C7AC43' : 'rgba(0, 0, 0, 0.54)' }}
                onChange={onChangeHideColumn('hideCuotasPagadas', pos)}
                // onClick={onClickRow ? onClickRow(d.id) : ''}
                checked={hideCuotasPagadas}
              />
            </FormGroup>
          </Col>

          <Col md="12" style={{ textAlign: 'left' }}>
            <FormGroup>
              <Label className="label_autofin" for="executive">Cuotas mora:</Label>
              <Checkbox
                className="material-table__checkbox"
                style={{ color: '#C7AC43' }}
                // style={{ color: isSelected ? '#C7AC43' : 'rgba(0, 0, 0, 0.54)' }}
                onChange={onChangeHideColumn('hideCuotasMora', pos)}
                // onClick={onClickRow ? onClickRow(d.id) : ''}
                checked={hideCuotasMora}
              />
            </FormGroup>
          </Col>

          <Col md="12" style={{ textAlign: 'left' }}>
            <FormGroup>
              <Label className="label_autofin" for="executive">Saldo:</Label>
              <Checkbox
                className="material-table__checkbox"
                style={{ color: '#C7AC43' }}
                // style={{ color: isSelected ? '#C7AC43' : 'rgba(0, 0, 0, 0.54)' }}
                onChange={onChangeHideColumn('hideSaldo', pos)}
                // onClick={onClickRow ? onClickRow(d.id) : ''}
                checked={hideSaldo}
              />
            </FormGroup>
          </Col>

          <Col md="12" style={{ textAlign: 'left' }}>
            <FormGroup>
              <Label className="label_autofin" for="executive">Días mora:</Label>
              <Checkbox
                className="material-table__checkbox"
                style={{ color: '#C7AC43' }}
                // style={{ color: isSelected ? '#C7AC43' : 'rgba(0, 0, 0, 0.54)' }}
                onChange={onChangeHideColumn('hideDiasMora', pos)}
                // onClick={onClickRow ? onClickRow(d.id) : ''}
                checked={hideDiasMora}
              />
            </FormGroup>
          </Col>

          <Col md="12" style={{ textAlign: 'left' }}>
            <FormGroup>
              <Label className="label_autofin" for="executive">Intensidad:</Label>
              <Checkbox
                className="material-table__checkbox"
                style={{ color: '#C7AC43' }}
                // style={{ color: isSelected ? '#C7AC43' : 'rgba(0, 0, 0, 0.54)' }}
                onChange={onChangeHideColumn('hideIntensidad', pos)}
                // onClick={onClickRow ? onClickRow(d.id) : ''}
                checked={hideIntensidad}
              />
            </FormGroup>
          </Col>

          <Col md="12" style={{ textAlign: 'left' }}>
            <FormGroup>
              <Label className="label_autofin" for="executive">Estado compromiso:</Label>
              <Checkbox
                className="material-table__checkbox"
                style={{ color: '#C7AC43' }}
                // style={{ color: isSelected ? '#C7AC43' : 'rgba(0, 0, 0, 0.54)' }}
                onChange={onChangeHideColumn('hideEstadoCompromiso', pos)}
                // onClick={onClickRow ? onClickRow(d.id) : ''}
                checked={hideEstadoCompromiso}
              />
            </FormGroup>
          </Col>

          <Col md="12" style={{ textAlign: 'left' }}>
            <FormGroup>
              <Label className="label_autofin" for="executive">Fecha compromiso:</Label>
              <Checkbox
                className="material-table__checkbox"
                style={{ color: '#C7AC43' }}
                // style={{ color: isSelected ? '#C7AC43' : 'rgba(0, 0, 0, 0.54)' }}
                onChange={onChangeHideColumn('hideFechaCompromiso', pos)}
                // onClick={onClickRow ? onClickRow(d.id) : ''}
                checked={hideFechaCompromiso}
              />
            </FormGroup>
          </Col>

          <Col md="12" style={{ textAlign: 'left' }}>
            <FormGroup>
              <Label className="label_autofin" for="executive">Fecha gestión:</Label>
              <Checkbox
                className="material-table__checkbox"
                style={{ color: '#C7AC43' }}
                // style={{ color: isSelected ? '#C7AC43' : 'rgba(0, 0, 0, 0.54)' }}
                onChange={onChangeHideColumn('hideFechaGestion', pos)}
                // onClick={onClickRow ? onClickRow(d.id) : ''}
                checked={hideFechaGestion}
              />
            </FormGroup>
          </Col>

          <Col md="12" style={{ textAlign: 'left' }}>
            <FormGroup>
              <Label className="label_autofin" for="executive">Saldo hoy:</Label>
              <Checkbox
                className="material-table__checkbox"
                style={{ color: '#C7AC43' }}
                // style={{ color: isSelected ? '#C7AC43' : 'rgba(0, 0, 0, 0.54)' }}
                onChange={onChangeHideColumn('hideSaldoHoy', pos)}
                // onClick={onClickRow ? onClickRow(d.id) : ''}
                checked={hideSaldoHoy}
              />
            </FormGroup>
          </Col>

          <Col md="12" style={{ textAlign: 'left' }}>
            <FormGroup>
              <Label className="label_autofin" for="executive">Sin gestión:</Label>
              <Checkbox
                className="material-table__checkbox"
                style={{ color: '#C7AC43' }}
                // style={{ color: isSelected ? '#C7AC43' : 'rgba(0, 0, 0, 0.54)' }}
                onChange={onChangeHideColumn('hideSinGestion', pos)}
                // onClick={onClickRow ? onClickRow(d.id) : ''}
                checked={hideSinGestion}
              />
            </FormGroup>
          </Col>
        </div>
        {/* <ButtonToolbar className="modal__footer" style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Button onClick={cleanFilters}>
            <img
              src={ereaserIcon}
              alt=""
              style={{
                width: '20px', position: 'relative', right: '7%', marginBottom: '3px',
              }}
            />
            Limpiar filtros
          </Button>{' '}
          <Button className="asignar just_this" onClick={toggle(true)}>
            <span className="lnr lnr-funnel icon_standars" />
            Filtrar
          </Button>
        </ButtonToolbar> */}
      </Modal>
    );
  }
}
