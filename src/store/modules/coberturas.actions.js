import { fetchCoberturas, fetchCoberturasData } from '../../api/coberturas'
import * as types from './coberturas.types'

export const getCoberturas = () => async dispatch => {
  dispatch({
    type: types.START_FETCH_COBERTURAS_LIST
  });

  const coberturas = await fetchCoberturas();

  dispatch({
    type: types.FINISH_FETCH_COBERTURAS_LIST,
    payload: coberturas.data
  });
}

export const getBaseData = () => async dispatch => {
  dispatch({
    type: types.START_FETCH_COBERTURAS_DATA
  });

  const baseData = await fetchCoberturasData();

  dispatch({
    type: types.FINISH_FETCH_COBERTURAS_DATA,
    payload: baseData.data
  });
}