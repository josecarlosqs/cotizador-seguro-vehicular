import { combineReducers } from 'redux'

import ui from './modules/ui.reducer'
import user from './modules/user.reducer'
import coberturas from './modules/coberturas.reducer'
import seguro from './modules/seguro.reducer'

export default combineReducers({
  ui,
  user,
  coberturas,
  seguro
})