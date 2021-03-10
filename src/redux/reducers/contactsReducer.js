/* eslint-disable max-len */
export const GET_CONTRACTS = 'GET_CONTRACTS';
export const GET_CONTRACTS_SUCCESS = 'GET_CONTRACTS_SUCCESS';
export const GET_CONTRACTS_FAILED = 'GET_CONTRACTS_FAILED';

export const GET_CONTACT_BY_RUT = 'GET_CONTACT_BY_RUT';
export const GET_CONTACT_BY_RUT_SUCCESS = 'GET_CONTACT_BY_RUT_SUCCESS';
export const GET_CONTACT_BY_RUT_FAILED = 'GET_CONTACT_BY_RUT_FAILED';

export const UPDATE_CONTACT = 'UPDATE_CONTACT';
export const UPDATE_CONTACT_SUCCESS = 'UPDATE_CONTACT_SUCCESS';
export const UPDATE_CONTACT_FAILED = 'UPDATE_CONTACT_FAILED';

const initState = {
  collection: [],
  count: 0,
  limit: 10,
  contracts: [],
};

export default (state = initState, action) => {
  switch (action.type) {
    case GET_CONTACT_BY_RUT:
      return { ...state, loadingContracts: true };
    case GET_CONTACT_BY_RUT_SUCCESS:
      return {
        ...state,
        loadingContracts: false,
        contacts: action.payload.contacts,
        // countCases: action.payload.countCases,
        // limitCases: action.payload.limitCases,
      };
    case GET_CONTACT_BY_RUT_FAILED:
      return { ...state, loadingContracts: false, error: action.payload.error };
    case UPDATE_CONTACT:
      return { ...state, cargando: true };
    case UPDATE_CONTACT_SUCCESS:
      return { ...state, cargando: false };
    case UPDATE_CONTACT_FAILED:
      return { ...state, cargando: false, error: action.payload.error };
    case GET_CONTRACTS:
      return { ...state, loadingContracts: true };
    case GET_CONTRACTS_SUCCESS:
      return {
        ...state,
        loadingContracts: false,
        contracts: action.payload.contracts,
        // countCases: action.payload.countCases,
        // limitCases: action.payload.limitCases,
      };
    case GET_CONTRACTS_FAILED:
      return { ...state, loadingContracts: false, error: action.payload.error };
    default:
      return state;
  }
};
