import { PRODUCT_GET_ALL } from '../actions/types';

const productReducer = (state = [], action) => {
  switch (action.type) {
    case PRODUCT_GET_ALL:
      return [...action.payload];
    default:
      return state;
  }
};

export default productReducer;
