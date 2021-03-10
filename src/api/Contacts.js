// import QueryString from 'query-string';
import agent from '../helpers/agent';

export default class Contact {
  static getContracts(query) {
    return agent.get(`/contacts/RUT/${query}/contracts`);
  }

  static getContractsByRut(rut) {
    return agent.get(`/contacts/RUT/${rut}`);
  }

  static update(id, data) {
    return agent.put(`/contacts/${id}`, data);
  }
}
