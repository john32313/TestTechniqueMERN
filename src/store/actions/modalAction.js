import { MODAL_READ, MODAL_EDIT, MODAL_ADD, MODAL_CLOSE } from './types';

export const modalReadAction = (product) => (dispatch) => {
  dispatch({
    type: MODAL_READ,
    payload: product,
  });
};

export const modalEditAction = (product) => (dispatch) => {
  dispatch({
    type: MODAL_EDIT,
    payload: product,
  });
};

export const modalAddAction = (dispatch) => {
  dispatch({
    type: MODAL_ADD,
  });
};

export const modalCloseAction = (dispatch) => {
  dispatch({
    type: MODAL_CLOSE,
  });
};
