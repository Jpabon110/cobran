/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable no-underscore-dangle */
/* eslint-disable max-len */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
import React, { PureComponent, Fragment } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TablePagination from '@material-ui/core/TablePagination';
import map from 'lodash/map';
import {
  Badge,
} from 'reactstrap';
import TableRow from '@material-ui/core/TableRow';
import Skeleton from 'react-loading-skeleton';
import isArray from 'lodash/isArray';
import AlertModal from '../Modals/AlertModal';
import { setRUTFormat } from '../../../helpers/functions';
import Head from './Head';

export default class MatTable extends PureComponent {
  state = {
    order: 'asc',
    orderBy: 'calories',
    // selected: new Map([]),
    // rowsPerPage: 5,
    isOpenModal: false,
    itemId: null,
  };

  onRequestSort = (_, property) => {
    const orderBy = property;
    let order = 'desc';
    const { orderBy: stateOrderBy, order: stateOrder } = this.state;
    if (stateOrderBy === property && stateOrder === 'desc') { order = 'asc'; }
    this.setState({ order, orderBy });
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

  openModal = (id) => {
    this.setState({ isOpenModal: true, itemId: id });
  }

  toggle = () => {
    this.setState({ isOpenModal: false });
  }

  translate = (value) => {
    if (value === 'high') {
      return 'Alto';
    }
    if (value === 'low') {
      return 'Bajo';
    }
    return 'Bajo';
  }

  render() {
    // const { order, orderBy } = this.state;
    const {
      order,
      orderBy,
      itemId,
    } = this.state;
    const {
      data,
      total,
      headers,
      // selected,
      rowsPerPage,
      cargando,
      page,
      onEdit,
      onDelete,
      modalTitle,
      modalMessage,
    } = this.props;

    // const emptyRows = rowsPerPage - Math.min(rowsPerPage, total - (page * rowsPerPage));
    return (
      <Fragment>
        <AlertModal
          color="danger"
          title={modalTitle}
          message={modalMessage}
          isOpen={this.state.isOpenModal}
          toggle={this.toggle}
          id={itemId}
          execute={onDelete}
        />
        {
          cargando && (
            <Skeleton count={rowsPerPage + 1} height={40} />
          )
        }
        {
          !cargando && (
            <Fragment>
              <div className="material-table__wrap">
                <Table className="MuiTable-root material-table border_bot table-hover">
                  <Head
                    numSelected="4"
                    order={order}
                    orderBy={orderBy}
                    onSelectAllClick={this.handleSelectAllClick}
                    // onRequestSort={this.onRequestSort}
                    rowCount={rowsPerPage}
                    headers={headers}
                  />
                  <TableBody>
                    {
                      map(data, element => (
                        <TableRow
                          className="material-table__row"
                          tabIndex={-1}
                          key={element._id}
                        >
                          {
                            map(headers, (column) => {
                              if (isArray(element[column.id])) {
                                return (
                                  <TableCell className="material-table__cell" align="left">
                                    {
                                      element[column.id].map(itemArray => (
                                        <span key={itemArray}><Badge color="secondary">{itemArray}</Badge> </span>
                                      ))
                                    }
                                  </TableCell>
                                );
                              } if (column.id === 'actions') {
                                return (
                                  <TableCell
                                    className="material-table__cell"
                                    align="left"
                                  >
                                    <span
                                      className="lnr lnr-lnr lnr-pencil mr-3"
                                      style={{
                                        fontSize: '20px', fontWeight: 'bold', cursor: 'pointer', color: '#000',
                                      }}
                                      onClick={() => onEdit(element._id)}
                                    />
                                    <span
                                      onClick={() => this.openModal(element._id)}
                                      className="lnr lnr-lnr lnr-trash"
                                      style={{
                                        fontSize: '20px', fontWeight: 'bold', cursor: 'pointer', color: '#000',
                                      }}
                                    />
                                  </TableCell>
                                );
                              } if (column.id === 'rut') {
                                return (
                                  <TableCell
                                    className="material-table__cell"
                                    align="left"
                                  >
                                    {setRUTFormat(element[column.id])}
                                  </TableCell>
                                );
                              } if (column.id === 'typeRanking') {
                                return (
                                  <TableCell
                                    className="material-table__cell"
                                    align="left"
                                  >
                                    {this.translate(element[column.id])}
                                  </TableCell>
                                );
                              }
                              return (
                                <TableCell
                                  className="material-table__cell"
                                  align="left"
                                >
                                  {element[column.id]}
                                </TableCell>
                              );
                            })
                          }
                        </TableRow>
                      ))
                    }
                    {/* {
                      emptyRows > 0
                      && (
                        <TableRow style={{ height: 49 * emptyRows, backgroundColor: '#fff' }}>
                          <TableCell colSpan={6} />
                        </TableRow>
                      )
                    } */}
                  </TableBody>
                </Table>
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
                  rowsPerPageOptions={[5, 10, 15]}
                />
              </div>
            </Fragment>
          )
        }
      </Fragment>
    );
  }
}
