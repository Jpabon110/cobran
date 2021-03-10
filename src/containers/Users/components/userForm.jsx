/* eslint-disable max-len */
/* eslint-disable array-callback-return */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/sort-comp */
/* eslint-disable react/no-did-update-set-state */
/* eslint-disable react/prop-types */
/* eslint-disable no-shadow */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Card, CardBody, Col, Container, Row, ButtonToolbar, Button, Form,
} from 'reactstrap';
import { reduxForm, Field } from 'redux-form';
import map from 'lodash/map';
import {
  getUser,
  getUserById,
  createUser,
  updateUser,
  resetValues,
} from '../../../redux/actions/usersActions';
import renderSelectField from '../../../shared/components/form/Select';
import { setRUTFormat } from '../../../helpers/functions';
import renderSelectFieldMulti from '../../../shared/components/form/SelectMulti';


class RegisterUser extends Component {
  state = {
    onReady: false,
    optionTreat: [
      { value: '1 A 30 - Alto', label: '1 A 30 - Alto' },
      { value: '1 A 30 - Bajo', label: '1 A 30 - Bajo' },
      { value: '1 A 30 - Medio', label: '1 A 30 - Medio' },
      { value: '31 A 60 - Alto', label: '31 A 60 - Alto' },
      { value: '31 A 60 - Bajo', label: '31 A 60 - Bajo' },
      { value: '31 A 60 - Medio', label: '31 A 60 - Medio' },
      { value: '61 A 90 - Alto', label: '61 A 90 - Alto' },
      { value: '61 A 90 - Bajo', label: '61 A 90 - Bajo' },
      { value: '61 A 90 - Medio', label: '61 A 90 - Medio' },
      { value: '91+ - Alto', label: '91+ - Alto' },
      { value: '91+ - Bajo', label: '91+ - Bajo' },
      { value: '91+ - Medio', label: '91+ - Medio' },
    ],
  };

  componentDidMount() {
    const {
      match,
      getUserById,
    } = this.props;
    const { id } = match.params;
    if (id !== 'new') {
      getUserById(id);
    }
  }

  componentDidUpdate() {
    const { user, initialize } = this.props;
    const { onReady } = this.state;
    const runSegmentAux = [];

    if (user && !onReady) {
      user.runSegment.map(rankings => runSegmentAux.push(this.translateField(rankings)));
      initialize({
        firstName: user.firstName,
        lastName: user.lastName,
        rut: setRUTFormat(user.rut),
        email: user.email,
        anexo: user.anexo,
        role: this.convertItemToObject(user.roles[0]),
        // typeRanking: this.translateField(user.typeRanking),
        runSegment: this.changeArraytoObjArray(runSegmentAux),
        jobPosition: this.convertItemToObject(user.jobPosition),
      });
      this.setState({ onReady: true });
    }
  }

  changeArraytoObjArray = (values) => {
    const finalArray = [];
    map(values, (val) => {
      finalArray.push({ value: val, label: val });
    });

    return finalArray;
  }

  translateField = (value) => {
    switch (value) {
      case 'high':
        return { value: 'high', label: 'Alto' };
      case 'low':
        return { value: 'low', label: 'Bajo' };
      case 'both':
        return { value: 'both', label: 'Ambos' };
      case '1 - 30':
        return { value: '1 - 30', label: '1 - 30' };
      case '31 - 60':
        return { value: '31 - 60', label: '31 - 60' };
      case '61 - 90':
        return { value: '61 - 90', label: '61 - 90' };
      case '91+':
        return { value: '91+', label: '91+' };
      default:
        return value;
    }
  }

  componentWillUnmount() {
    const { resetValues } = this.props;
    this.setState({ onReady: false });
    resetValues();
  }

  showPassword = (e) => {
    e.preventDefault();
    this.setState(prevState => ({ showPassword: !prevState.showPassword }));
  };

  onSubmit = async () => {
    const {
      form,
      match,
      history,
    } = this.props;
    const { id } = match.params;
    const { values } = form;
    const roles = [];
    roles.push(values.role.value);
    const data = {
      firstName: values.firstName,
      lastName: values.lastName,
      email: values.email,
      rut: values.rut,
      anexo: values.anexo,
      // jobPosition: values.jobPosition.value,
      // typeRanking: values.typeRanking.value,
      runSegment: [],
      roles,
    };

    values.runSegment.map(rankings => data.runSegment.push(rankings.value));

    if (id !== 'new') {
      this.props.updateUser(id, data, () => {
        this.props.getUser({}, () => {
          history.push('/pages/users/');
        });
      });
    } else {
      this.props.createUser(data, () => {
        this.props.getUser({}, () => {
          history.push('/pages/users/');
        });
      });
    }
  }

  cancelClick = () => {
    const { history } = this.props;
    history.push('/pages/users/');
  }

  convertOptionToValue = (object) => {
    if (!object.value) {
      return object;
    }
    return object.value;
  }

