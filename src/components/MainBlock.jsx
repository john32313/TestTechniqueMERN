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
import ModalProduct from './ModalProduct';
import fakeProducts from '../products.json';

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

export default function MainBlock({
  infoModal,
  setInfoModal,
  editProdModal,
  setEditProdModal,
}) {
  const [search, setSearch] = useState('');
  const [products, setProducts] = useState([]);
  const styles = useStyles();

  useEffect(() => {
    setProducts(fakeProducts);
  }, []);

  const handleDelete = (e, id) => {
    alert(`Edition produit ${id}`);
  };

  const ShowGrid = (prod) =>
    prod.map((p) => (
      <Card
        key={p._id}
        className={
          p.available ? styles.cardProduct : styles.cardProductNoneAvailable
        }
      >
        <CardActionArea
          onClick={() => setInfoModal({ open: true, ...p, read: true })}
        >
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
              setEditProdModal(p);
              setInfoModal({ open: true, ...p, edit: true });
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
          <h3>Nom: {infoModal.name}</h3>
          <h4>Categorie: {infoModal.type}</h4>
          <h4>Prix: {infoModal.price}€</h4>
          <h4>Evaluation: {infoModal.rating}/5</h4>
          <h4>Garantie: {infoModal.warranty_years} an(s)</h4>
          <h4>En stock: {infoModal.available ? 'Oui' : 'Non'}</h4>
        </>
      );
    }
    if (infoModal.edit || infoModal.add) {
      return (
        <ModalProduct editProd={editProdModal} setEditProd={setEditProdModal} />
      );
    }
    return <h3>Erreur de chargement</h3>;
  }
  return (
    <Grid container className={styles.mainBlock}>
      <Modal
        open={infoModal.open}
        onClose={() => setInfoModal({ open: false })}
      >
        <div className={styles.modalProduct}>{showModalBody()}</div>
      </Modal>
      <TextField
        id="standard-basic"
        label="Rechercher"
        value={search}
        onChange={(e) => setSearch(e.target.value.toLowerCase())}
      />
      <Grid className={styles.cardGrid} container>
        {search !== ''
          ? ShowGrid(
              products.filter((p) => p.name.toLowerCase().includes(search)),
            )
          : ShowGrid(products)}
      </Grid>
    </Grid>
  );
}
