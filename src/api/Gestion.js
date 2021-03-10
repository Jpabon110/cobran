import QueryString from 'query-string';
import agent from '../helpers/agent';


export default class Gestion {
  static getAllGestions(query) {
    return agent.get(`/cases/?${QueryString.stringify(query)}`);
  }

  static getAllGestionsMe(query) {
    return agent.get(`/cases/me?${QueryString.stringify(query)}`);
  }

  static getGestionById(id) {
    return agent.get(`/cases/${id}`);
  }

  static getHistoricalManagement(id) {
    return agent.get(`/cases/${id}/historical-management`);
  }

  static createGestion(id, data) {
    return agent.post(`/cases/${id}/management/`, data);
  }

  static getDashboard(query) {
    return agent.get(`/cases/dashboard/?${QueryString.stringify(query)}`);
  }

  static getDashboardMe(query) {
    return agent.get(`/cases/me/dashboard/?${QueryString.stringify(query)}`);
  }

  static getAllGestionsManagement(id) {
    return agent.get(`/cases/${id}/management`);
  }
}
