/* eslint-disable max-len */
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

const initState = {
  asignation: [],
  count: 0,
  limit: 10,
  portfolios: [],
};

export default (state = initState, action) => {
  switch (action.type) {
    case GET_PORTFOLIO:
      return { ...state, disable: true };
    case GET_PORTFOLIO_SUCCESS:
      return {
        ...state,
        disable: false,
        portfolios: action.payload.portfolios,
      };
    case GET_PORTFOLIO_FAILED:
      return { ...state, cargando: false, error: action.payload.error };
    case GET_PORTFOLIO_DATE:
      return { ...state, disable: true };
    case GET_PORTFOLIO_DATE_SUCCESS:
      return {
        ...state,
        disable: false,
        datePortfolio: action.payload.datePortfolio,
      };
    case GET_PORTFOLIO_DATE_FAILED:
      return { ...state, cargando: false, error: action.payload.error };
    case GET_LAST_DATE_ASIGMENT:
      return { ...state, loadLastDateAsigments: true };
    case GET_LAST_DATE_ASIGMENT_SUCCESS:
      return {
        ...state,
        loadLastDateAsigments: false,
        infoLastDate: action.payload.infoLastDate,
      };
    case GET_LAST_DATE_ASIGMENT_FAILED:
      return { ...state, loadLastDateAsigments: false, error: action.payload.error };
    case GET_ASIGMENT:
      return { ...state, loadAsigments: true };
    case GET_ASIGMENT_SUCCESS:
      return {
        ...state,
        loadAsigments: false,
        asignation: action.payload.calculated,
      };
    case GET_ASIGMENT_FAILED:
      return { ...state, loadAsigments: false, error: action.payload.error };
    case SET_ASIGMENT:
      return { ...state, loadAsigments: true };
    case SET_ASIGMENT_SUCCESS:
      return {
        ...state,
        loadAsigments: false,
      };
    case SET_ASIGMENT_FAILED:
      return { ...state, loadAsigments: false, error: action.payload.error };
    default:
      return state;
  }
};
