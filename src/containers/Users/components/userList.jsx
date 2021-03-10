/* eslint-disable react/destructuring-assignment */
/* eslint-disable max-len */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-shadow */
/* eslint-disable react/prop-types */
import React, {
  PureComponent,
  // Fragment
} from 'react';
import { Card, CardBody, Col } from 'reactstrap';
import { connect } from 'react-redux';
import QueryString from 'query-string';
// import TableCell from '@material-ui/core/TableCell';
import Table from '../../../shared/components/MaterialTableUserList';
import { getUser, deleteUser } from '../../../redux/actions/usersActions';
import { changeTitleAction } from '../../../redux/actions/topbarActions';

const columns = [
  {
    id: 'firstName', disablePadding: true, label: 'Nombre',
  },
  {
    id: 'lastName', disablePadding: true, label: 'Apellido',
  },
  {
    id: 'rut', disablePadding: false, label: 'RUT',
  },
  {
    id: 'email', disablePadding: false, label: 'Correo',
  },
  {
    id: 'runSegment', disablePadding: false, label: 'Tramo',
  },
  // {
  //   id: 'typeRanking', disablePadding: false, label: 'Monto',
  // },
  {
    id: 'anexo', disablePadding: false, label: 'Anexo',
  },
  {
    id: 'roles', disablePadding: false, label: 'Roles',
  },
  {
    id: 'actions', disablePadding: false, label: 'Aciones',
  },
];

class UserList extends PureComponent {
  state ={
    // selected: [],
    page: 0,
    rowsPerPage: 10,
  }

  componentDidMount() {
    // const { getUser } = this.props;
    let { page = 1, limit = 10 } = QueryString.parse(this.props.location.search);
    const query = {};
    if (page && !Number.isNaN(page)) {
      page = parseInt(page, 10);
      Object.assign(query, { page: page + 1 });
    }
    if (limit && !Number.isNaN(limit)) {
      limit = parseInt(limit, 10);
      Object.assign(query, { limit });
    }

    this.setState({ page: page - 1, rowsPerPage: limit });

    this.props.getUser({ page, limit });
    this.props.setTitle('');
  }

  onClick = () => {
    const { history } = this.props;
    history.push('/pages/user/new');
  }

  onEdit = (id) => {
    const { history } = this.props;
    history.push(`/pages/user/${id}`);
  }

  onDelete = async (id) => {
    const { deleteUser, getUser } = this.props;
    await deleteUser(id);
    await getUser();
  }

  onChangeRowsPerPage = (rowsPerPage) => {
    this.setState({ rowsPerPage });
    const query = QueryString.parse(this.props.location.search);
    this.props.history.push(`/pages/users?${QueryString.stringify({ ...query, limit: rowsPerPage })}`);
    this.props.getUser({ ...query, limit: rowsPerPage });
  }

  onChangePage = (page) => {
    this.setState({ page });
    const query = QueryString.parse(this.props.location.search);
    this.props.history.push(`/pages/users?${QueryString.stringify({ ...query, page: page + 1 })}`);
    this.props.getUser({ ...query, page: page + 1 });
  }

  render() {
    const { allUser = [], loading } = this.props;
    const {
      // activeTab,
      rowsPerPage, page,
      // order, orderBy,
      // selected,
    } = this.state;
    return (
      <Col md={12} lg={12} xl={12}>
        <Card>
          <CardBody>
            <div className="col-md-12 col-lg-12 fiveBot pt-0 pb-0">
              <div>
                <h2><strong>Usuarios</strong></h2>
                <p className="autofin_p">Este página le permitirá definir cómo compartir los datos
                  de CRM entre usuarios en función de la jerarquía de roles de su organización.
                </p>
              </div>
              <div>
                <button
                  className="btn button_change black_resize_button"
                  type="button"
                  style={{ padding: '5px', width: '120px' }}
                  onClick={this.onClick}
                >
                    Crear usuario
                </button>
              </div>
            </div>
            <br />
            <Table
              data={allUser}
              // columns={columns}
              onEdit={this.onEdit}
              onDelete={this.onDelete}
              modalTitle="Atención"
              modalMessage="¿Está seguro que desea eliminar este usuario?"
              onSelectAllClick={this.onSelectAllClick}
              onChangePage={this.onChangePage}
              cargando={loading}
              onChangeRowsPerPage={this.onChangeRowsPerPage}
              onClickRow={this.onClickRow}
              onClick={this.onClickQuotationView}
              // selected={selected}
              headers={columns}
              page={page}
              rowsPerPage={rowsPerPage}
              total={this.props.total}
            />
          </CardBody>
        </Card>
      </Col>
    );
  }
}

const mapStateToProps = state => ({
  loading: state.user.loading,
  error: state.user.error,
  allUser: state.user.allUser,
  limit: state.user.limit,
  total: state.user.total,
});

const mapDispatchToProps = {
  getUser,
  deleteUser,
  setTitle: changeTitleAction,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(UserList);
