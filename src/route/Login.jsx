import React from 'react';
import { Redirect } from 'react-router-dom';
import { Grid, TextField, Button, makeStyles } from '@material-ui/core';
import axios from 'axios';

const useStyles = makeStyles({
  loginPage: {
    height: '100vh',
  },
});

export default function Login() {
  const styles = useStyles();
  const [login, setLogin] = React.useState({ email: '', password: '' });
  const [error, setError] = React.useState({});

  const handleLogin = (e) => {
    setLogin((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleConnect = (e) => {
    let err = {};
    if (login.email.length === 0) {
      err = { ...err, email: true };
    }
    if (login.password.length === 0) {
      err = { ...err, password: true };
    }
    setError(err);
    if (Object.keys(err).length === 0) {
      axios
        .post('http://localhost:5000/api/login', {
          email: login.email,
          password: login.password,
        })
        .then((res) => <Redirect to="/" />)
        .catch((res) => setError({ email: true, password: true }));
    }
  };

  return (
    <Grid
      className={styles.loginPage}
      container
      justify="center"
      align="center"
      alignContent="center"
    >
      <Grid container direction="column" item xs={6}>
        <TextField
          error={error.email}
          name="email"
          label="Mail"
          value={login.email}
          onChange={handleLogin}
        />
        <TextField
          error={error.password}
          name="password"
          label="Password"
          value={login.password}
          onChange={handleLogin}
        />
        <Button onClick={handleConnect}>Se Connecter</Button>
      </Grid>
    </Grid>
  );
}
