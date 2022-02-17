import * as types from './user.types'

const initialState = {
  loading: false,
  fetched: false,
  data: null
}

const user = (state = initialState, action) => {
  switch (action.type) {
    case types.START_FETCH_USER_DATA:
      return {
        ...state,
        loading: true,
        fetched: false,
      }
    case types.FINISH_FETCH_USER_DATA:
      return {
        ...state,
        loading: false,
        fetched: true,
        data: action.payload
      }
    default:
      return state
  }
}

export default user;