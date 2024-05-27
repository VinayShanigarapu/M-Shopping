import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faExclamationTriangle, faCircleExclamation } from '@fortawesome/free-solid-svg-icons';
import './css/toast.css'; // Import the CSS file for styling

const Toast = ({ message, toastType, duration = 5000 }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, duration);

    return () => {
      clearTimeout(timer);
    };
  }, [duration]);

  const getIcon = () => {
    switch (toastType) {
      case 'success':
        return <FontAwesomeIcon icon={faCheck} />;
      case 'danger':
        return <FontAwesomeIcon icon={faExclamationTriangle} />;
      case 'warning':
        return <FontAwesomeIcon icon={faCircleExclamation} />;
      default:
        return null;
    }
  };

  return (
    <div className={`toast toast-${toastType} ${isVisible ? 'show' : 'closing'}`}>
      <div className="toast-content-wrapper">
        <div className="toast-icon">{getIcon()}</div>
        <div className="toast-message">{message}</div>
        <div className="toast-progress"></div>
      </div>
    </div>
  );
};

export default Toast;
