import React from 'react';
import { Alert } from 'antd';
import './error-message.css';

const ErrorMessage = ({ message }) => {
  return (
    <div className="container error">
      <Alert
        message="Ошибка"
        description={message}
        type="error"
        showIcon
        className="error__message"
      />
    </div>
  );
};

export default ErrorMessage;
