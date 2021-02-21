import axios from 'axios';
import { PRODUCT_GET_ALL } from './types';

export const get = () => async (dispatch) => {
  const { data } = await axios.get('http://localhost:5000/api/product');
  dispatch({
    type: PRODUCT_GET_ALL,
    payload: data,
  });
};

export const add = (dataProduct) => async (dispatch) => {
  await axios.post('http://localhost:5000/api/product', dataProduct);
  const { data } = await axios.get('http://localhost:5000/api/product');

  dispatch({
    type: PRODUCT_GET_ALL,
    payload: data,
  });
};

export const update = (dataProduct) => async (dispatch) => {
  await axios.put(
    `http://localhost:5000/api/product/${dataProduct._id}`,
    dataProduct,
  );
  const { data } = await axios.get('http://localhost:5000/api/product');

  dispatch({
    type: PRODUCT_GET_ALL,
    payload: data,
  });
};

export const remove = (id) => async (dispatch) => {
  await axios.delete(`http://localhost:5000/api/product/${id}`);
  const { data } = await axios.get('http://localhost:5000/api/product');

  dispatch({
    type: PRODUCT_GET_ALL,
    payload: data,
  });
};
