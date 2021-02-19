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
import products from '../products.json';

const useStyles = makeStyles({
  leftSectionBlock: {
    padding: '2%',
    margin: '1% 0 0 1%',
    textAlign: 'center',
    border: '1px solid black',
    width: '20vw',

    '& .categorieSection': {
      paddingTop: '10%',
    },
  },
});

export default function LeftSection() {
  const [categories, setCategories] = useState([]);
  const styles = useStyles();
  useEffect(() => {
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

  const handleClickAddProduct = () => {
    alert('Add Product');
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
