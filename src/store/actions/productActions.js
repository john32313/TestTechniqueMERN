import axios from 'axios';
import { PRODUCT_GET_ALL, NOTIF_SUCCESS, NOTIF_ERROR } from './types';

export const get = () => async (dispatch) => {
  try {
    const { data } = await axios.get('http://localhost:5000/api/product');
    dispatch({
      type: PRODUCT_GET_ALL,
      payload: data,
    });
  } catch (err) {
    dispatch({
      type: NOTIF_ERROR,
      payload: 'Erreur détecter lors de la récupération des produits',
    });
  }
};

export const add = (dataProduct) => async (dispatch) => {
  try {
    await axios.post('http://localhost:5000/api/product', dataProduct);
    const { data } = await axios.get('http://localhost:5000/api/product');

    dispatch({
      type: PRODUCT_GET_ALL,
      payload: data,
    });
    dispatch({
      type: NOTIF_SUCCESS,
      payload: 'Produit ajouté !',
    });
  } catch (err) {
    dispatch({
      type: NOTIF_ERROR,
      payload: "Erreur détecter lors de l'ajout du produit",
    });
  }
};

export const update = (dataProduct) => async (dispatch) => {
  try {
    await axios.put(
      `http://localhost:5000/api/product/${dataProduct._id}`,
      dataProduct,
    );
    const { data } = await axios.get('http://localhost:5000/api/product');

    dispatch({
      type: PRODUCT_GET_ALL,
      payload: data,
    });

    dispatch({
      type: NOTIF_SUCCESS,
      payload: 'Produit mis à jour !',
    });
  } catch (err) {
    dispatch({
      type: NOTIF_ERROR,
      payload: "Erreur détecter lors de l'édition du produit",
    });
  }
};

export const remove = (id) => async (dispatch) => {
  try {
    await axios.delete(`http://localhost:5000/api/product/${id}`);
    const { data } = await axios.get('http://localhost:5000/api/product');

    dispatch({
      type: PRODUCT_GET_ALL,
      payload: data,
    });
    dispatch({
      type: NOTIF_SUCCESS,
      payload: 'Produit supprimé !',
    });
  } catch (err) {
    dispatch({
      type: NOTIF_ERROR,
      payload: 'Erreur détecter lors de la suppression du produit',
    });
  }
};