  translate = (item) => {
    switch (item) {
      case 'admin':
        return 'Administrador';
      case 'manager':
        return 'Gerente';
      case 'executive':
        return 'Ejecutivo';
      case 'subManager':
        return 'Sub-Gerente';
      default:
        return item;
    }
  }


  convertItemToObject = (item) => {
    const object = {};
    if (item) {
      object.label = this.translate(item);
      object.value = item;
    }
    return object;
  }

  changeStateCondicionality = (multi) => {
    const { optionTreat } = this.state;
    map(multi, (item) => {
      if (item.value === `${item.value.replace('- Bajo', '').replace('- Alto', '').replace('- Medio', '').trim()} - Alto`) {
        map(optionTreat, (options) => {
          if ((options) && (options.value === `${item.value.replace('- Bajo', '').replace('- Alto', '').replace('- Medio', '').replace('- Medio', '')
            .trim()} - Bajo`)) {
            const index = optionTreat.indexOf(options);
            if (index > -1) {
              optionTreat.splice(index, 1);
            }
          }
        });
        map(optionTreat, (options) => {
          if ((options) && (options.value === `${item.value.replace('- Bajo', '').replace('- Alto', '').replace('- Medio', '').trim()} - Medio`)) {
            const index = optionTreat.indexOf(options);
            if (index > -1) {
              optionTreat.splice(index, 1);
            }
          }
        });
      }

      if (item.value === `${item.value.replace('- Bajo', '').replace('- Alto', '').replace('- Medio', '').trim()} - Bajo`) {
        map(optionTreat, (options) => {
          if ((options) && (options.value === `${item.value.replace('- Bajo', '').replace('- Alto', '').replace('- Medio', '').trim()} - Alto`)) {
            const index2 = optionTreat.indexOf(options);
            if (index2 > -1) {
              optionTreat.splice(index2, 1);
            }
          }
        });
        map(optionTreat, (options) => {
          if ((options) && (options.value === `${item.value.replace('- Bajo', '').replace('- Alto', '').replace('- Medio', '').trim()} - Medio`)) {
            const index2 = optionTreat.indexOf(options);
            if (index2 > -1) {
              optionTreat.splice(index2, 1);
            }
          }
        });
      }

      if (item.value === `${item.value.replace('- Bajo', '').replace('- Alto', '').replace('- Medio', '').trim()} - Medio`) {
        map(optionTreat, (options) => {
          if ((options) && (options.value === `${item.value.replace('- Bajo', '').replace('- Alto', '').replace('- Medio', '').trim()} - Bajo`)) {
            const index2 = optionTreat.indexOf(options);
            if (index2 > -1) {
              optionTreat.splice(index2, 1);
            }
          }
        });
        map(optionTreat, (options) => {
          if ((options) && (options.value === `${item.value.replace('- Bajo', '').replace('- Alto', '').replace('- Medio', '').trim()} - Alto`)) {
            const index2 = optionTreat.indexOf(options);
            if (index2 > -1) {
              optionTreat.splice(index2, 1);
            }
          }
        });
      }
    });
    this.setState({ optionTreat });
  }

  onChangeInputMulti = () => (e) => {
    const restart = [
      { value: '1 A 30 - Alto', label: '1 A 30 - Alto' },
      { value: '1 A 30 - Bajo', label: '1 A 30 - Bajo' },
      { value: '1 A 30 - Medio', label: '1 A 30 - Medio' },
      { value: '31 A 60 - Alto', label: '31 A 60 - Alto' },
      { value: '31 A 60 - Bajo', label: '31 A 60 - Bajo' },
      { value: '31 A 60 - Medio', label: '31 A 60 - Medio' },
      { value: '61 A 90 - Alto', label: '61 A 90 - Alto' },
      { value: '61 A 90 - Bajo', label: '61 A 90 - Bajo' },
      { value: '61 A 90 - Medio', label: '61 A 90 - Medio' },
      { value: '91+ - Alto', label: '91+ - Alto' },
      { value: '91+ - Bajo', label: '91+ - Bajo' },
      { value: '91+ - Medio', label: '91+ - Medio' },
    ];

    if ((e) && (e.length !== 0)) {
      this.changeStateCondicionality(e);
    } else {
      this.setState({ optionTreat: restart });
    }
  }

