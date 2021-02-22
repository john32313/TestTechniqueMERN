export const productsSelector = (state) => state.products;
export const categoriesSelector = (state) => state.categories;
export const categoriesCheckedSelector = (state) =>
  state.categories.filter((c) => c.checked).map((c) => c.type.toLowerCase());
export const modalSelector = (state) => state.modal;
export const notifSelector = (state) => state.notif;
