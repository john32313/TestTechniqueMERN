import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Grid } from '@material-ui/core';
import Header from '../components/Header';
import { get } from '../store/actions/productActions';
import LeftSection from '../components/LeftSection';
import MainBlock from '../components/MainBlock';

export default function Homepage() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(get());
  }, []);

  return (
    <>
      <Header />
      <Grid container>
        <Grid item xs={12} md={3}>
          <LeftSection />
        </Grid>
        <Grid item xs={12} md={9}>
          <MainBlock />
        </Grid>
      </Grid>
    </>
  );
}
