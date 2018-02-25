import React,{ Component } from 'react'
import Moment from 'react-moment'
import { Link, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { fetchPosts, removePost, postVotes, updatePost } from '../actions/posts'
import {GoX, GoPencil, GoTriangleUp, GoTriangleDown} from 'react-icons/lib/go'
import {
  Modal,
  Button,
  FormGroup,
  FormControl,
  HelpBlock,
  ControlLabel} from 'react-bootstrap'

class Body extends Component {
  componentWillMount(){
    const { fetchPosts, match } = this.props

fetchPosts(match.params.category)
  }

componentWillRecieveProps(nextProps) {
  if (nextProps.match.params.category !== this.props.match.params.category){
    const category = nextProps.match.params.category
    this.props.fetchPosts(category)
  }
}

  state = {
    input : null,
    title : '',
    body : '',
    isOpen : false,
    post : ''
  }

  render() {
    const { posts, removePost, postVotes, updatePost } = this.props
    const openModal = (post) => {
      this.setState({
        isOpen: true,
        body:post.body,
        title:post.title,
        post
      });
    };
    const hideModal = () => {
      this.setState({
        isOpen: false
      });
    };
    const editPost = () => {
      updatePost({...this.state.post,
        body:this.state.body,
        title:this.state.title},this.props.match.params.category,true)
        this.setState({
          isOpen:false,
            title : '',
            body : ''
        })
    }
    const clearState = () => this.setState({
      title : '',
      body : '',
      author : '',
      category : ''
    })

    const ellipsify = (str) => {
      if (str.length > 100) {
          return (str.substring(0, 100) + "...");
      }
      else {
          return str;
      }
    }
    return (
      <div className="container center-my">
        <div className="row">
          <div className="col-md-12 ">
            <div className="row card paper-bg">

              {(posts.length > 0) && posts.map((post)=>{
                return (
                  <div key={post.id} className="col-md-12 post">
                    <div className="row">
                      <div className="col-xs-1 text-center">
                        <div><span className="post-title"><a onClick={ () => postVotes(post.id,"upVote",true,this.props.match.params.category)}><GoTriangleUp size={42} /></a></span></div>
                        <div className=""><span className="post-title">
                          <h3 className={((post.voteScore < 0 ) ? "voteScoreColorRed" : "voteScoreColorGreen")} >{post.voteScore}</h3></span>
                        </div>
                        <div><strong><span className="post-title"><a onClick={ () => postVotes(post.id,"downVote",true,this.props.match.params.category)}><GoTriangleDown size={42} /></a></span></strong></div>
                      </div>
                      <div className="col-xs-11">
                        <h4>
                          <strong><Link to={`/${post.category}/${post.id}`} className="post-title">{post.title}</Link></strong>
                          <strong><span className="post-title"><a onClick={()=>removePost(post.id,this.props.match.params.category)}><GoX size={21} /></a></span></strong>
                          <strong><span className="post-title"><a onClick={()=>openModal(post)} ><GoPencil size={18} /></a></span></strong>
                        </h4>
                        <div className="clearify post-header-line">
                          <span className="glyphicon glyphicon-user" />by <Link to=''>{post.author}</Link> | <span className="glyphicon glyphicon-calendar">
                          </span><Moment format="MMMM DD,YYYY" unix>{post.timestamp/1000}</Moment> | <span className="glyphicon glyphicon-comment" />
                            {post.commentCount} Comments | <i className="icon-share" />{post.voteScore} Votes | <span className="glyphicon glyphicon-tags">
                          </span>Category : <span className="label label-info">{post.category}</span>
                        </div>
                        <div className="row post-content">
                          <div className="col-md-12">
                            <p>
                            {ellipsify(post.body)}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                  </div>
                )
              })}
              <div className="static-modal">
                 <Modal show={this.state.isOpen}>
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
                    <Button onClick={hideModal}>Close</Button>
                    <Button type="submit" onClick={editPost} bsStyle="primary">Save</Button>
                  </Modal.Footer>
                 </Modal>
               </div>
              {posts.length < 1 && <div>
                  <h3>No posts yet in {this.props.match.params.category}</h3>
                  </div>}
            </div>
          </div>
        </div>
      </div>

    )
  }
}


const mapStateToProps = rootReducer => {
   return {
     posts : rootReducer.posts,
     categories : rootReducer.categories
  }
}

const mapDispatchToProps = dispatch => ({
  fetchPosts: category => dispatch(fetchPosts(category)),
  removePost : (post,category) => dispatch(removePost(post,category)),
  updatePost : (data,category,option) => dispatch(updatePost(data,category,option)),
  postVotes : (postId,option,location,category) => dispatch(postVotes(postId,option,location,category))
})


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Body))
