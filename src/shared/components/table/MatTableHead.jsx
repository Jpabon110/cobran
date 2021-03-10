/* eslint-disable react/prop-types */
/* eslint-disable no-shadow */
import React from 'react';
import TableHead from '@material-ui/core/TableHead';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';

const MatTableHead = (props) => {
  const { rows = [] } = props;
  return (
    <TableHead>
      <TableRow>
        {rows.map(row => (
          <TableCell
            key={row.id}
            className="material-table__cell material-table__cell--sort"
            align="left"
            padding={row.disablePadding ? 'none' : 'default'}
          >
            <TableSortLabel
              className="material-table__sort-label"
            >
              {row.label}
            </TableSortLabel>
          </TableCell>
        ), this)}
      </TableRow>
    </TableHead>
  );
};

export default MatTableHead;
