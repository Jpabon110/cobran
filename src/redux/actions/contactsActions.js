/* eslint-disable max-len */
/* eslint-disable no-console */
import Contacts from '../../api/Contacts';
import showNotification from '../../helpers/notification';

export const GET_CONTRACTS = 'GET_CONTRACTS';
export const GET_CONTRACTS_SUCCESS = 'GET_CONTRACTS_SUCCESS';
export const GET_CONTRACTS_FAILED = 'GET_CONTRACTS_FAILED';

export const GET_CONTACT_BY_RUT = 'GET_CONTACT_BY_RUT';
export const GET_CONTACT_BY_RUT_SUCCESS = 'GET_CONTACT_BY_RUT_SUCCESS';
export const GET_CONTACT_BY_RUT_FAILED = 'GET_CONTACT_BY_RUT_FAILED';

export const UPDATE_CONTACT = 'UPDATE_CONTACT';
export const UPDATE_CONTACT_SUCCESS = 'UPDATE_CONTACT_SUCCESS';
export const UPDATE_CONTACT_FAILED = 'UPDATE_CONTACT_FAILED';

export const getContactsByRut = (query = {}, cb) => async (dispatch) => {
  dispatch({ type: GET_CONTACT_BY_RUT, loadingContacts: true });
  try {
    const {
      body,
      // header,
    } = await Contacts.getContractsByRut(query);
    // const countCases = header['x-pagination-total-count'];
    // const limitCases = header['x-pagination-limit'];

    if (cb) {
      cb(body);
    }
    dispatch({
      type: GET_CONTACT_BY_RUT_SUCCESS,
      loadingContacts: false,
      payload: {
        contacts: body,
        // countCases,
        // limitCases,
      },
    });
    showNotification({
      text: 'Información de usuario encontrada.',
      color: '',
      title: 'Aviso',
    });
  } catch (error) {
    dispatch({ type: GET_CONTACT_BY_RUT_FAILED, loadingContacts: false, payload: { error } });
    if (error.status === 404) {
      showNotification({
        text: 'No hay información adicional del usuario.',
        color: '',
        title: 'Advertencia',
      });
    } else {
      console.error(error);
      showNotification({
        text: 'Ocurrió un error al intentar obtener la información del usuario',
        color: 'danger',
        title: 'Ha ocurrido un error',
      });
    }
  }
};

export const getContracts = (query = {}, cb) => async (dispatch) => {
  dispatch({ type: GET_CONTRACTS, loadingContracts: true });
  try {
    const {
      body,
      // header,
    } = await Contacts.getContracts(query);
    // const countCases = header['x-pagination-total-count'];
    // const limitCases = header['x-pagination-limit'];

    if (cb) {
      cb(body);
    }
    dispatch({
      type: GET_CONTRACTS_SUCCESS,
      loadingContracts: false,
      payload: {
        contracts: body,
        // countCases,
        // limitCases,
      },
    });
    showNotification({
      text: 'Lista de productos disponible',
      color: '',
      title: 'Aviso',
    });
  } catch (error) {
    dispatch({ type: GET_CONTRACTS_FAILED, loadingContracts: false, payload: { error } });
    if (error.status === 404) {
      if (cb) {
        cb();
      }
      showNotification({
        text: 'No tiene otros productos asociados',
        color: '',
        title: 'Aviso',
      });
    } else {
      console.error(error);
      showNotification({
        text: 'Ocurrió un error al intentar obtener los productos',
        color: 'danger',
        title: 'Ha ocurrido un error',
      });
    }
  }
};

export const updateContact = (id, data, cb) => async (dispatch) => {
  dispatch({ type: UPDATE_CONTACT });
  showNotification({
    text: 'Actualizando usuario...',
    color: '',
    title: 'Información',
  });
  try {
    await Contacts.update(id, data);
    dispatch({ type: UPDATE_CONTACT_SUCCESS });
    if (cb) {
      cb();
    }
    showNotification({
      text: 'Usuario actualizado con éxito.',
      color: '',
      title: 'Información',
    });
  } catch (error) {
    console.error(error);
    dispatch({ type: UPDATE_CONTACT_FAILED, payload: { error } });
    // if (error.status === 409 && error.response.body.code === 'EmailAlreadyExists') {
    //   BasicNotification.error('El email ingresado ya está registrado en el sistema.');
    // } else {
    // BasicNotification.error('Ocurrió un error al intentar actualizar el usuario');
    showNotification({
      text: 'Ocurrió un error al intentar actualizar el usuario.',
      color: 'danger',
      title: 'Información',
    });
    // }
  }
};
