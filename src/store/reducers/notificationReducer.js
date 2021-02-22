import { NOTIF_SUCCESS, NOTIF_ERROR, NOTIF_CLOSE } from '../actions/types';

const notificationReducer = (state = { open: false }, action) => {
  switch (action.type) {
    case NOTIF_SUCCESS:
      return { open: true, message: action.payload, severity: 'success' };

    case NOTIF_ERROR:
      return { open: true, message: action.payload, severity: 'error' };

    case NOTIF_CLOSE:
      return { open: false };

    default:
      return state;
  }
};

export default notificationReducer;
