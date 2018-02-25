import * as serverAPI from '../utils/serverAPI'
import { FETCH_CATEGORIES } from './constants'

export const receiveCategories = categories => {
  return {
    type: FETCH_CATEGORIES,
    categories
  }
}

export const fetchCategories = () => dispatch =>
    serverAPI.fetchCategories()
      .then(categories => dispatch(receiveCategories(categories)))
