import React from 'react';
import {
  // Card, CardBody, Col,
  Button, ButtonToolbar,
} from 'reactstrap';
import { Field, reduxForm } from 'redux-form';
import PropTypes from 'prop-types';
import { withTranslation } from 'react-i18next';
import renderDropZoneField from '../../form/DropZone';

const FileUploadDefault = ({ handleSubmit, reset }) => (
  <form className="form" onSubmit={handleSubmit}>
    <Field
      name="files"
      component={renderDropZoneField}
    />
    <ButtonToolbar className="form__button-toolbar" style={{ justifyContent: 'flex-end' }}>
      <Button style={{ backgroundColor: '#595959', color: '#fff' }} type="submit">Subir</Button>
      <Button type="reset" onClick={reset}>
        Cancel
      </Button>
    </ButtonToolbar>
  </form>
);

FileUploadDefault.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  reset: PropTypes.func.isRequired,
};

export default reduxForm({
  form: 'file_upload_default', // a unique identifier for this form
})(withTranslation('common')(FileUploadDefault));
