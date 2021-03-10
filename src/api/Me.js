import agent from '../helpers/agent';
import Media from '../helpers/media';

export default class Post {
  static getMe() {
    return agent.get('/users/me');
  }

  static updateMe(data) {
    return agent.put('/users/me').send(data);
  }

  static updatePassword(data) {
    return agent.put('/users/me/password').send(data);
  }

  static getSignature() {
    return Media.getSignature('avatar');
  }

  static uploadFile(data, signature) {
    return Media.uploadImage({
      api_key: signature.apiKey,
      file: data.avatar,
      folder: signature.folder,
      public_id: signature.publicId,
      signature: signature.signature,
      timestamp: signature.timestamp,
    });
  }
}
