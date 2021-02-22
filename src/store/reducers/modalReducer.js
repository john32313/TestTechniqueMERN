import {
  MODAL_READ,
  MODAL_EDIT,
  MODAL_ADD,
  MODAL_CLOSE,
} from '../actions/types';

const initial = {
  open: false,
  read: false,
  edit: false,
  add: false,
};

const modalReducer = (state = initial, action) => {
  switch (action.type) {
    case MODAL_READ:
      return { ...state, open: true, read: true, product: action.payload };
    case MODAL_EDIT:
      return { ...state, open: true, edit: true, product: action.payload };
    case MODAL_ADD:
      return { ...state, open: true, add: true };
    case MODAL_CLOSE:
      return initial;
    default:
      return state;
  }
};

export default modalReducer;
