import { FETCH_CATEGORIES } from '../actions/constants'

const initialState = {}

const categories =  (state = initialState, action) => {
  const { categories } = action;
  const objToArrCategories = (categories) ? Object.keys(categories) : null
  switch (action.type) {
    case FETCH_CATEGORIES:
      return objToArrCategories.map((key)=>categories[key])
    default:
      return state
  }
}

export default categories
