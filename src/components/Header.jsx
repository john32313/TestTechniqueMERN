import React from 'react';
import { useHistory } from 'react-router-dom';
import { Grid, CssBaseline, makeStyles, Button } from '@material-ui/core';

const useStyles = makeStyles({
  header: {
    backgroundColor: '#A8AEC1',
    padding: '0 1%',
    justifyContent: 'space-between',
  },
});

export default function Header() {
  const styles = useStyles();
  const history = useHistory();
  const logout = () => {
    localStorage.removeItem('user');
    history.push('/');
  };

  return (
    <Grid container className={styles.header}>
      <CssBaseline />
      <h1>Test Technique MERN</h1>
      <Button onClick={logout}>Se déconnecter</Button>
    </Grid>
  );
}
