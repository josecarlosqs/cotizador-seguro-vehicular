import { registrarSolicitud } from '../../api/seguro'
import * as types from './seguro.types'

export const registerSolicitudSeguro = (seguroFormData) => async dispatch => {
  dispatch({
    type: types.START_REGISTER_INSURANCE_DATA,
    payload: seguroFormData
  });


  const response = await registrarSolicitud(seguroFormData);

  dispatch({
    type: types.FINISH_REGISTER_INSURANCE_DATA,
    payload: response.data
  });
}
