import superagentPromise from 'superagent-promise';
import _superagent from 'superagent';

const superAgent = superagentPromise(_superagent, global.Promise);

const API_URL = process.env.REACT_APP_API_URL;

let token = localStorage.getItem('token') || null;

const tokenPlugin = (req) => {
  if (token) {
    req.set('Authorization', `Bearer ${token}`);
  }
};


const agent = {
  del: url => superAgent.del(`${API_URL}${url}`).use(tokenPlugin),
  get: url => superAgent.get(`${API_URL}${url}`).use(tokenPlugin),
  put: (url, body) => superAgent.put(`${API_URL}${url}`, body).use(tokenPlugin),
  post: (url, body) => superAgent.post(`${API_URL}${url}`, body).use(tokenPlugin),
  setToken: (_token) => { token = _token; },
};

export default agent;
