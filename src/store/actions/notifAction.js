import { NOTIF_CLOSE } from './types';

const closeNotif = (dispatch) => {
  dispatch({
    type: NOTIF_CLOSE,
  });
};

export default closeNotif;
