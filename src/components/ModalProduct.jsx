import React from 'react';
import {
  FormControlLabel,
  Switch,
  TextField,
  Button,
  FormGroup,
} from '@material-ui/core';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';

import { update, add } from '../store/actions/productActions';

const verifdataForm = (data) => {
  if (!data.name.length) return false;
  if (!data.type.length) return false;
  if (!data.price) return false;
  return true;
};
export default function ModalProduct({
  infoModal,
  setInfoModal,
  editProd,
  setEditProd,
}) {
  const dispatch = useDispatch();

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
      setInfoModal({ open: false });
    }
    console.log('Champ vide');
    return null;
  };
  return (
    <FormGroup>
      <TextField
        onChange={handleEdit}
        value={editProd.name}
        label="Nom:"
        name="name"
      />
      <TextField
        onChange={handleEdit}
        value={editProd.type}
        label="Categorie:"
        name="type"
      />
      <TextField
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

ModalProduct.propTypes = {
  editProd: PropTypes.shape({
    name: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    rating: PropTypes.number.isRequired,
    warranty_years: PropTypes.number.isRequired,
    available: PropTypes.bool.isRequired,
  }).isRequired,
  setEditProd: PropTypes.func.isRequired,
  setInfoModal: PropTypes.func.isRequired,
  infoModal: PropTypes.shape({
    name: PropTypes.string,
    type: PropTypes.string,
    price: PropTypes.number,
    rating: PropTypes.number,
    warranty_years: PropTypes.number,
    available: PropTypes.bool,
    open: PropTypes.bool,
    add: PropTypes.bool,
    edit: PropTypes.bool,
    read: PropTypes.bool,
  }).isRequired,
};
