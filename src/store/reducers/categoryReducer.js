import { PRODUCT_GET_ALL, CATEGORY_CHECK } from '../actions/types';

const categorieReducer = (state = [], action) => {
  switch (action.type) {
    case PRODUCT_GET_ALL:
      return [
        ...Array.from(new Set(action.payload.map((p) => p.type))).map((c) => ({
          type: c,
          checked: false,
        })),
      ];

    case CATEGORY_CHECK:
      return [
        ...state.map((cat) => {
          if (cat.type === action.payload.nameCategory) {
            return { ...cat, checked: !cat.checked };
          }
          return cat;
        }),
      ];
    default:
      return state;
  }
};

export default categorieReducer;
