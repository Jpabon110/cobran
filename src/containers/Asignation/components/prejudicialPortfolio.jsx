/* eslint-disable no-underscore-dangle */
/* eslint-disable react/prop-types */
/* eslint-disable no-useless-constructor */
/* eslint-disable react/prefer-stateless-function */
/* eslint-disable max-len */
import React, { Component, Fragment } from 'react';
import {
  Label,
  FormGroup,
  Col,
} from 'reactstrap';
import TableCell from '@material-ui/core/TableCell';
import NumberFormat from 'react-currency-format';
import MaterialTableAsignation from '../../../shared/components/MaterialTableAsignation';

const headers = [
  {
    id: 'empty', disablePadding: false, label: '',
  },
  {
    id: 'n_cases', disablePadding: true, label: 'Nº de casos',
  },
  {
    id: 'insolutCredit', disablePadding: false, label: 'Saldo Insoluto',
  },
  {
    id: 'averageAmount', disablePadding: false, label: 'Monto Media',
  },
];

class creditPortfolio extends Component {
  constructor() {
    super();
  }

  render() {
    const {
      title,
      nCases,
      creditsAsign,
      tableValues,
      noAsign,
    } = this.props;

    const data = (tableValues) ? tableValues
      .map(d => ({
        id: d._id,
        cells: (
          <Fragment>
            <TableCell className="material-table__cell" style={{ borderBottom: '0px', textAlign: 'right' }} align="left"> <span className="h_for_cyphir" style={{ fontSize: '12px' }}>{d._id}</span></TableCell>
            <TableCell className="material-table__cell" style={{ borderBottom: '0px', textAlign: 'right' }} align="left">
              <NumberFormat className="h_for_cyphir" style={{ fontSize: '12px' }} displayType="text" decimalSeparator="," thousandSeparator="." value={d.numberCases} />
            </TableCell>
            <TableCell className="material-table__cell" style={{ borderBottom: '0px', textAlign: 'right' }} align="left">
              <NumberFormat className="h_for_cyphir" style={{ fontSize: '12px' }} displayType="text" decimalSeparator="," thousandSeparator="." value={d.totalDebt} />
            </TableCell>
            <TableCell className="material-table__cell" style={{ borderBottom: '0px', textAlign: 'right' }} align="left">
              <NumberFormat className="h_for_cyphir" style={{ fontSize: '12px' }} displayType="text" decimalSeparator="," thousandSeparator="." value={parseFloat(d.averageDebt)} />
            </TableCell>
          </Fragment>
        ),
      })) : [];

    return (
      <Col md={12}>
        <FormGroup style={{ margin: 0 }}>
          <h3 className="title_modal_contact mb-2"><span style={{ color: '#9E9E9E' }}> {title} </span></h3>
          <div className="centralice_section col-md-10">
            <FormGroup>
              <Label className="label_porfolio">Nº de casos</Label> <br />
              <NumberFormat className="h_for_cyphir" displayType="text" decimalSeparator="," thousandSeparator="." value={nCases} />
            </FormGroup>
            <FormGroup>
              <Label className="label_porfolio">Saldo asignación total</Label> <br />
              <NumberFormat className="h_for_cyphir" displayType="text" decimalSeparator="," thousandSeparator="." value={creditsAsign} />
            </FormGroup>
            <FormGroup>
              <Label className="label_porfolio">Sin asignar</Label> <br />
              <NumberFormat className="h_for_cyphir" displayType="text" decimalSeparator="," thousandSeparator="." value={noAsign} />
            </FormGroup>
          </div>
          <MaterialTableAsignation
            headers={headers}
            data={data}
          />
        </FormGroup>
      </Col>
    );
  }
}

export default creditPortfolio;
