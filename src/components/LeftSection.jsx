/* eslint-disable function-paren-newline */
import React from 'react';
import {
  Grid,
  Button,
  FormControl,
  FormControlLabel,
  Checkbox,
  useTheme,
  makeStyles,
} from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';

import { categoriesSelector } from '../store/selectors';
import checkCategorieAction from '../store/actions/categoryAction';
import { modalAddAction } from '../store/actions/modalAction';

const useStyles = makeStyles((theme) => ({
  leftSectionBlock: {
    marginTop: '4%',
    backgroundColor: '#edebeb',
  },
  categorieSection: {
    flexDirection: 'column',
    alignContent: 'center',
    justifyContent: 'center',
    textAlign: 'center',
  },
  categorieList: {
    [theme.breakpoints.down('sm')]: {
      justifyContent: 'center',
      flexDirection: 'row',
      flexWrap: 'wrap',
    },
  },
}));

export default function LeftSection() {
  const styles = useStyles();
  const dispatch = useDispatch();
  const categories = useSelector(categoriesSelector);

  const handleChangeCheckboxCategories = (e) => {
    dispatch(checkCategorieAction(e.target.name));
  };

  const handleClickAddProduct = () => {
    dispatch(modalAddAction);
  };

  return (
    <Grid container className={styles.leftSectionBlock}>
      <Grid container justify="center">
        <Button
          variant="contained"
          color="primary"
          disableElevation
          onClick={handleClickAddProduct}
        >
          Ajouter un Produit
        </Button>
      </Grid>
      <Grid className={styles.categorieSection} container>
        <h3 className={styles.title}>Catégories</h3>
        <FormControl className={styles.categorieList}>
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
