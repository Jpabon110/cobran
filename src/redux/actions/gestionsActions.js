/* eslint-disable max-len */
/* eslint-disable no-console */
import Gestion from '../../api/Gestion';
import showNotification from '../../helpers/notification';

export const GET_GESTIONS = 'GET_GESTIONS';
export const GET_GESTIONS_SUCCESS = 'GET_GESTIONS_SUCCESS';
export const GET_GESTIONS_FAILED = 'GET_GESTIONS_FAILED';

export const GET_CASE_ID = 'GET_CASE_ID';
export const GET_CASE_ID_SUCCESS = 'GET_CASE_ID_SUCCESS';
export const GET_CASE_ID_FAILED = 'GET_CASE_ID_FAILED';

export const GET_CASE_HISTORICAL = 'GET_CASE_HISTORICAL';
export const GET_CASE_HISTORICAL_SUCCESS = 'GET_CASE_HISTORICAL_SUCCESS';
export const GET_CASE_HISTORICAL_FAILED = 'GET_CASE_HISTORICAL_FAILED';

export const CREATE_GESTION = 'CREATE_GESTION';
export const CREATE_GESTION_SUCCESS = 'CREATE_GESTION_SUCCESS';
export const CREATE_GESTION_FAILED = 'CREATE_GESTION_FAILED';

export const GET_GESTIONS_MANAGEMENT = 'GET_GESTIONS_MANAGEMENT';
export const GET_GESTIONS_MANAGEMENT_SUCCESS = 'GET_GESTIONS_MANAGEMENT_SUCCESS';
export const GET_GESTIONS_MANAGEMENT_FAILED = 'GET_GESTIONS_MANAGEMENT_FAILED';

export const GET_DASHBOARD = 'GET_DASHBOARD';
export const GET_DASHBOARD_SUCCESS = 'GET_DASHBOARD_SUCCESS';
export const GET_DASHBOARD_FAILED = 'GET_DASHBOARD_FAILED';

export const GET_DASHBOARD_ME = 'GET_DASHBOARD_ME';
export const GET_DASHBOARD_ME_SUCCESS = 'GET_DASHBOARD_ME_SUCCESS';
export const GET_DASHBOARD_ME_FAILED = 'GET_DASHBOARD_ME_FAILED';

export const getDashboard = (query = {}, cb) => async (dispatch) => {
  dispatch({ type: GET_DASHBOARD, loadingDashboard: true });
  try {
    const { body } = await Gestion.getDashboard(query);

    if (cb) {
      cb(body);
    }
    dispatch({ type: GET_DASHBOARD_SUCCESS, loadingDashboard: false, payload: { dashboard: body } });
  } catch (error) {
    dispatch({ type: GET_DASHBOARD_FAILED, loadingDashboard: false, payload: { error } });
    if (error.status === 403) {
      showNotification({
        text: 'No tienes permisos para ver el dashboard de gestiones',
        color: 'danger',
        title: 'Ha ocurrido un error',
      });
    } else {
      console.error(error);
      showNotification({
        text: 'Ocurrió un error al intentar obtener el dashboard de gestiones',
        color: 'danger',
        title: 'Ha ocurrido un error',
      });
    }
  }
};

export const getDashboardMe = (query = {}, cb) => async (dispatch) => {
  dispatch({ type: GET_DASHBOARD_ME, loadingDashboard: true });
  try {
    const { body } = await Gestion.getDashboardMe(query);

    if (cb) {
      cb(body);
    }
    dispatch({ type: GET_DASHBOARD_ME_SUCCESS, loadingDashboard: false, payload: { dashboardMe: body } });
  } catch (error) {
    dispatch({ type: GET_DASHBOARD_ME_FAILED, loadingDashboard: false, payload: { error } });
    if (error.status === 403) {
      showNotification({
        text: 'No tienes permisos para ver el dashboard de gestiones',
        color: 'danger',
        title: 'Ha ocurrido un error',
      });
    } else {
      console.error(error);
      showNotification({
        text: 'Ocurrió un error al intentar obtener el dashboard de gestiones',
        color: 'danger',
        title: 'Ha ocurrido un error',
      });
    }
  }
};

export const getAllGestionsMe = (query = {}, cb) => async (dispatch) => {
  dispatch({ type: GET_GESTIONS, loadingGestions: true });
  try {
    const { body, header } = await Gestion.getAllGestionsMe(query);
    const countCases = header['x-pagination-total-count'];
    const limitCases = header['x-pagination-limit'];

    if (cb) {
      cb(body);
    }
    dispatch({ type: GET_GESTIONS_SUCCESS, loadingGestions: false, payload: { gestions: body, countCases, limitCases } });
  } catch (error) {
    dispatch({ type: GET_GESTIONS_FAILED, loadingGestions: false, payload: { error } });
    if (error.status === 403) {
      showNotification({
        text: 'No tienes permisos para ver las gestiones',
        color: 'danger',
        title: 'Ha ocurrido un error',
      });
    } else {
      console.error(error);
      showNotification({
        text: 'Ocurrió un error al intentar obtener las gestiones',
        color: 'danger',
        title: 'Ha ocurrido un error',
      });
    }
  }
};

