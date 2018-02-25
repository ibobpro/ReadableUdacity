import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom'
import Header from '../components/Header'
import Body from '../components/Body'
import PostView from '../components/PostView'



class App extends Component {

  componentDidMount(){

  }

  render() {

    return (
      <div className="App">


        <Route path="/" component={Header} />
            <div className="body-of-page" >
            <Switch >
              <Route exact path="/" component={Body} />
              <Route exact path="/:category" component={Body} />
              <Route exact path="/:category/:id" component={PostView} />
            </Switch>
            </div>


      </div>
    );
  }
}

export default App
