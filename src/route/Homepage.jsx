import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Grid, Modal, makeStyles } from '@material-ui/core';
import Header from '../components/Header';
import { get } from '../store/actions/productActions';
import LeftSection from '../components/LeftSection';
import MainBlock from '../components/MainBlock';

import ModalProduct from '../components/ModalProduct';
import { modalCloseAction } from '../store/actions/modalAction';
import { modalSelector } from '../store/selectors';

const useStyles = makeStyles((theme) => ({
  modalProduct: {
    backgroundColor: 'white',
    width: '50vw',
    position: 'absolute',
    top: '10%',
    left: '25%',
    padding: '2%',
    [theme.breakpoints.down('sm')]: {
      width: '90vw',
      left: '5%',
    },
  },
}));

export default function Homepage() {
  const dispatch = useDispatch();
  const styles = useStyles();

  useEffect(() => {
    dispatch(get());
  }, []);

  const infoModal = useSelector(modalSelector);
  function showModalBody() {
    if (infoModal.read) {
      return (
        <>
          <h3>Nom: {infoModal.product.name}</h3>
          <h4>Categorie: {infoModal.product.type}</h4>
          <h4>Prix: {infoModal.product.price}€</h4>
          <h4>Evaluation: {infoModal.product.rating}/5</h4>
          <h4>Garantie: {infoModal.product.warranty_years} an(s)</h4>
          <h4>En stock: {infoModal.product.available ? 'Oui' : 'Non'}</h4>
        </>
      );
    }
    if (infoModal.edit || infoModal.add) {
      return <ModalProduct />;
    }
    return <h3>Erreur de chargement</h3>;
  }

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
      <Modal open={infoModal.open} onClose={() => dispatch(modalCloseAction)}>
        <div className={styles.modalProduct}>{showModalBody()}</div>
      </Modal>
    </>
  );
}
