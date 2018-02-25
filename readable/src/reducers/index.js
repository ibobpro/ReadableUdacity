import { combineReducers } from 'redux'
import posts from './posts'
import categories from './categories'
import comments from './comments'
import user from './user'

const rootReducer = combineReducers({
  posts,
  categories,
  comments,
  user
})

export default rootReducer
