import * as types from './coberturas.types'

const initialState = {
  list: {
    loading: false,
    fetched: false,
    data: null
  },
  baseData: {
    loading: false,
    fetched: false,
    data: null
  }
}

const user = (state = initialState, action) => {
  switch (action.type) {
    case types.START_FETCH_COBERTURAS_LIST:
      return {
        ...state,
        list: {
          loading: true,
          fetched: false,
          data: state.list.data
        }
      }
    case types.FINISH_FETCH_COBERTURAS_LIST:
      return {
        ...state,
        list: {
          loading: false,
          fetched: true,
          data: action.payload
        }
      }
    case types.START_FETCH_COBERTURAS_DATA:
      return {
        ...state,
        baseData: {
          loading: true,
          fetched: false,
          data: state.list.data
        }
      }
    case types.FINISH_FETCH_COBERTURAS_DATA:
      return {
        ...state,
        baseData: {
          loading: false,
          fetched: true,
          data: action.payload
        }
      }
    default:
      return state
  }
}

export default user;