export const getAllGestions = (query = {}, cb) => async (dispatch) => {
  dispatch({ type: GET_GESTIONS, loadingGestions: true });
  try {
    const { body, header } = await Gestion.getAllGestions(query);
    const countCases = header['x-pagination-total-count'];
    const limitCases = header['x-pagination-limit'];

    if (cb) {
      cb(body);
    }
    dispatch({ type: GET_GESTIONS_SUCCESS, loadingGestions: false, payload: { gestions: body, countCases, limitCases } });
  } catch (error) {
    dispatch({ type: GET_GESTIONS_FAILED, loadingGestions: false, payload: { error } });
    if (error.status === 403) {
      showNotification({
        text: 'No tienes permisos para ver las gestiones',
        color: 'danger',
        title: 'Ha ocurrido un error',
      });
    } else {
      console.error(error);
      showNotification({
        text: 'Ocurrió un error al intentar obtener las gestiones',
        color: 'danger',
        title: 'Ha ocurrido un error',
      });
    }
  }
};

export const getAllGestionsManagement = (id, cb) => async (dispatch) => {
  dispatch({ type: GET_GESTIONS_MANAGEMENT, loadingGestionsManagement: true });
  try {
    const { body } = await Gestion.getAllGestionsManagement(id);
    dispatch({
      type: GET_GESTIONS_MANAGEMENT_SUCCESS,
      loadingGestionsManagement: false,
      payload: { gestionsManagement: body },
    });
    if (cb) {
      cb(body);
    }
  } catch (error) {
    dispatch({ type: GET_GESTIONS_MANAGEMENT_FAILED, loadingGestionsManagement: false, payload: { error } });
    if (error.status === 403) {
      showNotification({
        text: 'No tienes permisos para ver las ultimas gestiones',
        color: 'danger',
        title: 'Ha ocurrido un error',
      });
    } else {
      console.error('the error', error);
      showNotification({
        text: 'Ocurrió un error al intentar obtener las ultimas gestiones',
        color: 'danger',
        title: 'Ha ocurrido un error',
      });
    }
  }
};

export const getGestionById = (id, cb) => async (dispatch) => {
  dispatch({ type: GET_CASE_ID, loadingCases: true });
  try {
    const { body } = await Gestion.getGestionById(id);
    if (cb) {
      cb(body);
    }
    dispatch({ type: GET_CASE_ID_SUCCESS, loadingCases: false, payload: { caseInfo: body } });
  } catch (error) {
    dispatch({ type: GET_CASE_ID_FAILED, loadingCases: false, payload: { error } });
    if (error.status === 403) {
      showNotification({
        text: 'No tienes permisos para ver el caso selccionado.',
        color: 'danger',
        title: 'Ha ocurrido un error',
      });
    } else {
      console.error(error);
      showNotification({
        text: 'Ocurrió un error al intentar obtener los datos del caso',
        color: 'danger',
        title: 'Ha ocurrido un error',
      });
    }
  }
};

export const getHistoricalManagement = (id, cb) => async (dispatch) => {
  dispatch({ type: GET_CASE_HISTORICAL, loadingHistorical: true });
  try {
    const { body } = await Gestion.getHistoricalManagement(id);
    if (cb) {
      cb(body);
    }
    dispatch({ type: GET_CASE_HISTORICAL_SUCCESS, loadingHistorical: false, payload: { caseHistorical: body } });
  } catch (error) {
    dispatch({ type: GET_CASE_HISTORICAL_FAILED, loadingHistorical: false, payload: { error } });
    if (error.status === 403) {
      showNotification({
        text: 'No tienes permisos para ver el historial del caso selccionado.',
        color: 'danger',
        title: 'Ha ocurrido un error',
      });
    } else {
      console.error(error);
      showNotification({
        text: 'Ocurrió un error al intentar obtener los datos del caso',
        color: 'danger',
        title: 'Ha ocurrido un error',
      });
    }
  }
};

export const createGestion = (id, data, cb) => async (dispatch) => {
  dispatch({ type: CREATE_GESTION, loadingCreateG: true });
  try {
    showNotification({
      text: 'Creando géstiones...',
      color: '',
      title: 'Procesando',
    });
    const { body } = await Gestion.createGestion(id, data);

    dispatch({ type: CREATE_GESTION_SUCCESS, payload: { gestion: body }, loadingCreateG: false });
    showNotification({
      text: 'Géstiones creada correctamente',
      color: 'success',
      title: 'Acción Exitosa',
    });
    if (cb) {
      cb(body);
    }
  } catch (error) {
    console.error(error);
    showNotification({
      text: 'Ocurrió un error al intentar crear la géstion.',
      color: 'danger',
      title: 'Ha ocurrido un error',
    });
    dispatch({ type: CREATE_GESTION_FAILED, error, loadingCreateG: false });
  }
};
