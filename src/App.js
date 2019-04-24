import React, { Component } from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import './App.css';
import Dp from './containers/Dp';
import Profile from './containers/Dp/profile';

class App extends Component {
  //  requireAuth(){
  //    console.log("aya iske andar");
  //    let auth_token = localStorage.getItem('google-auth-token');
  //    if(!auth_token){
  //      alert("login required to access this reqource");
  //      <Redirect to={{ pathname: '/'}} />
  //    }
  //  }

  render() {
    return (
      <BrowserRouter>
        <div>
          <Switch>
            <Route exact path='/' component={Dp}/>
            <Route exact path='/profile' component={Profile} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
