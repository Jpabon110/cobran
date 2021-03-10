import agent from '../helpers/agent';

export default class Login {
  /**
 * Auth user in system.
 * @param {string} email - the email user
 * @param {string} password - password of the account
 * @return {object} The auth token.
 */
  static auth(email, password) {
    return agent.post('/sign-in').send({ email, password });
  }

  static logOut() {
    return agent.post('/sign-out');
  }

  static recoverPass(email) {
    return agent.post('/recover-password').send({ email });
  }
}
