/* eslint-disable react/destructuring-assignment */
/* eslint-disable no-underscore-dangle */
/* eslint-disable react/prop-types */
/* eslint-disable no-useless-constructor */
/* eslint-disable react/prefer-stateless-function */
/* eslint-disable max-len */
import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import {
  FormGroup,
  Row,
  Col,
} from 'reactstrap';
import TableCell from '@material-ui/core/TableCell';
import NumberFormat from 'react-currency-format';
import {
  setAsignation,
} from '../../../redux/actions/asignationActions';
import MaterialTablePreAsignation from '../../../shared/components/MaterialTablePreAsignation';

const headers = [
  {
    id: 'ejecutivo', disablePadding: false, label: 'Ejecutivo',
  },
  {
    id: 'montos', disablePadding: true, label: 'Montos',
  },
  {
    id: 'n_cases', disablePadding: true, label: 'Nº de casos',
  },
  {
    id: 'insolutCredit', disablePadding: false, label: 'Saldo Insoluto',
  },
];

class resultsTable extends Component {
  translate = (value) => {
    if (value === 'high') {
      return 'Alto';
    }
    if (value === 'low') {
      return 'Bajo';
    }
    return 'Bajo';
  }


  onSubmitsetAsignation = (e) => {
    if (e) {
      e.preventDefault();
    }
    const { executives } = this.props;
    this.props.setAsignation({ action: 'assigned', data: executives });
  }

  render() {
    const {
      title,
      executives,
      // creditsAsign,
      // noAsign,
      loading,
      buttonAsig,
      rowsPerPage,
    } = this.props;

    const data = (executives) ? executives
      .map(d => ({
        id: d._id,
        cells: (
          <Fragment>
            <TableCell className="material-table__cell" style={{ borderBottom: '0px' }} align="left">{`${d.name}`}</TableCell>
            <TableCell className="material-table__cell" style={{ borderBottom: '0px' }} align="left">{d.typeRanking ? d.typeRanking : ''}</TableCell>
            <TableCell className="material-table__cell" style={{ borderBottom: '0px' }} align="left">
              <NumberFormat
                className="h_for_cyphir"
                displayType="text"
                decimalSeparator=","
                style={{ fontSize: '14px' }}
                thousandSeparator="."
                value={parseFloat(d.totalCases) || 0}
              />
            </TableCell>
            <TableCell className="material-table__cell" style={{ borderBottom: '0px' }} align="left">
              <NumberFormat
                className="h_for_cyphir"
                displayType="text"
                decimalSeparator=","
                style={{ fontSize: '14px' }}
                thousandSeparator="."
                value={parseFloat(d.totalDebt) || 0}
              />
            </TableCell>
          </Fragment>
        ),
      }))
      : {};

    return (
      <Col md={12}>
        <FormGroup style={{ margin: 0 }}>
          <h3 className="title_modal_contact mb-2"><span style={{ color: '#9E9E9E' }}> {title} </span></h3>
          <MaterialTablePreAsignation
            headers={headers}
            data={data}
            cargando={loading}
            rowsPerPage={rowsPerPage}
          />
          {
            (buttonAsig) && (
            <Row style={{ justifyContent: 'flex-end' }}>
              <button
                type="button"
                style={{ width: '6rem', height: '34px', marginTop: '2%' }}
                className="asignar2 new_contact_button"
                onClick={this.onSubmitsetAsignation}
              >
                Asignar
              </button>
            </Row>
            )
          }
        </FormGroup>
      </Col>
    );
  }
}


// const mapStateToProps = gestion => ({
//   caseInfo: gestion.caseInfo,
//   loadingInfoCase: gestion.loadingInfoCase,
// });


const mapDispatchToProps = {
  setAsignation,
};
export default connect(null, mapDispatchToProps, null, { forwardRef: true })(resultsTable);
