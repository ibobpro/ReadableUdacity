import * as serverAPI from '../utils/serverAPI'
import { FETCH_COMMENTS, FETCH_COMMENTS_BY_SCORE } from './constants'


export const receiveComments = comments=> {
  return {
    type: FETCH_COMMENTS,
    comments
  }
}

export const receiveCommentsByScore = comments => {
  return {
    type: FETCH_COMMENTS_BY_SCORE,
    comments
  }
}

export const fetchComments = postId => dispatch => {
    return serverAPI.fetchComments(postId)
      .then(comments => dispatch(receiveComments(comments)))
  }

  export const fetchCommentsByScore = postId => dispatch => {
      return serverAPI.fetchComments(postId)
        .then(comments => dispatch(receiveCommentsByScore(comments)))
    }

  export const commentVotes = (id, option,postId) => {
    return dispatch => {
      return serverAPI.commentVotes(id, option)
        .then(comment => serverAPI.fetchComments(postId)
          .then(comments => dispatch(receiveComments(comments))))
    }
  }

  export const newComment = (comment, postId) => dispatch => {
      return serverAPI.newComment(comment)
        .then(comments => serverAPI.fetchComments(postId)
          .then(comments => dispatch(receiveComments(comments))))
    }

  export const removeComment = (comment,postId) => {
    return dispatch => {
      return serverAPI.removeComment(comment)
      .then(comments => serverAPI.fetchComments(postId)
        .then(comments => dispatch(receiveComments(comments))))
    }
  }

  export const updateComment = (comment,postId) => {
    comment = {
      ...comment,
      timestamp: Date.now(),
    };
    return dispatch => {
      return serverAPI.updateComment(comment)
        .then(comments => serverAPI.fetchComments(postId)
          .then(comments => dispatch(receiveComments(comments))))
    }
  }
