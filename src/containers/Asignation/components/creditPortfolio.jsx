/* eslint-disable react/prop-types */
/* eslint-disable no-useless-constructor */
/* eslint-disable react/prefer-stateless-function */
/* eslint-disable max-len */
import React, { Component } from 'react';
import {
  Label,
  FormGroup,
  Col,
} from 'reactstrap';
import NumberFormat from 'react-currency-format';

class creditPortfolio extends Component {
  constructor() {
    super();
  }


  render() {
    const {
      title,
      nCases,
      creditsAsign,
    } = this.props;
    return (
      <Col md={10}>
        <FormGroup style={{ margin: 0 }}>
          <h3 className="title_modal_contact mb-2"><span style={{ color: '#9E9E9E' }}> {title} </span></h3>
          <div className="centralice_section ml-1">
            <FormGroup>
              <Label className="label_porfolio">Nº de casos</Label><br />
              <NumberFormat className="h_for_cyphir" displayType="text" decimalSeparator="," thousandSeparator="." value={nCases} />
            </FormGroup>
            <FormGroup>
              <Label className="label_porfolio">Saldo asignación total</Label><br />
              <NumberFormat className="h_for_cyphir" displayType="text" decimalSeparator="," thousandSeparator="." value={creditsAsign} />
            </FormGroup>
          </div>
        </FormGroup>
      </Col>
    );
  }
}

export default creditPortfolio;
