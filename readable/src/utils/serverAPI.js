 // const api = "http://192.168.100.6:3001"
 const api ="http://localhost:3001"
let token = localStorage.token;
if(!token)
  token = localStorage.token = 'boburmirzo'

const headers = {
  'Content-Type': 'application/json',
  'Accept' : 'application/json',
  'Authorization' : token
}

export const fetchCategories = () =>
  fetch(`${api}/categories`,{headers})
    .then(res => res.json())
    .then(data => data.categories)

// ----------------------

export const fetchPosts = category => {
  const url = category ? `${api}/${category}/posts` : `${api}/posts`
  return  fetch(url,{headers})
      .then(res => res.json())
      .then(data => data)}

export const fetchPost = id =>
  fetch(`${api}/posts/${id}`,{headers})
      .then(res => res.json())
      .then(data => data)

export const postVotes = (id,option) =>
  fetch(`${api}/posts/${id}`,{
    method: 'POST',
    headers,
    body: JSON.stringify({option})
  }).then(res => res.json())
  .then(data => data)

  export const updatePost = post =>{
    const data = {
      ...post,
      timestamp : Date.now()
    }
    return fetch(`${api}/posts/${post.id}`,{
      method: 'PUT',
      headers,
      body: JSON.stringify(data)
    }).then(res => res.json())
    .then(data => data)}

export const newPost = post => {
  const data = {
    ...post,
    timestamp : Date.now()
  }
  return fetch(`${api}/posts`,{
    method: 'POST',
    headers,
    body: JSON.stringify(data)
  }).then(res => res.json)
  .then(data => data)
}

export const removePost = id => fetch(`${api}/posts/${id}`,{
  method:'DELETE',
  headers
}).then(res => res.json)
.then(data => data)

// -----------------------------------
export const fetchComments = postId => {
  const url =`${api}/posts/${postId}/comments`
    return fetch(url,{headers})
      .then(res => res.json())
      .then(data => data)}

export const fetchComment = id =>
    fetch(`${api}/comments/${id}`,{headers})
      .then(res => res.json())
      .then(data => data)

export const commentVotes = (id,option) =>
  fetch(`${api}/comments/${id}`,{
    method: 'POST',
    headers,
    body: JSON.stringify({option})
  }).then(res => res.json())
  .then(data => data)

  export const updateComment = comment =>{
    const data = {
      ...comment,
      timestamp : Date.now()
    }
    return fetch(`${api}/comments/${comment.id}`,{
      method: 'PUT',
      headers,
      body: JSON.stringify(data)
    }).then(res => res.json())
    .then(data => data)}

export const newComment = comment => {
  const data = {
    ...comment,
    timestamp : Date.now()
  }
  return fetch(`${api}/comments`,{
    method: 'POST',
    headers,
    body: JSON.stringify(data)
  }).then(res => res.json)
  .then(data => data)
}

export const removeComment = id =>
fetch(`${api}/comments/${id}`,{
  method:'DELETE',
  headers
}).then(res => res.json)
.then(data => data)

/*




export const post = (id,title,body,author,category) =>
  fetch(`${api}/posts`,{
    method: 'POST',
    headers : {
      ...headers,
      'Content-Type': 'application/json'
    },
    id,
    timestamp: Date.now(),
    title,
    body,
    author,
    category

  }).then(res => res.json())
*/
