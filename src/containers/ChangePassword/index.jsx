import React from 'react';

import ChangePassword from './components/changePasswordForm';

const Panel = props => (
  <ChangePassword {...props} />
);

export default Panel;

// if you want to add select, date-picker and time-picker in your app you need to uncomment the first
// four lines in /scss/components/form.scss to add styles
