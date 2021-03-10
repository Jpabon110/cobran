/* eslint-disable no-unused-vars */
import showNotification from '../../helpers/notification';
import User from '../../api/User';
import { closeSesion } from '../../helpers/functions';

export const GET_USERS = 'GET_USERS';
export const GET_USERS_SUCCESS = 'GET_USERS_SUCCESS';
export const GET_USERS_FAILED = 'GET_USERS_FAILED';
export const GET_USER_BY_ID = 'GET_USER_BY_ID';
export const GET_USER_BY_ID_SUCCESS = 'GET_USER_BY_ID_SUCCESS';
export const GET_USER_BY_ID_FAILED = 'GET_USER_FAILED';
export const CREATE_USER = 'CREATE_USER';
export const CREATE_USER_SUCCESS = 'CREATE_USER_SUCCESS';
export const CREATE_USER_FAILED = 'CREATE_USER_FAILED';
export const UPDATE_USER = 'UPDATE_USER';
export const UPDATE_USER_SUCCESS = 'UPDATE_USER_SUCCESS';
export const UPDATE_USER_FAILED = 'UPDATE_USER_FAILED';
export const DELETE_USER = 'DELETE_USER';
export const DELETE_USER_SUCCESS = 'DELETE_USER_SUCCESS';
export const DELETE_USER_FAILED = 'DELETE_USER_FAILED';
export const RESET_USER_STATE = 'RESET_USER_STATE';

export const getUser = (query = {}, cb) => async (dispatch) => {
  dispatch({ type: GET_USERS });

  try {
    const response = await User.getAllUsers(query);
    if (response.status === 200) {
      if (cb) {
        cb(response);
      }
      dispatch({
        type: GET_USERS_SUCCESS,
        payload: response.body,
        limit: response.header['x-pagination-limit'],
        total: response.header['x-pagination-total-count'],
      });
    }
  } catch (error) {
    dispatch({ type: GET_USERS_FAILED });
    showNotification({
      text: 'Ud no posee privilegios para ver esta sección',
      color: 'danger',
      title: 'Ha ocurrido un error',
    });
    if (error.status === 401) closeSesion();
  }
};

export const getUserById = id => async (dispatch) => {
  dispatch({ type: GET_USER_BY_ID });

  try {
    const response = await User.getUserById(id);
    dispatch({ type: GET_USER_BY_ID_SUCCESS, payload: response.body });
  } catch (error) {
    dispatch({ type: GET_USER_BY_ID_FAILED });
    showNotification({
      text: 'Usuario No encontrado',
      color: 'danger',
      title: 'Ha ocurrido un error',
    });
    if (error.status === 401) closeSesion();
  }
};

export const createUser = (data, cb) => async (dispatch) => {
  dispatch({ type: CREATE_USER });

  try {
    const response = await User.createUser(data);

    if (response.status === 201) {
      dispatch({ type: CREATE_USER_SUCCESS });
      showNotification({
        text: 'Usuario creado correctamente',
        color: 'success',
        title: 'Acción Exitosa',
      });
      if (cb) {
        cb();
      }
    }
  } catch (error) {
    dispatch({ type: CREATE_USER_FAILED });
    if ((error.status === 409) && (error.response.body.code === 'EmailAlreadyExists')) {
      showNotification({
        text: 'Error ya hay un usario con este correo',
        color: 'danger',
        title: 'Ha ocurrido un error',
      });
    } else if ((error.status === 409) && (error.response.body.code === 'RUTAlreadyExists')) {
      showNotification({
        text: 'Error ya hay un usario con este Rut',
        color: 'danger',
        title: 'Ha ocurrido un error',
      });
    } else {
      showNotification({
        text: 'Error al crear usuario, intente nuevamente',
        color: 'danger',
        title: 'Ha ocurrido un error',
      });
    }
    if (error.status === 401) closeSesion();
  }
};

export const updateUser = (id, data, cb) => async (dispatch) => {
  dispatch({ type: UPDATE_USER });

  try {
    const response = await User.updateUser(id, data);
    dispatch({ type: UPDATE_USER_SUCCESS });
    showNotification({
      text: 'Información del usuario actualizada correctamente',
      color: 'success',
      title: 'Acción Exitosa',
    });
    if (cb) {
      cb();
    }
  } catch (error) {
    dispatch({ type: UPDATE_USER_FAILED });
    showNotification({
      text: 'Error al intentar actualizar información del Usuario',
      color: 'danger',
      title: 'Ha ocurrido un error',
    });
    if (error.status === 401) closeSesion();
  }
};

export const deleteUser = id => async (dispatch) => {
  dispatch({ type: DELETE_USER });

  try {
    const response = await User.deleteUser(id);
    if (response.status === 204) {
      dispatch({ type: DELETE_USER_SUCCESS });
      showNotification({
        text: 'Usuario eliminado correctamente',
        color: 'success',
        title: 'Acción Exitosa',
      });
    }
  } catch (error) {
    dispatch({ type: DELETE_USER_FAILED });
    showNotification({
      text: 'Error al intentar eliminar usuario',
      color: 'danger',
      title: 'Ha ocurrido un error',
    });
    if (error.status === 401) closeSesion();
  }
};

export const resetValues = () => (dispatch) => {
  dispatch({ type: RESET_USER_STATE });
};
