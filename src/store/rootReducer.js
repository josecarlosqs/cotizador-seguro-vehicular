import { combineReducers } from 'redux'

import user from './modules/user.reducer'
import coberturas from './modules/coberturas.reducer'
import seguro from './modules/seguro.reducer'

export default combineReducers({
  user,
  coberturas,
  seguro
})