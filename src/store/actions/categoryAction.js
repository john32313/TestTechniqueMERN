import { CATEGORY_CHECK } from './types';

export default (name) => async (dispatch) => {
  dispatch({
    type: CATEGORY_CHECK,
    payload: { nameCategory: name },
  });
};