  render() {
    const { loading } = this.props;

    return (
      <Container className="dashboard">
        <Row>
          <Col md={{ size: 8, offset: 2 }} lg={{ size: 8, offset: 2 }}>
            <Card>
              <CardBody>
                <div className="col-md-12 col-lg-12 fiveBot pt-0 pb-0">
                  <div>
                    <h2><strong>Usuarios</strong></h2>
                    <p className="autofin_p">
                      Este página le permitirá crear o editar usuarios,
                      porfavor rellene todos los campos del formulario.
                    </p>
                  </div>
                </div>
                <Col md={12} lg={12}>
                  <Card>
                    <CardBody>
                      <Form className="form">
                        <div className="form__form-group">
                          <Row>
                            <Col>
                              <span className="form__form-group-label">Nombre</span>
                              <div className="form__form-group-field">
                                <Field
                                  name="firstName"
                                  component="input"
                                  type="text"
                                  placeholder="Nombre"
                                  disabled={loading}
                                />
                              </div>
                            </Col>
                            <Col>
                              <span className="form__form-group-label">Apellido</span>
                              <div className="form__form-group-field">
                                <Field
                                  name="lastName"
                                  component="input"
                                  type="text"
                                  placeholder="Apellido"
                                  disabled={loading}
                                />
                              </div>
                            </Col>
                          </Row>
                        </div>
                        <div className="form__form-group">
                          <Row>
                            <Col>
                              <span className="form__form-group-label">Rut</span>
                              <div className="form__form-group-field">
                                <Field
                                  name="rut"
                                  component="input"
                                  type="text"
                                  placeholder="Ingrese rut sin puntos ni guión"
                                  disabled={loading}
                                />
                              </div>
                            </Col>
                            <Col>
                              <span className="form__form-group-label">Email</span>
                              <div className="form__form-group-field">
                                <Field
                                  name="email"
                                  component="input"
                                  type="email"
                                  placeholder="abcd@ejemplo.com"
                                  disabled={loading}
                                />
                              </div>
                            </Col>
                          </Row>
                        </div>
                        <div className="form__form-group">
                          <Row>
                            <Col>
                              <span className="form__form-group-label">Anexo</span>
                              <div className="form__form-group-field">
                                <Field
                                  name="anexo"
                                  component="input"
                                  type="text"
                                  placeholder="001"
                                  disabled={loading}
                                />
                              </div>
                            </Col>
                            <Col>
                              <span className="form__form-group-label">Seleccione el Perfil</span>
                              <Field
                                name="role"
                                component={renderSelectField}
                                options={[
                                  { value: 'admin', label: 'Administrador' },
                                  { value: 'manager', label: 'Jefe' },
                                  { value: 'executive', label: 'Ejecutivo' },
                                ]}
                                placeholder="Seleccione el Rol"
                                disabled={loading}
                              />
                            </Col>
                          </Row>
                        </div>
                        <div className="form__form-group">
                          <Row>
                            {/* <Col md={6} lg={6}>
                              <span className="form__form-group-label">Seleccione el Cargo</span>
                              <Field
                                name="jobPosition"
                                component={renderSelectField}
                                options={[
                                  { value: 'manager', label: 'Jefe' },
                                  { value: 'subManager', label: 'Sub-Gerente' },
                                  { value: 'executive', label: 'Ejecutivo' },
                                ]}
                                placeholder="Seleccione el Cargo"
                                disabled={loading}
                              />
                            </Col> */}
                            {/* <Col md={6} lg={6}>
                              <span className="form__form-group-label">Seleccione el tipo de tramo</span>
                              <Field
                                name="typeRanking"
                                component={renderSelectField}
                                options={[
                                  { value: 'high', label: 'Alto' },
                                  { value: 'low', label: 'Bajo' },
                                  { value: 'both', label: 'Ambos' },
                                ]}
                                placeholder="Seleccione el tramo"
                                disabled={loading}
                              />
                            </Col> */}
                          </Row>
                        </div>
                        <div className="form__form-group">
                          <Row>
                            <Col md={12} lg={12}>
                              <span className="form__form-group-label">Seleccione tramos</span>
                              <Field
                                name="runSegment"
                                component={renderSelectFieldMulti}
                                options={this.state.optionTreat}
                                isMulti={this.state.optionTreat}
                                onChange={this.onChangeInputMulti()}
                                // value={rolesAux}
                              />
                            </Col>
                          </Row>
                        </div>
                        <ButtonToolbar className="form__button-toolbar">
                          <Button
                            outline
                            type="button"
                            onClick={this.cancelClick}
                            disabled={loading}
                          >
                            Cancelar
                          </Button>
                          {
                            loading
                              ? (
                                <Button
                                  color="success"
                                  type="button"
                                  onClick={this.onSubmit}
                                  disabled={loading}
                                >
                                  Cargando
                                </Button>
                              )
                              : (
                                <Button
                                  color="success"
                                  type="button"
                                  onClick={this.onSubmit}
                                  disabled={loading}
                                >
                                  Guardar
                                </Button>
                              )
                          }
                        </ButtonToolbar>
                      </Form>
                    </CardBody>
                  </Card>
                </Col>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  loading: state.user.loading,
  error: state.user.error,
  user: state.user.User,
  form: state.form.registerUserForm,
});

const mapDispatchToProps = {
  getUser,
  getUserById,
  createUser,
  updateUser,
  resetValues,
};

// eslint-disable-next-line no-class-assign
RegisterUser = connect(
  mapStateToProps,
  mapDispatchToProps,
)(RegisterUser);


export default reduxForm({
  form: 'registerUserForm',
})(RegisterUser);
