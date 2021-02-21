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
      <Grid
        className="MuiGrid-align-content-xs-center"
        container
        justify="space-between"
      >
        <LeftSection />
        <MainBlock />
      </Grid>
    </>
  );
}
