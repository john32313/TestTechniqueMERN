import React, { useState } from 'react';
import { Grid } from '@material-ui/core';
import Header from '../components/Header';
import LeftSection from '../components/LeftSection';
import MainBlock from '../components/MainBlock';

export default function Homepage() {
  const [infoModal, setInfoModal] = useState({ open: false });
  const [editProdModal, setEditProdModal] = useState({});
  return (
    <>
      <Header />
      <Grid container justify="space-between">
        <LeftSection
          setEditProdModal={setEditProdModal}
          setInfoModal={setInfoModal}
        />
        <MainBlock
          editProdModal={editProdModal}
          setEditProdModal={setEditProdModal}
          infoModal={infoModal}
          setInfoModal={setInfoModal}
        />
      </Grid>
    </>
  );
}
