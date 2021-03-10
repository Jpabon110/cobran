import React from 'react';
// import { Col, Container, Row } from 'reactstrap';
import { withTranslation } from 'react-i18next';
// import PropTypes from 'prop-types';
import showResults from './components/Show';
import FileUploadDefault from './components/FileUploadDefault';
// import FileUploadCustomHeight from './components/FileUploadCustomHeight';

const FileUpload = () => (
  <FileUploadDefault onSubmit={showResults} />
);

FileUpload.propTypes = {
  // t: PropTypes.func.isRequired,
};

export default withTranslation('common')(FileUpload);
