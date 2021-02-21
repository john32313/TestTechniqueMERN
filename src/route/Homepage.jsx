import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Grid } from '@material-ui/core';
import Header from '../components/Header';
import { get } from '../store/actions/productActions';
import LeftSection from '../components/LeftSection';
import MainBlock from '../components/MainBlock';

export default function Homepage() {
  const [infoModal, setInfoModal] = useState({ open: false });
  const [editProdModal, setEditProdModal] = useState({});
  const [filter, searchFilter] = useState([]);
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
        <Grid item md="2">
          <LeftSection
            setEditProdModal={setEditProdModal}
            setInfoModal={setInfoModal}
          />
        </Grid>
        <Grid item md="9">
          <MainBlock
            filter={filter}
            editProdModal={editProdModal}
            setEditProdModal={setEditProdModal}
            infoModal={infoModal}
            setInfoModal={setInfoModal}
          />
        </Grid>
      </Grid>
    </>
  );
}
