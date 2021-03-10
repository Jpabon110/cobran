import {
  POST_FILE,
  POST_FILE_SUCCESS,
  POST_FILE_FAILED,
  PUT_FILE,
  PUT_FILE_SUCCESS,
  PUT_FILE_FAILED,
} from '../actions/uploadFileActions';

const initialState = {
  uploadingFile: false,
  infoFile: {},
  User: null,
};

export default function uploadFile(state = initialState, action) {
  switch (action.type) {
    case POST_FILE:
      return { ...state, uploadingFile: true };
    case POST_FILE_SUCCESS:
      return { ...state, infoFile: action.payload.uploadedFile, uploadingFile: false };
    case POST_FILE_FAILED:
      return { ...state, error: action.error, uploadingFile: false };
    case PUT_FILE:
      return { ...state, uploadingFile: true };
    case PUT_FILE_SUCCESS:
      return { ...state, uploadingFile: false };
    case PUT_FILE_FAILED:
      return { ...state, error: action.error };
    default:
      return state;
  }
}
