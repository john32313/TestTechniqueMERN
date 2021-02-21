/* eslint-disable function-paren-newline */
import React from 'react';
import {
  Grid,
  Button,
  FormControl,
  FormControlLabel,
  Checkbox,
  makeStyles,
} from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';

import { categoriesSelector } from '../store/selectors';
import checkCategorieAction from '../store/actions/categoryAction';

const useStyles = makeStyles({
  leftSectionBlock: {
    padding: '2%',
    margin: '1% 0 0 1%',
    textAlign: 'center',
    border: '1px solid black',

    '& .categorieSection': {
      paddingTop: '10%',
    },
  },
});

export default function LeftSection({ setInfoModal, setEditProdModal }) {
  const styles = useStyles();
  const dispatch = useDispatch();
  const categories = useSelector(categoriesSelector);

  const handleChangeCheckboxCategories = (e) => {
    dispatch(checkCategorieAction(e.target.name));
  };

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
          {categories.map((cat) => (
            <FormControlLabel
              key={cat.type}
              control={
                <Checkbox
                  name={cat.type}
                  checked={cat.checked}
                  onChange={handleChangeCheckboxCategories}
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
};
