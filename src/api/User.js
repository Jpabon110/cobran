import QueryString from 'query-string';
import agent from '../helpers/agent';

export default class User {
  static getAllUsers(query) {
    if (query) {
      return agent.get(`/users?${QueryString.stringify(query)}`);
    }
    return agent.get('/users');
  }

  static getUserById(id) {
    return agent.get(`/users/${id}`);
  }

  static createUser(data) {
    return agent.post('/users').send(data);
  }

  static updateUser(id, data) {
    return agent.put(`/users/${id}`).send(data);
  }

  static deleteUser(id) {
    return agent.del(`/users/${id}`);
  }
}
