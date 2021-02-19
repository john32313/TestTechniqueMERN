import React from 'react';
import { Grid, CssBaseline, makeStyles } from '@material-ui/core';

const useStyles = makeStyles({
  header: {
    backgroundColor: '#A8AEC1',
    padding: '0 1%',
  },
});

export default function Header() {
  const styles = useStyles();
  return (
    <Grid container className={styles.header}>
      <CssBaseline />
      <h1>Test Technique MERN</h1>
    </Grid>
  );
}
