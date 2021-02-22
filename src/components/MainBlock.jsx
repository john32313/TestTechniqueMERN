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

import { remove } from '../store/actions/productActions';
import { modalReadAction, modalEditAction } from '../store/actions/modalAction';
import {
  productsSelector,
  categoriesCheckedSelector,
} from '../store/selectors';

const useStyles = makeStyles((theme) => ({
  mainBlock: {
    justifyContent: 'center',
    [theme.breakpoints.up('md')]: {
      paddingLeft: '2%',
      justifyContent: 'flex-end',
    },
  },
  cardGrid: {
    maxHeight: '80vh',
    overflowY: 'auto',
    flexDirection: 'column',
  },
  cardProduct: {
    margin: '1%',
    color: '#8ac24e',
  },
  cardProductNoneAvailable: {
    margin: '1%',
    color: '#d66358',
  },
  boxSubtitlesCard: {
    display: 'flex',
    justifyContent: 'space-between',
  },
}));

export default function MainBlock() {
  const [search, setSearch] = useState('');
  const products = useSelector(productsSelector);
  const filter = useSelector(categoriesCheckedSelector);
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
