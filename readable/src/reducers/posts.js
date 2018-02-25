import { FETCH_POSTS, FETCH_POST, FETCH_POSTS_BY_SCORE } from '../actions/constants'

const initialState = {}

function posts (state = initialState, action) {
  const { posts, post } = action;
  const objToArrPosts = (posts) ? Object.keys(posts) : null
  switch (action.type) {
    case FETCH_POSTS:
      return objToArrPosts.map((key)=>posts[key]).sort((a,b)=>b.timestamp-a.timestamp)
    case FETCH_POST:
      return post
    case FETCH_POSTS_BY_SCORE:
      return objToArrPosts.map((key)=>posts[key]).sort((a,b)=>b.voteScore-a.voteScore)
    default:
      return state
  }
}

export default posts
