/* eslint-disable no-param-reassign */
/* eslint-disable no-unused-vars */
import Me from '../../api/Me';
import showNotification from '../../helpers/notification';
import { closeSesion } from '../../helpers/functions';

export const GET_ME = 'GET_ME';
export const GET_ME_SUCCESS = 'GET_ME_SUCCESS';
export const GET_ME_FAILED = 'GET_ME_FAILED';
export const UPDATE_ME = 'GET_ME_FAILED';
export const UPDATE_ME_SUCCESS = 'UPDATE_ME_SUCCESS';
export const UPDATE_ME_FAILED = 'UPDATE_ME_FAILED';
export const UPDATE_ME_PASSWORD = 'UPDATE_ME_PASSWORD';
export const UPDATE_ME_PASSWORD_SUCCESS = 'UPDATE_ME_PASSWORD_SUCCESS';
export const UPDATE_ME_PASSWORD_FAILED = 'UPDATE_ME_PASSWORD_FAILED';
export const RESET_ME_STATE = 'RESET_ME_STATE';


export const getMe = () => async (dispatch) => {
  dispatch({ type: GET_ME });
  try {
    const response = await Me.getMe();
    dispatch({ type: GET_ME_SUCCESS, payload: response.body });
  } catch (error) {
    dispatch({ type: GET_ME_FAILED, error });
    showNotification({
      text: 'Error al obtener su información ',
      color: 'danger',
      title: 'Ha ocurrido un error',
    });
    if (error.status === 401) closeSesion();
  }
};


export const updateMe = data => async (dispatch) => {
  dispatch({ type: UPDATE_ME });
  try {
    if (data.avatar) {
      const signature = await Me.getSignature();
      const urlCloud = await Me.uploadFile(data, signature.body);
      data.avatar = urlCloud.body.secure_url;
    }
    const response = await Me.updateMe(data);
    dispatch({ type: UPDATE_ME_SUCCESS });
    showNotification({
      text: 'Información acutalizada correctamente',
      color: 'success',
      title: 'Acción Exitosa',
    });
  } catch (error) {
    dispatch({ type: UPDATE_ME_FAILED, error });
    showNotification({
      text: 'Error al intentar actualizar la Información',
      color: 'danger',
      title: 'Ha ocurrido un error',
    });
    if (error.status === 401) closeSesion();
  }
};

export const updatePassword = (data, history) => async (dispatch) => {
  dispatch({ type: UPDATE_ME_PASSWORD });

  try {
    const response = await Me.updatePassword(data);
    dispatch({ type: UPDATE_ME_PASSWORD_SUCCESS });
    showNotification({
      text: 'Contraseña acutalizada correctamente',
      color: 'success',
      title: 'Acción Exitosa',
    });
    history.push('pages/gestions');
  } catch (error) {
    dispatch({ type: UPDATE_ME_PASSWORD_FAILED, error });
    showNotification({
      text: 'Error al intentar actualizar la Contraseña',
      color: 'danger',
      title: 'Ha ocurrido un error',
    });
    if (error.status === 401) closeSesion();
  }
};

export const resetValues = () => (dispatch) => {
  dispatch({ type: RESET_ME_STATE });
};
