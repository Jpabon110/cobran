/* eslint-disable max-len */
export const GET_GESTIONS = 'GET_GESTIONS';
export const GET_GESTIONS_SUCCESS = 'GET_GESTIONS_SUCCESS';
export const GET_GESTIONS_FAILED = 'GET_GESTIONS_FAILED';

export const GET_CASE_ID = 'GET_CASE_ID';
export const GET_CASE_ID_SUCCESS = 'GET_CASE_ID_SUCCESS';
export const GET_CASE_ID_FAILED = 'GET_CASE_ID_FAILED';

export const CREATE_GESTION = 'CREATE_GESTION';
export const CREATE_GESTION_SUCCESS = 'CREATE_GESTION_SUCCESS';
export const CREATE_GESTION_FAILED = 'CREATE_GESTION_FAILED';

export const GET_CASE_HISTORICAL = 'GET_CASE_HISTORICAL';
export const GET_CASE_HISTORICAL_SUCCESS = 'GET_CASE_HISTORICAL_SUCCESS';
export const GET_CASE_HISTORICAL_FAILED = 'GET_CASE_HISTORICAL_FAILED';

export const GET_GESTIONS_MANAGEMENT = 'GET_GESTIONS_MANAGEMENT';
export const GET_GESTIONS_MANAGEMENT_SUCCESS = 'GET_GESTIONS_MANAGEMENT_SUCCESS';
export const GET_GESTIONS_MANAGEMENT_FAILED = 'GET_GESTIONS_MANAGEMENT_FAILED';

export const GET_DASHBOARD = 'GET_DASHBOARD';
export const GET_DASHBOARD_SUCCESS = 'GET_DASHBOARD_SUCCESS';
export const GET_DASHBOARD_FAILED = 'GET_DASHBOARD_FAILED';

export const GET_DASHBOARD_ME = 'GET_DASHBOARD_ME';
export const GET_DASHBOARD_ME_SUCCESS = 'GET_DASHBOARD_ME_SUCCESS';
export const GET_DASHBOARD_ME_FAILED = 'GET_DASHBOARD_ME_FAILED';

const initState = {
  collection: [],
  count: 0,
  limit: 10,
  gestions: [],
};

export default (state = initState, action) => {
  switch (action.type) {
    case GET_GESTIONS:
      return { ...state, disable: true };
    case GET_GESTIONS_SUCCESS:
      return {
        ...state,
        disable: false,
        gestions: action.payload.gestions,
        countCases: action.payload.countCases,
        limitCases: action.payload.limitCases,
      };
    case GET_GESTIONS_FAILED:
      return { ...state, cargando: false, error: action.payload.error };
    case GET_DASHBOARD:
      return { ...state, disable: true };
    case GET_DASHBOARD_SUCCESS:
      return {
        ...state,
        disable: false,
        dashboard: action.payload.dashboard,
      };
    case GET_DASHBOARD_FAILED:
      return { ...state, cargando: false, error: action.payload.error };
    case GET_DASHBOARD_ME:
      return { ...state, disable: true };
    case GET_DASHBOARD_ME_SUCCESS:
      return {
        ...state,
        disable: false,
        dashboard: action.payload.dashboardMe,
      };
    case GET_DASHBOARD_ME_FAILED:
      return { ...state, cargando: false, error: action.payload.error };
    case GET_CASE_ID:
      return { ...state, loadingInfoCase: true };
    case GET_CASE_ID_SUCCESS:
      return {
        ...state,
        loadingInfoCase: false,
        caseInfo: action.payload.caseInfo,
      };
    case GET_CASE_ID_FAILED:
      return { ...state, loadingInfoCase: false, error: action.payload.error };
    case GET_CASE_HISTORICAL:
      return { ...state, loadingHistorical: true };
    case GET_CASE_HISTORICAL_SUCCESS:
      return {
        ...state,
        loadingHistorical: false,
        caseHistorical: action.payload.caseHistorical,
      };
    case GET_CASE_HISTORICAL_FAILED:
      return { ...state, loadingHistorical: false, error: action.payload.error };
    case CREATE_GESTION:
      return { ...state, loading: true };
    case CREATE_GESTION_SUCCESS:
      return { ...state, loading: false };
    case CREATE_GESTION_FAILED:
      return { ...state, error: action.error, loading: false };
    case GET_GESTIONS_MANAGEMENT:
      return { ...state, disable: true };
    case GET_GESTIONS_MANAGEMENT_SUCCESS:
      return {
        ...state,
        disable: false,
        gestionsManagement: action.payload.gestionsManagement,
      };
    case GET_GESTIONS_MANAGEMENT_FAILED:
      return { ...state, cargando: false, error: action.payload.error };
    default:
      return state;
  }
};
