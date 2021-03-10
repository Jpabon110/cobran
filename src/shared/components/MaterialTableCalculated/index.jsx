/* eslint-disable max-len */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
import React, { PureComponent, Fragment } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
// import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Skeleton from 'react-loading-skeleton';
import Head from './Head';

export default class MatTable extends PureComponent {
  state = {
    order: 'asc',
    orderBy: 'calories',
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

  render() {
    const { order, orderBy } = this.state;
    const {
      data,
      total,
      headers,
      // selected,
      page,
      rowsPerPage,
      cargando,
      // onClick,
    } = this.props;

    const emptyRows = rowsPerPage - Math.min(rowsPerPage, total - (page * rowsPerPage));
    return (
      <Fragment>
        {
          cargando && (
            <Skeleton count={rowsPerPage + 1} height={40} />
          )
        }
        {
          !cargando && (
            <Fragment>
              <div className="material-table__wrap">
                <Table className="material-table material-table2 MuiTable-root2 border_bot2 table-hover">
                  <Head
                    numSelected="4"
                    order={order}
                    orderBy={orderBy}
                    onSelectAllClick={this.handleSelectAllClick}
                    onRequestSort={this.onRequestSort}
                    rowCount={rowsPerPage}
                    headers={headers}
                  />
                  <TableBody>
                    {
                      (data) // const isSelected = this.isSelected(d.id);
                      && data.map(d => (
                        <TableRow
                          className="material-table__row"
                          role="checkbox"
                          key={d.id}
                        >
                          {d.cells}
                        </TableRow>
                      ))
                    }
                    {
                      emptyRows > 0
                      && (
                        <TableRow style={{ height: 49 * emptyRows, backgroundColor: '#fff' }}>
                          <TableCell colSpan={6} />
                        </TableRow>
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
            </Fragment>
          )
        }
      </Fragment>
    );
  }
}
