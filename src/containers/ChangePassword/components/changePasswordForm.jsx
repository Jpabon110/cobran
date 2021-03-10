/* eslint-disable no-shadow */
/* eslint-disable react/prefer-stateless-function */
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
import { Link } from 'react-router-dom';
import { Field, reduxForm } from 'redux-form';
import { updatePassword } from '../../../redux/actions/meActions';
import showNotification from '../../../helpers/notification';

class ChangePassword extends Component {
  onSubmit = (e) => {
    const {
      form,
      updatePassword,
      history,
    } = this.props;
    const { values } = form;
    const {
      currentPassword,
      newPassword,
      confirmPassword,
    } = values;
    e.preventDefault();
    if (!currentPassword || !newPassword || !confirmPassword) {
      showNotification({ text: 'No se admiten campos vacíos', color: 'danger', title: 'Ha ocurrido un error' });
    } else if (newPassword !== confirmPassword) {
      showNotification({ text: 'Las contraseñas no coinciden', color: 'danger', title: 'Ha ocurrido un error' });
    } else {
      updatePassword({ currentPassword, newPassword }, history);
    }
  }

  render() {
    const { loading } = this.props;
    return (
      <div className="dashboard container profile_centralize">
        <Col md={6} lg={6} xl={6}>
          <Card>
            <CardBody>
              <div className="modal__header">
                <h2 className="bold-text label_autofin  modal__title"> <strong>Cambiar contraseña</strong></h2>
              </div>
              <div className="modal__body">
                <Col md={12} lg={12}>
                  <form className="form form--horizontal" onSubmit={this.onSubmit}>
                    <Row className="row_center">
                      <div className="everlast">
                        <div>
                          <Col md="12">
                            <FormGroup>
                              <Label for="currentPassword">Contraseña actual:</Label>
                              <Field
                                component="input"
                                type="password"
                                name="currentPassword"
                                id="currentPassword"
                                required
                              />
                            </FormGroup>
                          </Col>
                          <Col md="12">
                            <FormGroup>
                              <Label for="newPassword">Nueva contraseña:</Label>
                              <Field
                                component="input"
                                type="password"
                                name="newPassword"
                                id="newPassword"
                                required
                              />
                            </FormGroup>
                          </Col>
                          <Col md="12">
                            <FormGroup>
                              <Label for="newPassword">Confirmar contraseña:</Label>
                              <Field
                                component="input"
                                type="password"
                                name="confirmPassword"
                                id="confirmPassword"
                                required
                              />
                            </FormGroup>
                          </Col>
                        </div>
                      </div>
                    </Row>
                    <ButtonToolbar className="modal__footer">
                      <Link className="asignar btn_pass" to="/pages/one">Cancel</Link>
                      <Button
                        className="asignar just_this"
                        type="submit"
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
  form: state.form.changePasswordForm,
});

const mapDispatchToProps = {
  updatePassword,
};
// eslint-disable-next-line no-class-assign
ChangePassword = connect(
  mapStateToProps,
  mapDispatchToProps,
)(ChangePassword);
export default reduxForm({
  form: 'changePasswordForm',
})(ChangePassword);
