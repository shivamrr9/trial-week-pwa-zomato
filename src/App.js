import React, { Component } from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import './App.css';
import Dp from './containers/Dp';
import Profile from './containers/Dp/profile';

class App extends Component {

  render() {
    return (
      <BrowserRouter>
        <div>
          <Switch>
            <Route exact path='/' component={Dp}/>
            <Route exact path='/profile/:email' component={Profile} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
