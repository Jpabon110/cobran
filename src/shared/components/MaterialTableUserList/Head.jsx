/* eslint-disable react/prop-types */
import React, { PureComponent } from 'react';
// import PropTypes from 'prop-types';
import TableHead from '@material-ui/core/TableHead';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';

export default class MatTableHead extends PureComponent {
  createSortHandler = property => (event) => {
    const { onRequestSort } = this.props;
    onRequestSort(event, property);
  };

  render() {
    const {
      // onSelectAllClick,
      order, orderBy,
      // numSelected, rowCount,
      headers,
    } = this.props;

    return (
      <TableHead>
        <TableRow>
          {headers.map(row => (
            <TableCell
              className="material-table__cell material-table__cell--sort"
              key={row.id}
              // style={{ textAlign: 'right' }}
              align="left"
              padding={row.disablePadding ? 'none' : 'default'}
              sortDirection={orderBy === row.id ? order : false}
            >
              <TableSortLabel
                active={orderBy === row.id}
                direction={order}
                onClick={this.createSortHandler(row.id)}
                className="material-table__sort-label"
                style={{ fontWeight: 'bold', color: '#000' }}
              >
                {row.label}
              </TableSortLabel>
            </TableCell>
          ), this)}
        </TableRow>
      </TableHead>
    );
  }
}
