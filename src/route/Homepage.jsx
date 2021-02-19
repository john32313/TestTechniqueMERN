import React from 'react';
import { Grid } from '@material-ui/core';
import Header from '../components/Header';
import LeftSection from '../components/LeftSection';
import MainBlock from '../components/MainBlock';

export default function Homepage() {
  return (
    <>
      <Header />
      <Grid container justify="space-between">
        <LeftSection />
        <MainBlock />
      </Grid>
    </>
  );
}
