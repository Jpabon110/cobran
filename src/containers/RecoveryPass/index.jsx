/* eslint-disable global-require */
/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
import React from 'react';
// import { Link } from 'react-router-dom';
// import FacebookIcon from 'mdi-react/FacebookIcon';
// import GooglePlusIcon from 'mdi-react/GooglePlusIcon';
import RecoveryForm from './components/recoveryForm';

const Recovery = props => (
  <div className="account">
    <div className="account__wrapper rectangle">
      <div className="account__card">
        <RecoveryForm {...props} />
      </div>
    </div>
  </div>
);

export default Recovery;

// if you want to add select, date-picker and time-picker in your app you need to uncomment the first
// four lines in /scss/components/form.scss to add styles
