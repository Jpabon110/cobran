/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-script-url */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable no-unused-expressions */
/* eslint-disable react/prop-types */
import React, { PureComponent } from 'react';
import {
  Card,
  CardBody,
  Col,
  Badge,
} from 'reactstrap';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import map from 'lodash/map';
import isArray from 'lodash/isArray';
import Skeleton from 'react-loading-skeleton';
import MatTableHead from './MatTableHead';
import AlertModal from '../Modals/AlertModal';
import { setRUTFormat } from '../../../helpers/functions';

export default class MatTable extends PureComponent {
  state = {
    order: 'asc',
    orderBy: 'calories',
    selected: new Map([]),
    page: 0,
    rowsPerPage: 5,
    isOpenModal: false,
    itemId: null,
  };

  handleRequestSort = (event, property) => {
    const orderBy = property;
    let order = 'desc';
    const { orderBy: stateOrderBy, order: stateOrder } = this.state;

    if (stateOrderBy === property && stateOrder === 'desc') { order = 'asc'; }

    this.setState({ order, orderBy });
  };

  handleSelectAllClick = (event, checked) => {
    if (checked) {
      const { data } = this.state;
      const newSelected = new Map();
      data.map(n => newSelected.set(n.id, true));
      this.setState({ selected: newSelected });
      return;
    }
    this.setState({ selected: new Map([]) });
  };

  handleChangePage = (event, page) => {
    this.setState({ page });
  };

  handleChangeRowsPerPage = (event) => {
    this.setState({ rowsPerPage: event.target.value });
  };

  isSelected = (id) => {
    const { selected } = this.state;
    return !!selected.get(id);
  };

  openModal = (id) => {
    this.setState({ isOpenModal: true, itemId: id });
  }

  toggle = () => {
    this.setState({ isOpenModal: false });
  }


  render() {
    const {
      order,
      orderBy,
      selected,
      rowsPerPage,
      page,
      isOpenModal,
      itemId,
    } = this.state;

    const {
      data,
      columns,
      onEdit,
      onDelete,
      loading,
      modalTitle,
      modalMessage,
    } = this.props;

    return (
      <Col md={12} lg={12}>
        <AlertModal
          color="danger"
          title={modalTitle}
          message={modalMessage}
          isOpen={isOpenModal}
          toggle={this.toggle}
          id={itemId}
          execute={onDelete}
        />
        <Card>
          <CardBody>
            <div className="material-table__wrap">
              <Table className="material-table border_bot table table-hover">
                <MatTableHead
                  numSelected={[...selected].filter(el => el[1]).length}
                  order={order}
                  orderBy={orderBy}
                  onRequestSort={this.handleRequestSort}
                  rowCount={data.length}
                  rows={columns}
                />
                { !loading
                  ? (
                    <TableBody>
                      {
                      map(data, element => (
                        <TableRow
                          className="material-table__row"
                          tabIndex={-1}
                          key={element._id}
                        >
                          {
                            map(columns, (column) => {
                              if (isArray(element[column.id])) {
                                return (
                                  <TableCell className="material-table__cell" align="left">
                                    {
                                      element[column.id].map(role => (
                                        <span key={role}><Badge color="secondary">{role}</Badge> </span>
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
                    </TableBody>
                  )
                  : (
                    <TableBody>
                      {
                        map(columns, () => (
                          <TableCell
                            className="material-table__cell"
                            align="left"
                          >
                            <Skeleton height={25} count={10} />
                          </TableCell>
                        ))
                      }
                    </TableBody>
                  )
                }
              </Table>
            </div>
            <TablePagination
              component="div"
              className="material-table__pagination"
              count={data.length}
              rowsPerPage={rowsPerPage}
              page={page}
              backIconButtonProps={{ 'aria-label': 'Previous Page' }}
              nextIconButtonProps={{ 'aria-label': 'Next Page' }}
              onChangePage={this.handleChangePage}
              onChangeRowsPerPage={this.handleChangeRowsPerPage}
              rowsPerPageOptions={[5, 10, 15]}
            />
          </CardBody>
        </Card>
      </Col>
    );
  }
}
