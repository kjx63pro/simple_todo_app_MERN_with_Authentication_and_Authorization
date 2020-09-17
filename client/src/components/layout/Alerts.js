import React, { useContext } from 'react';
import AlertContext from '../../context/alert/alertContext';

const Alerts = () => {
  const alertContext = useContext(AlertContext);

  return alertContext.alerts?.map((alert) => (
    <div key={alert.id}>{alert.msg}</div>
  ));
};

export default Alerts;
