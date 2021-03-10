/* eslint-disable camelcase */
import superagentPromise from 'superagent-promise';
import _superagent from 'superagent';

const superAgent = superagentPromise(_superagent, global.Promise);

const URL_BASE = process.env.REACT_APP_API_URL;
const CLOUDINARY_UPLOAD_URL = process.env.REACT_APP_CLOUDINARY_UPLOAD_URL;
console.log('CLOUDINARY_UPLOAD_URL', process.env);

let token = localStorage.getItem('token') || null;

const tokenPlugin = (req) => {
  if (token) {
    req.set('Authorization', `Bearer ${token}`);
  }
};


const Media = {
  getSignature: query => superAgent.get(`${URL_BASE}/signature/${query}`).use(tokenPlugin),
  uploadImage: (fields) => {
    const {
      api_key,
      file,
      folder,
      public_id,
      signature,
      timestamp,
    } = fields;
    return superAgent
      .post(CLOUDINARY_UPLOAD_URL)
      .field('api_key', api_key)
      .field('file', file.file)
      .field('folder', folder)
      .field('public_id', public_id)
      .field('signature', signature)
      .field('timestamp', timestamp);
  },
  setToken: (_token) => { token = _token; },
};

export default Media;
