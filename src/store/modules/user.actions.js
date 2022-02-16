import { fetchUserData } from '../../api/user'
import * as types from './user.types'

export const getUserData = formData => async dispatch => {
  dispatch({
    type: types.START_FETCH_USER_DATA
  });

  const userData = await fetchUserData(formData);

  dispatch({
    type: types.FINISH_FETCH_USER_DATA,
    payload: userData
  });
}