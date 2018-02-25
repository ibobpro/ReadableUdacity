import React, { Component } from 'react'
import { Navbar,NavItem, NavDropdown, MenuItem, Nav} from 'react-bootstrap'
import { fetchCategories } from '../actions/categories'
import {newPost, fetchPostsByScore, fetchPosts} from '../actions/posts'
import {changeUser} from '../actions/user'
import randomid from '../utils/helpers'
import { connect } from 'react-redux'

import {
  Modal,
  Button,
  FormGroup,
  FormControl,
  HelpBlock,
  ControlLabel
} from 'react-bootstrap';



class Header extends Component{

  state ={
      isOpen:false,
      id : '',
      timestamp: '',
      title : '',
      body : '',
      author : '',
      category : '',
      isOpenUser:false,
      user:'',
      valid:true
  }

  componentWillMount() {
    this.props.fetchCategories()
  }

  openModal = () => {
    this.setState({
      isOpen: true
    });
  };

  hideModal = () => {
    this.setState({
      isOpen: false
    });
  };




  render() {
    const { categories,newPost, fetchPostsByScore, fetchPosts, user,changeUser } = this.props
    const publishPost = () => {
      console.log(this.state)
      if(this.state.title.length > 3 && this.state.body.length > 3 && this.state.author.length > 3 && this.state.category.length > 1)
      {newPost({
        id : randomid(),
        timestamp: null,
        title : this.state.title,
        body : this.state.body,
        author : this.state.author,
        category : this.state.category
        })
      this.setState({
        isOpen:false,
          id : '',
          timestamp: '',
          title : '',
          body : '',
          author : '',
          category : ''
      })}
      else {this.setState({
        valid:false
      })}
    }

  const clearState = () => this.setState({
    title : '',
    body : '',
    author : '',
    category : '',
    valid:true
  })
  const  getValidationState = (state) =>  {
      const length = state;
      if (length > 1) return 'success';
      else if (length > 0) return 'error';
      return null;
  }
  const pathSplitter = (string) => {
    if(string.length > 1){
      const result =  string.split('/')
      return result[1]
    }
  }
  const errorMsg = () => {
    return (<HelpBlock>
      {this.state.title.length < 3 && 'title,' }
      {this.state.body.length < 3 &&  'body,'}
      {this.state.author.length < 3 &&  'author,'}
      'is too short '
      {this.state.category.length < 1 && 'please choose the category' }
    </HelpBlock>)
  }
    return (
      <div>
       <div className="static-modal">
          <Modal show={this.state.isOpen}>
           <Modal.Header>
             <Modal.Title>Create a Post</Modal.Title>
           </Modal.Header>
           <Modal.Body>
           <form>
                <ControlLabel>Fill the form correctly to save your new post</ControlLabel>
                <FormGroup
                  className="clearify"
                  controlId="formBasicText"
                  validationState={getValidationState(this.state.title.length)}
                >
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
                    </FormGroup>
                  <FormGroup
                      className="clearify"
                      controlId="formBasicText"
                      validationState={getValidationState(this.state.author.length)}
                    >
                <FormControl
                  type="text"
                  value={this.state.author}
                  placeholder="Enter Author"
                  onChange={(e)=>{
                    this.setState({
                      author:e.target.value
                    })
                  }}
                />
                </FormGroup>
                <FormGroup
                  className="clearify"
                  controlId="formBasicText"
                  validationState={getValidationState(this.state.category.length)}
                >
                <FormControl
                componentClass="select"
                placeholder="select category"
                value={this.state.category}
                onChange={(e)=>{
                  this.setState({
                    category:e.target.value
                  })
                }}
                >
                  <option disabled value=''>select category</option>
                  <option value="react">react</option>
                  <option value="redux">redux</option>
                  <option value="udacity">udacity</option>

                </FormControl>
                </FormGroup>
                <FormGroup
                  className="clearify"
                  controlId="formBasicText"
                  validationState={getValidationState(this.state.body.length)}
                >
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
                <HelpBlock>
                  {this.state.valid === true ? 'Validation is based on string length.' : errorMsg()}
                </HelpBlock>
              </FormGroup>
            </form>
           </Modal.Body>
           <Modal.Footer>
             <Button onClick={this.hideModal}>Close</Button>
             <Button onClick={publishPost} bsStyle="primary">Publish</Button>
           </Modal.Footer>
          </Modal>
          <Modal show={this.state.isOpenUser} bsSize="small" aria-labelledby="contained-modal-title-sm">
             <Modal.Header>
               <Modal.Title id="contained-modal-title-sm">Change User</Modal.Title>
             </Modal.Header>
             <Modal.Body>
               <h4>{user.user}</h4>
               <form>
              <FormGroup
                controlId="formBasicText"
              >
                <FormControl
                  type="text"
                  value={this.state.user}
                  placeholder="Enter the new user"
                  onChange={(e)=>{
                    this.setState({
                      user:e.target.value
                    })
                  }}
                />
                <FormControl.Feedback />
                <HelpBlock>Validation is based on string length.</HelpBlock>
                </FormGroup>
              </form>
             </Modal.Body>
             <Modal.Footer>
               <Button onClick={()=>this.setState({isOpenUser:false})}>Close</Button>
               <Button onClick={()=>{changeUser({user:this.state.user})
                 this.setState({isOpenUser:false})
               }} bsStyle="primary">Save</Button>
             </Modal.Footer>
            </Modal>
        </div>
      <Navbar collapseOnSelect className="clearify">
  <Navbar.Header>
    <Navbar.Brand>
      <a href="/">Readable</a>
    </Navbar.Brand>
    <Navbar.Toggle />
  </Navbar.Header>
  <Navbar.Collapse>
    <Nav>
      <NavItem onClick={this.openModal} eventKey={1}>
          Create a Post
      </NavItem>
      <NavDropdown eventKey={2} title='Sort By' id="basic-nav-dropdown">
        <NavItem onClick={()=>fetchPosts(pathSplitter(this.props.location.pathname))} eventKey={2.1} href="#">
          Date
        </NavItem>
        <NavItem onClick={()=>fetchPostsByScore(pathSplitter(this.props.location.pathname))} eventKey={2.1} href="#">
          Score
        </NavItem>
      </NavDropdown>
      <NavDropdown eventKey={3} title="Categories" id="basic-nav-dropdown">
        {(categories.length > 0) && (categories.map((category)=>{
          return (<MenuItem key={category.name} eventKey={3.1} href={`/${category.name}`}>{category.name}</MenuItem>)
        }))}
        <MenuItem divider />
        <MenuItem href="/" eventKey={3.3}>All Posts</MenuItem>
      </NavDropdown>
    </Nav>
    <Nav pullRight>
      <NavItem onClick={()=>this.setState({isOpenUser:true})} eventKey={2} href="#">
        <span title="Change User">{user.user}</span>
      </NavItem>
    </Nav>
  </Navbar.Collapse>
</Navbar>
      </div>
    )
  }
}

const mapStateToProps = rootReducer => {
   return {
     categories : rootReducer.categories,
     user : rootReducer.user
  }
}

const mapDispatchToProps = dispatch => ({
  fetchCategories: () => dispatch(fetchCategories()),
  newPost : data => dispatch(newPost(data)),
  fetchPostsByScore : category => dispatch(fetchPostsByScore(category)),
  fetchPosts : category => dispatch(fetchPosts(category)),
  changeUser : user => dispatch(changeUser(user))
})




export default connect(mapStateToProps,mapDispatchToProps)(Header)
