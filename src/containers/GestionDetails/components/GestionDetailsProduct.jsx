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
  Label,
} from 'reactstrap';
// import NumberFormat from 'react-currency-format';
import { connect } from 'react-redux';

class GestionDetails extends Component {
  constructor() {
    super();
    this.state = {
    };
  }

  componentDidMount() {

  }

  render() {
    const { value, executive } = this.props;
    return (
      <Col md={5}>
        <h2 style={{ fontWeight: '600' }}>Producto</h2> <br />
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr' }}>
          <FormGroup>
            <h4 className="h_for_cyphir2">ID</h4>
            <Label className="h_for_cyphir2" style={{ fontWeight: '500' }}>{value.idCases}</Label>
          </FormGroup>
          <FormGroup>
            <h4 className="h_for_cyphir2">Producto</h4>
            <Label className="h_for_cyphir2" style={{ fontWeight: '500' }}>{value.product}</Label>
          </FormGroup>
          <FormGroup>
            <h4 className="h_for_cyphir2">Asignado a</h4>
            <Label className="h_for_cyphir2" style={{ fontWeight: '500' }}>{executive.firstName} {executive.lastName}</Label>
          </FormGroup>
          <FormGroup>
            <h4 className="h_for_cyphir2">Saldo hoy</h4>
            <Label className="h_for_cyphir2" style={{ fontWeight: '500' }}>{value.balanceToday}</Label>
          </FormGroup>
          <FormGroup>
            <h4 className="h_for_cyphir2">Judicial</h4>
            <Label className="h_for_cyphir2" style={{ fontWeight: '500' }}>{value.judicial}</Label>
          </FormGroup>
          <FormGroup>
            <h4 className="h_for_cyphir2">Equipo</h4>
            <Label className="h_for_cyphir2" style={{ fontWeight: '500' }}>{value.stretch}</Label>
          </FormGroup>
          <FormGroup>
            <h4 className="h_for_cyphir2">Días Mora</h4>
            <Label className="h_for_cyphir2" style={{ fontWeight: '500' }}>{value.dayInArreas}</Label>
          </FormGroup>
          <FormGroup>
            <h4 className="h_for_cyphir2">Cuotas Mora</h4>
            <Label className="h_for_cyphir2" style={{ fontWeight: '500' }}>{value.paymentOfArrears}</Label>
          </FormGroup>
          <FormGroup>
            <h4 className="h_for_cyphir2">Vencimiento</h4>
            <Label className="h_for_cyphir2" style={{ fontWeight: '500' }}>{value.expiration}</Label>
          </FormGroup>
          <FormGroup>
            <h4 className="h_for_cyphir2">Fecha Último Pago</h4>
            <Label className="h_for_cyphir2" style={{ fontWeight: '500' }}>{value.lastPaymentDate}</Label>
          </FormGroup>
        </div>
      </Col>
    );
  }
}

// const mapStateToProps = () => ({

// });


// const mapDispatchToProps = {

// };
export default connect(null, null, null, { forwardRef: true })(GestionDetails);
