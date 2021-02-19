import React from 'react';
import {
  FormControlLabel,
  Switch,
  TextField,
  Button,
  FormGroup,
} from '@material-ui/core';
import PropTypes from 'prop-types';

export default function ModalProduct({ editProd, setEditProd }) {
  const handleEdit = (e) => {
    if (e.target.name === 'available') {
      setEditProd((prev) => ({ ...prev, [e.target.name]: e.target.checked }));
    } else {
      setEditProd((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    }
  };

  const updateProduct = () => {
    const dataReadyToSend = {
      ...editProd,
      price: Number(editProd.price),
      rating: Number(editProd.rating),
      warranty_years: Number(editProd.warranty_years),
    };
    console.log(dataReadyToSend);
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
};
