/* eslint-disable max-len */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
import React, { PureComponent, Fragment } from 'react';
import {
  Card,
  CardBody,
  Col,
  // Spinner,
} from 'reactstrap';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
// import moment from 'moment';
import NumberFormat from 'react-currency-format';
// import Checkbox from '@material-ui/core/Checkbox';
import Skeleton from 'react-loading-skeleton';
import Head from './Head';

const headersFees = [
  {
    id: 'dateCommitment', disablePadding: false, label: 'N° de cuotas',
  },
  {
    id: 'typeFotypeGestionllow', disablePadding: true, label: 'Fecha vencimiento',
  },
  {
    id: 'commitment', disablePadding: false, label: 'Cuota',
  },
  {
    id: 'comments', disablePadding: false, label: 'Monto pagado',
  },
  {
    id: 'comments', disablePadding: false, label: 'Monto abono',
  },
  {
    id: 'comments', disablePadding: false, label: 'Estado',
  },
  {
    id: 'comments', disablePadding: false, label: 'Forma de pago',
  },
];

export default class MatTable extends PureComponent {
  state = {
    order: 'asc',
    orderBy: '',
  };

  // onRequestSort = (_, property) => {
  //   const orderBy = property;
  //   let order = 'desc';
  //   const { orderBy: stateOrderBy, order: stateOrder } = this.state;
  //   if (stateOrderBy === property && stateOrder === 'desc') { order = 'asc'; }
  //   this.setState({ order, orderBy });
  // };

  onRequestSort = (_, property) => {
    const orderBy = property;
    // console.log('property', property);
    let order = 'desc';
    const { orderBy: stateOrderBy, order: stateOrder } = this.state;
    if (orderBy === 'createdAt' || orderBy === 'id' || orderBy === 'commitmentDate') {
      if (stateOrderBy === property && stateOrder === 'desc') { order = 'asc'; }
      this.setState({ order, orderBy });
    }
  };

  handleSelectAllClick = (_, checked) => {
    this.props.onSelectAllClick(checked);
  };

  handleChangePage = (_, page) => {
    this.props.onChangePage(page);
  };

  handleChangeRowsPerPage = (event) => {
    this.props.onChangeRowsPerPage(event.target.value);
  };

  isSelected = (id) => {
    const { selected } = this.props;
    return selected.indexOf(id) !== -1;
  };

  compare = (a, b) => {
    const numberFeesA = a.numberFees;
    const numberFeesB = b.numberFees;

    let comparison = 0;
    if (numberFeesA > numberFeesB) {
      comparison = 1;
    } else if (numberFeesA < numberFeesB) {
      comparison = -1;
    }
    return comparison;
  }

  comparerAsc = (a, b, orderBy) => {
    if (orderBy === 'createdAt') {
      if (b.gestionDate < a.gestionDate) {
        return 1;
      }
      if (b.gestionDate > a.gestionDate) {
        return -1;
      }
    } else if (orderBy === 'commitmentDate') {
      if (b.commitmentDate < a.commitmentDate) {
        return 1;
      }
      if (b.commitmentDate > a.commitmentDate) {
        return -1;
      }
    } else {
      if (a.id > b.id) {
        return 1;
      }
      if (a.id < b.id) {
        return -1;
      }
    }
    // a must be equal to b
    return 0;
  }

  comparerDesc = (a, b, orderBy) => {
    if (orderBy === 'createdAt') {
      if (b.gestionDate > a.gestionDate) {
        return 1;
      }
      if (b.gestionDate < a.gestionDate) {
        return -1;
      }
    } else if (orderBy === 'commitmentDate') {
      if (b.commitmentDate > a.commitmentDate) {
        return 1;
      }
      if (b.commitmentDate < a.commitmentDate) {
        return -1;
      }
    } else {
      if (b.id > a.id) {
        return 1;
      }
      if (b.id < a.id) {
        return -1;
      }
    }
    // a must be equal to b
    return 0;
  }

