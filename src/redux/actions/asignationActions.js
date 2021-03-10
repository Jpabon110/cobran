/* eslint-disable no-console */
import Asigntion from '../../api/Asigntion';
import showNotification from '../../helpers/notification';

export const GET_PORTFOLIO = 'GET_PORTFOLIO';
export const GET_PORTFOLIO_SUCCESS = 'GET_PORTFOLIO_SUCCESS';
export const GET_PORTFOLIO_FAILED = 'GET_PORTFOLIO_FAILED';

export const GET_PORTFOLIO_DATE = 'GET_PORTFOLIO_DATE';
export const GET_PORTFOLIO_DATE_SUCCESS = 'GET_PORTFOLIO_DATE_SUCCESS';
export const GET_PORTFOLIO_DATE_FAILED = 'GET_PORTFOLIO_DATE_FAILED';

export const GET_ASIGMENT = 'GET_ASIGMENT';
export const GET_ASIGMENT_SUCCESS = 'GET_ASIGMENT_SUCCESS';
export const GET_ASIGMENT_FAILED = 'GET_ASIGMENT_FAILED';

export const SET_ASIGMENT = 'SET_ASIGMENT';
export const SET_ASIGMENT_SUCCESS = 'SET_ASIGMENT_SUCCESS';
export const SET_ASIGMENT_FAILED = 'SET_ASIGMENT_FAILED';

export const GET_LAST_DATE_ASIGMENT = 'GET_LAST_DATE_ASIGMENT';
export const GET_LAST_DATE_ASIGMENT_SUCCESS = 'GET_LAST_DATE_ASIGMENT_SUCCESS';
export const GET_LAST_DATE_ASIGMENT_FAILED = 'GET_LAST_DATE_ASIGMENT_FAILED';

export const getLastDateAssignment = (data, cb) => async (dispatch) => {
  dispatch({ type: GET_LAST_DATE_ASIGMENT });
  try {
    // showNotification({
    //   text: 'Calculando asignación...',
    //   color: '',
    //   title: '',
    // });
    const { body } = await Asigntion.getLastDateAssignment(data);
    if (cb) {
      cb(body);
    }
    dispatch({ type: GET_LAST_DATE_ASIGMENT_SUCCESS, payload: { infoLastDate: body } });
    // showNotification({
    //   text: 'Asignaciones calculadas con éxito.',
    //   color: 'success',
    //   title: '',
    // });
  } catch (error) {
    console.error(error);
    if (error.status === 403) {
      showNotification({
        text: 'No tienes permisos para ver las ultimas asignaciones.',
        color: 'danger',
        title: 'Ha ocurrido un error',
      });
    } else {
      console.error(error);
      showNotification({
        text: 'Ocurrió un error al intentar obtener la fecha asignación.',
        color: 'danger',
        title: 'Ha ocurrido un error',
      });
    }
    dispatch({ type: GET_LAST_DATE_ASIGMENT_FAILED, payload: { error } });
  }
};

export const getPortfolio = cb => async (dispatch) => {
  dispatch({ type: GET_PORTFOLIO, loadingPortfolio: true });
  try {
    const { body } = await Asigntion.getPortfolio();
    if (cb) {
      cb(body);
    }
    dispatch({ type: GET_PORTFOLIO_SUCCESS, loadingPortfolio: false, payload: { portfolios: body } });
  } catch (error) {
    dispatch({ type: GET_PORTFOLIO_FAILED, loadingPortfolio: false, payload: { error } });
    if (error.status === 403) {
      showNotification({
        text: 'No tienes permisos para ver las gestiones.',
        color: 'danger',
        title: 'Ha ocurrido un error',
      });
    } else {
      console.error(error);
      showNotification({
        text: 'Ocurrió un error al intentar obtener la cartera de proyecciones.',
        color: 'danger',
        title: 'Ha ocurrido un error',
      });
    }
  }
};

export const getDatePortfolio = cb => async (dispatch) => {
  dispatch({ type: GET_PORTFOLIO_DATE, loadingPortfolio: true });
  try {
    const { body } = await Asigntion.getDatePortfolio();
    if (cb) {
      cb(body);
    }
    dispatch({ type: GET_PORTFOLIO_DATE_SUCCESS, loadingPortfolio: false, payload: { datePortfolio: body } });
  } catch (error) {
    dispatch({ type: GET_PORTFOLIO_DATE_FAILED, loadingPortfolio: false, payload: { error } });
    if (error.status === 403) {
      showNotification({
        text: 'No tienes permisos para ver las gestiones.',
        color: 'danger',
        title: 'Ha ocurrido un error',
      });
    } else {
      console.error(error);
      showNotification({
        text: 'Ocurrió un error al intentar obtener la cartera de proyecciones.',
        color: 'danger',
        title: 'Ha ocurrido un error',
      });
    }
  }
};

export const getAsignation = (data, cb) => async (dispatch) => {
  dispatch({ type: GET_ASIGMENT });
  try {
    showNotification({
      text: 'Calculando asignación...',
      color: '',
      title: '',
    });
    const { body } = await Asigntion.getAsignation(data);
    if (cb) {
      cb(body);
    }
    dispatch({ type: GET_ASIGMENT_SUCCESS, payload: { calculated: body } });
    showNotification({
      text: 'Asignaciones calculadas con éxito.',
      color: 'success',
      title: '',
    });
  } catch (error) {
    console.error(error);
    if (error.status === 403) {
      showNotification({
        text: 'No tienes permisos para ver las asignaciones.',
        color: 'danger',
        title: 'Ha ocurrido un error',
      });
    } else {
      console.error(error);
      showNotification({
        text: 'Ocurrió un error al intentar obtener el calculo de asignación.',
        color: 'danger',
        title: 'Ha ocurrido un error',
      });
    }
    dispatch({ type: GET_ASIGMENT_FAILED, payload: { error } });
  }
};

export const setAsignation = (data, cb) => async (dispatch) => {
  dispatch({ type: SET_ASIGMENT, loadUpdating: true });
  try {
    showNotification({
      text: 'Asignando...',
      color: '',
      title: '',
    });
    await Asigntion.setAsignation(data);
    if (cb) {
      cb();
    }
    dispatch({ type: SET_ASIGMENT_SUCCESS, loadUpdating: false });
    showNotification({
      text: 'Asignaciones realizadas con éxito.',
      color: 'success',
      title: '',
    });
  } catch (error) {
    console.error(error);
    if (error.status === 403) {
      showNotification({
        text: 'No tienes permisos para realizar asignaciones.',
        color: 'danger',
        title: 'Ha ocurrido un error',
      });
    } else {
      console.error(error);
      showNotification({
        text: 'Ocurrió un error al intentar realizar asignaciones.',
        color: 'danger',
        title: 'Ha ocurrido un error',
      });
    }
    dispatch({ type: SET_ASIGMENT_FAILED, loadUpdating: false });
  }
};
