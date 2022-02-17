import * as types from './seguro.types'

const initialState = {
  registration: {
    loading: false,
    fetched: false,
    data: null,
    formData: null
  },
}

const seguro = (state = initialState, action) => {
  switch (action.type) {
    case types.START_REGISTER_INSURANCE_DATA:
      return {
        ...state,
        registration: {
          loading: true,
          fetched: false,
          data: state.registration.data,
          formData: action.payload
        }
      }
    case types.FINISH_REGISTER_INSURANCE_DATA:
      return {
        ...state,
        registration: {
          loading: false,
          fetched: true,
          data: action.payload,
          formData: state.registration.formData
        }
      }
    default:
      return state
  }
}

export default seguro;