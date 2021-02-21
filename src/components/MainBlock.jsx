/* eslint-disable indent */
/* eslint-disable no-underscore-dangle */
import React, { useState, useEffect } from 'react';
import {
  Grid,
  makeStyles,
  TextField,
  Card,
  CardActionArea,
  CardContent,
  CardActions,
  Button,
  Box,
  Modal,
} from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import ModalProduct from './ModalProduct';

import { remove } from '../store/actions/productActions';
import {
  modalReadAction,
  modalEditAction,
  modalCloseAction,
} from '../store/actions/modalAction';
import {
  productsSelector,
  categoriesCheckedSelector,
  modalSelector,
} from '../store/selectors';

const useStyles = makeStyles({
  mainBlock: {
    width: '70vw',
  },
  cardProduct: {
    width: '25%',
    minWidth: '200px',
    margin: '2%',
    backgroundColor: '#AEB4A9',
  },
  cardProductNoneAvailable: {
    width: '25%',
    minWidth: '200px',
    margin: '2%',
    backgroundColor: '#C37D92',
  },
  cardGrid: {
    justifyContent: 'flex-start',
    maxHeight: '80vh',
    overflowY: 'auto',
  },
  boxSubtitlesCard: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  modalProduct: {
    backgroundColor: 'white',
    width: '50vw',
    position: 'absolute',
    top: '10%',
    left: '25%',
    padding: '2%',
  },
});

export default function MainBlock() {
  const [search, setSearch] = useState('');
  const products = useSelector(productsSelector);
  const filter = useSelector(categoriesCheckedSelector);
  const infoModal = useSelector(modalSelector);
  const styles = useStyles();
  const dispatch = useDispatch();

  const handleDelete = (e, id) => {
    dispatch(remove(id));
  };

  const ShowGrid = (prod) =>
    prod.map((p) => (
      <Card
        key={p._id}
        className={
          p.available ? styles.cardProduct : styles.cardProductNoneAvailable
        }
      >
        <CardActionArea onClick={() => dispatch(modalReadAction(p))}>
          <CardContent>
            <h3>{p.name}</h3>
            <Box components="div" className={styles.boxSubtitlesCard}>
              <h4>{p.price} €</h4>
              <h4>{p.rating}/5</h4>
            </Box>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <Button
            size="small"
            color="primary"
            onClick={() => {
              dispatch(modalEditAction(p));
            }}
          >
            Editer
          </Button>
          <Button
            size="small"
            color="primary"
            onClick={(e) => handleDelete(e, p._id)}
          >
            Supprimer
          </Button>
        </CardActions>
      </Card>
    ));

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

  const filteredSeach = () => {
    let filteredResult = [...products];
    if (search !== '') {
      filteredResult = [
        ...filteredResult.filter((p) => p.name.toLowerCase().includes(search)),
      ];
    }
    if (filter.length) {
      filteredResult = [
        ...filteredResult.filter((p) => filter.includes(p.type)),
      ];
    }
    return ShowGrid(filteredResult);
  };

  return (
    <Grid container className={styles.mainBlock}>
      <Modal open={infoModal.open} onClose={() => dispatch(modalCloseAction)}>
        <div className={styles.modalProduct}>{showModalBody()}</div>
      </Modal>
      <TextField
        id="standard-basic"
        label="Rechercher"
        value={search}
        onChange={(e) => setSearch(e.target.value.toLowerCase())}
      />
      <Grid className={styles.cardGrid} container>
        {search !== '' || filter.length !== 0
          ? filteredSeach()
          : ShowGrid(products)}
      </Grid>
    </Grid>
  );
}
