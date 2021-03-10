/* eslint-disable no-console */
import UploadFile from '../../api/UploadFile';
import showNotification from '../../helpers/notification';

export const POST_FILE = 'POST_FILE';
export const POST_FILE_SUCCESS = 'POST_FILE_SUCCESS';
export const POST_FILE_FAILED = 'POST_FILE_FAILED';

export const PUT_FILE = 'PUT_FILE';
export const PUT_FILE_SUCCESS = 'PUT_FILE_SUCCESS';
export const PUT_FILE_FAILED = 'PUT_FILE_FAILED';

export const uploadFile = (data, cb) => async (dispatch) => {
  dispatch({ type: POST_FILE, uploadingFile: true });
  showNotification({ text: 'Subiendo archivo...', color: 'info', title: 'Acción en proceso' });
  try {
    const { body } = await UploadFile.uploadFile(data);
    if (cb) {
      cb(body);
    }
    dispatch({ type: POST_FILE_SUCCESS, uploadingFile: false, payload: { uploadedFile: body } });
    showNotification({ text: 'Archivo cargado exitosamente', color: 'success', title: 'Acción Exitosa' });
  } catch (error) {
    dispatch({ type: POST_FILE_FAILED, uploadingFile: false, payload: { error } });
    if (error.status === 403) {
      showNotification.error('No tienes permisos para subir archivos.');
    } else {
      console.error(error);
      showNotification.error('Ocurrió un error al intentar cargar el archivo.');
    }
  }
};

export const uploadFileMora = (data, cb) => async (dispatch) => {
  dispatch({ type: PUT_FILE, uploadingFile: true });
  showNotification({ text: 'Subiendo archivo...', color: 'info', title: 'Acción en proceso' });
  try {
    const { body } = await UploadFile.uploadFileMora(data);
    if (cb) {
      cb(body);
    }
    dispatch({ type: PUT_FILE_SUCCESS, uploadingFile: false, payload: { uploadedFile: body } });
    showNotification({ text: 'Archivo cargado exitosamente', color: 'success', title: 'Acción Exitosa' });
  } catch (error) {
    dispatch({ type: PUT_FILE_FAILED, uploadingFile: false, payload: { error } });
    if (error.status === 403) {
      showNotification.error('No tienes permisos para subir archivos.');
    } else {
      console.error(error);
      showNotification.error('Ocurrió un error al intentar cargar el archivo.');
    }
  }
};