  render() {
    const { order, orderBy } = this.state;
    const {
      data,
      total,
      headers,
      selected,
      page,
      rowsPerPage,
      cargando,
      onClick,
      fees,
    } = this.props;

    const emptyRows = rowsPerPage - Math.min(rowsPerPage, total - (page * rowsPerPage));

    return (
      <Col md={12} lg={12}>
        <Card>
          <CardBody style={{ padding: '0px' }}>
            {
              cargando && (
                <Skeleton count={rowsPerPage + 1} height={40} />
              )
            }
            {
              !cargando && (
                <Fragment>
                  <div className="material-table__wrap">
                    <Table className="material-table border_bot table-hover">
                      <Head
                        numSelected={selected.length}
                        order={order}
                        orderBy={orderBy}
                        onSelectAllClick={this.handleSelectAllClick}
                        onRequestSort={this.onRequestSort}
                        rowCount={rowsPerPage}
                        headers={headers}
                      />
                      <TableBody>
                        {
                          (data) ? (
                            data
                              .sort((order === 'desc') ? (a, b) => this.comparerDesc(a, b, orderBy) : (a, b) => this.comparerAsc(a, b, orderBy))
                              .map((d, index) => {
                                console.log();
                                return (
                                  <TableRow
                                    className={`material-table__row ${(index === selected) && 'shade_one'}`}
                                    onClick={onClick ? onClick(d.id, index) : undefined}
                                    key={d.id}
                                  >
                                    {/* <TableCell className="material-table__cell" padding="checkbox">
                                    <Checkbox
                                      className="material-table__checkbox"
                                      hidden="true"
                                      style={{ color: isSelected ? '#C7AC43' : 'rgba(0, 0, 0, 0.54)' }}
                                      onClick={this.props.onClickRow ? this.props.onClickRow(d.id) : undefined}
                                      checked={isSelected}
                                    />
                                  </TableCell> */}
                                    {d.cells}
                                  </TableRow>
                                );
                              })
                          )

                            : 'no info'

                        }
                        {
                          (!data) && (
                            emptyRows > 0
                            && (
                              <TableRow style={{ height: 49 * emptyRows, backgroundColor: '#fff' }}>
                                <TableCell colSpan={6} />
                              </TableRow>
                            )
                          )
                        }
                      </TableBody>
                    </Table>
                    {
                      (total > 0) && (
                        <TablePagination
                          component="div"
                          className="material-table__pagination profile_centralize"
                          count={parseInt(total, 10)}
                          rowsPerPage={rowsPerPage}
                          page={page}
                          backIconButtonProps={{ 'aria-label': 'Previous Page' }}
                          nextIconButtonProps={{ 'aria-label': 'Next Page' }}
                          onChangePage={this.handleChangePage}
                          onChangeRowsPerPage={this.handleChangeRowsPerPage}
                          labelDisplayedRows={({ from, to, count }) => `${from}-${to} de ${count}`}
                          labelRowsPerPage="Filas por página"
                          rowsPerPageOptions={[5, 10, 15, 20, 25]}
                        />
                      )
                    }
                  </div>
                  {
                          ((fees) && (fees.length > 0)) && (
                            <div className="material-table__wrap" style={{ padding: '0px 7%', marginTop: '3%' }}>
                              <Table className="material-table border_bot table-hover">
                                <Head
                                  numSelected={selected.length}
                                  order={order}
                                  orderBy={orderBy}
                                  onSelectAllClick={this.handleSelectAllClick}
                                  onRequestSort={this.onRequestSort}
                                  rowCount={rowsPerPage}
                                  headers={headersFees}
                                />
                                <TableBody>
                                  {
                              (fees) ? (
                                fees
                                  .reverse()
                                  .map((fee) => {
                                    console.log('');
                                    return (
                                      <TableRow
                                        className="material-table__row"
                                        // onClick={onClick ? onClick(fee.id) : undefined}
                                        key={fee.id}
                                      >
                                        {/* <TableCell className="material-table__cell" padding="checkbox">
                                          <Checkbox
                                            className="material-table__checkbox"
                                            hidden="true"
                                            style={{ color: isSelected ? '#C7AC43' : 'rgba(0, 0, 0, 0.54)' }}
                                            onClick={this.props.onClickRow ? this.props.onClickRow(d.id) : undefined}
                                            checked={isSelected}
                                          />
                                        </TableCell> */}
                                        {/* {fee.cells} */}
                                        <TableCell className="material-table__cell" style={{ borderBottom: '0px' }} align="left">{fee.numberFees}</TableCell>
                                        {/* <TableCell className="material-table__cell" style={{ borderBottom: '0px' }} align="left">{moment(fee.date).format('DD/MM/YYYY HH:mm')}</TableCell> */}
                                        <TableCell className="material-table__cell" style={{ borderBottom: '0px' }} align="left">{fee.expirationDate}</TableCell>
                                        <TableCell className="material-table__cell" style={{ borderBottom: '0px' }} align="left">
                                          <NumberFormat
                                            displayType="text"
                                            style={{ fontSize: '14px' }}
                                            decimalSeparator=","
                                            thousandSeparator="."
                                            value={fee.fee}
                                          />
                                        </TableCell>
                                        <TableCell className="material-table__cell" style={{ borderBottom: '0px' }} align="left">
                                          <NumberFormat
                                            displayType="text"
                                            style={{ fontSize: '14px' }}
                                            decimalSeparator=","
                                            thousandSeparator="."
                                            value={fee.pay}
                                          />
                                        </TableCell>
                                        <TableCell className="material-table__cell" style={{ borderBottom: '0px' }} align="left">
                                          <NumberFormat
                                            displayType="text"
                                            style={{ fontSize: '14px' }}
                                            decimalSeparator=","
                                            thousandSeparator="."
                                            value={fee.pay}
                                          />
                                        </TableCell>
                                        <TableCell className="material-table__cell" style={{ borderBottom: '0px' }} align="left">{fee.state}</TableCell>
                                        <TableCell className="material-table__cell" style={{ borderBottom: '0px' }} align="left">-</TableCell>
                                      </TableRow>
                                    );
                                  })
                              )

                                : 'no info'

                            }
                                  {
                                    (!data) && (
                                      emptyRows > 0
                                      && (
                                        <TableRow style={{ height: 49 * emptyRows, backgroundColor: '#fff' }}>
                                          <TableCell colSpan={6} />
                                        </TableRow>
                                      )
                                    )
                                  }
                                </TableBody>
                              </Table>
                              {/* <TablePagination
                                component="div"
                                className="material-table__pagination profile_centralize"
                                count={parseInt(total, 10)}
                                rowsPerPage={rowsPerPage}
                                page={page}
                                backIconButtonProps={{ 'aria-label': 'Previous Page' }}
                                nextIconButtonProps={{ 'aria-label': 'Next Page' }}
                                onChangePage={this.handleChangePage}
                                onChangeRowsPerPage={this.handleChangeRowsPerPage}
                                labelDisplayedRows={({ from, to, count }) => `${from}-${to} de ${count}`}
                                labelRowsPerPage="Filas por página"
                                rowsPerPageOptions={[5, 10, 15]}
                              /> */}
                            </div>
                          )
                        }
                </Fragment>
              )
            }
          </CardBody>
        </Card>
      </Col>
    );
  }
}
