/* eslint-disable no-restricted-syntax */
/* eslint-disable no-param-reassign */
/* eslint-disable no-restricted-globals */
import includes from 'lodash/includes';
import jwtDecode from 'jwt-decode';
import Login from '../api/login';

export const closeSesion = () => {
  Login.logOut();
  localStorage.clear();
  location.href = '/';
};

export const setRUTFormat = (value) => {
  value = value.replace(/[^K0-9\s]/gi, '');
  if (value && value.length > 1) {
    const { length } = value;
    const checkDigit = value.substring(length - 1);
    const rest = value.substring(0, length - 1);
    let lastRest = '';
    let count = 0;
    for (let i = rest.length - 1; i >= 0; i -= 1) {
      if (count === 3) {
        count = 0;
        lastRest = `.${lastRest}`;
      }
      lastRest = `${rest[i]}${lastRest}`;
      count += 1;
    }
    value = `${lastRest}-${checkDigit}`;
  }
  return value;
};

export const validate = (values) => {
  const errors = {};
  /**
   * Email Validation
   */
  if (!values.email) {
    errors.email = 'El campo email es requerido';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Email incorrecto';
  }
  /**
   * Password Validation
   */
  if (!values.password) {
    errors.password = 'El campo password es requerido';
  }
  /**
   * First and LastName Validation
   */
  if (!values.firstName) {
    errors.firstName = 'El campo nombre es requerido';
  } else if (!/^[A-Z]+$/i.test(values.firstName)) {
    errors.firstName = 'Este campo solo acepta letras';
  }

  if (!values.lastName) {
    errors.firstName = 'El campo apellido es requerido';
  } else if (!/^[A-Z]+$/i.test(values.firstName)) {
    errors.firstName = 'Este campo solo acepta letras';
  }
  return errors;
};

export const isOptionAllowed = (_roles) => {
  if (_roles) {
    const targets = typeof _roles === 'string' ? [_roles] : [..._roles];
    const token = localStorage.getItem('token');
    const { user } = jwtDecode(token);
    for (const rol of targets) {
      if (includes(user.roles, rol)) {
        return true;
      }
    }
  }
  return false;
};
