/* eslint-disable no-underscore-dangle */
import React from 'react';
import {
  FormControlLabel,
  Switch,
  TextField,
  Button,
  FormGroup,
} from '@material-ui/core';
import axios from 'axios';
import PropTypes from 'prop-types';

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
        return axios
          .put(
            `http://localhost:5000/api/product/${dataReadyToSend._id}`,
            dataReadyToSend,
          )
          .then((response) => console.log('modifié', response))
          .catch((error) => console.log(error));
      }
      if (infoModal.add) {
        return axios
          .post('http://localhost:5000/api/product', dataReadyToSend)
          .then((response) => console.log('crée', response))
          .catch((error) => console.log(error));
      }
      setInfoModal({ open: false });
      return null;
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
