import * as serverAPI from '../utils/serverAPI'
import {FETCH_POSTS, FETCH_POST, FETCH_POSTS_BY_SCORE } from './constants'

export const receivePosts = posts => {
  return {
    type: FETCH_POSTS,
    posts
  }
}

export const receivePostsByScore = posts => {
  return {
    type: FETCH_POSTS_BY_SCORE,
    posts
  }
}

export const receivePost = post => {
  return {
    type: FETCH_POST,
    post
  }
}

export const fetchPosts = category => dispatch => {
    return serverAPI.fetchPosts(category)
      .then(posts => dispatch(receivePosts(posts)))
  }

  export const fetchPostsByScore = category => dispatch => {
      return serverAPI.fetchPosts(category)
        .then(posts => dispatch(receivePostsByScore(posts)))
    }

export const fetchPost = id => dispatch => {
    return serverAPI.fetchPost(id)
      .then(post => dispatch(receivePost(post)))
  }

export const newPost = post => {
  post = {
    ...post,
    timestamp: Date.now(),
  };

    return dispatch => {
      return serverAPI.newPost(post)
        .then(post => serverAPI.fetchPosts(post.category)
          .then(posts => dispatch(receivePosts(posts))))
    }
  }

  export const updatePost = (post,category,location) => {
    post = {
      ...post,
      timestamp: Date.now(),
    };
    return dispatch => {
      return location ?
      serverAPI.updatePost(post)
        .then(post => serverAPI.fetchPosts(category)
          .then(posts => dispatch(receivePosts(posts))))
        :
        serverAPI.updatePost(post)
          .then(post => serverAPI.fetchPost(post.id)
            .then(post => dispatch(receivePost(post))))
    }
  }

  export const removePost = (postId,category) => dispatch => {
      return serverAPI.removePost(postId)
        .then(post => serverAPI.fetchPosts(category)
          .then(posts => dispatch(receivePosts(posts))))
    }

  export const postVotes = (id, option, location, category) => {
    return dispatch => {
      return location ?
      serverAPI.postVotes(id,option)
        .then(post => serverAPI.fetchPosts(category)
          .then(posts => dispatch(receivePosts(posts))))
        :
        serverAPI.postVotes(id,option)
          .then(post => serverAPI.fetchPost(post.id)
            .then(post => dispatch(receivePost(post))))
    }
  }
