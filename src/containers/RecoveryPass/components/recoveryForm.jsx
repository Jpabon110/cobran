/* eslint-disable react/prop-types */
/* eslint-disable no-shadow */
import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import showNotification from '../../../helpers/notification';
import { recoveryPass } from '../../../redux/actions/loginActions';
import logo from '../../../shared/img/logo/logo-autofin-cob.png';

class recoveryForm extends Component {
  onSubmit = (e) => {
    e.preventDefault();
    const { form, recoveryPass } = this.props;
    const { values = {} } = form;
    let email;
    const error = this.validate(values);
    if (Object.keys(error).length === 0) {
      email = values.email.trim();
      email = email.toLowerCase();
      values.email = email;
      recoveryPass(values);
    } else if (error.email !== null) {
      showNotification({ text: error.email, color: 'danger', title: 'Ha ocurrido un error' });
    }
  }

  validate = (values) => {
    const errors = {};
    if (!values.email) {
      errors.email = 'El campo email es requerido';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
      errors.email = 'Email incorrecto';
    }
    return errors;
  }

  render() {
    return (
      <form className="form" onSubmit={this.onSubmit}>
        <img src={logo} alt="" />
        <div className="form__form-group">
          <span className="label_autofin">Email</span>
          <div className="form__form-group-input">
            <Field
              name="email"
              component="input"
              type="email"
              placeholder="Email"
            />
            <p className="label_autofin" style={{ color: '#666666' }}>
              Porfavor ingresa tu email y enviaremos una nueva contraseña.
            </p>
          </div>
        </div>
        <div className="d-flex flex-column justify-content-center align-items-center">
          <button
            className="btn
            black_resize_button
            account__btn account__btn--small"
            type="submit"
          >
            Recuperar Contraseña
          </button>
          <br />
          <Link className="forgotten_p" to="/">
            Volver a Inicio de Sesión
          </Link>
        </div>
      </form>
    );
  }
}

const mapStateToProps = state => ({
  loading: state.login.loading,
  error: state.login.error,
  tokens: state.login.tokens,
  redirect: state.login.redirect,
  form: state.form.recoveryForm,
});

const mapDispatchToProps = {
  recoveryPass,
};

// eslint-disable-next-line no-class-assign
recoveryForm = connect(
  mapStateToProps,
  mapDispatchToProps,
)(recoveryForm);

export default reduxForm({
  form: 'recoveryForm',
})(recoveryForm);
