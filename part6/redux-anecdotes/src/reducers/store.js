import { combineReducers } from 'redux'

import anecdoteReducer from './anecdoteReducer'
import messageReducer from './messageReducer'
import filterReducer from './filterReducer'

const reducer = combineReducers({
  anecdotes: anecdoteReducer,
  message: messageReducer,
  filter: filterReducer
})

export default reducer