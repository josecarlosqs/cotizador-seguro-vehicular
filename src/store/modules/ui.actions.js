import * as types from './ui.types'

export const setHeaderExtraClassname = extraClassName => dispatch => {
  dispatch({
    type: types.SET_HEADER_EXTRA_CLASSNAME,
    payload: extraClassName
  });
}