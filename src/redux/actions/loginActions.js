/* eslint-disable no-console */
/* eslint-disable no-restricted-globals */
import showNotification from '../../helpers/notification';
import Login from '../../api/login';
import agent from '../../helpers/agent';
import media from '../../helpers/media';

export const LOGIN = 'LOGIN';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILED = 'LOGIN_FAILED';
export const LOGOUT = 'LOGOUT';
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';
export const LOGOUT_FAILED = 'LOGOUT_FAILED';
export const RECOVERY = 'RECOVERY';
export const RECOVERY_SUCCESS = 'RECOVERY_SUCCESS';
export const RECOVERY_FAILED = 'RECOVERY_FAILED';

// export const login = (data, history) => async (dispatch) => {
export const login = data => async (dispatch) => {
  const { email, password } = data;
  dispatch({ type: LOGIN });
  try {
    const response = await Login.auth(email, password);
    if (response.status === 200) {
      localStorage.setItem('token', response.body.accessToken);
      await agent.setToken(response.body.accessToken);
      localStorage.setItem('refreshToken', response.body.refreshToken);
      await media.setToken(response.body.accessToken);
      dispatch({ type: LOGIN_SUCCESS, payload: response.data });
      // history.push('/pages/gestions');
      showNotification({ text: 'Sesión Iniciada correctamente', color: 'success', title: 'Acción Exitosa' });
    }
  } catch (error) {
    console.error('error', error);
    dispatch({ type: LOGIN_FAILED, error });
    showNotification({ text: 'Credenciales Inválidos', color: 'danger', title: 'Ha ocurrido un error' });
  }
};

export const logOut = () => async (dispatch) => {
  dispatch({ type: LOGOUT });
  try {
    const response = await Login.logOut();

    if (response.status === 204) {
      dispatch({ type: LOGOUT_SUCCESS });
      localStorage.clear();
      showNotification({ text: 'Sesión Finalizada', color: 'success', title: 'Acción Exitosa' });
      location.href = '/';
    }
  } catch (error) {
    dispatch({ type: LOGOUT_FAILED, error });
    showNotification({ text: 'Error al cerrar Sesión', color: 'danger', title: 'Ha ocurrido un error' });
  }
};

export const recoveryPass = email => async (dispatch) => {
  dispatch({ type: RECOVERY });
  try {
    const response = await Login.recoverPass(email.email);
    if (response.status === 204) {
      dispatch({ type: RECOVERY_SUCCESS });
      showNotification({
        text: 'La contraseña ha sido enviada a su correo', color: 'success', title: 'Acción Exitosa',
      });
    }
  } catch (error) {
    dispatch({ type: RECOVERY_FAILED });
    showNotification({ text: 'Correo no encontrado', color: 'danger', title: 'Ha ocurrido un error' });
  }
};
