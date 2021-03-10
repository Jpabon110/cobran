/* eslint-disable react/prop-types */
/* eslint-disable no-useless-constructor */
/* eslint-disable react/prefer-stateless-function */
/* eslint-disable max-len */
import React, { Component } from 'react';
import {
  FormGroup,
  Col,
  Label,
} from 'reactstrap';
import NumberFormat from 'react-currency-format';

class creditPortfolio extends Component {
  constructor() {
    super();
  }


  render() {
    const {
      title,
      nRecordLoad,
      nRecordIncidences,
    } = this.props;
    return (
      <Col md={6}>
        <FormGroup style={{ margin: 0 }}>
          <div className="profile_info col-md-12 mb-0 mt-3">
            <FormGroup className="details_profile_columned" style={{ margin: 0 }}>
              <h2 className="title_modal_contact mb-2">{title}</h2>
              <div className="top_linear_divaindo">___</div>
            </FormGroup>
          </div>
          <div className="centralice_section ml-1">
            <FormGroup>
              <Label className="label_porfolio">Nº de casos cargados</Label><br />
              <NumberFormat className="h_for_cyphir" displayType="text" decimalSeparator="," thousandSeparator="." value={nRecordLoad} />
            </FormGroup>
            <FormGroup>
              <Label className="label_porfolio">Total de incidencias </Label><br />
              <NumberFormat className="h_for_cyphir" displayType="text" decimalSeparator="," thousandSeparator="." value={nRecordIncidences} />
            </FormGroup>
          </div>
        </FormGroup>
      </Col>
    );
  }
}

export default creditPortfolio;
