/* eslint-disable react/no-did-update-set-state */
/* eslint-disable no-return-assign */
/* eslint-disable no-shadow */
/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import {
  Card,
  CardBody,
  Col,
  Row,
  FormGroup,
  Button,
  Label,
  ButtonToolbar,
} from 'reactstrap';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import {
  getMe, updateMe, resetValues,
} from '../../../redux/actions/meActions';
import avatarDefault from '../../../shared/img/avatar-default.jpg';
import { setRUTFormat } from '../../../helpers/functions';

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      avatar: '',
      onReady: false,
    };
    this.inputFile = React.createRef();
  }

  componentDidMount() {
    const { getMe } = this.props;
    getMe();
  }

  componentDidUpdate() {
    const { me, initialize } = this.props;
    const { onReady } = this.state;
    if (me && !onReady) {
      initialize({
        firstName: me.firstName,
        lastName: me.lastName,
        rut: setRUTFormat(me.rut),
        email: me.email,
        anexo: me.anexo,
        role: me.roles[0],
      });
      this.setState({ onReady: true });
    }
  }

  componentWillUnmount() {
    const { resetValues } = this.props;
    this.setState({ onReady: false });
    resetValues();
  }


  translate = (item) => {
    switch (item) {
      case 'admin':
        return 'Administrador';
      case 'manager':
        return 'Jefe';
      case 'executive':
        return 'Ejecutivo';
      case 'subManager':
        return 'Sub-Gerente';
      default:
        return item;
    }
  }

  onChangeImg = () => {
    if (this.inputFile) {
      this.inputFile.current.click();
    }
  }

  onChangeInputFile = (event) => {
    this.renderFile(event.target.files[0], (image) => {
      this.onChangeInput('avatar')(image);
    });
  }

  getSrc = (avatar) => {
    if (avatar) {
      if (typeof avatar === 'string') {
        return avatar;
      }

      if (avatar.temp) {
        return avatar.temp;
      }
    }
    return '';
  }

  onChangeInput = key => (e) => {
    if (key === 'avatar') {
      this.setState({ [key]: e });
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


  renderFile = (file, callback) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      const photo = {
        file,
        temp: event.target.result,
      };
      callback(photo);
    };
    reader.onerror = () => {
      // BasicNotification.error(`Ocurrio un error al intentar cargar la imágen ${file.name}`);
    };
    reader.readAsDataURL(file);
  }

  translateRol = (rol) => {
    switch (rol) {
      case 'admin':
        return 'Administrador';
      case 'manager':
        return 'Gerente';
      case 'executive':
        return 'Ejecutivo';
      default:
        return rol;
    }
  }

  onSubmit = async (e) => {
    e.preventDefault();
    const { avatar } = this.state;
    const { form, updateMe, getMe } = this.props;
    const { values } = form;
    let data = {};
    const roles = [];
    roles.push(values.role.value);
    if (avatar) {
      data = {
        avatar,
        firstName: values.firstName,
        lastName: values.lastName,
        anexo: values.anexo,
      };
    } else {
      data = {
        firstName: values.firstName,
        lastName: values.lastName,
        anexo: values.anexo,
      };
    }
    await updateMe(data);
    await getMe();
  }


  render() {
    const { loading } = this.props;
    const { avatar } = this.state;
    return (
      <div className="dashboard container profile_centralize">
        <Col md={8} lg={8} xl={8}>
          <Card>
            <CardBody>
              <div className="modal__header">
                <h2 className="bold-text label_autofin  modal__title"> <strong>Perfil</strong></h2>
              </div>
              <div className="modal__body">
                <Col md={12} lg={12}>
                  <form className="form form--horizontal" onSubmit={this.onSubmit}>
                    <Row className="row_center">
                      <div className="everlast">
                        <div>
                          <Col md="12" lg="12">
                            <FormGroup className="centralize_avatar">
                              <Label className="label_autofin" for="avatar">Foto perfil:</Label>
                              <img
                                className="topbar__avatar-img for_user"
                                src={(avatar) ? this.getSrc(avatar) : avatarDefault}
                                alt="avatar"
                              />
                              <FormGroup className="element_center_file">
                                <Button
                                  className="asignar button_change"
                                  onClick={this.onChangeImg}
                                >Cambiar imagen
                                </Button>
                                <input
                                  type="file"
                                  ref={this.inputFile}
                                  onChange={this.onChangeInputFile}
                                  hidden
                                />
                              </FormGroup>
                            </FormGroup>
                          </Col>
                        </div>
                        <div>
                          <Col md="12" lg="12">
                            <span className="form__form-group-label">Rut</span>
                            <Field
                              name="rut"
                              component="input"
                              type="text"
                              disabled
                            />
                          </Col>
                          <Col md="12" lg="12">
                            <span className="form__form-group-label">Nombre</span>
                            <Field
                              name="firstName"
                              component="input"
                              type="text"
                              disabled={loading}
                            />
                          </Col>
                          <Col md="12" lg="12">
                            <span className="form__form-group-label">Apellido</span>
                            <Field
                              name="lastName"
                              component="input"
                              type="text"
                              disabled={loading}
                            />
                          </Col>
                          <Col md="12" lg="12">
                            <span className="form__form-group-label">Email</span>
                            <Field
                              name="email"
                              component="input"
                              type="text"
                              disabled
                            />
                          </Col>
                          <Col md="12" lg="12">
                            <span className="form__form-group-label">Anexo</span>
                            <Field
                              name="anexo"
                              component="input"
                              type="text"
                              disabled={loading}
                            />
                          </Col>
                          <Col md="12" lg="12">
                            <span className="form__form-group-label">Rol</span>
                            <Field
                              name="role"
                              component="input"
                              type="text"
                              // options={[
                              //   { value: 'admin', label: 'Administrador' },
                              //   { value: 'manager', label: 'Gerente' },
                              //   { value: 'executive', label: 'Ejecutivo' },
                              // ]}
                              disabled
                            />
                          </Col>
                        </div>
                      </div>
                    </Row>
                    <ButtonToolbar className="modal__footer" style={{ justifyContent: 'flex-end' }}>
                      <Button
                        className="asignar just_this"
                        type="submit"
                        style={{ cursor: 'pointer' }}
                        disabled={loading}
                      >Guardar
                      </Button>
                    </ButtonToolbar>
                  </form>
                </Col>
              </div>
            </CardBody>
          </Card>
        </Col>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  loading: state.me.loading,
  error: state.me.error,
  me: state.me.me,
  form: state.form.profileForm,
});

const mapDispatchToProps = {
  getMe,
  updateMe,
  resetValues,
};

// eslint-disable-next-line no-class-assign
Profile = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Profile);

export default reduxForm({
  form: 'profileForm',
})(Profile);
