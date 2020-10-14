import React, { Component } from 'react';
import axios from 'axios';
import LoginPage from './components/LoginPage.js'
import Dashboard from './components/Dashboard.js'
import 'bootstrap/dist/css/bootstrap.css';
import './App.css';




export default class App extends Component {

state={
  user: window.localStorage.getItem('moviesAccount') || ''
}


// showing the login page
logOrUser=()=>{
  if (this.state.user == '') {
    return <LoginPage></LoginPage>
  }
  else{
    return <Dashboard></Dashboard>
  }
}


  render() {
    return (
      <div>
              {this.logOrUser()}
      </div>
    )
  }
}
