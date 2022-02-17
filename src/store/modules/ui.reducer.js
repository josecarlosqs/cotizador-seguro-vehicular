import * as types from './ui.types'

const initialState = {
  header_extra_className: ''
}

const ui = (state = initialState, action) => {
  switch (action.type) {
    case types.SET_HEADER_EXTRA_CLASSNAME:
      return {
        ...state,
        header_extra_className: action.payload
      }
    default:
      return state
  }
}

export default ui;