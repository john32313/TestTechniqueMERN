/* eslint-disable function-paren-newline */
import React, { useState, useEffect } from 'react';
import {
  Grid,
  Button,
  FormControl,
  FormControlLabel,
  Checkbox,
  makeStyles,
} from '@material-ui/core';
import axios from 'axios';
import PropTypes from 'prop-types';

const useStyles = makeStyles({
  leftSectionBlock: {
    padding: '2%',
    margin: '1% 0 0 1%',
    textAlign: 'center',
    border: '1px solid black',
    width: '20vw',
    minWidth: '200px',

    '& .categorieSection': {
      paddingTop: '10%',
    },
  },
});

export default function LeftSection({
  setInfoModal,
  setEditProdModal,
  searchFilter,
}) {
  const [categories, setCategories] = useState([]);
  const styles = useStyles();
  useEffect(async () => {
    const { data: products } = await axios.get(
      'http://localhost:5000/api/product',
    );
    setCategories(
      Array.from(new Set(products.map((p) => p.type))).map((c) => ({
        type: c,
        checked: false,
      })),
    );
  }, []);

  const handleChangeCheckboxCategories = (e, index) => {
    setCategories((prev) =>
      prev.map((c, i) => {
        if (i === index) {
          return {
            type: e.target.name,
            checked: e.target.checked,
          };
        }
        return c;
      }),
    );
  };

  useEffect(() => {
    searchFilter(categories.filter((c) => c.checked).map((c) => c.type));
  }, [categories]);

  const handleClickAddProduct = () => {
    setEditProdModal({
      name: '',
      type: '',
      rating: 0,
      price: 0,
      available: false,
      warranty_years: 0,
    });
    setInfoModal({ open: true, add: true });
  };

  return (
    <Grid container direction="column" className={styles.leftSectionBlock}>
      <Button
        variant="contained"
        color="primary"
        disableElevation
        onClick={handleClickAddProduct}
      >
        Ajouter un Produit
      </Button>
      <Grid className="categorieSection" container direction="column">
        <h3>Catégories</h3>
        <FormControl>
          {categories.map((cat, index) => (
            <FormControlLabel
              key={cat.type}
              control={
                <Checkbox
                  name={cat.type}
                  value={cat.type}
                  checked={cat.checked}
                  onChange={(e) => handleChangeCheckboxCategories(e, index)}
                />
              }
              label={cat.type}
            />
          ))}
        </FormControl>
      </Grid>
    </Grid>
  );
}

LeftSection.propTypes = {
  setInfoModal: PropTypes.func.isRequired,
  setEditProdModal: PropTypes.func.isRequired,
  searchFilter: PropTypes.func.isRequired,
};
