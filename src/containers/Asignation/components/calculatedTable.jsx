/* eslint-disable no-underscore-dangle */
/* eslint-disable react/prop-types */
/* eslint-disable no-useless-constructor */
/* eslint-disable react/prefer-stateless-function */
/* eslint-disable max-len */
import React, { Component, Fragment } from 'react';
import {
  FormGroup,
  Col,
} from 'reactstrap';
import TableCell from '@material-ui/core/TableCell';
import NumberFormat from 'react-currency-format';
import MaterialTableCalculated from '../../../shared/components/MaterialTableCalculated';

const headers = [
  {
    id: 'montos', disablePadding: false, label: 'Montos',
  },
  {
    id: 'n_execitive', disablePadding: true, label: 'Nº de ejectutivos',
  },
  {
    id: 'n_cases', disablePadding: true, label: 'Nº de casos',
  },
  {
    id: 'insolutCredit', disablePadding: false, label: 'Saldo Insoluto',
  },
  {
    id: 'averegeCredit', disablePadding: false, label: 'Monto Media',
  },
];

class creditPortfolio extends Component {
  constructor() {
    super();
  }

  translate = (value) => {
    if (value === 'high') {
      return 'Alto';
    }
    if (value === 'low') {
      return 'Bajo';
    }
    return 'Sin corte';
  }

  render() {
    const {
      title,
      summary,
      // creditsAsign,
      // noAsign,
    } = this.props;

    const data = summary
      .map(d => ({
        id: d._id,
        cells: (
          <Fragment>
            <TableCell className="material-table__cell" style={{ borderBottom: '0px' }} align="left">{d.amount ? d.amount : ''}</TableCell>
            <TableCell className="material-table__cell" style={{ borderBottom: '0px' }} align="left">
              <NumberFormat
                className="h_for_cyphir"
                displayType="text"
                decimalSeparator=","
                style={{ fontSize: '14px' }}
                thousandSeparator="."
                value={d.numberExec || 0}
              />
            </TableCell>
            <TableCell className="material-table__cell" style={{ borderBottom: '0px' }} align="left">
              <NumberFormat
                className="h_for_cyphir"
                displayType="text"
                decimalSeparator=","
                style={{ fontSize: '14px' }}
                thousandSeparator="."
                value={d.numberCase || 0}
              />
            </TableCell>
            <TableCell className="material-table__cell" style={{ borderBottom: '0px' }} align="left">
              <NumberFormat
                className="h_for_cyphir"
                displayType="text"
                decimalSeparator=","
                style={{ fontSize: '14px' }}
                thousandSeparator="."
                value={parseFloat(d.total) || 0}
              />
            </TableCell>
            <TableCell className="material-table__cell" style={{ borderBottom: '0px' }} align="left">
              <NumberFormat
                className="h_for_cyphir"
                displayType="text"
                decimalSeparator=","
                style={{ fontSize: '14px' }}
                thousandSeparator="."
                value={parseFloat(d.averageDebt) || 0}
              />
            </TableCell>
          </Fragment>
        ),
      }));

    return (
      <Col md={12}>
        <FormGroup style={{ margin: 0 }}>
          <h3 className="title_modal_contact mb-2"><span style={{ color: '#9E9E9E' }}> {title} </span></h3>
          <MaterialTableCalculated
            headers={headers}
            data={data}
          />
        </FormGroup>
      </Col>
    );
  }
}

export default creditPortfolio;
