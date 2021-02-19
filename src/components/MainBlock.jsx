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
} from '@material-ui/core';
import fakeProducts from '../products.json';

const useStyles = makeStyles({
  mainBlock: {
    width: '70vw',
  },
  cardProduct: {
    width: '25%',
    minWidth: '200px',
    margin: '2%',
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
});

export default function MainBlock() {
  const [search, setSearch] = useState('');
  const [products, setProducts] = useState([]);
  const styles = useStyles();

  useEffect(() => {
    setProducts(fakeProducts);
  }, []);

  const handleEdit = (e, id) => {
    alert(`Edition produit ${id}`);
  };

  const handleDelete = (e, id) => {
    alert(`Edition produit ${id}`);
  };

  const handleShowProduct = (e, id) => {
    alert(`Show produit ${id}`);
  };

  const ShowGrid = (prod) =>
    prod.map((p) => (
      <Card key={p._id} className={styles.cardProduct}>
        <CardActionArea onClick={(e) => handleShowProduct(e, p._id)}>
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
            onClick={(e) => handleEdit(e, p._id)}
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

  return (
    <Grid container className={styles.mainBlock}>
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
