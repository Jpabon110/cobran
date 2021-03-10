/* eslint-disable no-shadow */
/* eslint-disable react/prop-types */
/* eslint-disable no-class-assign */
import React, { PureComponent } from 'react';
import { reduxForm, Field } from 'redux-form';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Avj from 'ajv';
import AjvErrors from 'ajv-errors';
import showNotification from '../../../helpers/notification';
import { loginSchema } from '../../../helpers/validationSchema';
import { isUserAllowed, streachAllowed } from '../../../shared/utils';
import { login } from '../../../redux/actions/loginActions';
import logo from '../../../shared/img/logo/logo-autofin-cob.png';

class LogInForm extends PureComponent {
  componentDidMount() {
    const { history } = this.props;
    const token = localStorage.getItem('token');
    if (token) {
      // history.push('/pages/gestions');
      console.log(isUserAllowed());
      if (isUserAllowed('admin')) {
        history.push('/pages/gestions');
      } else {
        const streachsUrl = streachAllowed();
        // console.log('streachAllowed', streachsUrl[0].segment);
        history.push(`/pages/gestions?stretch=${streachsUrl[0].segment}`);
      }
    }
  }

  componentDidUpdate() {
    const { redirect, history } = this.props;
    if (redirect) {
      // history.push('/pages/gestions');
      if (isUserAllowed('admin')) {
        console.log('componentDidUpdate isUserAllowed');
        history.push('/pages/gestions');
      } else {
        const streachsUrl = streachAllowed();
        console.log('componentDidUpdate streachAllowed');
        // console.log('streachAllowed', streachsUrl[0].segment);
        history.push(`/pages/gestions?stretch=${streachsUrl[0].segment}`);
      }
    }
  }

  onSubmit = (e) => {
    e.preventDefault();
    const avj = new Avj({ allErrors: true, jsonPointers: true });
    AjvErrors(avj);
    avj.addKeyword('isNotEmpty', {
      type: 'string',
      validate: (schema, data) => typeof data === 'string' && data.trim() !== '',
      errors: false,
    });
    const validate = avj.compile(loginSchema);
    const { form, login, history } = this.props;
    const { values = {} } = form;
    let email;
    if (validate(values)) {
      email = values.email.trim();
      email = email.toLowerCase();
      values.email = email;
      login(values, history);
    } else {
      showNotification({ text: validate.errors[0].message, color: 'danger', title: 'Ha ocurrido un error' });
    }
  }


  render() {
    const { loading } = this.props;
    return (
      <form className="form" onSubmit={this.onSubmit}>
        <img src={logo} alt="" />
        <div className="form__form-group">
          <span className="label_autofin">Usuario</span>
          <div className="form__form-group-input">
            <Field
              name="email"
              component="input"
              type="text"
              placeholder="Usuario"
              disabled={loading}
            />
          </div>
        </div>
        <div className="form__form-group">
          <span className="label_autofin">Contraseña</span>
          <div className="form__form-group-input">
            <Field
              name="password"
              component="input"
              type="password"
              placeholder="Contraseña"
              disabled={loading}
            />
          </div>
        </div>
        <button
          className="btn black_resize_button account__btn account__btn--small"
          type="submit"
          disabled={loading}
        >
          {loading ? 'Ingresando...' : 'Ingresar'}
        </button>
        <Link className="forgotten_p" to="/recover">
          ¿Olvidaste tu contraseña?
        </Link>
      </form>
    );
  }
}

const mapStateToProps = state => ({
  form: state.form.logInForm,
  loading: state.login.loading,
  tokens: state.login.tokens,
  redirect: state.login.redirect,
});

const mapDispatchToProps = {
  login,
};

LogInForm = connect(
  mapStateToProps,
  mapDispatchToProps,
)(LogInForm);

export default reduxForm({
  form: 'logInForm',
})(LogInForm);
