import React, { useState, useEffect } from 'react';
import {
  FormControlLabel,
  Switch,
  TextField,
  Button,
  FormGroup,
} from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';

import { update, add } from '../store/actions/productActions';
import { modalCloseAction } from '../store/actions/modalAction';
import { modalSelector } from '../store/selectors';

export default function ModalProduct() {
  const dispatch = useDispatch();
  const infoModal = useSelector(modalSelector);
  const [infoError, setInfoError] = useState({});
  const [editProd, setEditProd] = useState({
    name: '',
    type: '',
    rating: 0,
    price: 0,
    available: false,
    warranty_years: 0,
  });

  const verifdataForm = (data) => {
    let ok = true;
    let error = {};
    if (!data.name.length) {
      error = { ...error, name: true };
      ok = false;
    }
    if (!data.type.length) {
      error = { ...error, type: true };
      ok = false;
    }
    if (!data.price) {
      error = { ...error, price: true };
      ok = false;
    }
    setInfoError(error);
    return ok;
  };

  useEffect(() => {
    if (!infoModal.add) {
      setEditProd(infoModal.product);
    }
  }, []);

  const handleEdit = (e) => {
    if (e.target.name === 'available') {
      setEditProd((prev) => ({ ...prev, [e.target.name]: e.target.checked }));
    } else if (['price', 'rating', 'warranty_years'].includes(e.target.name)) {
      setEditProd((prev) => ({
        ...prev,
        [e.target.name]: Number(e.target.value),
      }));
    } else {
      setEditProd((prev) => ({
        ...prev,
        [e.target.name]: e.target.value,
      }));
    }
  };

  const updateProduct = () => {
    const dataReadyToSend = {
      ...editProd,
      price: Number(editProd.price),
      rating: Number(editProd.rating),
      warranty_years: Number(editProd.warranty_years),
    };
    if (verifdataForm(dataReadyToSend)) {
      if (infoModal.edit) {
        dispatch(update(dataReadyToSend));
      }
      if (infoModal.add) {
        dispatch(add(dataReadyToSend));
      }
      dispatch(modalCloseAction);
    }
  };

  return (
    <FormGroup>
      <TextField
        error={infoError.name}
        helperText="Info obligatoire"
        onChange={handleEdit}
        value={editProd.name}
        label="Nom:"
        name="name"
      />
      <TextField
        error={infoError.type}
        helperText="Info obligatoire"
        onChange={handleEdit}
        value={editProd.type}
        label="Categorie:"
        name="type"
      />
      <TextField
        error={infoError.price}
        helperText="Info obligatoire"
        onChange={handleEdit}
        value={editProd.price}
        label="Prix"
        name="price"
        type="number"
      />
      <TextField
        onChange={handleEdit}
        value={editProd.rating}
        label="Note:"
        name="rating"
        type="number"
      />
      <TextField
        onChange={handleEdit}
        value={editProd.warranty_years}
        label="Garantie"
        type="number"
        name="warranty_years"
      />
      <FormControlLabel
        control={
          <Switch
            value="available"
            checked={editProd.available}
            onChange={handleEdit}
            name="available"
            color="primary"
          />
        }
        label=" : En Stock"
      />
      <Button onClick={updateProduct}>Valider</Button>
    </FormGroup>
  );
}
