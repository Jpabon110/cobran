import QueryString from 'query-string';
import agent from '../helpers/agent';

export default class Gestion {
  static getPortfolio() {
    return agent.get('/cases/summary');
  }

  static getDatePortfolio() {
    return agent.get('/inserts?last=true');
  }

  static getAsignation(query) {
    return agent.get(`/cases/assigned?${QueryString.stringify(query)}`);
  }

  static setAsignation(data) {
    return agent.put('/cases', data);
  }

  static getLastDateAssignment(query) {
    return agent.get(`/assignment?last=1&${QueryString.stringify(query)}`);
  }
}
