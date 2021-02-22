/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { Snackbar } from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';
import { useDispatch, useSelector } from 'react-redux';
import Homepage from './route/Homepage';
import { notifSelector } from './store/selectors';
import closeNotif from './store/actions/notifAction';

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

function App() {
  const notif = useSelector(notifSelector);
  const dispatch = useDispatch();

  const handleClose = (event, reason) => {
    dispatch(closeNotif);
  };

  return (
    <div className="App">
      <Homepage />

      <Snackbar open={notif.open} autoHideDuration={3000} onClose={handleClose}>
        <Alert onClose={handleClose} severity={notif.severity}>
          {notif.message}
        </Alert>
      </Snackbar>
    </div>
  );
}

export default App;
