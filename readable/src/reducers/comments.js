import  { FETCH_COMMENTS, FETCH_COMMENTS_BY_SCORE }  from '../actions/constants'

const initialState = {}

function comments (state = initialState, action) {
  const { comments } = action;
  const objToArrComments = (comments) ? Object.keys(comments) : null
  switch (action.type) {
    case FETCH_COMMENTS:
      return objToArrComments.map((key)=>comments[key]).sort((a,b)=>b.timestamp-a.timestamp)
    case FETCH_COMMENTS_BY_SCORE:
      return objToArrComments.map((key)=>comments[key]).sort((a,b)=>b.voteScore-a.voteScore)
    default:
      return state
  }
}

export default comments
