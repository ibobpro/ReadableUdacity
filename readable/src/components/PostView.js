import React,{ Component } from 'react'
import Moment from 'react-moment'
import { connect } from 'react-redux'
import {  postVotes, removePost,updatePost, fetchPost } from '../actions/posts'
import { fetchComments, fetchCommentsByScore, commentVotes,newComment, removeComment, updateComment } from '../actions/comments'
import { Link } from 'react-router-dom'
import randomid from '../utils/helpers'
import {GoX, GoPencil, GoTriangleUp, GoTriangleDown} from 'react-icons/lib/go'
import {
  Modal,
  Form,
  Button,
  FormGroup,
  FormControl,
  HelpBlock,
  ControlLabel} from 'react-bootstrap'


class PostView extends Component {
  componentWillMount(){
    const {fetchComments, match, fetchPost } = this.props
    fetchComments(match.params.id)
    fetchPost(match.params.id)
  }

  state = {
    commentInput : '',
    title: '',
    body: '',
    isOpenPost:false,
    isOpenComment:false,
    commentForEditing:'',
    commentChangeInput:''
  }


  render() {
    const { posts, comments, postVotes, commentVotes, removePost,updatePost,
            newComment, removeComment, updateComment, fetchComments, fetchCommentsByScore, user } = this.props
    const myPosts = [posts]
    const post = myPosts.length > 0 ? myPosts[0] : null
    const clearState = () => this.setState({
      title : '',
      body : '',
      author : '',
      category : ''
    })
    const openPostModal = () => {
      this.setState({
        isOpenPost: true,
        body:post.body,
        title:post.title
      });
    };
    const hidePostModal = () => {
      this.setState({
        isOpenPost: false
      });
    };

    const openCommentModal = (comment) => {
      this.setState({
        isOpenComment: true,
        commentChangeInput:comment.body,
        commentForEditing:comment
      });
    };

    const hideCommentModal = () => {
      this.setState({
        isOpenComment: false,
        commentInput:''
      });
    };

    const editPost = () => {
      if(this.state.body.length > 0 && this.state.title.length > 0){updatePost({...post,
        body:this.state.body,
        title:this.state.title},'',false)
        this.setState({
          isOpenPost:false,
            title : '',
            body : ''
        })}
    }
    const onCommentInputChangeHandler = (e) =>{
      this.setState({
        commentInput : e.target.value
      })
    }


    const saveComment = () => {
        if(this.state.commentInput.length > 0){newComment({
          timestamp: Date.now(),
          id:randomid(),
          body:this.state.commentInput,
          author:user.user,
          parentId:post.id
        },post.id)
        this.setState({
          commentInput : ''
        })}
    }
     const changeComment = (comment) => {
      if(this.state.commentChangeInput.length > 0){updateComment({...comment,
      body:this.state.commentChangeInput},post.id)
      this.setState({
        isOpenComment:false,
        commentInput:''
      })}
    }


    if(post.title){
      return (
        <div className="container center-my">
          <div className="row">
            <div className="col-md-12">
              <div className="row card paper-bg">
                    <div key={post.id} className="col-md-12 post">
                      <div className="row">
                        <div className="col-xs-1 text-center">
                          <div><span className="post-title"><a onClick={ () => postVotes(post.id,"upVote",false)}><GoTriangleUp size={42} /></a></span></div>
                          <div className=""><span className="post-title">
                            <h3 className={((post.voteScore < 0 ) ? "voteScoreColorRed" : "voteScoreColorGreen")} >{post.voteScore}</h3></span>
                          </div>
                          <div><strong><span className="post-title"><a onClick={ () => postVotes(post.id,"downVote",false)}><GoTriangleDown size={42} /></a></span></strong></div>
                        </div>
                        <div className="col-xs-11">
                          <h4>
                            <strong><span className="post-title">{post.title}</span></strong>
                            <strong><span className="post-title"><Link to="/" onClick={()=>removePost(post.id)}><GoX size={21} /></Link></span></strong>
                            <strong><span className="post-title"><a onClick={openPostModal} ><GoPencil size={18} /></a></span></strong>
                          </h4>
                          <div className="post-header-line clearify">
                            <span className="glyphicon glyphicon-user" />by {post.author} | <span className="glyphicon glyphicon-calendar">
                            </span><Moment format="MMMM DD,YYYY" unix>{post.timestamp/1000}</Moment> | <span className="glyphicon glyphicon-comment" />
                              {post.commentCount} Comments | <i className="icon-share" />{post.voteScore} Votes | <span className="glyphicon glyphicon-tags">
                            </span>Category : <span className="label label-info">{post.category}</span>
                          </div>

                        </div>
                      </div>
                      <div className="row post-content">
                        <div className="col-md-9">
                          <div className="col-xs-1"></div>
                          <div className="col-xs-11">
                            <p>
                            {post.body}
                            </p>
                          </div>
                            <div className="row">
                            <div className="col-md-2">
                              <div className="static-modal">
                                 <Modal show={this.state.isOpenPost}>
                                  <Modal.Header>
                                    <Modal.Title>Edit Your Post</Modal.Title>
                                  </Modal.Header>
                                  <Modal.Body>
                                  <form>
                                     <FormGroup
                                       controlId="formBasicText"
                                     >
                                       <ControlLabel>Fill the form correctly to save your new post</ControlLabel>
                                       <FormControl
                                         type="text"
                                         value={this.state.title}
                                         placeholder="Enter Title"
                                         onChange={(e)=>{
                                           this.setState({
                                             title:e.target.value
                                           })
                                         }}
                                       />
                                       <FormControl
                                         componentClass="textarea"
                                         value={this.state.body}
                                         placeholder="Enter Post Body"
                                         onChange={(e)=>{
                                           this.setState({
                                             body:e.target.value
                                           })
                                         }}
                                       />
                                       <FormControl.Feedback />
                                       <Button onClick={clearState}>Clear</Button>
                                       <HelpBlock>Validation is based on string length.</HelpBlock>
                                     </FormGroup>
                                   </form>
                                  </Modal.Body>
                                  <Modal.Footer>
                                    <Button onClick={hidePostModal}>Close</Button>
                                    <Button type="submit" onClick={editPost} bsStyle="primary">Save</Button>
                                  </Modal.Footer>
                                 </Modal>
                               </div>
                            </div>
                            </div>
                            <div className="col-md-9">
                            <div className="row">
                                    <div className="col-md-8">
                                      <div className="page-header">
                                        <div>
                                          <h5>
                                            Leave a comment
                                          </h5>
                                          <Form inline>
                                            <FormControl
                                              type="text"
                                              value={this.state.commentInput}
                                              placeholder={"Enter your comment"}
                                              onChange={(e)=>onCommentInputChangeHandler(e)}
                                            />
                                            <Button onClick={()=>saveComment()}>Submit</Button>
                                          </Form>
                                        </div>
                                        <h4 id="comments"><small className="pull-right">{post.commentCount} comments</small> Comments </h4>
                                        <span>   <a onClick={()=>fetchComments(post.id)}>by date</a></span>
                                        <span>   <a onClick={()=>fetchCommentsByScore(post.id)}>by score</a></span>
                                      </div>
                                      <div className="comments-list">
                                        {(comments.length > 0 && comments.map((comment)=>{
                                        if(comment.parentId === post.id){
                                          return (
                                            <div key={comment.id} className="media">
                                              <p className="pull-right"><small><Moment fromNow unix>{comment.timestamp/1000}</Moment></small></p>
                                              <p className="media-left" >
                                                <img width='50px' alt="userPic" src="https://ssl.gstatic.com/accounts/ui/avatar_2x.png" />
                                              </p>
                                              <div className="media-body">
                                                <h4 className="media-heading user_name">{comment.author}
                                                  <span><a onClick={()=>removeComment(comment.id,post.id)}><GoX size={16} /></a> </span>
                                                  <span><a onClick={()=>openCommentModal(comment)}><GoPencil size={13} /></a></span>
                                                </h4>
                                                <p>{comment.body}</p>
                                                <p><small><a onClick={()=>commentVotes(comment.id,"upVote",post.id)}>Like</a> - <a onClick={()=>commentVotes(comment.id,"downVote",post.id)} >Dislike</a> <span className={((comment.voteScore < 0 ) ? "voteScoreColorRed" : "voteScoreColorGreen")}>{comment.voteScore}</span>
                                                </small></p>
                                              </div>
                                            </div>
                                          )
                                        }
                                        else {
                                          return (<div></div>)
                                        }
                                }))}
                                  <Modal show={this.state.isOpenComment} bsSize="small" aria-labelledby="contained-modal-title-sm">
                                     <Modal.Header>
                                       <Modal.Title id="contained-modal-title-sm">Edit your comment</Modal.Title>
                                     </Modal.Header>
                                     <Modal.Body>
                                       <h4>{this.state.commentForEditing.body}</h4>
                                       <form>
                                      <FormGroup
                                        controlId="formBasicText"
                                      >
                                        <ControlLabel>Working example with validation</ControlLabel>
                                        <FormControl
                                          type="text"
                                          value={this.state.commentChangeInput}
                                          placeholder="Enter text"
                                          onChange={(e)=>this.setState({commentChangeInput:e.target.value})}
                                        />
                                        <FormControl.Feedback />
                                        <HelpBlock>Validation is based on string length.</HelpBlock>
                                        </FormGroup>
                                      </form>
                                     </Modal.Body>
                                     <Modal.Footer>
                                       <Button onClick={hideCommentModal}>Close</Button>
                                       <Button type="submit" onClick={()=>changeComment(this.state.commentForEditing)} bsStyle="primary">Save</Button>
                                     </Modal.Footer>
                                  </Modal>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

      )
    }
    else {
      return (
        <div className="container center-my">
          <div className="row">
            <div className="col-md-12">
              <div className="row card paper-bg text-center">
                <div className="col-md-12">
                <div className="container">
                  <div className="row">
                      <div className="col-md-12">
                          <div className="error-template">
                              <h1>
                                  Oops!</h1>
                              <h2>
                                  404 Not Found</h2>
                              <div className="error-details">
                                  Sorry, an error has occured, Requested page not found!
                              </div>
                            </div>
                         </div>
                      </div>
                   </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    }

  }
}


const mapStateToProps = rootReducer => {
   return {
     posts :rootReducer.posts,
     comments : rootReducer.comments,
     user : rootReducer.user
  }
}

const mapDispatchToProps = dispatch => ({
  fetchComments: (parentId) => dispatch(fetchComments(parentId)),
  fetchCommentsByScore : (parentId) => dispatch(fetchCommentsByScore(parentId)),
  postVotes : (postId,option,location) => dispatch(postVotes(postId,option,location)),
  commentVotes : (commentId,option,postId) => dispatch(commentVotes(commentId,option,postId)),
  removePost : (post) => dispatch(removePost(post)),
  updatePost : (data,category,option) => dispatch(updatePost(data,category,option)),
  newComment : (data,postId) => dispatch(newComment(data,postId)),
  removeComment : (data,postId) => dispatch(removeComment(data,postId)),
  updateComment : (data,postId) => dispatch(updateComment(data,postId)),
  fetchPost : (id) => dispatch(fetchPost(id))
})


export default connect(mapStateToProps, mapDispatchToProps)(PostView)
