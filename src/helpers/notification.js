/* eslint-disable no-return-assign */
/* eslint-disable react/jsx-filename-extension */
/* eslint-disable react/react-in-jsx-scope */
import React from 'react';
import NotificationSystem from 'rc-notification';
import { BasicNotification } from '../shared/components/Notification/Notification';

const showNotification = ({ text, color, title }) => {
  let notificationRU = null;
  NotificationSystem.newInstance({}, n => notificationRU = n);
  notificationRU.notice({
    content: <BasicNotification
      color={color}
      title={title}
      message={text}
    />,
    duration: 5,
    closable: true,
    style: { top: 0, left: 'calc(100vw - 100%)' },
    className: 'right-up',
  });
  // notificationRU.destroy();
};

export default showNotification;
