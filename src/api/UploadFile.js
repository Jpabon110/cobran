import agent from '../helpers/agent';

export default class Gestion {
  static uploadFile(data) {
    return agent.post('/cases').send(data);
  }

  static uploadFileMora(data) {
    return agent.put('/cases').send(data);
  }
}
