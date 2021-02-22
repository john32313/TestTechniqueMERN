/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect } from 'react';
import {
  Switch,
  Route,
  Redirect,
  useLocation,
  useHistory,
} from 'react-router-dom';
import { Snackbar } from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import Homepage from './route/Homepage';
import Login from './route/Login';
import { notifSelector } from './store/selectors';
import closeNotif from './store/actions/notifAction';

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

function verifLS() {
  const user = localStorage.getItem('user');
  return user || false;
}

function App() {
  const notif = useSelector(notifSelector);
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    axios
      .get('http://localhost:5000/api/login')
      .then((res) => {
        console.log(res);
        localStorage.setItem('user', res.data.email);
        history.push('/');
      })
      .catch((err) => <Redirect to="/se-connecter" />);
  }, []);

  const handleClose = (event, reason) => {
    dispatch(closeNotif);
  };

  return (
    <div className="App">
      <Snackbar open={notif.open} autoHideDuration={3000} onClose={handleClose}>
        <Alert onClose={handleClose} severity={notif.severity}>
          {notif.message}
        </Alert>
      </Snackbar>
      <Switch>
        <Route path="/se-connecter">
          <Login />
        </Route>
        <Route path="/nos-produits">
          <Homepage />
        </Route>
        <Route
          path="/"
          render={() => {
            if (!verifLS()) {
              return <Redirect to="/se-connecter" />;
            }
            return <Redirect to="nos-produits" />;
          }}
        />
      </Switch>
    </div>
  );
}

export default App;
