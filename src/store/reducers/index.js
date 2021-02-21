import { combineReducers } from 'redux';
import productReducer from './productReducer';
import categoryReducer from './categoryReducer';
import modalReducer from './modalReducer';

export default combineReducers({
  products: productReducer,
  categories: categoryReducer,
  modal: modalReducer,
});
